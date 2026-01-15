import app from './config/express';
import { config } from './config/env';

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
