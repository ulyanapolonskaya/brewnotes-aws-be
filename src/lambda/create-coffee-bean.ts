import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createCoffeeBean } from '../services/coffee-bean-service';
import { CreateCoffeeBeanRequest } from '../models/coffee-bean';
import {
  generateErrorResponse,
  generateSuccessResponse,
} from '../utils/api-response';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return generateErrorResponse(400, 'Request body is required');
    }

    const request = JSON.parse(event.body) as CreateCoffeeBeanRequest;

    // Validate request
    if (!request.name || !request.description || request.rating === undefined) {
      return generateErrorResponse(
        400,
        'Name, description, and rating are required fields'
      );
    }

    // Validate rating is between 0 and 5
    if (request.rating < 0 || request.rating > 5) {
      return generateErrorResponse(400, 'Rating must be between 0 and 5');
    }

    const coffeeBean = await createCoffeeBean(request);

    return generateSuccessResponse(201, coffeeBean);
  } catch (error) {
    console.error('Error creating coffee bean:', error);

    return generateErrorResponse(500, 'Internal server error');
  }
};
