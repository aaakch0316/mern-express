//entry point
console.log('entry app.js')

require('dotenv').config()
const cors = require('cors');
const express = require('express');
const app = express();
const { port, MONGO_URI } = process.env;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// R라우터 => C컨트롤러 => Service(인공지능) => DB
const APP = './app/routes' 
const nodes = ['basic'] 
for(const leaf of nodes){
  require(`${APP}/${leaf}.route`)({url:`/api/${leaf}`,app})
}


const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}


app.listen(port, () => {
    console.log('***************** ***************** *****************')
    console.log('********** 서버가 정상적으로 실행되고 있습니다 *********')
    console.log('***************** ***************** *****************')
})

  

module.exports = app;