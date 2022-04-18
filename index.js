const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const expressSession = require("express-session");

const getLanding = require("./controllers/getLanding");
const getGPage = require( "./controllers/getGPage");
const postGPage = require( "./controllers/postGPage");
const getG2Page = require( "./controllers/getG2Page");
//const postG2Page = require( "./controllers/postG2Page");
const getAppointment = require("./controllers/getAppointment");
const postAppointment = require("./controllers/postAppointment");
const bookAppointmentDate = require("./controllers/bookAppointmentDate");
const bookAppointmentTime = require("./controllers/bookAppointmentTime");
const getExaminer = require("./controllers/getExaminer");
const getProfile = require("./controllers/getProfile");
const postProfile = require("./controllers/postProfile");
const updateProfile = require("./controllers/updateProfile");
const getTestTaker = require("./controllers/getTestTaker");
const postTestTaker = require("./controllers/postTestTaker");

const getSignup = require( "./controllers/getSignup");
const postSignup = require( "./controllers/postSignup");
const getLogin = require( "./controllers/getLogin");
const postLogin = require( "./controllers/postLogin");
const getLogout = require( "./controllers/getLogout");
const getSuccess = require("./controllers/getSuccess");

const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");
const checkDriver = require("./middleware/checkDriver");
const checkAdmin = require("./middleware/checkAdmin");
const checkExaminer = require("./middleware/checkExaminer");
const getPassList = require("./controllers/getPassList");
const resetUser = require("./controllers/resetUser");


const app = new express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(fileUpload());
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

globalThis.loggedIn = null;
globalThis.userType = null;
app.use("*", (req, _res, next) => {
  loggedIn = req.session.Id;
  userType = req.session.userType;
  next();
});

mongoose.connect(
  "mongodb+srv://admin-gamik:admin123@cluster0.wx3yh.mongodb.net/kiosk?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get("/", getLanding);


app.get("/G_Page", authMiddleware, checkDriver, getGPage);

app.post("/G_Page", authMiddleware, checkDriver, postGPage);
app.post("/G_Page/BookAppointmentDate", authMiddleware, checkDriver, bookAppointmentDate);
app.post("/G_Page/BookAppointmentTime", authMiddleware, checkDriver, bookAppointmentTime);

app.get("/G2_Page", authMiddleware, checkDriver, getG2Page);


app.post("/G2_Page/BookAppointmentDate", authMiddleware, checkDriver, bookAppointmentDate);
app.post("/G2_Page/BookAppointmentTime", authMiddleware, checkDriver, bookAppointmentTime);

app.get("/Profile",authMiddleware , checkDriver, getProfile);
app.post("/Profile", authMiddleware, checkDriver, postProfile);
app.post("/Profile/update", authMiddleware, checkDriver, updateProfile );


app.get("/Appointment" , authMiddleware, checkAdmin, getAppointment);
app.post("/Appointment" , authMiddleware, checkAdmin, postAppointment); 
app.get("/PassList",authMiddleware, checkAdmin, getPassList);
app.get("/PassList/:userId/:testType",authMiddleware,checkAdmin, resetUser);

app.get("/Examiner" , authMiddleware, checkExaminer, getExaminer);
app.get("/TestTaker/:userId/:testType",checkExaminer,getTestTaker);
app.post("/TestTaker",checkExaminer,postTestTaker);

app.get("/Login", redirectIfAuthenticated, getLogin);

app.post("/Login", redirectIfAuthenticated, postLogin);

app.get("/Signup", redirectIfAuthenticated, getSignup);

app.post("/Signup", redirectIfAuthenticated, postSignup);

app.get("/success", getSuccess);

app.get("/logout", getLogout);

app.get('*', function(req, res){
  res.render("notFound");
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
