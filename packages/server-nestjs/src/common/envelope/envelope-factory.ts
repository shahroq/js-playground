// src/common/envelopes/envelope.factory.ts
import { ConfigService } from '@nestjs/config';
import { EnvelopeStrategy, IEnvelope } from './envelope.interface';
import { JSendAdapter } from './jsend.adapter';
import { JsonApiAdapter } from './json-api.adapter';
// import { JsonApiAdapter } from './json-api.adapter';

export type EnvelopeConstructor = new (
  error: Error | null,
  data: any,
) => IEnvelope;

export function getEnvelopeAdapter(): EnvelopeConstructor {
  const adapter = 'envelope';
  // const strategy: EnvelopeStrategy = configService.get<string>('envelope.strategy', 'jsend');
  const strategy: EnvelopeStrategy = 'jsend';
  // const strategy: EnvelopeStrategy = 'json-api';

  switch (strategy) {
    case 'jsend':
      return JSendAdapter;
    // case 'json-api':
    //   return JsonApiAdapter;
    default:
      throw new Error(`❌ Unsupported ${adapter} strategy: ${strategy}`);
  }
}
