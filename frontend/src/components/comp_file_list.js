import axios from "axios";
import React, { Component } from "react";
import API from "../api/api.js";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ColSelection from "./comp_colsel.js";

class FileListComp extends Component {
  constructor(props) {
    super(props);
    this.state = { S_listOfFiles: [], S_data: [],S_selectedFile:'' };
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
      .catch((errorObj) => {
        console.log(errorObj);
      });
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
              variant="danger"
              className="ml-2"
              type="button"
              onClick={() => this.selectRows(r)}
            >
              select
            </Button>
          }
        </td>
      </tr>
    );
  };

  componentDidMount() {
    API.getFileList()
      .then((r) => {
        this.setState({ S_listOfFiles: r });
      })
      .catch((errorObj) => {
        console.log(errorObj);
      });
  }
  render() {
    return (
      <div>
        <h3>File List</h3>
        <div  style={{ height: 400, width: "80%" }}>
          <Table striped bordered hover variant="white">
            <thead className="BackgroundThemeColor">
              <tr>
                <th>File</th>
                <th>Description</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {this.state.S_listOfFiles &&
                this.state.S_listOfFiles.map(this.createRows)}
            </tbody>
          </Table>
        </div>
        <div>
          <ColSelection data={this.state.S_data}  fileName={this.state.S_selectedFile} />
        </div>
      </div>
    );
  }
}

export default FileListComp;
