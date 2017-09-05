import dotenv from "dotenv"

dotenv.config()

export default {
    jwtSecret: process.env.JWT_SECRET || "secret-key",
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || "development"
}
