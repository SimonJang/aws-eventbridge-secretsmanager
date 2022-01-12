#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SecretsManagerLifecycleExampleStack } from '../lib/secrets-manager-lifecycle-stack';

const app = new cdk.App();

new SecretsManagerLifecycleExampleStack(app, 'SecretsManagerLifecycleExampleStack');
