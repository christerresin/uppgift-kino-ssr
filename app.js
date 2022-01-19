import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const menuItems = [
  { label: 'Home', link: '/' },
  { label: 'Movies', link: '/movies' },
];

app.get('/', (req, res) => {
  res.render('home', { menuItems: menuItems });
});

app.get('/filmer', (req, res) => {
  res.render('movies');
});

app.use('/', express.static('public'));

app.listen(5080);
