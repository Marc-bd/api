import express from "express";
import { AppRoutes } from "./routes";
import mongoose from "mongoose";
import handleError from "./middlewares/HandleError";
const cors = require("cors");

const app = express();
mongoose.connect(
	"mongodb+srv://testelogikee:logikee123@cluster0.mvunzz1.mongodb.net/?retryWrites=true&w=majority"
);

app.use(express.json());

AppRoutes(app);
app.use(cors({ origin: ["http://localhost:3000/"] }));

app.use(handleError);
app.listen(3333, () => {
	console.log("Server is Running!!!");
});
