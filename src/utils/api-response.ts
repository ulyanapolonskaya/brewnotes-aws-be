import { APIGatewayProxyResult } from 'aws-lambda';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

/**
 * Generate an error response for API Gateway
 */
export const generateErrorResponse = (
  statusCode: number,
  message: string,
  headers: Record<string, string> = DEFAULT_HEADERS
): APIGatewayProxyResult => {
  return {
    statusCode,
    headers,
    body: JSON.stringify({ message }),
  };
};

/**
 * Generate a success response for API Gateway
 */
export const generateSuccessResponse = (
  statusCode: number,
  data: any,
  headers: Record<string, string> = DEFAULT_HEADERS
): APIGatewayProxyResult => {
  return {
    statusCode,
    headers,
    body: JSON.stringify(data),
  };
};
