import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, ScanCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
declare const docClient: DynamoDBDocumentClient;
export { docClient, PutCommand, GetCommand, QueryCommand, ScanCommand, UpdateCommand, DeleteCommand, };
