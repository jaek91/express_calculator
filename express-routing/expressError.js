/** ExpressError  extends the normal JS error class so we can easily
 *  add a status when we make an instance of it.
**/

 class ExpressError extends Error {
    constructor(message, status) {
      super();
      this.message = message;
      this.status = status;
      console.error(this.stack);
    }
  }
  
  
  module.exports = ExpressError;