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
 let { data } = props;
    const history = useHistory();

    const [selectedColumns, setSelectedColumns] = useState([]);

  const handleChange = (event) => {
   event.preventDefault();
    if (
      event.target.checked &&
      !selectedColumns.includes(event.target.ariaLabel)
    ) {
      let selectedCols = [...selectedColumns];
      selectedCols.push({ value: event.target.ariaLabel });
      setSelectedColumns(selectedCols);
    } else if (
      !event.target.checked &&
      selectedColumns.filter(obj => { return obj.value === event.target.ariaLabel}).length>0
    ) {
      let selectedCols = [...selectedColumns];
      selectedCols.splice(selectedColumns.map(function(e) { return e.value; }).indexOf(event.target.ariaLabel), 1);
      setSelectedColumns(selectedCols);
    }

  };
  const onColumnsApplyClick = (event) => {
   event.preventDefault();
     history.push({
     pathname: '/eval',
     columns:selectedColumns
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
                (x) =>
                  new ColumnType(x, x, 150, (headerparams) => (
                    <div>
                      <Checkbox
                        onChange={handleChange}
                        inputProps={{
                          "aria-label": headerparams.colDef.headerName,
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
