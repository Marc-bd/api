import { Router } from "express";
import CarController from "../../controllers/CarsController";
import { handleAuthToken } from "../../middlewares/HandleAuthToken";

const carRoutes = Router();

carRoutes.post("", handleAuthToken, CarController.create);
carRoutes.get("", handleAuthToken, CarController.list);
carRoutes.get("/properties", handleAuthToken, CarController.getCarByProperty);
carRoutes.patch("/:id", handleAuthToken, CarController.update);
carRoutes.delete("/:id", handleAuthToken, CarController.delete);
export default carRoutes;
