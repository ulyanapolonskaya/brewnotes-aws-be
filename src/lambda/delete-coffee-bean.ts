import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { deleteCoffeeBean } from '../services/coffee-bean-service';
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

    await deleteCoffeeBean(beanId);

    // Return 204 No Content for successful deletion
    return generateSuccessResponse(204, null);
  } catch (error) {
    console.error('Error deleting coffee bean:', error);

    return generateErrorResponse(500, 'Internal server error');
  }
};
