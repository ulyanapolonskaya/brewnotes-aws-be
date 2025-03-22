"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCommand = exports.UpdateCommand = exports.ScanCommand = exports.QueryCommand = exports.GetCommand = exports.PutCommand = exports.docClient = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
Object.defineProperty(exports, "PutCommand", { enumerable: true, get: function () { return lib_dynamodb_1.PutCommand; } });
Object.defineProperty(exports, "GetCommand", { enumerable: true, get: function () { return lib_dynamodb_1.GetCommand; } });
Object.defineProperty(exports, "QueryCommand", { enumerable: true, get: function () { return lib_dynamodb_1.QueryCommand; } });
Object.defineProperty(exports, "ScanCommand", { enumerable: true, get: function () { return lib_dynamodb_1.ScanCommand; } });
Object.defineProperty(exports, "UpdateCommand", { enumerable: true, get: function () { return lib_dynamodb_1.UpdateCommand; } });
Object.defineProperty(exports, "DeleteCommand", { enumerable: true, get: function () { return lib_dynamodb_1.DeleteCommand; } });
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
exports.docClient = docClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1vZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZHluYW1vZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOERBQTBEO0FBQzFELHdEQVErQjtBQU83QiwyRkFiQSx5QkFBVSxPQWFBO0FBQ1YsMkZBYkEseUJBQVUsT0FhQTtBQUNWLDZGQWJBLDJCQUFZLE9BYUE7QUFDWiw0RkFiQSwwQkFBVyxPQWFBO0FBQ1gsOEZBYkEsNEJBQWEsT0FhQTtBQUNiLDhGQWJBLDRCQUFhLE9BYUE7QUFWZixNQUFNLE1BQU0sR0FBRyxJQUFJLGdDQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEMsTUFBTSxTQUFTLEdBQUcscUNBQXNCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBR3BELDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHluYW1vREJDbGllbnQgfSBmcm9tICdAYXdzLXNkay9jbGllbnQtZHluYW1vZGInO1xuaW1wb3J0IHtcbiAgRHluYW1vREJEb2N1bWVudENsaWVudCxcbiAgUHV0Q29tbWFuZCxcbiAgR2V0Q29tbWFuZCxcbiAgUXVlcnlDb21tYW5kLFxuICBTY2FuQ29tbWFuZCxcbiAgVXBkYXRlQ29tbWFuZCxcbiAgRGVsZXRlQ29tbWFuZCxcbn0gZnJvbSAnQGF3cy1zZGsvbGliLWR5bmFtb2RiJztcblxuY29uc3QgY2xpZW50ID0gbmV3IER5bmFtb0RCQ2xpZW50KHt9KTtcbmNvbnN0IGRvY0NsaWVudCA9IER5bmFtb0RCRG9jdW1lbnRDbGllbnQuZnJvbShjbGllbnQpO1xuXG5leHBvcnQge1xuICBkb2NDbGllbnQsXG4gIFB1dENvbW1hbmQsXG4gIEdldENvbW1hbmQsXG4gIFF1ZXJ5Q29tbWFuZCxcbiAgU2NhbkNvbW1hbmQsXG4gIFVwZGF0ZUNvbW1hbmQsXG4gIERlbGV0ZUNvbW1hbmQsXG59O1xuIl19