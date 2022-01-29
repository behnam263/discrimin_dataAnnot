
import axios from 'axios';
import React,{Component} from 'react';
import API from "../api/api.js"

class ColSelection extends Component {

    render() {

      return (
        <div>
            <h1>
             Columns
            </h1>
            <h3>
             columns of selected file is here:
            </h3>
                <div>

                </div>
        </div>
      );
    }
  }

  export default ColSelection;