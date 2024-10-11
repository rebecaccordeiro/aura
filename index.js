import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { dirname} from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

var userIsValid = false;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.static("public"));

function passwordCheck(req, res, next) {
    const passwordTest = req.body["passwordInput"];
    if (passwordTest === "SENHA") {
        userIsValid = true;
    }
    next();
}
app.use(passwordCheck);

app.get("/", (req, res) => {
    res.render("login.ejs");
});

app.post("/login", (req, res) => {
    console.log(req.body);
    if(userIsValid) {
        res.render("index.ejs");
    } else {
        res.render("login.ejs");
    }
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
})

app.post("/register", (req, res) => {
    console.log(req.body);
})

app.get("/board", (req, res) => {
    res.render("board.ejs");
});

app.get("/home", (req, res) => {
    res.render("index.ejs");
});

app.get("/notifications", (resq, res) => {
    res.render("notifications.ejs");
});

app.get("/profile", (resq, res) => {
    res.render("profile.ejs");
});

app.get("/configurations", (resq, res) => {
    res.render("configurations.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
