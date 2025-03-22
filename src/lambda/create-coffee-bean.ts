import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createCoffeeBean } from '../services/coffee-bean-service';
import { CreateCoffeeBeanRequest } from '../models/coffee-bean';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Request body is required' }),
      };
    }

    const request = JSON.parse(event.body) as CreateCoffeeBeanRequest;

    // Validate request
    if (!request.name || !request.description || request.rating === undefined) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: 'Name, description, and rating are required fields',
        }),
      };
    }

    // Validate rating is between 0 and 5
    if (request.rating < 0 || request.rating > 5) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Rating must be between 0 and 5' }),
      };
    }

    const coffeeBean = await createCoffeeBean(request);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(coffeeBean),
    };
  } catch (error) {
    console.error('Error creating coffee bean:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
