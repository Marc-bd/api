import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import "dotenv/config";

const handleAuthToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let token = req.headers.authorization;

	if (!token) {
		return res
			.status(401)
			.json({ error: "You need to be authenticated to access this route" });
	}

	token = token.split(" ")[1];

	jwt.verify(
		token,
		String(process.env.SECRET_KEY),
		(error: any, decoded: any) => {
			if (error) {
				return res.status(401).json({
					message: "Invalid token",
				});
			}

			req.user = {
				id: decoded.id,
			};

			next();
		}
	);
};

export { handleAuthToken };
