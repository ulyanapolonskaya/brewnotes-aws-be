"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const coffee_bean_service_1 = require("../services/coffee-bean-service");
const handler = async (event) => {
    try {
        const id = event.pathParameters?.id;
        if (id) {
            // Get a specific coffee bean
            const coffeeBean = await (0, coffee_bean_service_1.getCoffeeBeanById)(id);
            if (!coffeeBean) {
                return {
                    statusCode: 404,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify({ message: 'Coffee bean not found' }),
                };
            }
            // Don't return soft deleted beans
            if (coffeeBean.deletedAt) {
                return {
                    statusCode: 404,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify({ message: 'Coffee bean not found' }),
                };
            }
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(coffeeBean),
            };
        }
        else {
            // Get all coffee beans
            const coffeeBeans = await (0, coffee_bean_service_1.getAllCoffeeBeans)();
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(coffeeBeans),
            };
        }
    }
    catch (error) {
        console.error('Error fetching coffee beans:', error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNvZmZlZS1iZWFucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYW1iZGEvZ2V0LWNvZmZlZS1iZWFucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5RUFHeUM7QUFFbEMsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUMxQixLQUEyQixFQUNLLEVBQUU7SUFDbEMsSUFBSTtRQUNGLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO1FBRXBDLElBQUksRUFBRSxFQUFFO1lBQ04sNkJBQTZCO1lBQzdCLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBQSx1Q0FBaUIsRUFBQyxFQUFFLENBQUMsQ0FBQztZQUUvQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLE9BQU87b0JBQ0wsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsT0FBTyxFQUFFO3dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7d0JBQ2xDLDZCQUE2QixFQUFFLEdBQUc7cUJBQ25DO29CQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUM7aUJBQzNELENBQUM7YUFDSDtZQUVELGtDQUFrQztZQUNsQyxJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3hCLE9BQU87b0JBQ0wsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsT0FBTyxFQUFFO3dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7d0JBQ2xDLDZCQUE2QixFQUFFLEdBQUc7cUJBQ25DO29CQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUM7aUJBQzNELENBQUM7YUFDSDtZQUVELE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFO29CQUNQLGNBQWMsRUFBRSxrQkFBa0I7b0JBQ2xDLDZCQUE2QixFQUFFLEdBQUc7aUJBQ25DO2dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzthQUNqQyxDQUFDO1NBQ0g7YUFBTTtZQUNMLHVCQUF1QjtZQUN2QixNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUEsdUNBQWlCLEdBQUUsQ0FBQztZQUU5QyxPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRTtvQkFDUCxjQUFjLEVBQUUsa0JBQWtCO29CQUNsQyw2QkFBNkIsRUFBRSxHQUFHO2lCQUNuQztnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7YUFDbEMsQ0FBQztTQUNIO0tBQ0Y7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFckQsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLDZCQUE2QixFQUFFLEdBQUc7YUFDbkM7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxDQUFDO1NBQzNELENBQUM7S0FDSDtBQUNILENBQUMsQ0FBQztBQWxFVyxRQUFBLE9BQU8sV0FrRWxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5RXZlbnQsIEFQSUdhdGV3YXlQcm94eVJlc3VsdCB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuaW1wb3J0IHtcbiAgZ2V0QWxsQ29mZmVlQmVhbnMsXG4gIGdldENvZmZlZUJlYW5CeUlkLFxufSBmcm9tICcuLi9zZXJ2aWNlcy9jb2ZmZWUtYmVhbi1zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoXG4gIGV2ZW50OiBBUElHYXRld2F5UHJveHlFdmVudFxuKTogUHJvbWlzZTxBUElHYXRld2F5UHJveHlSZXN1bHQ+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBpZCA9IGV2ZW50LnBhdGhQYXJhbWV0ZXJzPy5pZDtcblxuICAgIGlmIChpZCkge1xuICAgICAgLy8gR2V0IGEgc3BlY2lmaWMgY29mZmVlIGJlYW5cbiAgICAgIGNvbnN0IGNvZmZlZUJlYW4gPSBhd2FpdCBnZXRDb2ZmZWVCZWFuQnlJZChpZCk7XG5cbiAgICAgIGlmICghY29mZmVlQmVhbikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDQwNCxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogJ0NvZmZlZSBiZWFuIG5vdCBmb3VuZCcgfSksXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIERvbid0IHJldHVybiBzb2Z0IGRlbGV0ZWQgYmVhbnNcbiAgICAgIGlmIChjb2ZmZWVCZWFuLmRlbGV0ZWRBdCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDQwNCxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogJ0NvZmZlZSBiZWFuIG5vdCBmb3VuZCcgfSksXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29mZmVlQmVhbiksXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBHZXQgYWxsIGNvZmZlZSBiZWFuc1xuICAgICAgY29uc3QgY29mZmVlQmVhbnMgPSBhd2FpdCBnZXRBbGxDb2ZmZWVCZWFucygpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvZmZlZUJlYW5zKSxcbiAgICAgIH07XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNvZmZlZSBiZWFuczonLCBlcnJvcik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogJ0ludGVybmFsIHNlcnZlciBlcnJvcicgfSksXG4gICAgfTtcbiAgfVxufTtcbiJdfQ==