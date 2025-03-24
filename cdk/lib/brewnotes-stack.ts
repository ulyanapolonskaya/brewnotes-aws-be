import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as nodejsLambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';

export class BrewNotesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get the project root path
    const projectRoot = path.join(__dirname, '..', '..');

    // DynamoDB table
    const coffeeBeansTable = new dynamodb.Table(this, 'CoffeeBeansTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Use RETAIN for production
    });

    // Lambda functions - using absolute paths
    const getCoffeeBeansLambda = new nodejsLambda.NodejsFunction(
      this,
      'GetCoffeeBeansFunction',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: path.join(projectRoot, 'src', 'lambda', 'get-coffee-beans.ts'),
        handler: 'handler',
        environment: {
          COFFEE_BEANS_TABLE: coffeeBeansTable.tableName,
        },
        bundling: {
          externalModules: ['aws-sdk'],
        },
      }
    );

    const createCoffeeBeanLambda = new nodejsLambda.NodejsFunction(
      this,
      'CreateCoffeeBeanFunction',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: path.join(projectRoot, 'src', 'lambda', 'create-coffee-bean.ts'),
        handler: 'handler',
        environment: {
          COFFEE_BEANS_TABLE: coffeeBeansTable.tableName,
        },
        bundling: {
          externalModules: ['aws-sdk'],
        },
      }
    );

    const deleteCoffeeBeanLambda = new nodejsLambda.NodejsFunction(
      this,
      'DeleteCoffeeBeanFunction',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: path.join(projectRoot, 'src', 'lambda', 'delete-coffee-bean.ts'),
        handler: 'handler',
        environment: {
          COFFEE_BEANS_TABLE: coffeeBeansTable.tableName,
        },
        bundling: {
          externalModules: ['aws-sdk'],
        },
      }
    );

    // The rest of your code remains unchanged
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
    coffeeBeans.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getCoffeeBeansLambda)
    );
    coffeeBeans.addMethod(
      'POST',
      new apigateway.LambdaIntegration(createCoffeeBeanLambda)
    );

    const coffeeBeanById = coffeeBeans.addResource('{id}');
    coffeeBeanById.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getCoffeeBeansLambda)
    );
    coffeeBeanById.addMethod(
      'DELETE',
      new apigateway.LambdaIntegration(deleteCoffeeBeanLambda)
    );

    // Output the API URL
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.url,
      description: 'BrewNotes API Endpoint',
    });
  }
}
