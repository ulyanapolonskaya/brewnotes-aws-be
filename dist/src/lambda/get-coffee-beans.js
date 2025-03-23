"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const coffee_bean_service_1 = require("../services/coffee-bean-service");
const api_response_1 = require("../utils/api-response");
const handler = async (event) => {
    try {
        const id = event.pathParameters?.id;
        if (id) {
            // Get a specific coffee bean
            const coffeeBean = await (0, coffee_bean_service_1.getCoffeeBeanById)(id);
            if (!coffeeBean) {
                return (0, api_response_1.generateErrorResponse)(404, 'Coffee bean not found');
            }
            // Don't return soft deleted beans
            if (coffeeBean.deletedAt) {
                return (0, api_response_1.generateErrorResponse)(404, 'Coffee bean not found');
            }
            return (0, api_response_1.generateSuccessResponse)(200, coffeeBean);
        }
        else {
            // Get all coffee beans
            const coffeeBeans = await (0, coffee_bean_service_1.getAllCoffeeBeans)();
            return (0, api_response_1.generateSuccessResponse)(200, coffeeBeans);
        }
    }
    catch (error) {
        console.error('Error fetching coffee beans:', error);
        return (0, api_response_1.generateErrorResponse)(500, 'Internal server error');
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvZmZlZS1iZWFucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYW1iZGEvZ2V0LWNvZmZlZS1iZWFucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5RUFHeUM7QUFDekMsd0RBRytCO0FBRXhCLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFDMUIsS0FBMkIsRUFDSyxFQUFFO0lBQ2xDLElBQUk7UUFDRixNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQztRQUVwQyxJQUFJLEVBQUUsRUFBRTtZQUNOLDZCQUE2QjtZQUM3QixNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUEsdUNBQWlCLEVBQUMsRUFBRSxDQUFDLENBQUM7WUFFL0MsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDZixPQUFPLElBQUEsb0NBQXFCLEVBQUMsR0FBRyxFQUFFLHVCQUF1QixDQUFDLENBQUM7YUFDNUQ7WUFFRCxrQ0FBa0M7WUFDbEMsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFO2dCQUN4QixPQUFPLElBQUEsb0NBQXFCLEVBQUMsR0FBRyxFQUFFLHVCQUF1QixDQUFDLENBQUM7YUFDNUQ7WUFFRCxPQUFPLElBQUEsc0NBQXVCLEVBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDTCx1QkFBdUI7WUFDdkIsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLHVDQUFpQixHQUFFLENBQUM7WUFFOUMsT0FBTyxJQUFBLHNDQUF1QixFQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUNsRDtLQUNGO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXJELE9BQU8sSUFBQSxvQ0FBcUIsRUFBQyxHQUFHLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztLQUM1RDtBQUNILENBQUMsQ0FBQztBQS9CVyxRQUFBLE9BQU8sV0ErQmxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQsIEFQSUdhdGV3YXlQcm94eVJlc3VsdCB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuaW1wb3J0IHtcbiAgZ2V0QWxsQ29mZmVlQmVhbnMsXG4gIGdldENvZmZlZUJlYW5CeUlkLFxufSBmcm9tICcuLi9zZXJ2aWNlcy9jb2ZmZWUtYmVhbi1zZXJ2aWNlJztcbmltcG9ydCB7XG4gIGdlbmVyYXRlRXJyb3JSZXNwb25zZSxcbiAgZ2VuZXJhdGVTdWNjZXNzUmVzcG9uc2UsXG59IGZyb20gJy4uL3V0aWxzL2FwaS1yZXNwb25zZSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKFxuICBldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnRcbik6IFByb21pc2U8QVBJR2F0ZXdheVByb3h5UmVzdWx0PiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgaWQgPSBldmVudC5wYXRoUGFyYW1ldGVycz8uaWQ7XG5cbiAgICBpZiAoaWQpIHtcbiAgICAgIC8vIEdldCBhIHNwZWNpZmljIGNvZmZlZSBiZWFuXG4gICAgICBjb25zdCBjb2ZmZWVCZWFuID0gYXdhaXQgZ2V0Q29mZmVlQmVhbkJ5SWQoaWQpO1xuXG4gICAgICBpZiAoIWNvZmZlZUJlYW4pIHtcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlRXJyb3JSZXNwb25zZSg0MDQsICdDb2ZmZWUgYmVhbiBub3QgZm91bmQnKTtcbiAgICAgIH1cblxuICAgICAgLy8gRG9uJ3QgcmV0dXJuIHNvZnQgZGVsZXRlZCBiZWFuc1xuICAgICAgaWYgKGNvZmZlZUJlYW4uZGVsZXRlZEF0KSB7XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUVycm9yUmVzcG9uc2UoNDA0LCAnQ29mZmVlIGJlYW4gbm90IGZvdW5kJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZW5lcmF0ZVN1Y2Nlc3NSZXNwb25zZSgyMDAsIGNvZmZlZUJlYW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBHZXQgYWxsIGNvZmZlZSBiZWFuc1xuICAgICAgY29uc3QgY29mZmVlQmVhbnMgPSBhd2FpdCBnZXRBbGxDb2ZmZWVCZWFucygpO1xuXG4gICAgICByZXR1cm4gZ2VuZXJhdGVTdWNjZXNzUmVzcG9uc2UoMjAwLCBjb2ZmZWVCZWFucyk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNvZmZlZSBiZWFuczonLCBlcnJvcik7XG5cbiAgICByZXR1cm4gZ2VuZXJhdGVFcnJvclJlc3BvbnNlKDUwMCwgJ0ludGVybmFsIHNlcnZlciBlcnJvcicpO1xuICB9XG59O1xuIl19