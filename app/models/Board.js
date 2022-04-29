export default function BoardModel(mongoose){ 

    const userSchema = mongoose.Schema({
        title: String, 
        name: String, 
        teamId: String, 
        subject: String
    })

    return mongoose.model('Board', userSchema)  
}