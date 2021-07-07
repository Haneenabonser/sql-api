'use strict';

module.exports = (req,res,next) =>{
    if (!req.body.name || !req.body.description){
        next('The request must have both name and description');
    }else{
        next();
    }
};

