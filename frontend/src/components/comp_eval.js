import axios from "axios";
import React, { useState,useEffect  } from "react";
import API from "../api/api.js";
import { useLocation } from "react-router-dom";

const EvalComp = (props) => {
 const location = useLocation();

     useEffect(() => {
       console.log(location.columns);
    }, [location]);

    return (
      <div>

      </div>
    );
}

export default EvalComp;
