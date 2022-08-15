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
import { width } from "@mui/system";
import EvalComp from "./comp_eval.js";

const ColSelection = (props) => {
  let { data, fileName } = props;
  const history = useHistory();
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleChange = (event) => {
    if (
      event.target.checked &&
      !selectedColumns.includes(event.target.dataset["name"].toString())
    ) {
      let selectedCols = [...selectedColumns];
      selectedCols.push({ value: event.target.dataset["name"].toString() });
      setSelectedColumns(selectedCols);
    } else if (
      !event.target.checked &&
      selectedColumns.filter((obj) => {
        return obj.value === event.target.dataset["name"].toString();
      }).length > 0
    ) {
      let selectedCols = [...selectedColumns];
      selectedCols.splice(
        selectedColumns
          .map(function (e) {
            return e.value;
          })
          .indexOf(event.target.dataset["name"].toString()),
        1
      );
      setSelectedColumns(selectedCols);
    }
  };

  const createColumns = (r) => {
    if (r != null && r.length > 0) {
      return Object.keys(r[0]).map((col, i) => {
        return (
          <th className="header-cell">
            <div style={{ "white-space": "nowrap" }}>
              <input
                type="checkbox"
                id={`${col}${i}`}
                data-name={`${i}`}
                onChange={handleChange}
              />
              <label style={{ marginLeft: "5px" }}>{col}</label>
            </div>
          </th>
        );
      });
    }
  };

  return (
    <div>
      {console.log(data)}
      {data &&  (
        <div>
          <h3>Preview of selected file:</h3>
          <div style={{ height: 400, width: "80%" }}>
            <table className="table table-bordered">
              <thead className="BackgroundThemeColor">
                <tr>{createColumns(data)}</tr>
              </thead>
              <tbody>
                {data &&
                  data.map((r) => (
                    <tr>
                      {Object.values(r).map((d, i) => {
                        return <td>{d}</td>;
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div>
        <EvalComp columns={selectedColumns} fileName={fileName} />
      </div>
    </div>
  );
};

export default ColSelection;
