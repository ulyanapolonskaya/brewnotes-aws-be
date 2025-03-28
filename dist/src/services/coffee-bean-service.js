"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoffeeBean = exports.createCoffeeBean = exports.getCoffeeBeanById = exports.getAllCoffeeBeans = void 0;
const uuid_1 = require("uuid");
const dynamodb_1 = require("../utils/dynamodb");
const TABLE_NAME = process.env.COFFEE_BEANS_TABLE || 'CoffeeBeans';
async function getAllCoffeeBeans() {
    const command = new dynamodb_1.ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: 'attribute_not_exists(deletedAt)',
    });
    const response = await dynamodb_1.docClient.send(command);
    return response.Items;
}
exports.getAllCoffeeBeans = getAllCoffeeBeans;
async function getCoffeeBeanById(id) {
    const command = new dynamodb_1.GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
    });
    const response = await dynamodb_1.docClient.send(command);
    return response.Item || null;
}
exports.getCoffeeBeanById = getCoffeeBeanById;
async function createCoffeeBean(request) {
    const now = new Date().toISOString();
    const coffeeBean = {
        id: (0, uuid_1.v4)(),
        name: request.name,
        description: request.description,
        rating: request.rating,
        createdAt: now,
    };
    const command = new dynamodb_1.PutCommand({
        TableName: TABLE_NAME,
        Item: coffeeBean,
    });
    await dynamodb_1.docClient.send(command);
    return coffeeBean;
}
exports.createCoffeeBean = createCoffeeBean;
async function deleteCoffeeBean(id) {
    const now = new Date().toISOString();
    // Soft delete by updating the deletedAt field
    const command = new dynamodb_1.UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: 'SET deletedAt = :deletedAt',
        ExpressionAttributeValues: {
            ':deletedAt': now,
        },
        ReturnValues: 'ALL_NEW',
    });
    try {
        const response = await dynamodb_1.docClient.send(command);
        return !!response.Attributes;
    }
    catch (error) {
        console.error('Error deleting coffee bean:', error);
        return false;
    }
}
exports.deleteCoffeeBean = deleteCoffeeBean;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29mZmVlLWJlYW4tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9jb2ZmZWUtYmVhbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUFvQztBQUNwQyxnREFPMkI7QUFHM0IsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSxhQUFhLENBQUM7QUFFNUQsS0FBSyxVQUFVLGlCQUFpQjtJQUNyQyxNQUFNLE9BQU8sR0FBRyxJQUFJLHNCQUFXLENBQUM7UUFDOUIsU0FBUyxFQUFFLFVBQVU7UUFDckIsZ0JBQWdCLEVBQUUsaUNBQWlDO0tBQ3BELENBQUMsQ0FBQztJQUVILE1BQU0sUUFBUSxHQUFHLE1BQU0sb0JBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsT0FBTyxRQUFRLENBQUMsS0FBcUIsQ0FBQztBQUN4QyxDQUFDO0FBUkQsOENBUUM7QUFFTSxLQUFLLFVBQVUsaUJBQWlCLENBQ3JDLEVBQVU7SUFFVixNQUFNLE9BQU8sR0FBRyxJQUFJLHFCQUFVLENBQUM7UUFDN0IsU0FBUyxFQUFFLFVBQVU7UUFDckIsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFO0tBQ1osQ0FBQyxDQUFDO0lBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTSxvQkFBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxPQUFRLFFBQVEsQ0FBQyxJQUFtQixJQUFJLElBQUksQ0FBQztBQUMvQyxDQUFDO0FBVkQsOENBVUM7QUFFTSxLQUFLLFVBQVUsZ0JBQWdCLENBQ3BDLE9BQWdDO0lBRWhDLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckMsTUFBTSxVQUFVLEdBQWU7UUFDN0IsRUFBRSxFQUFFLElBQUEsU0FBTSxHQUFFO1FBQ1osSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1FBQ2xCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztRQUNoQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07UUFDdEIsU0FBUyxFQUFFLEdBQUc7S0FDZixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsSUFBSSxxQkFBVSxDQUFDO1FBQzdCLFNBQVMsRUFBRSxVQUFVO1FBQ3JCLElBQUksRUFBRSxVQUFVO0tBQ2pCLENBQUMsQ0FBQztJQUVILE1BQU0sb0JBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQW5CRCw0Q0FtQkM7QUFFTSxLQUFLLFVBQVUsZ0JBQWdCLENBQUMsRUFBVTtJQUMvQyxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRXJDLDhDQUE4QztJQUM5QyxNQUFNLE9BQU8sR0FBRyxJQUFJLHdCQUFhLENBQUM7UUFDaEMsU0FBUyxFQUFFLFVBQVU7UUFDckIsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQ1gsZ0JBQWdCLEVBQUUsNEJBQTRCO1FBQzlDLHlCQUF5QixFQUFFO1lBQ3pCLFlBQVksRUFBRSxHQUFHO1NBQ2xCO1FBQ0QsWUFBWSxFQUFFLFNBQVM7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsSUFBSTtRQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sb0JBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztLQUM5QjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRCxPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQztBQXJCRCw0Q0FxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7XG4gIGRvY0NsaWVudCxcbiAgUHV0Q29tbWFuZCxcbiAgU2NhbkNvbW1hbmQsXG4gIEdldENvbW1hbmQsXG4gIFVwZGF0ZUNvbW1hbmQsXG4gIERlbGV0ZUNvbW1hbmQsXG59IGZyb20gJy4uL3V0aWxzL2R5bmFtb2RiJztcbmltcG9ydCB7IENvZmZlZUJlYW4sIENyZWF0ZUNvZmZlZUJlYW5SZXF1ZXN0IH0gZnJvbSAnLi4vbW9kZWxzL2NvZmZlZS1iZWFuJztcblxuY29uc3QgVEFCTEVfTkFNRSA9IHByb2Nlc3MuZW52LkNPRkZFRV9CRUFOU19UQUJMRSB8fCAnQ29mZmVlQmVhbnMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxsQ29mZmVlQmVhbnMoKTogUHJvbWlzZTxDb2ZmZWVCZWFuW10+IHtcbiAgY29uc3QgY29tbWFuZCA9IG5ldyBTY2FuQ29tbWFuZCh7XG4gICAgVGFibGVOYW1lOiBUQUJMRV9OQU1FLFxuICAgIEZpbHRlckV4cHJlc3Npb246ICdhdHRyaWJ1dGVfbm90X2V4aXN0cyhkZWxldGVkQXQpJyxcbiAgfSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkb2NDbGllbnQuc2VuZChjb21tYW5kKTtcbiAgcmV0dXJuIHJlc3BvbnNlLkl0ZW1zIGFzIENvZmZlZUJlYW5bXTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvZmZlZUJlYW5CeUlkKFxuICBpZDogc3RyaW5nXG4pOiBQcm9taXNlPENvZmZlZUJlYW4gfCBudWxsPiB7XG4gIGNvbnN0IGNvbW1hbmQgPSBuZXcgR2V0Q29tbWFuZCh7XG4gICAgVGFibGVOYW1lOiBUQUJMRV9OQU1FLFxuICAgIEtleTogeyBpZCB9LFxuICB9KTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRvY0NsaWVudC5zZW5kKGNvbW1hbmQpO1xuICByZXR1cm4gKHJlc3BvbnNlLkl0ZW0gYXMgQ29mZmVlQmVhbikgfHwgbnVsbDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvZmZlZUJlYW4oXG4gIHJlcXVlc3Q6IENyZWF0ZUNvZmZlZUJlYW5SZXF1ZXN0XG4pOiBQcm9taXNlPENvZmZlZUJlYW4+IHtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICBjb25zdCBjb2ZmZWVCZWFuOiBDb2ZmZWVCZWFuID0ge1xuICAgIGlkOiB1dWlkdjQoKSxcbiAgICBuYW1lOiByZXF1ZXN0Lm5hbWUsXG4gICAgZGVzY3JpcHRpb246IHJlcXVlc3QuZGVzY3JpcHRpb24sXG4gICAgcmF0aW5nOiByZXF1ZXN0LnJhdGluZyxcbiAgICBjcmVhdGVkQXQ6IG5vdyxcbiAgfTtcblxuICBjb25zdCBjb21tYW5kID0gbmV3IFB1dENvbW1hbmQoe1xuICAgIFRhYmxlTmFtZTogVEFCTEVfTkFNRSxcbiAgICBJdGVtOiBjb2ZmZWVCZWFuLFxuICB9KTtcblxuICBhd2FpdCBkb2NDbGllbnQuc2VuZChjb21tYW5kKTtcbiAgcmV0dXJuIGNvZmZlZUJlYW47XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVDb2ZmZWVCZWFuKGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gIC8vIFNvZnQgZGVsZXRlIGJ5IHVwZGF0aW5nIHRoZSBkZWxldGVkQXQgZmllbGRcbiAgY29uc3QgY29tbWFuZCA9IG5ldyBVcGRhdGVDb21tYW5kKHtcbiAgICBUYWJsZU5hbWU6IFRBQkxFX05BTUUsXG4gICAgS2V5OiB7IGlkIH0sXG4gICAgVXBkYXRlRXhwcmVzc2lvbjogJ1NFVCBkZWxldGVkQXQgPSA6ZGVsZXRlZEF0JyxcbiAgICBFeHByZXNzaW9uQXR0cmlidXRlVmFsdWVzOiB7XG4gICAgICAnOmRlbGV0ZWRBdCc6IG5vdyxcbiAgICB9LFxuICAgIFJldHVyblZhbHVlczogJ0FMTF9ORVcnLFxuICB9KTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZG9jQ2xpZW50LnNlbmQoY29tbWFuZCk7XG4gICAgcmV0dXJuICEhcmVzcG9uc2UuQXR0cmlidXRlcztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZWxldGluZyBjb2ZmZWUgYmVhbjonLCBlcnJvcik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=