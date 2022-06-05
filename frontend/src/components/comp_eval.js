import axios from "axios";
import React, { useState, useEffect } from "react";
import API from "../api/api.js";
import { useLocation } from "react-router-dom";
import MenuType from "../api/type_menu.js";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const EvalComp = (props) => {
  const location = useLocation();
  const [evals, setEvals] = useState(-1);
  const [codevalue, setCodevalue] = React.useState("");
  const [listOfMenuItems, setListOfMenuItems] = useState([]);

  useEffect(() => {
    let tempArray=[];
    tempArray.push(new MenuType("Dependence", "f1",""));
    tempArray.push(new MenuType("Diverseness", "f2",""));
    tempArray.push(new MenuType("Inclusiveness", "f3",""));
    tempArray.push(new MenuType("Training Likelihood", "f4",""));
    tempArray.push(new MenuType("Custom Evaluation", "f5",""));
     setListOfMenuItems(tempArray);
  }, [location]);

  const handleComboboxChange = (event) => {
    setEvals(event.target.value);
  };

  const RunEvaluation = (event) => {
   event.preventDefault();
   if(evals!=-1)
       API.postCustomEval(evals,location.columns.map(x=> x.value),location.fileName);
  };


  return (
    <div>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Evaluation Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={evals}
              label="Evaluation Type"
              onChange={handleComboboxChange}
            >
            {listOfMenuItems.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
            >
              {item.name}
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
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-multiline-static"
              label="Evaluation Code"
              multiline
              rows={4}
              value={evals}
            />
          </div>
        </Box>
      </div>

<div>
   <Button variant="contained" onClick={RunEvaluation} >Run Code</Button>
</div>
    </div>
  );
};

export default EvalComp;
