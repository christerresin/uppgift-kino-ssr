import express from 'express';
import { engine } from 'express-handlebars';
import { marked } from 'marked';
import DataRetriever from './scripts/DataRetriever.js';

const app = express();
const port = process.env.PORT || 5080;
const dataLoader = new DataRetriever();

// Handlebars setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Menu in site header
const menuItems = [
  { label: 'Home', link: '/' },
  { label: 'Movies', link: '/movies' },
];

// Routing
app.get('/', (req, res) => {
  res.render('home', { menuItems: menuItems });
});

app.get('/movies', async (req, res) => {
  const movies = await dataLoader.loadMovies();

  res.render('movies', { menuItems: menuItems, movies: movies });
});

app.get('/movie/:id', async (req, res) => {
  const movieData = await dataLoader.loadMovie(req.params.id);
  if (movieData) {
    const introMarked = marked.parse(movieData.intro);

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

// Middleware
app.use(express.static('./public'));
app.use('/movie', express.static('./public'));

// Server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
