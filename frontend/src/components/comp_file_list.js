import React, { Component } from "react";
import API from "../api/api.js";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ColSelection from "./comp_colsel.js";

class FileListComp extends Component {
  constructor(props) {
    super(props);
    this.state = { S_listOfFiles: [], S_data: [], S_selectedFile: "" };
  }
  selectRows = (r) => {
    this.setState({
      S_selectedFile: r.name.toString(),
    });
    API.getHeadDataList(r)
      .then((d) => {
        this.setState({
          S_data: d,
        });
      })
      .catch((errorObj) => {});
    event.preventDefault();
  };
  deleteRows = (r) => {
    this.setState({
      S_selectedFile: r.name.toString(),
    });
    API.DeleteFileRow(r)
      .then((d) => {
        this.loadFileRows();
      })
      .catch((errorObj) => {});
    event.preventDefault();
  };
  createRows = (r) => {
    return (
      <tr key={r.name}>
        <td>{r.name}</td>
        <td>{r.description}</td>
        <td>
          {
            <Button
              variant="primary"
              className="ml-2"
              type="button"
              onClick={() => this.selectRows(r)}
            >
              Select
            </Button>
          }
        </td>
        <td>
          {
            <Button
              variant="danger"
              className="ml-2"
              type="button"
              onClick={() => this.deleteRows(r)}
            >
              Delete
            </Button>
          }
        </td>
      </tr>
    );
  };

  loadFileRows = () => {
    API.getFileList()
      .then((r) => {
        this.setState({ S_listOfFiles: r });
      })
      .catch((errorObj) => {});
  };

  refereshValues = () => {
    this.state.S_data = [];
    this.state.S_selectedFile = "";
    document.getElementById("app").scrollIntoView();
  };

  componentDidMount() {
    this.loadFileRows();
  }
  render() {
    return (
      <div>
        <div className="row d-flex justify-content-center text-center">
          <div className="col-1"></div>
          <div className="col-10">
            <h3>Loaded Data Files</h3>
            <div className="pb-3">
              <Table striped bordered hover variant="white">
                <thead className="BackgroundThemeColor">
                  <tr>
                    <th>File</th>
                    <th>Description</th>
                    <th>Select</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.S_listOfFiles &&
                    this.state.S_listOfFiles.map(this.createRows)}
                </tbody>
              </Table>
            </div>
            <div>
              <ColSelection
                data={this.state.S_data}
                fileName={this.state.S_selectedFile}
                refereshValues={this.refereshValues}
              />
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    );
  }
}

export default FileListComp;
