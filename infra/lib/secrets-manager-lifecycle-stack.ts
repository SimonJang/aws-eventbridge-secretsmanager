import { join } from 'path';
import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as nodeFunction from 'aws-cdk-lib/aws-lambda-nodejs';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

export class SecretsManagerLifecycleExampleStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

		const eventBus = events.EventBus.fromEventBusName(this, 'defaultEventBus', 'default');

        const lifecycleHandlerFunction = new nodeFunction.NodejsFunction(this, 'SecretsManagerLifecycleHandlerFunction', {
			entry: join(__dirname, '../functions/event-bridge-sm-event-handler/index.ts'),
			events: [

			]
		});

		new events.Rule(this, 'CloudTrailEventRuleForSecretsManager', {
            eventBus,
            ruleName: 'secrets-manager-lifecycle',
            eventPattern: {
				detailType: ['AWS API Call via CloudTrail'],
                source: ['aws.secretsmanager'],
                detail: {
                    eventSource: ['secretsmanager.amazonaws.com'],
                },
            },
            targets: [new targets.LambdaFunction(lifecycleHandlerFunction)],
        });
    }
}
