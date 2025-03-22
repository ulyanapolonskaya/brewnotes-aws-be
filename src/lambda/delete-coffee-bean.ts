import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  deleteCoffeeBean,
  getCoffeeBeanById,
} from '../services/coffee-bean-service';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Coffee bean ID is required' }),
      };
    }

    // Check if coffee bean exists
    const existingBean = await getCoffeeBeanById(id);
    if (!existingBean) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Coffee bean not found' }),
      };
    }

    // Already deleted?
    if (existingBean.deletedAt) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Coffee bean not found' }),
      };
    }

    const result = await deleteCoffeeBean(id);

    if (!result) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ message: 'Failed to delete coffee bean' }),
      };
    }

    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: '',
    };
  } catch (error) {
    console.error('Error deleting coffee bean:', error);

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
