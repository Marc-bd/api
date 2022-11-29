import { Request, Response, NextFunction } from "express";

import { CarRequest, CarSearch } from "../interfaces/carinterfaces";
import { CarModel } from "../Model/Cars/Cars";

class CarController {
	static async create(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Object | undefined> {
		try {
			const {
				brand,
				color,
				model,
				chassis,
				name,
				yearOfFabrication,
			}: CarRequest = req.body;

			const carAlreadyExist = await CarModel.findOne({ chassis });

			if (carAlreadyExist) {
				return res.status(400).json({
					message: "Car already exist",
				});
			}

			const createdCar = await CarModel.create(req.body);

			return res.status(201).json({ createdCar });
		} catch (error) {
			next(error);
		}
	}

	static async list(req: Request, res: Response): Promise<Object> {
		const cars = await CarModel.find();

		return res.status(200).json(cars);
	}

	static async getCarByProperty(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Object | undefined> {
		try {
			const car = await CarModel.find(req.body);

			if (!car) {
				return res.status(400).json({
					message: "Not found based on passed parameters",
				});
			}

			return res.status(200).json(car);
		} catch (error) {
			next(error);
		}
	}

	static async update(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Object | undefined> {
		try {
			const { id } = req.params;

			const car = await CarModel.findByIdAndUpdate(id, req.body);

			if (!car) {
				return res.status(404).json({
					error: "Car not found",
				});
			}

			const carUpdated = await CarModel.findById(id);

			return res.status(200).json({
				message: "Successfully changed data",
				UpdatedCar: carUpdated,
			});
		} catch (error) {
			next(error);
		}
	}

	static async delete(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<object | undefined> {
		try {
			const { id } = req.params;

			const car = await CarModel.findByIdAndDelete(id);

			if (!car) {
				return res.status(404).json({
					error: "Car not found",
				});
			}

			return res.status(200).json({
				message: "Carro deletado com sucesso",
			});
		} catch (error) {
			next(error);
		}
	}
}

export default CarController;
