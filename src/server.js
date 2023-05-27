import app from './app.js';
import config from './common/config.js';

app.listen(config.port, (error) => {
  error ? console.log(error) : console.log(`listening port ${config.port}`);
});
