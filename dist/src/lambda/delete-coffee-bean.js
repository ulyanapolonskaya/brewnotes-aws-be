"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const coffee_bean_service_1 = require("../services/coffee-bean-service");
const api_response_1 = require("../utils/api-response");
const handler = async (event) => {
    try {
        // Extract coffee bean ID from path parameters
        const beanId = event.pathParameters?.id;
        if (!beanId) {
            return (0, api_response_1.generateErrorResponse)(400, 'Coffee bean ID is required');
        }
        await (0, coffee_bean_service_1.deleteCoffeeBean)(beanId);
        // Return 204 No Content for successful deletion
        return (0, api_response_1.generateSuccessResponse)(204, null);
    }
    catch (error) {
        console.error('Error deleting coffee bean:', error);
        return (0, api_response_1.generateErrorResponse)(500, 'Internal server error');
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNvZmZlZS1iZWFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xhbWJkYS9kZWxldGUtY29mZmVlLWJlYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUVBQW1FO0FBQ25FLHdEQUcrQjtBQUV4QixNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQzFCLEtBQTJCLEVBQ0ssRUFBRTtJQUNsQyxJQUFJO1FBQ0YsOENBQThDO1FBQzlDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO1FBRXhDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUEsb0NBQXFCLEVBQUMsR0FBRyxFQUFFLDRCQUE0QixDQUFDLENBQUM7U0FDakU7UUFFRCxNQUFNLElBQUEsc0NBQWdCLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0IsZ0RBQWdEO1FBQ2hELE9BQU8sSUFBQSxzQ0FBdUIsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDM0M7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEQsT0FBTyxJQUFBLG9DQUFxQixFQUFDLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0tBQzVEO0FBQ0gsQ0FBQyxDQUFDO0FBcEJXLFFBQUEsT0FBTyxXQW9CbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSAnYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBkZWxldGVDb2ZmZWVCZWFuIH0gZnJvbSAnLi4vc2VydmljZXMvY29mZmVlLWJlYW4tc2VydmljZSc7XG5pbXBvcnQge1xuICBnZW5lcmF0ZUVycm9yUmVzcG9uc2UsXG4gIGdlbmVyYXRlU3VjY2Vzc1Jlc3BvbnNlLFxufSBmcm9tICcuLi91dGlscy9hcGktcmVzcG9uc2UnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChcbiAgZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50XG4pOiBQcm9taXNlPEFQSUdhdGV3YXlQcm94eVJlc3VsdD4gPT4ge1xuICB0cnkge1xuICAgIC8vIEV4dHJhY3QgY29mZmVlIGJlYW4gSUQgZnJvbSBwYXRoIHBhcmFtZXRlcnNcbiAgICBjb25zdCBiZWFuSWQgPSBldmVudC5wYXRoUGFyYW1ldGVycz8uaWQ7XG5cbiAgICBpZiAoIWJlYW5JZCkge1xuICAgICAgcmV0dXJuIGdlbmVyYXRlRXJyb3JSZXNwb25zZSg0MDAsICdDb2ZmZWUgYmVhbiBJRCBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIGF3YWl0IGRlbGV0ZUNvZmZlZUJlYW4oYmVhbklkKTtcblxuICAgIC8vIFJldHVybiAyMDQgTm8gQ29udGVudCBmb3Igc3VjY2Vzc2Z1bCBkZWxldGlvblxuICAgIHJldHVybiBnZW5lcmF0ZVN1Y2Nlc3NSZXNwb25zZSgyMDQsIG51bGwpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRlbGV0aW5nIGNvZmZlZSBiZWFuOicsIGVycm9yKTtcblxuICAgIHJldHVybiBnZW5lcmF0ZUVycm9yUmVzcG9uc2UoNTAwLCAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyk7XG4gIH1cbn07XG4iXX0=