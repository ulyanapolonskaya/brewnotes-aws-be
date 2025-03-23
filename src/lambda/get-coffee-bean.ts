import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getCoffeeBeanById } from '../services/coffee-bean-service';
import {
  generateErrorResponse,
  generateSuccessResponse,
} from '../utils/api-response';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Extract coffee bean ID from path parameters
    const beanId = event.pathParameters?.id;

    if (!beanId) {
      return generateErrorResponse(400, 'Coffee bean ID is required');
    }

    const coffeeBean = await getCoffeeBeanById(beanId);

    if (!coffeeBean) {
      return generateErrorResponse(404, 'Coffee bean not found');
    }

    return generateSuccessResponse(200, coffeeBean);
  } catch (error) {
    console.error('Error getting coffee bean:', error);

    return generateErrorResponse(500, 'Internal server error');
  }
};
