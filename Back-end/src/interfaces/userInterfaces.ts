export interface UserRequest {
	username: string;
	email: string;
	password: string;
	createdAt?: Date;
}

export interface UserReturn {
	id: object;
	username: string;
	email: string;
	password: string;
	createdAt?: Date;
	__v: number;
}
