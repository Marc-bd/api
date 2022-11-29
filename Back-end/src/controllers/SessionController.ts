import { UserModel } from "../Model/User/User";
import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class SessionController {
	static async login(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<any> {
		const { email, password } = req.body;

		if (!email) {
			return res.status(400).json({
				error: "Email is required field",
			});
		}

		if (!password) {
			return res.status(400).json({
				error: "password is required field",
			});
		}

		const user = await UserModel.findOne({ email: email });

		if (!user) {
			return res.status(404).json({
				message: "User does not exist",
			});
		}

		const checkPassword = await bcryptjs.compare(password, user.password);

		if (!checkPassword) {
			return res.status(404).json({
				message: "Invalid password",
			});
		}

		try {
			const secret: string = process.env.SECRET_KEY || "0";

			const token = jwt.sign(
				{
					id: user._id,
				},
				secret,
				{
					expiresIn: "24h",
				}
			);

			return res.status(200).json({ token: token });
		} catch (error) {
			next(error);
		}
	}
}

export { SessionController };
