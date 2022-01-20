import express from 'express';
import { engine } from 'express-handlebars';
import { marked } from 'marked';
import DataRetriever from './scripts/DataRetriever.js';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const dataLoader = new DataRetriever();
const moviesData = await dataLoader.loadMovies();

const menuItems = [
  { label: 'Home', link: '/' },
  { label: 'Movies', link: '/filmer' },
];

app.get('/', (req, res) => {
  res.render('home', { menuItems: menuItems });
});

app.get('/filmer', (req, res) => {
  res.render('movies', { menuItems: menuItems, movies: moviesData });
});

app.get('/film/:id', async (req, res) => {
  const movieData = await dataLoader.loadMovie(req.params.id);
  const introMarked = marked.parse(movieData.attributes.intro);
  if (movieData) {
    res.render('movie', {
      menuItems: menuItems,
      movie: movieData,
      introMarked: introMarked,
    });
  } else {
    res.status(404);
    res.render('404');
  }
});

app.use(express.static('./public'));
app.use('/film', express.static('./public'));

app.listen(5080);
