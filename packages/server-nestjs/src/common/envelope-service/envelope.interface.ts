export type EnvelopeStrategy = 'jsend' | 'json-api';

export interface IEnvelope {
  toJSON(): any;
}
