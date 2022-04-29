const applyDotenv = dotenv => {
    dotenv.config()
    return {
        mongoUrl : process.env.MONGO_URI,
        port : process.env.PORT,
        jwtSecret : process.env.JWT_SECERT,
        origin : process.env.ORIGIN
    }
}
export default applyDotenv