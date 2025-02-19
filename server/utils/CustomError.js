class CustomError extends Error{
    constructor (message, statusCode){
        super(message)// this will call the parent class constructor and passing the error messages
        this.statusCode = statusCode;
        // client error status code starts with 400 to 499 and server error status code starts with 500 to 599
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.isOperational = true; // this is used to check if the error is operational or not
        Error.captureStackTrace(this, this.constructor);// this will capture the stack trace of the error
    }

}


module.exports = CustomError;

