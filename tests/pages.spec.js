import request from "supertest";
import app from "../src/app.js";
import DataRetriever from "../src/scripts/DataRetriever.js";

test("home page loads", async () => {
  const response = await request(app).get("/").expect(200);
});

test("movies page shows list of movies", async () => {
  const response = await request(app).get("/movies").expect(200);

  expect(response.text.includes("Threat")).toBeTruthy();
  expect(response.text.includes("Idiocracy")).toBeTruthy();
  expect(response.text.includes("Knight")).toBeTruthy();
  expect(response.text.includes("Godfather")).toBeTruthy();
});

test("movie page loads, has movie title, intro and image", async () => {
  const response = await request(app).get("/movie/10").expect(200);
  expect(response.text.includes("Threat")).toBeTruthy();
  const testKeyWords = ["background-image", "media-amazon", "/images/", ".jpg"];
  expect(
    testKeyWords.every((word) => response.text.includes(word))
  ).toBeTruthy();
  expect(response.text.includes("imdb")).toBeTruthy();
});

test("404 page and code when accessing movie page outside API entrys", async () => {
  const response = await request(app).get("/movie/x9x").expect(404);
  expect(response.text.includes("404")).toBeTruthy();
});

test("returns the data for movie with id 1", async () => {
  const dataLoader = new DataRetriever();
  const movieData = await dataLoader.loadMovie(1);
  expect(movieData.title.includes("Shawshank")).toBeTruthy();
});

test("returns array of data from API", async () => {
  const dataLoader = new DataRetriever();
  const moviesArr = await dataLoader.loadMovies();
  expect(moviesArr.length > 1);
  // Check API data for expected keys in movies object
  const movieKeys = ["id", "title", "image", "intro"];
  const keysCheckedArr = moviesArr.filter((movie) => {
    let passed;
    for (let i = 0; i < movieKeys.length; i++) {
      if (!movie.hasOwnProperty(movieKeys[i])) {
        passed = false;
        break;
      }
      passed = true;
    }
    return passed;
  });
  expect(moviesArr.length == keysCheckedArr.length).toBeTruthy();
});
