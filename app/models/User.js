import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import applyDotenv from '../lambdas/applyDotenv'

export default function UserModel(mongoose){ 
    const { jwtSecret } = applyDotenv(dotenv)

    const userSchema = mongoose.Schema({
        userid: String, 
        password: String, 
        email: String, 
        name: String, 
        phone: String, 
        birth: String, 
        address: String,
        token: String
    })

    userSchema.methods.comparePassword = function(plainPassword, cb){
        console.log('userSchema.methods.comparePassword 진입')
        let isMatch = false;
        console.log('plain!!!!', plainPassword)
        console.log('this!!!!', this.password)
        console.log('cb!!!!', cb)
        if (plainPassword === this.password){
            isMatch = true
        } else {
            isMatch = false
        }
        bcrypt.compare(plainPassword, this.password, function(err, _isMatch) {
            if( err){
                return cb(err)
            } else {
                return cb(null, isMatch);
            }
        })
    }

    userSchema.nethods.generateToken = function(cb){
        console.log('userSchema.nethods.generateToken 진입')
        var user = this;
        var token = jwt.sign(user._id.toHexString(), jwtSecret)
        console.log(user)
        console.log(token)
        user.token = token
        user.save(function (err, user) {
            if (err) 
                return cb(err);
            cb(null, user)
        })
    }

    userSchema.statics.findByToken = function(token, cb){
        var user = this;

        jwt.verify(token, process.env.JWT_SECRET, function (err, decode) {
            user.findOne({
                "_id": decode,
                "token": token
            }, function (err, user) {
                if (err) 
                    return cb(err);
                cb(null, user);
            })
        })
    }
    return mongoose.model('User', userSchema)  
}