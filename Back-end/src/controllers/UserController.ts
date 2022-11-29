import { UserModel } from "../Model/User/User";
import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";

class UserController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, username, password } = req.body;

			const userAlreadyExist = await UserModel.findOne({ email: email });

			if (userAlreadyExist) {
				return res.status(400).json({
					message: "User alrady Exist",
				});
			}

			const hashpassword = bcryptjs.hashSync(password, 10);

			const userCreated = await UserModel.create({
				username,
				email,
				password: String(hashpassword),
			});

			return res.status(201).json({ userCreated });
		} catch (error) {
			next(error);
		}
	}

	static async update(req: Request, res: Response): Promise<Object> {
		try {
			const { id } = req.params;

			console.log(req.user);

			const { email } = req.body;

			const emailAlreadyRegistred = await UserModel.findOne({ email: email });

			if (emailAlreadyRegistred) {
				return res.status(400).json({
					message: "Email Already used, try another",
				});
			}

			const user = await UserModel.findByIdAndUpdate(id, req.body);

			if (!user) {
				return res.status(404).json({
					error: "User not found",
				});
			}

			const returnUser = await UserModel.findById(id);

			return res.status(200).json(returnUser);
		} catch (error) {
			return res.status(500).json({
				error: "Internal server error",
			});
		}
	}

	static async delete(req: Request, res: Response): Promise<any> {
		try {
			const { id } = req.params;

			const user = await UserModel.findByIdAndDelete(id);

			if (!user) {
				return res.status(404).json({
					error: "User not found",
				});
			}

			return res.status(200).json({ message: "User deleted" });
		} catch (error) {
			return res.status(500).json({
				error: "Internal server error",
			});
		}
	}
}

export default UserController;
