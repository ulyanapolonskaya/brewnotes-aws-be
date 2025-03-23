"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrewNotesStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const dynamodb = __importStar(require("aws-cdk-lib/aws-dynamodb"));
const lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const apigateway = __importStar(require("aws-cdk-lib/aws-apigateway"));
const nodejsLambda = __importStar(require("aws-cdk-lib/aws-lambda-nodejs"));
const path = __importStar(require("path"));
class BrewNotesStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // DynamoDB table
        const coffeeBeansTable = new dynamodb.Table(this, 'CoffeeBeansTable', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: cdk.RemovalPolicy.DESTROY, // Use RETAIN for production
        });
        // Lambda functions
        const getCoffeeBeansLambda = new nodejsLambda.NodejsFunction(this, 'GetCoffeeBeansFunction', {
            runtime: lambda.Runtime.NODEJS_18_X,
            entry: path.join(__dirname, '../../src/lambda/get-coffee-beans.ts'),
            handler: 'handler',
            environment: {
                COFFEE_BEANS_TABLE: coffeeBeansTable.tableName,
            },
            bundling: {
                externalModules: ['aws-sdk'],
            },
        });
        const createCoffeeBeanLambda = new nodejsLambda.NodejsFunction(this, 'CreateCoffeeBeanFunction', {
            runtime: lambda.Runtime.NODEJS_18_X,
            entry: path.join(__dirname, '../../src/lambda/create-coffee-bean.ts'),
            handler: 'handler',
            environment: {
                COFFEE_BEANS_TABLE: coffeeBeansTable.tableName,
            },
            bundling: {
                externalModules: ['aws-sdk'],
            },
        });
        const deleteCoffeeBeanLambda = new nodejsLambda.NodejsFunction(this, 'DeleteCoffeeBeanFunction', {
            runtime: lambda.Runtime.NODEJS_18_X,
            entry: path.join(__dirname, '../../src/lambda/delete-coffee-bean.ts'),
            handler: 'handler',
            environment: {
                COFFEE_BEANS_TABLE: coffeeBeansTable.tableName,
            },
            bundling: {
                externalModules: ['aws-sdk'],
            },
        });
        // Grant permissions
        coffeeBeansTable.grantReadData(getCoffeeBeansLambda);
        coffeeBeansTable.grantReadWriteData(createCoffeeBeanLambda);
        coffeeBeansTable.grantReadWriteData(deleteCoffeeBeanLambda);
        // API Gateway
        const api = new apigateway.RestApi(this, 'BrewNotesApi', {
            restApiName: 'BrewNotes API',
            description: 'API for BrewNotes coffee bean tracking',
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS,
            },
        });
        // Resources and methods
        const coffeeBeans = api.root.addResource('coffee-beans');
        coffeeBeans.addMethod('GET', new apigateway.LambdaIntegration(getCoffeeBeansLambda));
        coffeeBeans.addMethod('POST', new apigateway.LambdaIntegration(createCoffeeBeanLambda));
        const coffeeBeanById = coffeeBeans.addResource('{id}');
        coffeeBeanById.addMethod('GET', new apigateway.LambdaIntegration(getCoffeeBeansLambda));
        coffeeBeanById.addMethod('DELETE', new apigateway.LambdaIntegration(deleteCoffeeBeanLambda));
        // Output the API URL
        new cdk.CfnOutput(this, 'ApiEndpoint', {
            value: api.url,
            description: 'BrewNotes API Endpoint',
        });
    }
}
exports.BrewNotesStack = BrewNotesStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJld25vdGVzLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY2RrL2xpYi9icmV3bm90ZXMtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBbUM7QUFFbkMsbUVBQXFEO0FBQ3JELCtEQUFpRDtBQUNqRCx1RUFBeUQ7QUFDekQsNEVBQThEO0FBQzlELDJDQUE2QjtBQUU3QixNQUFhLGNBQWUsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMzQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLGlCQUFpQjtRQUNqQixNQUFNLGdCQUFnQixHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDcEUsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDakUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsZUFBZTtZQUNqRCxhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsNEJBQTRCO1NBQ3ZFLENBQUMsQ0FBQztRQUVILG1CQUFtQjtRQUNuQixNQUFNLG9CQUFvQixHQUFHLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FDMUQsSUFBSSxFQUNKLHdCQUF3QixFQUN4QjtZQUNFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHNDQUFzQyxDQUFDO1lBQ25FLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFdBQVcsRUFBRTtnQkFDWCxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQyxTQUFTO2FBQy9DO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLGVBQWUsRUFBRSxDQUFDLFNBQVMsQ0FBQzthQUM3QjtTQUNGLENBQ0YsQ0FBQztRQUVGLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxZQUFZLENBQUMsY0FBYyxDQUM1RCxJQUFJLEVBQ0osMEJBQTBCLEVBQzFCO1lBQ0UsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsd0NBQXdDLENBQUM7WUFDckUsT0FBTyxFQUFFLFNBQVM7WUFDbEIsV0FBVyxFQUFFO2dCQUNYLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDLFNBQVM7YUFDL0M7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDO2FBQzdCO1NBQ0YsQ0FDRixDQUFDO1FBRUYsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLFlBQVksQ0FBQyxjQUFjLENBQzVELElBQUksRUFDSiwwQkFBMEIsRUFDMUI7WUFDRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx3Q0FBd0MsQ0FBQztZQUNyRSxPQUFPLEVBQUUsU0FBUztZQUNsQixXQUFXLEVBQUU7Z0JBQ1gsa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUMsU0FBUzthQUMvQztZQUNELFFBQVEsRUFBRTtnQkFDUixlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUM7YUFDN0I7U0FDRixDQUNGLENBQUM7UUFFRixvQkFBb0I7UUFDcEIsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDckQsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM1RCxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRTVELGNBQWM7UUFDZCxNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN2RCxXQUFXLEVBQUUsZUFBZTtZQUM1QixXQUFXLEVBQUUsd0NBQXdDO1lBQ3JELDJCQUEyQixFQUFFO2dCQUMzQixZQUFZLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUN6QyxZQUFZLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXO2FBQzFDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsd0JBQXdCO1FBQ3hCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pELFdBQVcsQ0FBQyxTQUFTLENBQ25CLEtBQUssRUFDTCxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUN2RCxDQUFDO1FBQ0YsV0FBVyxDQUFDLFNBQVMsQ0FDbkIsTUFBTSxFQUNOLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLENBQ3pELENBQUM7UUFFRixNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELGNBQWMsQ0FBQyxTQUFTLENBQ3RCLEtBQUssRUFDTCxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUN2RCxDQUFDO1FBQ0YsY0FBYyxDQUFDLFNBQVMsQ0FDdEIsUUFBUSxFQUNSLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLENBQ3pELENBQUM7UUFFRixxQkFBcUI7UUFDckIsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDckMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHO1lBQ2QsV0FBVyxFQUFFLHdCQUF3QjtTQUN0QyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF0R0Qsd0NBc0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGFwaWdhdGV3YXkgZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0ICogYXMgbm9kZWpzTGFtYmRhIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEtbm9kZWpzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBjbGFzcyBCcmV3Tm90ZXNTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIER5bmFtb0RCIHRhYmxlXG4gICAgY29uc3QgY29mZmVlQmVhbnNUYWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnQ29mZmVlQmVhbnNUYWJsZScsIHtcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAnaWQnLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgYmlsbGluZ01vZGU6IGR5bmFtb2RiLkJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVCxcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksIC8vIFVzZSBSRVRBSU4gZm9yIHByb2R1Y3Rpb25cbiAgICB9KTtcblxuICAgIC8vIExhbWJkYSBmdW5jdGlvbnNcbiAgICBjb25zdCBnZXRDb2ZmZWVCZWFuc0xhbWJkYSA9IG5ldyBub2RlanNMYW1iZGEuTm9kZWpzRnVuY3Rpb24oXG4gICAgICB0aGlzLFxuICAgICAgJ0dldENvZmZlZUJlYW5zRnVuY3Rpb24nLFxuICAgICAge1xuICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMThfWCxcbiAgICAgICAgZW50cnk6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi9zcmMvbGFtYmRhL2dldC1jb2ZmZWUtYmVhbnMudHMnKSxcbiAgICAgICAgaGFuZGxlcjogJ2hhbmRsZXInLFxuICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgIENPRkZFRV9CRUFOU19UQUJMRTogY29mZmVlQmVhbnNUYWJsZS50YWJsZU5hbWUsXG4gICAgICAgIH0sXG4gICAgICAgIGJ1bmRsaW5nOiB7XG4gICAgICAgICAgZXh0ZXJuYWxNb2R1bGVzOiBbJ2F3cy1zZGsnXSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uc3QgY3JlYXRlQ29mZmVlQmVhbkxhbWJkYSA9IG5ldyBub2RlanNMYW1iZGEuTm9kZWpzRnVuY3Rpb24oXG4gICAgICB0aGlzLFxuICAgICAgJ0NyZWF0ZUNvZmZlZUJlYW5GdW5jdGlvbicsXG4gICAgICB7XG4gICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xOF9YLFxuICAgICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uL3NyYy9sYW1iZGEvY3JlYXRlLWNvZmZlZS1iZWFuLnRzJyksXG4gICAgICAgIGhhbmRsZXI6ICdoYW5kbGVyJyxcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICBDT0ZGRUVfQkVBTlNfVEFCTEU6IGNvZmZlZUJlYW5zVGFibGUudGFibGVOYW1lLFxuICAgICAgICB9LFxuICAgICAgICBidW5kbGluZzoge1xuICAgICAgICAgIGV4dGVybmFsTW9kdWxlczogWydhd3Mtc2RrJ10sXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IGRlbGV0ZUNvZmZlZUJlYW5MYW1iZGEgPSBuZXcgbm9kZWpzTGFtYmRhLk5vZGVqc0Z1bmN0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgICdEZWxldGVDb2ZmZWVCZWFuRnVuY3Rpb24nLFxuICAgICAge1xuICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMThfWCxcbiAgICAgICAgZW50cnk6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi9zcmMvbGFtYmRhL2RlbGV0ZS1jb2ZmZWUtYmVhbi50cycpLFxuICAgICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXG4gICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgQ09GRkVFX0JFQU5TX1RBQkxFOiBjb2ZmZWVCZWFuc1RhYmxlLnRhYmxlTmFtZSxcbiAgICAgICAgfSxcbiAgICAgICAgYnVuZGxpbmc6IHtcbiAgICAgICAgICBleHRlcm5hbE1vZHVsZXM6IFsnYXdzLXNkayddLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBHcmFudCBwZXJtaXNzaW9uc1xuICAgIGNvZmZlZUJlYW5zVGFibGUuZ3JhbnRSZWFkRGF0YShnZXRDb2ZmZWVCZWFuc0xhbWJkYSk7XG4gICAgY29mZmVlQmVhbnNUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEoY3JlYXRlQ29mZmVlQmVhbkxhbWJkYSk7XG4gICAgY29mZmVlQmVhbnNUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEoZGVsZXRlQ29mZmVlQmVhbkxhbWJkYSk7XG5cbiAgICAvLyBBUEkgR2F0ZXdheVxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlnYXRld2F5LlJlc3RBcGkodGhpcywgJ0JyZXdOb3Rlc0FwaScsIHtcbiAgICAgIHJlc3RBcGlOYW1lOiAnQnJld05vdGVzIEFQSScsXG4gICAgICBkZXNjcmlwdGlvbjogJ0FQSSBmb3IgQnJld05vdGVzIGNvZmZlZSBiZWFuIHRyYWNraW5nJyxcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICBhbGxvd09yaWdpbnM6IGFwaWdhdGV3YXkuQ29ycy5BTExfT1JJR0lOUyxcbiAgICAgICAgYWxsb3dNZXRob2RzOiBhcGlnYXRld2F5LkNvcnMuQUxMX01FVEhPRFMsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gUmVzb3VyY2VzIGFuZCBtZXRob2RzXG4gICAgY29uc3QgY29mZmVlQmVhbnMgPSBhcGkucm9vdC5hZGRSZXNvdXJjZSgnY29mZmVlLWJlYW5zJyk7XG4gICAgY29mZmVlQmVhbnMuYWRkTWV0aG9kKFxuICAgICAgJ0dFVCcsXG4gICAgICBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihnZXRDb2ZmZWVCZWFuc0xhbWJkYSlcbiAgICApO1xuICAgIGNvZmZlZUJlYW5zLmFkZE1ldGhvZChcbiAgICAgICdQT1NUJyxcbiAgICAgIG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGNyZWF0ZUNvZmZlZUJlYW5MYW1iZGEpXG4gICAgKTtcblxuICAgIGNvbnN0IGNvZmZlZUJlYW5CeUlkID0gY29mZmVlQmVhbnMuYWRkUmVzb3VyY2UoJ3tpZH0nKTtcbiAgICBjb2ZmZWVCZWFuQnlJZC5hZGRNZXRob2QoXG4gICAgICAnR0VUJyxcbiAgICAgIG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGdldENvZmZlZUJlYW5zTGFtYmRhKVxuICAgICk7XG4gICAgY29mZmVlQmVhbkJ5SWQuYWRkTWV0aG9kKFxuICAgICAgJ0RFTEVURScsXG4gICAgICBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihkZWxldGVDb2ZmZWVCZWFuTGFtYmRhKVxuICAgICk7XG5cbiAgICAvLyBPdXRwdXQgdGhlIEFQSSBVUkxcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnQXBpRW5kcG9pbnQnLCB7XG4gICAgICB2YWx1ZTogYXBpLnVybCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQnJld05vdGVzIEFQSSBFbmRwb2ludCcsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==