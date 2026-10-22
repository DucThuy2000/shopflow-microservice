export class UpstreamError extends Error {
  constructor(
    readonly service: string,
    readonly original: unknown, // TS automatically creates and initialization the property
  ) {
    super(`${service} call failed`);
  }
}

/**
 * it is approximately relevant to:
 *
 * class UpstreamError extends Error {
 *    readonly service: string
 *    readonly original: unknown
 *
 *    constructor(service: string, original: unknown) {
 *      super(`${service} call failed`)
 *
 *      this.service = service;
 *      this.original = original;
 *    }
 * }
 */
