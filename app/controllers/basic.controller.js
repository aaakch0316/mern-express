/**
 * 많은 계산이 아니기 때문에 service까지 사실 안가도 된다.
 */

const { bmi } = require('../services/basic.service');

exports.getBmi = (req, res) =>{
    const {name, height, weight} = req.body // req.body 내부에 JSON 포함
    const json = bmi({name, height, weight})
    console.log(`계산된 JSON 값 : ${JSON.stringify(json)}`)
    res.status(200).json(json)
  }