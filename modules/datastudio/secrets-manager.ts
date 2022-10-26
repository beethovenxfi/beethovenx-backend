import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { env } from '../../app/env';

export class SecretsManager {
    public async getSecret(secretId: string): Promise<string> {
        const secretManagerClient = new SecretsManagerClient({ region: env.AWS_REGION });

        let secret = '';
        const response = await secretManagerClient.send(new GetSecretValueCommand({ SecretId: secretId }));
        if (response.SecretString) {
            secret = response.SecretString;
        }

        return secret;
    }
}

export const secretsManager = new SecretsManager();
