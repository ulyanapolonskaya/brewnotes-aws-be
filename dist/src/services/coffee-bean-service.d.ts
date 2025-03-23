import { CoffeeBean, CreateCoffeeBeanRequest } from '../models/coffee-bean';
export declare function getAllCoffeeBeans(): Promise<CoffeeBean[]>;
export declare function getCoffeeBeanById(id: string): Promise<CoffeeBean | null>;
export declare function createCoffeeBean(request: CreateCoffeeBeanRequest): Promise<CoffeeBean>;
export declare function deleteCoffeeBean(id: string): Promise<boolean>;
