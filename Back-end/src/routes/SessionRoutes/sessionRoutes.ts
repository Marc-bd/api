import { Router } from "express";
import { SessionController } from "../../controllers/SessionController";

const sessionRoutes = Router();

sessionRoutes.post("", SessionController.login);

export default sessionRoutes;
