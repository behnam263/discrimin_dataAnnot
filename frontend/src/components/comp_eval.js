
import React, { Component } from "react";
import API from "../api/api.js";
import MenuType from "../api/type_menu.js";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import parse from "html-react-parser";


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
      outputChart: "",
      eval_text: "",
      eval_query: "",
      outputSelector:""
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
      let ba2 = API.postCustomEvalChart(
        this.state.eval_text,
        this.props.columns.map((x) => x.value),
        this.props.fileName
      ).then(
        function (val) {
          console.log(this);
          console.log(val);
          this.setOutputChart(val);
         }.bind(this)
      );
    }
  }; 
  callEvaluationServerWithQuery = (query) => {
    if (this.state.evals != -1) {
      let bar = API.postEvaluationWithQuery(
        this.state.eval_text,
        this.props.columns.map((x) => x.value),
        this.props.fileName,
        query
      ).then(
        function (val) {
          this.setOutputView(val);
        }.bind(this)
      );
      let ba2 = API.postEvaluationChartWithQuery(
        this.state.eval_text,
        this.props.columns.map((x) => x.value),
        this.props.fileName,
        query
      ).then(
        function (val) {
          this.setOutputChart(val);
         }.bind(this)
      );
    }
  };

  RunEvaluation = (event) => {
    event.preventDefault();
    let eval_value = this.state.eval_text;
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
    MultiSelectCreator(1);
  };

  RunEvaluationWithQuery = (event) => {
    if (this.state.evals != -1) {
      let bar = API.PostSelectedColumns(
        this.state.eval_text,
        this.props.columns.map((x) => x.value),
        this.props.fileName
      ).then(
        function (val) {
          this.setOutputView(val);
        }.bind(this)
      );
    }
  };
  GetColumnsAndComponents = (event) => {
    event.preventDefault();
    let eval_value = this.state.eval_text; 
    if (
      eval_value == "undefined" ||
      eval_value === null ||
      eval_value.trim() === ""
    ) {
      this.setState({ eval_text: this.state.eval }, () => {
        if (this.state.evals != -1) {
          let bar = API.PostSelectedColumns(
            this.state.eval_text,
            this.props.columns.map((x) => x.value),
            this.props.fileName
          ).then(
            function (val) {
              this.setOutputView(val);
            }.bind(this)
          );
      }});
    } else {

      if (this.state.evals != -1) {
        let bar = API.PostSelectedColumns(
          this.state.eval_text,
          this.props.columns.map((x) => x.value),
          this.props.fileName
        ).then(
          function (val) {
            this.setOutputView(val);
          }.bind(this)
        );
    }
  };
  };
  setOutputView = (value) => {
    this.setState({ outputHtml: value });
  };

  setOutputChart = (value) => {
    this.setState({ outputChart: value });
  };

  

  MultiSelectCreator = (value) => {
    const names = [
      { id: "1", value: "Oliver Hansen" },
      { id: "2", value: "Van Henry" },
      { id: "3", value: "Van Henry" }
    ];
    let selectedName="";
    for (let i=0; i<value; i++)
    {
      outputSelector=` 
      <Select
      multiple
      native
      value={selectedName}
      onChange={handleChangeMultiple}
      label="Native"
      inputProps={{
        id: 'select-multiple-native',
      }}
    >
      {names.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </Select>`;
    }

  }

  handleComboboxChange = (event) => {
    this.setState({ evals: event.target.value });
    this.setState({ eval_text: event.target.value });
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
          <Button variant="contained" onClick={this.GetColumnsAndComponents}>
            Load Selected Data
          </Button> 
          <Button variant="contained" data-name="RunCodeClick" className="InvisibleItem" onClick={this.RunEvaluationWithQuery}>
            Run Code WithQuery
          </Button>
      
        </div>
        <div>{parse(this.state.outputHtml)}</div>
         <div>{parse(this.state.outputSelector)}</div> 
        <div>{parse(this.state.outputChart)}</div>
      </div>
    );
  }
}

export default EvalComp;
