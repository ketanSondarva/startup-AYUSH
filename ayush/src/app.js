const express = require("express")
const path = require("path")
const hbs = require("hbs")
const app = express()
const port = 3000

require("./db/conn") 
const Register = require("./model/registers")

const static_path = path.join(__dirname,"../public")
app.use(express.static(static_path))

app.set("view engine","hbs")

app.get("/",(req,res) => {
    res.render("index")
})

app.get("/about",(req,res) => {
    res.render("about")
})

app.get("/contact",(req,res) => {
    res.render("contact")
})

app.get("/signup",(req,res) => {
    res.render("signup")
})

app.get("/login" ,(req,res) => {
    res.render("login")
})

app.get("/ayurveda" ,(req,res) => {
    res.render("ayurveda")
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.post("/signup",async(req,res) => {
    try {
        const password = req.body.password
        const confirmpass = req.body.confirmpass
        const email = req.body.email
        const phone = req.body.phone
    
        if(password === confirmpass)
        {
              const registerdata = new Register({
                      usertype : req.body.usertype,
                      name : req.body.name,
                      occupation : req.body.occupation,
                      email : email,
                      phone : phone,
                      password : password,
                      confirmpass : confirmpass,
                      gender : req.body.gender
              })
            const registered = await registerdata.save()
            res.status(201).render("login")
        }
        else
        {
            res.send("password are not matching")
        }

 } catch(error){
    res.status(400).send(error)
 }
       
})

app.post("/login",async(req,res) => {
    try {
        const uemail = req.body.email
        const upassword = req.body.password

        const userdata = await Register.findOne({email:uemail}) 

        if(userdata.password === upassword)
        {
            res.status(201).render("ayurveda")
        }
        else{
            res.send("Invalid Password")
        }

 } catch(error){
    res.status(400).send("Invalid Email")
 }
       
})

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})