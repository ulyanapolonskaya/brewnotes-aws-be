import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  getAllCoffeeBeans,
  getCoffeeBeanById,
} from '../services/coffee-bean-service';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;

    if (id) {
      // Get a specific coffee bean
      const coffeeBean = await getCoffeeBeanById(id);

      if (!coffeeBean) {
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ message: 'Coffee bean not found' }),
        };
      }

      // Don't return soft deleted beans
      if (coffeeBean.deletedAt) {
        return {
          statusCode: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ message: 'Coffee bean not found' }),
        };
      }

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(coffeeBean),
      };
    } else {
      // Get all coffee beans
      const coffeeBeans = await getAllCoffeeBeans();

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(coffeeBeans),
      };
    }
  } catch (error) {
    console.error('Error fetching coffee beans:', error);

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
