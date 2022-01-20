
const baseURL = "/api";

function uploadDatasetsd(args) {
    return args.then(file => {
            const {
                createReadStream,
                filename,
                mimetype
            } = file;
            const fileStream = createReadStream();
            fileStream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`));
            console.log("filename=", filename);
            return filename;
        }).catch(e => {
       // you might want to return some sensible default depending on your usecase, or let the error bubble up by not catching
       console.log(e)
    });
}

async function uploadDataset(params) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/uploadDataset", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: params,
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}
const API = { uploadDatasetsd ,uploadDataset} ;
export default API;