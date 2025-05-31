import express from 'express';
import cors from 'cors';
import { getAllMenu, orderMenu } from './handler.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/menu', getAllMenu);
app.post('/order',orderMenu);
app.use(express.static('utils/images'));

const PORT = 3000;
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
