import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const config = {
    
    Cloud_Name: process.env.cloud_name,
    Api_Key: process.env.api_key,
    Api_Secret: process.env.api_secret,
    
}

export default config