import fetch from 'node-fetch';

export default class DataRetriever {
  constructor() {}
  trimData(movie) {
    return {
      id: movie.id,
      ...movie.attributes,
      image: movie.attributes.image.url,
    };
  }

  async loadMovies() {
    const API_URL = 'https://lernia-kino-cms.herokuapp.com/api/movies';
    try {
      const dataBuff = await fetch(API_URL);
      const moviesData = await dataBuff.json();
      const movies = moviesData.data.map(this.trimData);
      return movies;
    } catch (error) {
      console.log(error);
    }
  }

  async loadMovie(movieId) {
    try {
      const API_URL = `https://lernia-kino-cms.herokuapp.com/api/movies/${movieId}`;

      const dataBuff = await fetch(API_URL);
      const movieData = await dataBuff.json();
      return this.trimData(movieData.data);
    } catch (error) {
      console.log(error);
    }
  }
}
