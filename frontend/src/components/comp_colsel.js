import axios from "axios";
import React, { Component } from "react";
import API from "../api/api.js";
import ColumnType from "../api/type_column.js";
import ListGroup from "react-bootstrap/ListGroup";
import { DataGrid } from "@mui/x-data-grid";

class ColSelection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Preview of selected file:</h3>
        <div style={{ height: 400, width: "100%", color: "white" }}>
          {this.props.data != null && this.props.data.length > 0 ? (
            <DataGrid
              rows={this.props.data}
              columns={Object.keys(this.props.data[0]).map(
                (x) => new ColumnType(x, x, 150)
              )}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default ColSelection;
