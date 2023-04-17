import dotenv from "dotenv"

dotenv.config()

const config = {
    
    Cloud_Name: process.env.cloud_name,
    Api_Key: process.env.api_key,
    Api_Secret: process.env.api_secret,
    
}

export default config