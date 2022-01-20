import request from 'supertest';
import app from '../src/app.js';

test('movies page shows list of movies', async () => {
  const response = await request(app).get('/movies').expect(200);
});
