import FileType from './type_file.js';
import DataFrameType from './type_data.js'

const baseURL = "/main_system";

async function getFileList() {
    let url = "/getFileList";
    const response =await fetch(baseURL + url);
     const resultJson = await response.json();
    if(response.ok){
        return resultJson.fileList.map((row) =>
        new FileType(row.name,row.description)
        );
    } else {
        let err = {status: response.status, errObj:userJson};
        throw err;  // An object with the error coming from the server
    }

}

async function getHeadDataList(filename) {
    let url = "/getDataList";
    const response =await fetch(baseURL + url+"?filename="+filename.name.toString());
     const resultJson = await response.json();
    if(response.ok){
       return resultJson;
    } else {
        let err = {status: response.status, errObj:userJson};
        throw err;  // An object with the error coming from the server
    }

}

async function postCustomEval(evalCode,columnNames,fileName) {
    let url = "/customCode";
    let parameters=JSON.stringify({columns: columnNames,evalCode:evalCode.toString(),fileName:fileName.toString()});
    const response =await fetch(baseURL + url,{ method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: parameters
    });
     const resultJson = await response.json();
    if(response.ok){
       return resultJson;
    } else {
        let err = {status: response.status, errObj:userJson};
        throw err;  // An object with the error coming from the server
    }

}

const API = { getFileList ,getHeadDataList, postCustomEval } ;
export default API;