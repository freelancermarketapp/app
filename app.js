const express = require('express');
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
var flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require("./routes/pageRoutes");
const jobRoute = require("./routes/jobRoute");
const freelancerRoute = require("./routes/freelancerRoute");
const blogRoute = require("./routes/blogRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");



const app = express();

//Connect DB
mongoose
  .connect('mongodb://localhost:27017/freelance-db',/* {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true, 
  }*/)
  .then(() => {
    console.log('DB Connected Successfully');
  });

//Template Engine
app.set("view engine", "ejs");

//Global Variable
global.userIN = null;

//Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/freelance-db' })
}));

app.use(flash());
app.use((req,res,next)=> {
  res.locals.flashMessages = req.flash();
  next();
})

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
//Routes
app.use('*',(req,res,next)=>{
  userIN = req.session.userID;
  next();
})
app.use("/", pageRoute);
app.use("/jobs", jobRoute);
app.use("/freelancers", freelancerRoute);
app.use("/blogs", blogRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

