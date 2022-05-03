import express from 'express';
import Configuration from './config/Config';

const app = express();

Configuration.connectToPort(app);
Configuration.connectToDatabase().then();

export default app;
