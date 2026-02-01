const express = require('express');
const authRouter = require("./routes/authroutes");
const userRouter = require("./routes/userroutes");
const hostRouter = require("./routes/hostroutes");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require("express-session");
const cors = require('cors');
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

// CORS
const allowedOrigins = [
    "http://localhost:5173",
    "https://adorable-madeleine-57d55d.netlify.app",
    "https://blog-project-2-w6lr.onrender.com",
];
if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL);

app.use(cors({
    origin: function(origin, callback) {
        // allow requests with no origin (e.g. mobile apps, curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy: This origin is not allowed'));
        }
    },
    credentials: true
}));

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// ENV VARIABLES
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 5000;

// Session Store
const store = new MongoDBStore({
    uri: MONGO_DB_URL,
    collection: "sessions"
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    name: 'sessionId',
    proxy: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/host', hostRouter);

//  DB Connection
mongoose.connect(MONGO_DB_URL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => console.log(err));
