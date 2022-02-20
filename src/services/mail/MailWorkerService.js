const {Worker} = require("worker_threads");
const { STRINGS } = require("../../utils/Strings");
const { getSuccessModel } = require("../../utils/Utils");



function createMailWorkerThread(callback,fileName){


    const worker = new Worker("./src/services/mail/readFile.js", {workerData: {file: fileName}});

    worker.on("error", error => {
        console.log(error);
      });
      
      worker.once("message", result => {
        console.log(`we have started working on the mailing it would take time to send the mail`);
      });
    
      worker.on("exit", exitCode => {
        console.log(exitCode);
      })
        
      let successModel= getSuccessModel();
      successModel.message= STRINGS.RECEIVED_MAIL_REQUEST;
        callback(null,successModel)
}

exports.createMailWorkerThread =createMailWorkerThread;
