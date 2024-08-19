import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index.js'

const app = express();

app.use(cors({
    credentials:true
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
server.listen(8080, () => {
    console.log('server is running');
});

const DB_URL=  "mongodb+srv://ducpt:ducphamtrung@learnbe.jhobe1k.mongodb.net/?retryWrites=true&w=majority&appName=LearnBE"

mongoose.Promise = Promise;
mongoose.connect(DB_URL);
mongoose.connection.on('error', (error) => console.log(error))
mongoose.connection.on('connected', () => {
    console.log('connected DB success')
});

app.use('/', router());