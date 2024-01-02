const express = require("express")

const path = require("path")

const hbs = require("hbs")

const bodyParser = require("body-parser")

const nodemailer = require("nodemailer")  //install the package

const encoder = bodyParser.urlencoded()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "",//ENTER YOUR MAIL
        pass: "" //enter ur password
    }
})

const app = express()

app.use(express.static(path.join(__dirname, "views/public")))  

app.set("view engine", "hbs")

hbs.registerPartials(path.join(__dirname, "views/partials"))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.get("/service", (req, res) => {
    res.render("service")
})

app.get("/contact", (req, res) => {
    res.render("contact", { show: false })
})

app.post("/contact", encoder, (req, res) => {

    // mail to client
    let mailOptions = {
        from: "",  //enter ur mail
        to: req.body.email,
        subject: req.body.subject,
        html: `
                <h2>Thanks</h2>
                <h3>Your Query Recieved</h3>
                <h3>Our Team Will Contact You Soon</h3>
            `
    }
    transporter.sendMail(mailOptions, ((error) => {
        if (error) {
            console.log(error)
        }
    }))
    //mail to owner
    mailOptions = {
        from: "", //enter ur mail
        to: "", //enter ur mail
        subject: "New Query Recieved",
        html: `
                <h1>New Query Recieved</h1>
               <table class="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>${req.body.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${req.body.email}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>${req.body.phone}</td>
                        </tr>
                        <tr>
                            <th>Subject</th>
                            <td>${req.body.subject}</td>
                        </tr>
                        <tr>
                            <th>Message</th>
                            <td>${req.body.message}</td>
                        </tr>
                    </tbody>
               </table>
            `
    }
    transporter.sendMail(mailOptions, ((error) => {
        if (error) {
            console.log(error)
        }
    }))
    res.render("contact", { show: true })
})

app.listen(8000, console.log("Server is Running at http://localhost:8000"))