import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../api/api.js";
import ColumnType from "../api/type_column.js";
import ListGroup from "react-bootstrap/ListGroup";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const ColSelection = (props) => {
 let { data , fileName} = props;
    const history = useHistory();
    const [selectedColumns, setSelectedColumns] = useState([]);

  const handleChange = (event) => {
   event.preventDefault();
    if (
      event.target.checked &&
      !selectedColumns.includes(event.target.id.toString())
    ) {
      let selectedCols = [...selectedColumns];
      selectedCols.push({ value: event.target.id.toString() });
      setSelectedColumns(selectedCols);
    } else if (
      !event.target.checked &&
      selectedColumns.filter(obj => { return obj.value === event.target.id.toString()}).length>0
    ) {
      let selectedCols = [...selectedColumns];
      selectedCols.splice(selectedColumns.map(function(e) { return e.value; }).indexOf(event.target.id.toString()), 1);
      setSelectedColumns(selectedCols);
    }

  };
  const onColumnsApplyClick = (event) => {
   event.preventDefault();
     history.push({
     pathname: '/eval',
     columns:selectedColumns,
     fileName:fileName
     });
  };

    return (
      <div>
        <h3>Preview of selected file:</h3>
        <Button variant="contained" onClick={onColumnsApplyClick} >Apply selected Columns</Button>
        <div style={{ height: 400, width: "100%", color: "white" }}>
          {data != null && data.length > 0 ? (
            <DataGrid
              rows={data}
              columns={Object.keys(data[0]).map(
                (x,lindex) =>
                  new ColumnType(x, x, 150, (headerparams) => (
                    <div>
                      <Checkbox
                        onChange={handleChange}
                        inputProps={{
                          "aria-label": headerparams.colDef.headerName,
                          "id": lindex,
                        }}
                      />
                      {headerparams.colDef.headerName}
                    </div>
                  ))
              )}
            />
          ) : null}
        </div>
      </div>
    );

}

export default ColSelection;
