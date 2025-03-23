import { v4 as uuidv4 } from 'uuid';
import {
  docClient,
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from '../utils/dynamodb';
import { CoffeeBean, CreateCoffeeBeanRequest } from '../models/coffee-bean';

const TABLE_NAME = process.env.COFFEE_BEANS_TABLE || 'CoffeeBeans';

export async function getAllCoffeeBeans(): Promise<CoffeeBean[]> {
  const command = new ScanCommand({
    TableName: TABLE_NAME,
    FilterExpression: 'attribute_not_exists(deletedAt)',
  });

  const response = await docClient.send(command);
  return response.Items as CoffeeBean[];
}

export async function getCoffeeBeanById(
  id: string
): Promise<CoffeeBean | null> {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id },
  });

  const response = await docClient.send(command);
  return (response.Item as CoffeeBean) || null;
}

export async function createCoffeeBean(
  request: CreateCoffeeBeanRequest
): Promise<CoffeeBean> {
  const now = new Date().toISOString();
  const coffeeBean: CoffeeBean = {
    id: uuidv4(),
    name: request.name,
    description: request.description,
    rating: request.rating,
    createdAt: now,
  };

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: coffeeBean,
  });

  await docClient.send(command);
  return coffeeBean;
}

export async function deleteCoffeeBean(id: string): Promise<boolean> {
  const now = new Date().toISOString();

  // Soft delete by updating the deletedAt field
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'SET deletedAt = :deletedAt',
    ExpressionAttributeValues: {
      ':deletedAt': now,
    },
    ReturnValues: 'ALL_NEW',
  });

  try {
    const response = await docClient.send(command);
    return !!response.Attributes;
  } catch (error) {
    console.error('Error deleting coffee bean:', error);
    return false;
  }
}
