import express from 'express'
import { connectDB } from './config/db.';
import dotenv from 'dotenv';
import todoRoutes from './route/todo.route.js';

dotenv.config();

const app = express();
app.get('/', (req, res) => {
    res.send('Hello, World!')
});

app.use(express.json());
app.use('/api/todos',todoRoutes);


app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000')
});

export default app