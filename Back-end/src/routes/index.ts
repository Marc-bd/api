import { Express } from "express";
import userRoutes from "./UserRoutes/userRoutes";
import sessionRoutes from "./SessionRoutes/sessionRoutes";
import carRoutes from "./CarRoutes/carRoutes";

export const AppRoutes = (app: Express) => {
	app.use("/users", userRoutes);
	app.use("/login", sessionRoutes);
	app.use("/cars", carRoutes);
};
