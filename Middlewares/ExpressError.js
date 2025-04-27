class ExpressError extends Error {
    constructor(message, statusCode) {      
        super();
        this.statusCode = statusCode;
        this.message = message;    
    }
}

module.exports = ExpressError;
// This class extends the built-in Error class in JavaScript. It is used to create custom error objects that include a status code and a message.