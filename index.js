import express from "express";
import { engine as exphbs } from "express-handlebars";
import session from "express-session";
import FileStoreConstructor from 'session-file-store';
import bodyParser from "body-parser";
import morgan from "morgan";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from './db/conn.js';
import os from "os";
import flash from "express-flash";

// Models
import User from './models/User.js';
import Ngo from './models/Ngo.js';
import Job from './models/Job.js';

// Import Routes
import userRoutes from './routes/userRoutes.js';
import ngoRoutes from './routes/ngoRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Import Controllers
import JobController from "./controllers/JobController.js";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const FileStore = FileStoreConstructor(session);

sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}.`);
        });
    })
    .catch(error => console.error('Erro ao sincronizar modelos:', error));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var userIsValid = false;

app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.json())
app.use(express.static("public"));

app.use(session({
    name: "session",
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => {},
      path: path.join(os.tmpdir(), 'session'),
    }),
    cookie: { 
      secure: false, 
      maxAge: 360000, 
      expires: new Date(Date.now() + 360000), 
      httpOnly: true 
    }
  }));

app.use(flash());

app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

// Routes
app.use('/users', userRoutes);
app.use('/ngos', ngoRoutes);
app.use('/jobs', jobRoutes);
app.use('/2', authRoutes);
//app.get('/', JobController.showJobs);

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