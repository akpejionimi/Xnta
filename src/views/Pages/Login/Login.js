import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Alert
} from "reactstrap";

import { auth, toggleAuth} from "../../../components/Store/actions/auth";

class Auth extends Component {
  state = {
    userName: "",
    password: "",
  };

  // Event handler for the file input field
  onChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    let formData;
    if (this.props.isLogin) {
      formData = {
        userName: this.state.userName,
        password: this.state.password
      };
      this.props.onAuth(formData);
    } 
  };

  render() {
    const {error } = this.props;
    return (
      <Container className="card-design">
        {this.props.isAuth && <Redirect to="/dashboard" />}
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Card className="mx-auto">
                <CardHeader tag="h2">Login</CardHeader>
              <CardBody>
                {error && <Alert color="danger">{this.props.error.msg}</Alert>}
                <Form onSubmit={this.submitForm} action="POST" encType={
                      "application/x-www-form-urlencoded"
                  }
                  >
                    <FormGroup>
                      <Label for="name">Username</Label>
                      <Input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="UserName"
                        onChange={this.onChanged}
                      />
                    </FormGroup>
                  
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={this.onChanged}
                    />
                  </FormGroup>
                    <Button 
                     color="primary">Login</ Button>
                    
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isLoading: state.auth.isLoading,
  isAuth: state.auth.isAuth,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  onAuth: formData => dispatch(auth(formData)),
  onToggleAuth: () => dispatch(toggleAuth())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
