import db from '../models/index.js'

export default function UserService(){
    const User = db.User;

    return {
        join(req, res){
            new User(req.body).save(function(err){ 
                if(err){
                    res.status(500).json({message: err})
                    return; 
                } else {
                    res.status(200).json({ok: 'ok'})  
                }
            })
        },
        login(req, res) {    // 토큰 쪽을 확인하자.
            User.findOne({
                userid: req.body.userid
            }, function (err, user) {
                if (err) 
                    throw err
                if (!user) {
                    res
                        .status(401)
                        .send({success: false, message: '해당 ID가 존재하지 않습니다'});
                } else {
                    user.comparePassword(req.body.password, function (_err, isMatch) {
                        if (!isMatch) {
                            res
                                .status(401)
                                .send({message:'FAIL'});
                        } else {
                            user.generateToken((err, user) => {
                                if (err) 
                                    res
                                        .status(400)
                                        .send(err)

                                    // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
                                res
                                    .status(200)
                                    .json(user)
                            })
                        }
                    })
                }
            })
        },
        logout(){
            req.logout()
            res.json({msg: 'LOGOUT'})
        },
        // id 중복 로직
        checkDuplicateUserid(req, res) {
            User
                .findById({userid: req.body.userid})
                .exec((err, user) => {
                    if (err) {
                        res
                            .status(500)
                            .send({message: err});
                        return;
                    }
                    if (user) {
                        res
                            .status(400)
                            .send({message: "ID가 이미 존재합니다"});
                        return;
                    }
                })
        },
        getUserById(req, res){
            const userid = req.body.userid
            User
                .findById({userid: userid})
                .exec((_err, user) => {
                    res.status(200).json(user)
                })
        },
        getUsers(_req, res){   // _req의 언더바는 안쓰일 경우에 쓰는거다. 가져만 오고 쓰이지 않는다는 말이다.
            User.find().exec(
                (err, users) => {
                    // console.log(users)
                    res.status(200).json(users) // 결과값 전부 보냄
                }
            )
        }
    }
}
