const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require('./routes/userRouter');
const studentRouter = require('./routes/studentRouter')
const attenRouter = require('./routes/attenRouter')
const { errorHnadler, notFound } = require("./middlewares/errorMiddleware");

dotenv.config()
connectDB();

app.use(cors({
    origin:'*',
}));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/student", studentRouter);
app.use("/api/atten", attenRouter);

app.use(notFound);
app.use(errorHnadler);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`server is running at 3003`);
})