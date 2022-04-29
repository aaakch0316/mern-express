import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'  // 예전 처럼 세션 쿠키하지말고 passport로 이걸로 하자.
import BoardService from "../services/board.js"

dotenv.config()
const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
}
const app = express()
app.use(cors());
app.use(function (_req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.post('/add', cors(corsOptions), (req, res) => {
    BoardService().addBoard(req, res)
})

app.get('/getBoards',  cors(corsOptions), (req, res) => {  
    BoardService().getBoards(req, res)
})

app.post('/delUserApi',  cors(corsOptions), (req, res) => {  
    BoardService().delUsers(req, res)
})

export default app