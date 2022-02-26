const { STRINGS } = require("../../utils/Strings");
const {body,validationResult, query} =  require('express-validator');
const { getErrorModel } = require("../../utils/Utils");

var ROUTES = require("../../api-routes/Routes").ROUTES;
var LoginServiceProvider = require('./LoginServiceProvider').LoginServiceProvider;



var LoginService  = function(app){
    let loginServiceProvider = new LoginServiceProvider();

    app.post(ROUTES.LOGIN,
        body(['email','password'],STRINGS.PLEASE_SEND_THE_DATA_IN_CORRECT_FORMAT).exists(),
        (req,res)=>{
                const errors = validationResult(req);

                if(!errors.isEmpty()){
                    return res.status(400).json(getErrorModel(errors.array()))
                }
                
                    loginServiceProvider.login(function(error,loginResponse){
                                if(error!=null){
                                    res.send(error)
                                }
                                else{
                                    res.send(loginResponse)
                                }
                    },req.body)
        })
}

exports.LoginService= LoginService;
