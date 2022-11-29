export class InvalidParamError extends Error {
   constructor(paramName: string) {
      super(`Parameter with error: ${paramName}`);
      this.name = 'InvalidParamError';
   }
}