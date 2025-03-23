"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const coffee_bean_service_1 = require("../services/coffee-bean-service");
const api_response_1 = require("../utils/api-response");
const handler = async (event) => {
    try {
        if (!event.body) {
            return (0, api_response_1.generateErrorResponse)(400, 'Request body is required');
        }
        const request = JSON.parse(event.body);
        // Validate request
        if (!request.name || !request.description || request.rating === undefined) {
            return (0, api_response_1.generateErrorResponse)(400, 'Name, description, and rating are required fields');
        }
        // Validate rating is between 0 and 5
        if (request.rating < 0 || request.rating > 5) {
            return (0, api_response_1.generateErrorResponse)(400, 'Rating must be between 0 and 5');
        }
        const coffeeBean = await (0, coffee_bean_service_1.createCoffeeBean)(request);
        return (0, api_response_1.generateSuccessResponse)(201, coffeeBean);
    }
    catch (error) {
        console.error('Error creating coffee bean:', error);
        return (0, api_response_1.generateErrorResponse)(500, 'Internal server error');
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNvZmZlZS1iZWFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xhbWJkYS9jcmVhdGUtY29mZmVlLWJlYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUVBQW1FO0FBRW5FLHdEQUcrQjtBQUV4QixNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQzFCLEtBQTJCLEVBQ0ssRUFBRTtJQUNsQyxJQUFJO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDZixPQUFPLElBQUEsb0NBQXFCLEVBQUMsR0FBRyxFQUFFLDBCQUEwQixDQUFDLENBQUM7U0FDL0Q7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQTRCLENBQUM7UUFFbEUsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN6RSxPQUFPLElBQUEsb0NBQXFCLEVBQzFCLEdBQUcsRUFDSCxtREFBbUQsQ0FDcEQsQ0FBQztTQUNIO1FBRUQscUNBQXFDO1FBQ3JDLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDNUMsT0FBTyxJQUFBLG9DQUFxQixFQUFDLEdBQUcsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO1NBQ3JFO1FBRUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFBLHNDQUFnQixFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRW5ELE9BQU8sSUFBQSxzQ0FBdUIsRUFBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDakQ7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEQsT0FBTyxJQUFBLG9DQUFxQixFQUFDLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0tBQzVEO0FBQ0gsQ0FBQyxDQUFDO0FBL0JXLFFBQUEsT0FBTyxXQStCbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSAnYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBjcmVhdGVDb2ZmZWVCZWFuIH0gZnJvbSAnLi4vc2VydmljZXMvY29mZmVlLWJlYW4tc2VydmljZSc7XG5pbXBvcnQgeyBDcmVhdGVDb2ZmZWVCZWFuUmVxdWVzdCB9IGZyb20gJy4uL21vZGVscy9jb2ZmZWUtYmVhbic7XG5pbXBvcnQge1xuICBnZW5lcmF0ZUVycm9yUmVzcG9uc2UsXG4gIGdlbmVyYXRlU3VjY2Vzc1Jlc3BvbnNlLFxufSBmcm9tICcuLi91dGlscy9hcGktcmVzcG9uc2UnO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChcbiAgZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50XG4pOiBQcm9taXNlPEFQSUdhdGV3YXlQcm94eVJlc3VsdD4gPT4ge1xuICB0cnkge1xuICAgIGlmICghZXZlbnQuYm9keSkge1xuICAgICAgcmV0dXJuIGdlbmVyYXRlRXJyb3JSZXNwb25zZSg0MDAsICdSZXF1ZXN0IGJvZHkgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gSlNPTi5wYXJzZShldmVudC5ib2R5KSBhcyBDcmVhdGVDb2ZmZWVCZWFuUmVxdWVzdDtcblxuICAgIC8vIFZhbGlkYXRlIHJlcXVlc3RcbiAgICBpZiAoIXJlcXVlc3QubmFtZSB8fCAhcmVxdWVzdC5kZXNjcmlwdGlvbiB8fCByZXF1ZXN0LnJhdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZ2VuZXJhdGVFcnJvclJlc3BvbnNlKFxuICAgICAgICA0MDAsXG4gICAgICAgICdOYW1lLCBkZXNjcmlwdGlvbiwgYW5kIHJhdGluZyBhcmUgcmVxdWlyZWQgZmllbGRzJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSByYXRpbmcgaXMgYmV0d2VlbiAwIGFuZCA1XG4gICAgaWYgKHJlcXVlc3QucmF0aW5nIDwgMCB8fCByZXF1ZXN0LnJhdGluZyA+IDUpIHtcbiAgICAgIHJldHVybiBnZW5lcmF0ZUVycm9yUmVzcG9uc2UoNDAwLCAnUmF0aW5nIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA1Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgY29mZmVlQmVhbiA9IGF3YWl0IGNyZWF0ZUNvZmZlZUJlYW4ocmVxdWVzdCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdGVTdWNjZXNzUmVzcG9uc2UoMjAxLCBjb2ZmZWVCZWFuKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyBjb2ZmZWUgYmVhbjonLCBlcnJvcik7XG5cbiAgICByZXR1cm4gZ2VuZXJhdGVFcnJvclJlc3BvbnNlKDUwMCwgJ0ludGVybmFsIHNlcnZlciBlcnJvcicpO1xuICB9XG59O1xuIl19