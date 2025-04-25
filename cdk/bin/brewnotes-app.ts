#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BrewNotesStack } from '../lib/brewnotes-stack';

// Get environment from context or use defaults
const app = new cdk.App();
const account = app.node.tryGetContext('aws-account') || '414266450988';
const region = app.node.tryGetContext('aws-region') || 'eu-north-1';

new BrewNotesStack(app, 'BrewNotesStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Using explicit account and region instead of process.env */
  env: {
    account: account,
    region: region, 
  },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
