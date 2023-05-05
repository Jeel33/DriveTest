// packages
const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
//// npm install express-session --save
const flash = require('connect-flash');
//// npm install connect-flash --save

// import
const User = require('./models/user');
const authRouter = require('./routers/authRouter');
const driveTestRouter = require('./routers/driveTestRouter');
const examinerRouter = require("./routers/examinerRouter");

// connecting to database
mongoose.connect('mongodb+srv://admin:admin@cluster0.p845w8e.mongodb.net/drivetest?retryWrites=true&w=majority');
//// Create the database "blogapp" if it doesn't exist.
//// Need to change <password> to the real one you have set
app.listen(7777, () => {
	console.log("App is listening on port 7777");
});

// iniciallizing
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
	session({
		secret: 'canada drive test',
		resave: false,
		saveUninitialized: false
	})
);

// session
app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	};
	User.findById({ _id: req.session.user._id })
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => {
			console.log(err)
		})
});

// This middleware function is executed on every incoming request
// res.locals is an object that contains "response local variables" scoped to the request, meaning that they are available in the view templates rendered for the request.
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	res.locals.userType = req?.user?.userType;
	next();
});

// routers
app.use(authRouter);
app.use(examinerRouter);
app.use(driveTestRouter);

