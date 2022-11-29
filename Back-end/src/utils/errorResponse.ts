class ErrorResponse extends Error {
	statusCode: number = 0;

	constructor(message: any, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export default ErrorResponse;
