var LoginService = require('../services/login/LoginService').LoginService;


// to initialize all the services

var AddServices = function(app){

    // initialize all the services
    new LoginService(app);

}

exports.AddServices= AddServices;
