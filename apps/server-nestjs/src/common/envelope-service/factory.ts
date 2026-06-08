import { EnvelopeStrategy, IEnvelope } from './envelope.interface';
import { JSendAdapter } from './jsend-adapter.service';
import { JsonApiAdapter } from './json-api-adapter.service';

export type EnvelopeConstructor = new (
  error: Error | null,
  data: any,
) => IEnvelope;

const adapter = 'envelope';

export function envelopeAdapterFactory(
  strategy: EnvelopeStrategy,
): EnvelopeConstructor {
  switch (strategy) {
    case 'jsend':
      return JSendAdapter;
    case 'json-api':
      return JsonApiAdapter;
    default:
      throw new Error(`❌ Unsupported ${adapter} strategy: ${strategy}`);
  }
}
