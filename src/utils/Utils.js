var STRINGS = require('./Strings').STRINGS;



var getSuccessModel = function getSuccessModel(){

    let successModel ={
        success:true,
        status:200,
        message:STRINGS.RECORD_FETCH_SUCCESSFULLY
    }
    return successModel;

}

var getErrorModel = function getErrorModel(errors){

    let errorModel ={
        success:false,
        status:400,
        message:STRINGS.KEY_NOT_FOUND,
        error:errors
    }
    return errorModel;

}

var getErrorResponse = function getErrorResponse(error,message){
    let errorModel =getErrorModel();
    errorModel.error=error;
    errorModel.message  = message;
}




exports.getSuccessModel=getSuccessModel;
exports.getErrorModel=getErrorModel;
exports.getErrorResponse = getErrorResponse;