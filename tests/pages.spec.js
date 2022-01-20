import request from 'supertest';
import app from '../src/app.js';

test('home page loads', async () => {
  const response = await request(app).get('/').expect(200);
});

test('movies page shows list of movies', async () => {
  const response = await request(app).get('/movies').expect(200);

  expect(response.text.includes('Threat')).toBeTruthy();
  expect(response.text.includes('Idiocracy')).toBeTruthy();
});

test('movie page loads and has movie title', async () => {
  const response = await request(app).get('/movie/10').expect(200);

  expect(response.text.includes('Threat')).toBeTruthy();
});
