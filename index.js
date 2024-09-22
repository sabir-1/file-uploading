const path = require("path")
const express = require("express");
const multer = require('multer')


const app = express()
const PORT = 8000

//multer storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})
 

//multer upload
const upload = multer({ storage: storage })

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

//Middleware
app.use(express.urlencoded({ extended: false }));

//Router
app.get("/", (req, res) => {
    return res.render("home")
})
app.post("/upload", upload.single("profileImage"), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    return res.redirect("/")
})
  




//Local Host
app.listen(PORT, () => console.log(`Server Started At THIS PORT:8000`))
