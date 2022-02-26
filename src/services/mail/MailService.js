const { body, validationResult } = require("express-validator");
const { ROUTES } = require("../../api-routes/Routes");
const { STRINGS } = require("../../utils/Strings");
const { getErrorModel } = require("../../utils/Utils");
const { auth } = require("../auth/AuthService");


var MailServiceProvider = require('./MailServiceProvider').MailServiceProvider;


var MailService = function (app) {
    var mailServiceProvider = new MailServiceProvider()
    app.post(ROUTES.SEND_BULK_MAIL, auth,
        body(['groupId'],STRINGS.PLEASE_SEND_THE_DATA_IN_CORRECT_FORMAT).exists(),
        (req, res) => {
            const errors = validationResult(req);
                
                if(!errors.isEmpty()){
                    return res.status(400).json(getErrorModel(errors.array()))
                }

            mailServiceProvider.sendMail(function(err,mailResponse){
                    if(err!=null){
                        res.send(err)
                    }
                    else{
                        res.send(mailResponse)
                    }
            },req.body)
    })

}

exports.MailService = MailService;
