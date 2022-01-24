
import axios from 'axios';
import React,{Component} from 'react';
import API from "../api/api.js"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class FileListComp extends Component {

    constructor(props) {
        super(props);
        this.state = { listOfFiles: [] }
    }
     selectRows = (r) => {
     console.log(r)
     }
    createRows = (r) => {
        return (
            <tr key={r}>
                <td>{r}</td>
                <td>{
                        <Button variant="danger" className="ml-2" type="button"
                            onClick={() => this.selectRows(r)}>select</Button>
                }</td>
            </tr>
        );
    }

  componentDidMount() {
             API.getFileList()
                    .then((r) => {
                        this.setState({ listOfFiles: r });
                    })
                    .catch((errorObj) => {
                        console.log(errorObj);
                    });
    }
    render() {

      return (
        <div>
            <h3>
             File List
            </h3>
            <div>
               <Table striped bordered hover variant="white">
                        <thead className="BackgroundThemeColor">
                            <tr>
                                <th>File</th>
                                <th>Description</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.listOfFiles &&  this.state.listOfFiles.map(this.createRows)}
                        </tbody>
                    </Table>
            </div>
        </div>
      );
    }
  }

  export default FileListComp;