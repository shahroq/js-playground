import { ConfigService } from '@nestjs/config';
import { IEnvelope } from './envelope.interface';
import { JSendAdapter } from './jsend.adapter';
import { JsonApiAdapter } from './json-api.adapter';

export type EnvelopeConstructor = new (
  error: Error | null,
  data: any,
) => IEnvelope;

export function getEnvelopeAdapter(
  configService: ConfigService,
): EnvelopeConstructor {
  const adapter = 'envelope';
  const strategy = configService.get<string>('envelope.strategy', 'jsend');

  switch (strategy) {
    case 'jsend':
      return JSendAdapter;
    case 'json-api':
      return JsonApiAdapter;
    default:
      throw new Error(`❌ Unsupported ${adapter} strategy: ${strategy}`);
  }
}
