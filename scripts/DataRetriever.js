import fetch from 'node-fetch';

export default class DataRetriever {
  constructor() {
    this.movies = null;
  }
  async loadMovies() {
    const API_URL = 'https://lernia-kino-cms.herokuapp.com/api/movies';
    if (!this.movies) {
      try {
        const dataBuff = await fetch(API_URL);
        const moviesData = await dataBuff.json();
        this.movies = moviesData.data;
      } catch (error) {
        console.log(error);
      }
    }
    return this.movies;
  }

  async loadMovie(movieId) {
    try {
      const API_URL = `https://lernia-kino-cms.herokuapp.com/api/movies/${movieId}`;

      const dataBuff = await fetch(API_URL);
      const movieData = await dataBuff.json();
      return movieData.data;
    } catch (error) {
      console.log(error);
    }
  }
}
