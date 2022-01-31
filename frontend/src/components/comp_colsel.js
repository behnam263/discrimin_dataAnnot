import axios from "axios";
import React, { Component } from "react";
import API from "../api/api.js";
import ColumnType from "../api/type_column.js";
import ListGroup from "react-bootstrap/ListGroup";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

class ColSelection extends Component {
  constructor(props) {
    super(props);
    this.state = { theme: "", selectedColumns: [] };
    let ltheme = createTheme({
      palette: {
        primary: {
          main: "#FFFFFF",
        },
      },
    });
    this.setState({ theme: ltheme });
  }
  handleChange = (event) => {
    console.log(event.target.ariaLabel);
    console.log(event.target.checked);
     console.log(this.state.selectedColumns);
    if (
      event.target.checked &&
      !this.state.selectedColumns.includes(event.target.ariaLabel)
    ) {
      let selectedCols = [...this.state.selectedColumns];
      selectedCols.push({ value: event.target.ariaLabel });
      this.setState({ selectedColumns: selectedCols });
    } else if (
      !event.target.checked &&
      this.state.selectedColumns.includes(event.target.ariaLabel)
    ) {
      let selectedCols = [...this.state.selectedColumns];
      selectedCols.splice(selectedCols.indexOf(event.target.ariaLabel), 1);
      this.setState({ selectedColumns: selectedCols });
    }
  };
  onColumnsApplyClick = () => {
    console.log(this.state.selectedColumns);
  };
  render() {
    return (
      <div>
        <h3>Preview of selected file:</h3>
        <Button variant="contained" onClick={this.onColumnsApplyClick} >Apply selected Columns</Button>
        <div style={{ height: 400, width: "100%", color: "white" }}>
          {this.props.data != null && this.props.data.length > 0 ? (
            <DataGrid
              rows={this.props.data}
              columns={Object.keys(this.props.data[0]).map(
                (x) =>
                  new ColumnType(x, x, 150, (headerparams) => (
                    <div>
                      <Checkbox
                        onChange={this.handleChange}
                        inputProps={{
                          "aria-label": headerparams.colDef.headerName,
                        }}
                      />
                      {headerparams.colDef.headerName}
                    </div>
                  ))
              )}
              theme={this.state.theme}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default ColSelection;
