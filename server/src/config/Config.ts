import { Express } from 'express';
import { connect } from 'mongoose';

const port = process.env.SERVER_PORT || 5001;
const env = process.env.NODE_ENV;
const mongodbUrl: string =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/';
const dbName = process.env.MONGODB_DB_NAME || 'bookface';

const connectToDatabase = async () => {
  const uri = mongodbUrl + dbName;
  try {
    await connect(uri);
    console.log('Successfully connected to the Database');
  } catch (error) {
    console.log('Error while connecting to Database'.toUpperCase(), error);
    process.exit();
  }
};

const connectToPort = (app: Express) => {
  app.listen(port, () => {
    console.log(`server started at port: ${port}`);
    if (env === 'development') {
      console.log('Server running in development mode!');
    }
  });
};

export default {
  connectToPort,
  connectToDatabase,
};
