import 'reflect-metadata';
import express, { Application } from 'express';
import eventRoutes from './routes/eventRoutes';
import cors from 'cors';
import {AppDataSource} from './AppDataSource';

const app: Application = express();
const port = process.env.PORT || 3000;


app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/events', eventRoutes);

// Send index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start server
AppDataSource.initialize()
.then(() => {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  
}
).catch((error) => console.log(error));
export {app};
