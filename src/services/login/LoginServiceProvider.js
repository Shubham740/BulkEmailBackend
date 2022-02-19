const { dbConnection } = require("../../../database");
const { STRINGS } = require("../../utils/Strings");
const { getSuccessModel, getErrorModel } = require("../../utils/Utils");


var LoginServiceProvider = function () {

    this.login = function (callback, body) {
        console.log("body =>>>>", body)
        let query = `select * from Persons where email="${body.email}" and password ="${body.password}"`
        console.log('query =>>>>',query);

        dbConnection.query(query, function(err,response){
            if(err) throw err;
            
            if(response){
                if(response.length>0){
                    let successModel = getSuccessModel();
                successModel.data = response;
                callback(null, successModel)
                }else{
                    let errorModel = getErrorModel();
                    errorModel.message = STRINGS.RECORD_NOT_FOUND;
                    callback(null,errorModel)    
                }
            }
            else{
                let errorModel = getErrorModel();
                errorModel.message = STRINGS.RECORD_NOT_FOUND;
                callback(null,errorModel)
            }
        })
    }

}

exports.LoginServiceProvider = LoginServiceProvider;
