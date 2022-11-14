import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  NavLink,
} from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import UploadComp from "./comp_upload.js";
import FileListComp from "./comp_file_list.js";
import EvalComp from "./comp_eval.js";
import WelcomeScreen from "./welcome_screen.js";

class NavbarHeader extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Router>
              <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="/">
                  {" "}
                  <img
                    src="/static/frontend/media/logo.png"
                    alt="Logo"
                    height="50"
                    width="50"
                  />{" "}
                  Annotation System{" "}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="/">Welcome</Nav.Link>
                    <Nav.Link as={NavLink} to="/filelist">
                      Evaluation
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/upload">
                      Upload Data
                    </Nav.Link>
                  </Nav>
                  <Form
                    className="d-flex"
                    style={{ position: "absolute", right: "0" }}
                  ></Form>
                </Navbar.Collapse>
              </Navbar>
              <br />
              <Switch>
                <Route exact path="/">
                  <WelcomeScreen />
                </Route>
                <Route path="/filelist">
                  <FileListComp />
                </Route>
                <Route path="/eval">
                  <EvalComp />
                </Route>
                <Route path="/upload">
                  <UploadComp />
                </Route>
                <Route path="/contact-us"></Route>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarHeader;
