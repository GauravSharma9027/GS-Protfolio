const express = require('express');
const app = express();
// .env
const dotenv = require('dotenv');// need to install dotenv package
dotenv.config({});
const PORT = process.env.PORT;

// cors config
const cors = require('cors');
// const corsOption = {
//     origin: process.env.corsOption,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     // Credentials: false
//     allowedHeaders: ["Content-Type"], 
// };
// app.use(cors(corsOption));
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongo db
const connectDB = require('./utils/connectionDB');
connectDB();
const { adminRegister } = require('./controllers/Admin/adminController');
// adminRegister();

// api banane ke lye Router require kiye hai routes se
const userRouter = require('./routes/user.route');
const sillRouter = require('./routes/skill.route');
const projectRouter = require('./routes/project.route');
const educationRouter = require('./routes/education.router');
const viewerContactRouter = require('./routes/viewerRoutes/viewerContact.router');
const adminRouter = require('./routes/Admin/admin.router');
// const adminRouter = require('./routes/Admin/admin.router');
// yaha per api banayi
app.use('/api/v1', userRouter);
app.use('/api/v1', sillRouter);
app.use('/api/v1', projectRouter);
app.use('/api/v1', educationRouter);
app.use('/api/v2', viewerContactRouter);
app.use('/api/v1', adminRouter)
// app.use('/api/v1', adminRouter)

app.listen(PORT, () => {
    try {
        console.log(`server is running successfully on ${PORT} port`);
    } catch (error) {
        console.log("Error in server running", error);
    }
})

