import { env } from './config/env.config';
import app from './app';
import { connectDB } from './config/db.config';

connectDB().then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });
});
