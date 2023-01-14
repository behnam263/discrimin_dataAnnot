
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
      outputSelector: "",
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
 
  setOutputView = (value) => {
    debugger;
    console.log(value);
    let newdata = parse(value);
   
    console.log(newdata);
    let scripttxt=value.substr(value.indexOf("<script>"),
    value.indexOf("</script>")-value.indexOf("<script>")+this.state.scriptWordLength+1);
    this.DomScriptMaker(scripttxt);
    let buttontxt=value.substr(value.indexOf("<button"),
    value.indexOf("</button>")-value.indexOf("<button")+this.state.scriptWordLength+1);
    value+=this.DomButtonMaker(buttontxt);
    this.setState({ outputHtml: value });
  };

  setOutputChart = (value) => {
    this.setState({ outputChart: value });
  };

  GeneralCaller = (args) => {
    if(args==`"onClick":"RunCodeClick"`)
    {
      document.querySelectorAll('[data-name="RunCodeClick"]').click()
    }
  }

  DomScriptMaker=(inputScriptTag)=> {
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
      }
    });
  }

  DomButtonMaker=(inputScriptTag)=> {
    parse(inputScriptTag, {
      replace: (node) => {  
      debugger;
      if(node.name==="button"){
          const button = document.createElement('button');
          button.onclick= window[node.attribs.onclick];
          button.className= node.attribs.class;
          button.name= node.attribs.name;
          button.innerText=node.children[0].data;
          let outputPlaceHolder=document.getElementsByName("outputControls")[0];
          outputPlaceHolder.appendChild(button);
      }
      }
    });
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
         <div name="outputHtml" data-name="outputHtml">{parse(this.state.outputHtml)}</div>
         <div name="outputControls" data-name="outputControls"></div>
        <div>{parse(this.state.outputSelector)}</div>
        <div>{parse(this.state.outputChart)}</div> 
      </div>
    );
  }
}

export default EvalComp;
