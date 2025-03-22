"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const coffee_bean_service_1 = require("../services/coffee-bean-service");
const handler = async (event) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ message: 'Request body is required' }),
            };
        }
        const request = JSON.parse(event.body);
        // Validate request
        if (!request.name || !request.description || request.rating === undefined) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    message: 'Name, description, and rating are required fields',
                }),
            };
        }
        // Validate rating is between 0 and 5
        if (request.rating < 0 || request.rating > 5) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ message: 'Rating must be between 0 and 5' }),
            };
        }
        const coffeeBean = await (0, coffee_bean_service_1.createCoffeeBean)(request);
        return {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(coffeeBean),
        };
    }
    catch (error) {
        console.error('Error creating coffee bean:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNvZmZlZS1iZWFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xhbWJkYS9jcmVhdGUtY29mZmVlLWJlYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUVBQW1FO0FBRzVELE1BQU0sT0FBTyxHQUFHLEtBQUssRUFDMUIsS0FBMkIsRUFDSyxFQUFFO0lBQ2xDLElBQUk7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNmLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFO29CQUNQLGNBQWMsRUFBRSxrQkFBa0I7b0JBQ2xDLDZCQUE2QixFQUFFLEdBQUc7aUJBQ25DO2dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLENBQUM7YUFDOUQsQ0FBQztTQUNIO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUE0QixDQUFDO1FBRWxFLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDekUsT0FBTztnQkFDTCxVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUU7b0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjtvQkFDbEMsNkJBQTZCLEVBQUUsR0FBRztpQkFDbkM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ25CLE9BQU8sRUFBRSxtREFBbUQ7aUJBQzdELENBQUM7YUFDSCxDQUFDO1NBQ0g7UUFFRCxxQ0FBcUM7UUFDckMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM1QyxPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRTtvQkFDUCxjQUFjLEVBQUUsa0JBQWtCO29CQUNsQyw2QkFBNkIsRUFBRSxHQUFHO2lCQUNuQztnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxDQUFDO2FBQ3BFLENBQUM7U0FDSDtRQUVELE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBQSxzQ0FBZ0IsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUVuRCxPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsNkJBQTZCLEVBQUUsR0FBRzthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztTQUNqQyxDQUFDO0tBQ0g7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEQsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLDZCQUE2QixFQUFFLEdBQUc7YUFDbkM7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDO1NBQzNELENBQUM7S0FDSDtBQUNILENBQUMsQ0FBQztBQWpFVyxRQUFBLE9BQU8sV0FpRWxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQsIEFQSUdhdGV3YXlQcm94eVJlc3VsdCB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgY3JlYXRlQ29mZmVlQmVhbiB9IGZyb20gJy4uL3NlcnZpY2VzL2NvZmZlZS1iZWFuLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ3JlYXRlQ29mZmVlQmVhblJlcXVlc3QgfSBmcm9tICcuLi9tb2RlbHMvY29mZmVlLWJlYW4nO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChcbiAgZXZlbnQ6IEFQSUdhdGV3YXlQcm94eUV2ZW50XG4pOiBQcm9taXNlPEFQSUdhdGV3YXlQcm94eVJlc3VsdD4gPT4ge1xuICB0cnkge1xuICAgIGlmICghZXZlbnQuYm9keSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdSZXF1ZXN0IGJvZHkgaXMgcmVxdWlyZWQnIH0pLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gSlNPTi5wYXJzZShldmVudC5ib2R5KSBhcyBDcmVhdGVDb2ZmZWVCZWFuUmVxdWVzdDtcblxuICAgIC8vIFZhbGlkYXRlIHJlcXVlc3RcbiAgICBpZiAoIXJlcXVlc3QubmFtZSB8fCAhcmVxdWVzdC5kZXNjcmlwdGlvbiB8fCByZXF1ZXN0LnJhdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBtZXNzYWdlOiAnTmFtZSwgZGVzY3JpcHRpb24sIGFuZCByYXRpbmcgYXJlIHJlcXVpcmVkIGZpZWxkcycsXG4gICAgICAgIH0pLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBWYWxpZGF0ZSByYXRpbmcgaXMgYmV0d2VlbiAwIGFuZCA1XG4gICAgaWYgKHJlcXVlc3QucmF0aW5nIDwgMCB8fCByZXF1ZXN0LnJhdGluZyA+IDUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiAnUmF0aW5nIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA1JyB9KSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgY29mZmVlQmVhbiA9IGF3YWl0IGNyZWF0ZUNvZmZlZUJlYW4ocmVxdWVzdCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAxLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvZmZlZUJlYW4pLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgY3JlYXRpbmcgY29mZmVlIGJlYW46JywgZXJyb3IpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InIH0pLFxuICAgIH07XG4gIH1cbn07XG4iXX0=