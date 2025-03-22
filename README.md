# BrewNotes AWS Backend

A TypeScript backend for tracking coffee beans, built with AWS Lambda, API Gateway, and DynamoDB.

## Project Structure

```
brewnotes-aws-be/
├── cdk/                # AWS CDK infrastructure code
├── src/
│   ├── lambda/         # Lambda function handlers
│   ├── models/         # Data models
│   ├── services/       # Business logic
│   └── utils/          # Utility functions
├── package.json
└── tsconfig.json
```

## API Endpoints

- GET /coffee-beans - Get all coffee beans
- GET /coffee-beans/{id} - Get a specific coffee bean by ID
- POST /coffee-beans - Create a new coffee bean
- DELETE /coffee-beans/{id} - Delete a coffee bean (soft delete)

## Setup and Deployment

1. Install dependencies for both the main project and CDK:

   ```bash
   # Install dependencies for the main project
   npm install

   # Install dependencies for the CDK project (including @types/node)
   npm run setup-cdk
   ```

2. Configure AWS credentials:

   ```bash
   # Create a named profile for this project
   aws configure --profile brewnotes-cdk
   ```

   Enter the following information when prompted:

   - AWS Access Key ID
   - AWS Secret Access Key
   - Default region name (eu-north-1)
   - Default output format (json)

3. Build the project:

   ```bash
   npm run build
   ```

4. Synthesize the CloudFormation template:

   ```bash
   npm run synth
   ```

5. Bootstrap CDK (first-time only):

   ```bash
   npm run bootstrap
   ```

6. Deploy to AWS:

   ```bash
   npm run deploy
   ```

## Troubleshooting

If you encounter TypeScript errors about missing node types:

```
Cannot find name 'process'. Do you need to install type definitions for node?
```

Run the setup-cdk script to ensure all required dependencies are installed:

```bash
npm run setup-cdk
```

## Coffee Bean Model

- `id`: Unique identifier
- `name`: Name of the coffee bean
- `description`: Description of the bean
- `rating`: Rating from 0 to 5
- `createdAt`: Timestamp when the record was created
- `deletedAt`: Timestamp when the record was deleted (null if not deleted)
