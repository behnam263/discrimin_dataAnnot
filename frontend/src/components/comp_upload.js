import axios from "axios";
import React, { Component } from "react";

class UploadComp extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    uploadResult: "",
    resultColor: "black"
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    const res = await axios.put(
      "/main_system/upload/" + this.state.selectedFile.name,
      this.state.selectedFile
    );
    this.setState({ uploadResult: res.data }); 
    if(res.data.includes("Fail"))
      this.setState({ resultColor: "red" });
    else
      this.setState({ resultColor: "green" });
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  render() {
    return (
      <div className="row ms-5">
        <div className="ms-3">
          <h1>Upload Dataset</h1>
        </div>
        <div className="ms-3">
          <h3>Upload your dataset here:</h3>
        </div>
        <div className="row ms-1">
          <div className="col-sm-8">
            <input
              className="form-control form-control-lg"
              id="formFileLg"
              type="file"
              onChange={this.onFileChange}
            />
          </div>
          <button
            className="col-sm-2 btn btn-primary"
            onClick={this.onFileUpload}
          >
            Upload
          </button>
        </div>
        {this.fileData()}
        <div style={{color: this.state.resultColor}}>
          {this.state.uploadResult}
        </div>
      </div>
    );
  }
}

export default UploadComp;
