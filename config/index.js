import dotenv from "dotenv"

dotenv.config()

export default {
    jwtSecret: process.env.JWT_SECRET,
    host: process.env.HOST,
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV
}
