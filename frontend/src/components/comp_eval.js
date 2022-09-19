import axios from "axios";
import React, { Component } from "react";
import PropTypes from "prop-types";

import API from "../api/api.js";

import MenuType from "../api/type_menu.js";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import parse from "html-react-parser";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";

let globalHistory = null;
class EvalComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evals: -1,
      codevalue: "",
      listOfMenuItems: [],
      selectedColumns: "",
      selectedFile: "",
      outputHtml: "",
      eval_text: "",
    };

    API.getEvaluationFilesList()
      .then((listOfEvaluationsAvailable) => {
        let mappedList = [];
        for (const element of listOfEvaluationsAvailable) {
          mappedList.push(new MenuType(element[0], element[1], element[0]));
        }
        this.setState({ listOfMenuItems: mappedList });
      })
      .catch((errorObj) => {
        console.log(errorObj);
      });
  }
  handleComboboxChange = (event) => {
    this.setState({ evals: event.target.value });
    this.setState({ eval_text: event.target.value });
  };

  onchangeformulatext = (event) => {
    this.setState({ eval_text: event.target.value });
  };

  callEvaluationServer = () => {
    if (this.state.evals != -1) {
      let bar = API.postCustomEval(
        this.state.eval_text,
        this.props.columns.map((x) => x.value),
        this.props.fileName
      ).then(
        function (val) {
          console.log(this);
          console.log(val);
          this.setOutputView(val);
        }.bind(this)
      );
    }
  };

  RunEvaluation = (event) => {
    event.preventDefault();
    let eval_value = this.state.eval_text;
    debugger;
    if (
      eval_value == "undefined" ||
      eval_value === null ||
      eval_value.trim() === ""
    ) {
      this.setState({ eval_text: this.state.eval }, () => {
        this.callEvaluationServer();
      });
    } else {
      this.callEvaluationServer();
    }
  };
  setOutputView = (value) => {
    this.setState({ outputHtml: value });
  };

  render() {
    return (
      <div style={{ textAlign: "left" }}>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Evaluation Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.evals}
                label="Evaluation Type"
                onChange={this.handleComboboxChange}
              >
                {this.state.listOfMenuItems.map((menu) => (
                  <MenuItem key={menu.value} value={menu.value}>
                    {menu.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="eval-multiline-edit-text"
                label="Evaluation Code"
                multiline
                rows={4}
                onChange={this.onchangeformulatext}
              />
            </div>
          </Box>
        </div>

        <div>
          <Button variant="contained" onClick={this.RunEvaluation}>
            Run Code
          </Button>
        </div>
        <div>{parse(this.state.outputHtml)}</div>
      </div>
    );
  }
}

export default EvalComp;
