import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'JK Sports Hub API' });
});

app.get('/api/products', async (req, res) => {
  res.json({ products: [] });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
