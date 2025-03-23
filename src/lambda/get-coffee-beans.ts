import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  getAllCoffeeBeans,
  getCoffeeBeanById,
} from '../services/coffee-bean-service';
import {
  generateErrorResponse,
  generateSuccessResponse,
} from '../utils/api-response';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;

    if (id) {
      // Get a specific coffee bean
      const coffeeBean = await getCoffeeBeanById(id);

      if (!coffeeBean) {
        return generateErrorResponse(404, 'Coffee bean not found');
      }

      // Don't return soft deleted beans
      if (coffeeBean.deletedAt) {
        return generateErrorResponse(404, 'Coffee bean not found');
      }

      return generateSuccessResponse(200, coffeeBean);
    } else {
      // Get all coffee beans
      const coffeeBeans = await getAllCoffeeBeans();

      return generateSuccessResponse(200, coffeeBeans);
    }
  } catch (error) {
    console.error('Error fetching coffee beans:', error);

    return generateErrorResponse(500, 'Internal server error');
  }
};
