import axios from "axios";
import React, { Component } from "react";
import API from "../api/api.js";

class UploadComp extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    console.log(this.state.selectedFile.name);
    axios.put(
      "/main_system/upload/" + this.state.selectedFile.name,
      this.state.selectedFile
    );
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
              class="form-control form-control-lg"
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
      </div>
    );
  }
}

export default UploadComp;
