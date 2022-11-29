import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import ErrorResponse from "../utils/errorResponse";

const handleError = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let error = { ...err };
	error.message = err.message;

	if (err.name === "CastError") {
		const message = "Ressource not found";
		error = new ErrorResponse(message, 404);
	}

	if (err.code === 11000) {
		const message = "Duplicate field value entered";
		error = new ErrorResponse(message, 400);
	}

	if (err.name === "ValidationError") {
		const message = Object.values(err.errors).map(
			(value: any) => value.message
		);
		error = new ErrorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		error: error.message || "Server Error",
	});
};

export default handleError;
