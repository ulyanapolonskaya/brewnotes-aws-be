export interface CoffeeBean {
    id: string;
    name: string;
    description: string;
    rating: number;
    createdAt: string;
    deletedAt?: string;
}
export interface CreateCoffeeBeanRequest {
    name: string;
    description: string;
    rating: number;
}
export interface CoffeeBeanResponse {
    id: string;
    name: string;
    description: string;
    rating: number;
    createdAt: string;
    deletedAt?: string;
}
