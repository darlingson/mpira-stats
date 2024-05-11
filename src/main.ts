import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { apiRoutes } from './routes/api';
import { authRoutes } from './routes/auth';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
const PORT = process.env.PORT || 3001;

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello from the server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});