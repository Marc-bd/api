import { Router } from "express";

import UserController from "./../../controllers/UserController";
import { handleAuthToken } from "../../middlewares/HandleAuthToken";
const userRoutes = Router();

userRoutes.post("", UserController.create);
userRoutes.patch("/:id", handleAuthToken, UserController.update);
userRoutes.delete("/:id", handleAuthToken, UserController.delete);

export default userRoutes;
