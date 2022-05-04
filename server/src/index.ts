import express from 'express';
import Configuration from './config/Config';
import UserRoutes from './routes/api/users';
import PostRoutes from './routes/api/posts';
import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);
app.use('/api/posts', PostRoutes);

Configuration.connectToPort(app);
Configuration.connectToDatabase().then();
