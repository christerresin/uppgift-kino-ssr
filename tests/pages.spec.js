import { response } from "express";
import request from "supertest";
import app from "../src/app.js";

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

test("movie page loads, has movie title and image", async () => {
  const response = await request(app)
    .get("/movie/10")
    .expect(200)
    .then((response) => {
      console.log(response);
      return response;
    });
  expect(response.text.includes("Threat")).toBeTruthy();
  const testKeyWords = ["background-image", "media-amazon", "/images/", ".jpg"];
  expect(
    testKeyWords.every((word) => response.text.includes(word))
  ).toBeTruthy();
  expect(response.text.includes("imdb")).toBeTruthy();
});
