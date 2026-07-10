// src/domain/exceptions/domain.exception.ts

/**

 * ni de ningún detalle de infraestructura — es TypeScript puro.
 */
export abstract class DomainException extends Error {
  constructor(message: string) {
    super(message)
    this.name = new.target.name
  }
}
