import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'  // 예전 처럼 세션 쿠키하지말고 passport로 이걸로 하자.
import UserService from "../services/user.js"

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

app.post('/join', cors(corsOptions), (req, res) => {
    UserService().join(req, res)
})

app.post('/login', cors(corsOptions), (req, res) => {
    UserService().login(req, res)
})

app.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
    UserService().logout(req, res)
})

app.get('/getUsers',  cors(corsOptions), (req, res) => {  
    UserService().getUsers(req, res)
})



export default app