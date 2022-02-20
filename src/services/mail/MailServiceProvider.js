const { STRINGS } = require("../../utils/Strings");
const { getErrorModel } = require("../../utils/Utils");
var createMailWorkerThread = require('./MailWorkerService').createMailWorkerThread;

var MailServiceProvider = function(){

    this.sendMail = function(callback , body){
        console.log("mail body request=>>>", body)   


        createMailWorkerThread(function(err,response){
                if(err!=null){
                    callback(err,null)
                }
                else{
                    callback(null,response)
                }
        },'./src/services/mail/person_list.xlsx')
    }
}

exports.MailServiceProvider= MailServiceProvider;
