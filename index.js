import  express  from "express";
import expressfileupload from "express-fileupload";
import config from "./config";

import cloudinary from "cloudinary";
const fileUpload = expressfileupload();
const cloudinaryAPI = cloudinary().v2;
const app = express();
// passing the clodinary credentials
cloudinaryAPI.config({
    cloud_name: config.Cloud_Name,
    api_key: config.Api_Key,
    api_secret: config.Api_Secret,
  });
//   its template engine =>send html code as a response
app.set("view engine", "ejs");
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// creating temp file path without using memory
// Use temp files instead of memory for managing the upload process.
// https://www.npmjs.com/package/express-fileupload
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );