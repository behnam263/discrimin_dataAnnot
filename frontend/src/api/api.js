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

const API = { getFileList ,getHeadDataList} ;
export default API;