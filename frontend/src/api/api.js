import FileType from "./type_file.js";
import DataFrameType from "./type_data.js";

const baseURL = "/main_system";

async function getFileList() {
  let url = "/getFileList";
  const response = await fetch(baseURL + url);
  const resultJson = await response.json();
  if (response.ok) {
    return resultJson.fileList.map(
      (row) => new FileType(row.name, row.description)
    );
  } else {
    let err = { status: response.status, errObj: userJson };
    throw err; // An object with the error coming from the server
  }
}

async function getHeadDataList(filename) {
  let url = "/getDataList";
  const response = await fetch(
    baseURL + url + "?filename=" + filename.name.toString()
  );
  const resultJson = await response.json();
  if (response.ok) {
    return resultJson;
  } else {
    let err = { status: response.status, errObj: userJson };
    throw err; // An object with the error coming from the server
  }
}

async function postCustomEval(evalCode, columnNames, fileName) {
  return new Promise((resolve, reject) => {
    let url = "/customCode";
    let parameters = JSON.stringify({
      columns: columnNames,
      evalCode: evalCode.toString(),
      fileName: fileName.toString(),
    });
    fetch(baseURL + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: parameters,
    })
      .then((response) => {
        if (response.ok) {
          response.text().then(function (text) {
            console.log(output_resolver(text));
          });
        } else {
          console.log(output_resolver(text));
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function getEvaluationFilesList() {
  let url = "/getEvalList";
  const response = await fetch(baseURL + url);

  const resultJson = await response.json();
  if (response.ok) {
    return resultJson;
  } else {
    let err = { status: response.status, errObj: userJson };
    throw err; // An object with the error coming from the server
  }
}

function output_resolver(input_text){
    let input_splitted=input_text.split(';');
    var output=[];
    var personJSONString=JSON.stringify(input_splitted[0]);
    output.push(personJSONString);
    output.push(input_splitted[1]);
return output;
}

const API = {
  getFileList,
  getHeadDataList,
  postCustomEval,
  getEvaluationFilesList,
};
export default API;
