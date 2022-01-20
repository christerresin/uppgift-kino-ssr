import app from './src/app.js';
const port = process.env.PORT || 5080;

// Server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
