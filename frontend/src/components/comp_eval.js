
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
      outputElementString: "",
      maximumNumberOfControls: 10000,
      scriptWordLength: 8
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
  callEvaluationServerWithQuery = () => {
    this.setState({ eval_query: this.PrepareQuery() });
    if (this.state.evals != -1) {
      let bar = API.postEvaluationWithQuery(
        this.state.eval_text,
        this.props.columns.map((x) => x.value),
        this.props.fileName,
        this.state.eval_query
      ).then(
        function (val) {
          this.setOutputResultTable(val);
        }.bind(this)
      );
      let ba2 = API.postEvaluationChartWithQuery(
        this.state.eval_text,
        this.props.columns.map((x) => x.value),
        this.props.fileName,
        this.state.eval_query
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
          this.setOutputResultTable(val);
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
        }
      });
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

  getElementSubstring = (elementName) => {
    let output = "";
    let tagStart = this.state.outputElementString.indexOf("<" + elementName);
    let tagEnd = this.state.outputElementString.indexOf("</" + elementName + ">");
    if (tagStart == -1 || tagEnd == -1) return null;
    output = this.state.outputElementString.substr(tagStart, tagEnd - tagStart + this.state.scriptWordLength + 1);

    let newText = this.state.outputElementString.slice(0, tagStart) +
      this.state.outputElementString.slice(tagEnd + this.state.scriptWordLength + 1);

    this.setState({ outputElementString: newText });
    return output;
  }

  DomElementMaker = (inputScriptTag) => {
    if (inputScriptTag == null || inputScriptTag == undefined || inputScriptTag == "")
      return null;
    parse(inputScriptTag, {
      replace: (node) => {
        if (node.type === 'script') {
          let externalScript = node.attribs.src ? true : false;
          const script = document.createElement('script');
          if (externalScript) {
            script.src = node.attribs.src;
          } else {
            script.innerHTML = node.children[0].data;
          }
          document.head.append(script);
        }
        else if (node.name === 'select') {
          let selectList = document.createElement("select");
          for (let i = 1; i < node.children.length; i++) {
            if (node.children[i].type == "tag") {
              let option = document.createElement("option");
              option.value = node.children[i].children[0].data;
              option.text = option.value;
              selectList.appendChild(option);
            }
          }
          selectList.setAttribute('data-id', node.attribs['data-column']);
          selectList.setAttribute('multiple', '');
          selectList.setAttribute('class', 'form-select col-sm Margin10Px');
          let outputPlaceHolder = document.getElementsByName("outputControls")[0];
          outputPlaceHolder.appendChild(selectList);
        }
        else if (node.name === "button") {
          const button = document.createElement('button');
          button.onclick = window[node.attribs.onclick];
          button.name = node.attribs.name;
          button.innerText = node.children[0].data;
          button.setAttribute('class', node.attribs.class + ' col-sm' + ' Margin10Px');
          let outputPlaceHolder = document.getElementsByName("outputControls")[0];
          outputPlaceHolder.appendChild(button);
        }
        else {
          // to do implement general parser
        }
      }
    });
  }

  clearOuptutControlPlaceHolder = () => {
    document.getElementsByName("outputControls")[0].innerHTML = '';
  }

  setOutputChart = (value) => {
    this.setState({ outputChart: value });
  };

  setOutputView = (value) => {
    this.setState({ outputElementString: value });
    this.clearOuptutControlPlaceHolder();
    let numberOfParsedElements = 0;
    while (numberOfParsedElements < this.state.maximumNumberOfControls &&
      this.state.outputElementString != "" && this.state.outputElementString != null &&
      parse(this.state.outputElementString) != undefined) {
      this.DomElementMaker(this.getElementSubstring("script"));
      this.DomElementMaker(this.getElementSubstring("button"));
      this.DomElementMaker(this.getElementSubstring("select"));
      numberOfParsedElements++;
    }
  };
  setOutputResultTable = (value) => {
    debugger;
    this.setState({ outputHtml: value });
  };

  handleComboboxChange = (event) => {
    this.setState({ evals: event.target.value });
    this.setState({ eval_text: event.target.value });
  };

  uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  PrepareQuery = () => {
    let query = [];
    let nodesWithData = document.querySelectorAll('[data-id]');
    for (const node of nodesWithData) {
      let selected = [];
      for (let option of node.options) {
        if (option.selected) {
          selected.push(option.value);
        }
      }
      query.push({
        id: node.attributes["data-id"].value,
        value: selected
      });
    }
    return JSON.stringify(query, null, 2);
  }

  render() {
    return (
      <div style={{ textAlign: "left",margin:"" }}>
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
          <Button variant="contained" className="Margin15Px" onClick={this.GetColumnsAndComponents}>
            Load Selected Data
          </Button>
          <Button variant="contained" className="InvisibleItem Margin15Px" data-name="RunCodeClick" onClick={this.callEvaluationServerWithQuery}>
            Run Code WithQuery
          </Button>

        </div>
        <div name="outputControls" className="row rounded Margin15Px" data-name="outputControls"></div>
        <div name="outputHtml" data-name="outputHtml">{parse(this.state.outputHtml)}</div>
        <div>{parse(this.state.outputChart)}</div>
      </div>
    );
  }
}

export default EvalComp;
