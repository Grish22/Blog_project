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

// ✅ CORS
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://adorable-madeleine-57d55d.netlify.app"
    ],
    credentials: true
}));

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// ✅ ENV VARIABLES
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 5000;

// ✅ Session Store
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
        secure: true,
        sameSite: "none"
    }
}));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/host', hostRouter);

// ✅ DB Connection
mongoose.connect(MONGO_DB_URL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => console.log(err));
