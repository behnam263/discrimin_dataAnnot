import filetype from './type_file.js';
const baseURL = "/main_system";

async function getFileList() {
    let url = "/getFileList";
    const response =await fetch(baseURL + url);
     const resultJson = await response.json();
    if(response.ok){
        return resultJson.fileList;
    } else {
        let err = {status: response.status, errObj:userJson};
        throw err;  // An object with the error coming from the server
    }

}

const API = { getFileList } ;
export default API;