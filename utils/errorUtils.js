function getFirstMongooseError(error) {
    return Object.values(error.errors)[0].message;

}

exports.getErrorMessage = (error) => {

    switch (error.name) {   
        case 'Error': return error.message;
        case 'ValidationError': return getFirstMongooseError(error);
        default: return error.message;
    }

};

