import express from "express";
import config from "./config.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";

const app = express();
// passing the clodinary credentials
const cloudinaryv2 = cloudinary.v2;

cloudinaryv2.config({
  cloud_name: config.Cloud_Name,
  api_key: config.Api_Key,
  api_secret: config.Api_Secret,
  secure: true,
});
//   its template engine =>send(render) html code as a response on ui
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

//routes for form action after click on submit button
app.get("/myget", (req, res) => {
  console.log(req.body);

  // res.send(req.body);// in react data is coming from body
  res.send(req.query);
  // ejs template engine is exception that data is coming from query
});
app.post("/mypost", async (req, res) => {
  console.log("mypost body", req.body);
  console.log("mypost file", req.files);
  //    // ### use case for single image
  let file = req.files.samplefile; //samplefile is name in form

  const result = await cloudinaryv2.uploader.upload(file.tempFilePath, {
    folder: "images", //images folder in cloudinary
  });

  console.log("result", result);

  // Generate
  const url = cloudinaryv2.url(result.public_id, {
    width: 100,
    height: 150,
    Crop: "fill",
  });

  // The output url
  console.log("image url", url);
  const UIdata = {
    body: req.body,
    imgurl: url,
  };

  res.send(UIdata);
});

// render the foems first using these routes => forms comes from views/getform.ejs
app.get("/getform", (req, res) => {
  res.render("getform");
});
app.get("/postform", (req, res) => {
  res.render("postform");
});

app.listen(4000, () => console.log(`Server is runnning at port 4000`));
