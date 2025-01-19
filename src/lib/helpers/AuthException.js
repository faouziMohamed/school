export class AuthErrorException extends Error {
  /**
   * @param {object} param0
   * @param {string} param0.message
   * @param {number} param0.status
   * @param {string} param0.description
   */
  constructor({ message, status = 400, description } = {}) {
    super(JSON.stringify({ message, status, description }));
    this.name = "AuthErrorException";
  }
}
