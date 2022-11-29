export interface CarRequest {
	brand: string;
	model: string;
	name: string;
	yearOfFabrication: string;
	chassis: string;
	color: string;
}
export interface CarReturn {
	id: object;
	brand: string;
	model: string;
	name: string;
	yearOfFabrication: string;
	chassis: string;
	color: string;
	_v: number;
}

export interface CarSearch {
	brand?: string;
	model?: string;
	name?: string;
}
