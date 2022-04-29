

import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'
import morgan from 'morgan'
import db from './app/models/index.js'
import api from "./app/routes/api.js"
import basic from "./app/routes/basic.js"
// import board from "./app/routes/board.js"
import user from "./app/routes/user.js"
import index from "./app/routes/index.js"
// import todo from "./app/routes/todo.js"
import getResponse from "./app/lambdas/getResponse.js"
import applyPassport from './app/lambdas/applyPassport.js'
import applyDotenv from './app/lambdas/applyDotenv.js'

// 비동기로 서버를 async로 걸자. 모든걸 비동기로 받게 디폴트로 하자. 이렇게 엔트리 포인트 하면 비동기 외에는 받지 않는다.
// 아래는 네임드 펑션
// 헬프 함수는 아래에서 처리하지 않고 lambdas로 처리한다. (config 폴터에서 변경됨.)
async function startServer() {
    const app = express();
    const {mongoUri, port, jwtSecret} = applyDotenv(dotenv)
    app.use(express.static('public'));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    const _passport = applyPassport(passport, jwtSecret);
    app.use(_passport.initialize());
    app.use("/", index);
    app.use("/api", api);
    app.use("/basic", basic);
    // app.use("/board", board);
    // app.use("/todo", _passport.authenticate('jwt', {session: false}), todo);
    app.use("/user", user);
    app.use(morgan('dev'))
    db
        .mongoose
        .connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log(' ### 몽고DB 연결 성공 ### ')
        })
        .catch(err => {
            console.log(' 몽고DB와 연결 실패', err)
            process.exit();
        });

    app.all("*", function (_req, res) {
        return getResponse.notFoundResponse(res, "페이지를 찾을 수 없습니다");
    });

    app.use((err, _req, res) => {
        if (err.name == "UnauthorizedError") {
            return getResponse.unauthorizedResponse(res, err.message);
        }
    });

    app.listen(port, () => {
        console.log('***************** ***************** *****************')
        console.log('********** 서버가 정상적으로 실행되고 있습니다 *********')
        console.log('***************** ***************** *****************')
    })
}
startServer()

