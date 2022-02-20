var xlsx = require('xlsx');
var sendEmail = require('./SendMail').sendEmail;
const {parentPort,workerData} = require("worker_threads");

parentPort.postMessage(fetchExcelFile(workerData.file))

 function fetchExcelFile(fileName){
    var workbook = xlsx.readFile("./src/services/mail/person_list.xlsx");

    let sheetList = workbook.SheetNames;

console.log("sheet list =>>>>", sheetList)
for(let count =0; count<sheetList.length;count++){
    let worksheet = workbook.Sheets[sheetList[count]]
    const range = xlsx.utils.decode_range(worksheet['!ref']);
    console.log('range =>>>',range.e.r)
    fetchRecordsViaRange(range.e.r,worksheet)
}

}

    /**
     * this method is used to fetch all the records from the Excel sheet.
     * @param {*} range  : it contains the range object
     * @param {*} worksheet : it contains the worksheet object;
     */
    function fetchRecordsViaRange(range,worksheet){
        let maxRecordPerIteration= 1000;
        let maxIteration = range/maxRecordPerIteration;
        console.log(maxIteration)
        for(let count =0; count<maxIteration;count++){
            let staringRange = count*maxIteration;
            let endingRange = (count+1)*maxIteration;

            var data = xlsx.utils.sheet_to_json(worksheet,{
                raw: true,
                header:1,
                range:"B"+staringRange+":B"+endingRange,
                blankrows: false,
               });
               data = [].concat(...data)
               sendBulkEmail(data);            
        }
    }


/**
 * this method is used to send the email in bulk format
 * @param {*} receiverArray : it contains the receiver list in which we have to send the email.
 */
function sendBulkEmail(receiverArray){
    sendEmail(receiverArray,"hello").then(sendEmailResponse=>{
     if(sendEmailResponse!=undefined){
        console.log('response =>>>>',sendEmailResponse)
     }
    }).catch(error=>{
        console.log("error=>>>>",error)
    })
}
