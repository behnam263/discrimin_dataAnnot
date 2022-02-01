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
                    <Nav.Link href="/">Upload</Nav.Link>
                    <Nav.Link as={NavLink} to="/filelist">
                      File List
                    </Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        Action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Something
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Separated link
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Form
                    className="d-flex"
                    style={{ position: "absolute", right: "0" }}
                  >
                  </Form>
                </Navbar.Collapse>
              </Navbar>
              <br />
              <Switch>
                <Route exact path="/">
                  <UploadComp />
                </Route>
                <Route path="/filelist">
                  <FileListComp />
                </Route>
                <Route path="/eval">
                  <EvalComp />
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
