const {Worker} = require("worker_threads");

let fileName = 'person_list.xlsx';

const worker = new Worker("./readFile.js", {workerData: {file: fileName}});


worker.on("error", error => {
    console.log(error);
  });
  
  worker.once("message", result => {
    console.log(`we have started working on the mailing it would take time to send the mail`);
  });

  worker.on("exit", exitCode => {
    console.log(exitCode);
  })
  
  console.log("Executed in the parent thread");
