import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Input,
  Label,
  Alert,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Form,
} from 'reactstrap';
import store from '../../../components/Store';
import { addCustomer, addCustomerInit } from "../../../components/Store/actions/customer";

class Add_Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNo: "",
      email: "",
      status: "",
      gender: "",
      entryDate: "",
      registrationDate: "",
      success: false
    }

    let customerCreationAction = false;
    store.subscribe(() => {
      const newVal = store.getState().customer.customerCreated;

      if (customerCreationAction !== newVal && newVal) {
        customerCreationAction = newVal;
        this.toggleSuccess();
      }
    });

    // store.pipe(
    //   filter(val => val),
    //   take(1)
    // ).subscribe(() => this.toggleSuccess)

    this.toggleSuccess = this.toggleSuccess.bind(this);

  }


  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  onChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

  };

  // onImgChanged = e => {
  //   this.setState({
  //     imageUrl: e.target.files[0]
  //   });
  // };
  save = e => {
    e.preventDefault();
    e.target.reset();
    const formData = {
      fullName: this.state.fullName,
      phoneNo: this.state.phoneNo,
      email: this.state.email,
      status: this.state.status,
      gender: this.state.gender,
      entryDate: this.state.entryDate,
      registrationDate: this.state.registrationDate
    };
    this.props.onAddCustomer(JSON.stringify(formData));
  };

  render() {

    return (
      <Container className="card-design">
        <Row>
          <Col md={{ size: 12 }}>
            <Card>
              <CardHeader tag="h2">Register Customer</CardHeader>
              <CardBody>
                {/* {this.props.customerCreated && !this.state.customerCreationAction ? this.openModal() : ""} */}
                <Form onSubmit={this.save} action="POST" encType="application/json">
                  {this.props.error && (
                    < Alert color="danger">{this.props.error.msg}</Alert>
                  )}
                  <FormGroup>
                    <Row>
                      <Col md={{ size: 6 }}>
                        <FormGroup>
                          <Label for="name">FullName</Label>
                          <Input
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="FullName"
                            onChange={this.onChanged}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={{ size: 6 }}>
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            onChange={this.onChanged}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup>
                    <Row>
                      <Col md={{ size: 6 }}>
                        <FormGroup>
                          <Label for="name">Phone No</Label>
                          <Input
                            type="tel"
                            name="phoneNo"
                            id="phoneNo"
                            placeholder="Phone No"
                            maxLength="11"
                            onChange={this.onChanged} />
                        </FormGroup>
                      </Col>
                      <Col md={{ size: 6 }}>
                      <FormGroup>
                          <Label for="Status">Status</Label>
                          <Input type="select" name="status" id="status" 
                            onChange={this.onChanged}>
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                          </Input>
                        </FormGroup>
                        </Col>
                      {/* <Col md={{ size: 6 }}>
                        <FormGroup>
                          <Label for="Customer Photo">Profile Picture</Label>
                          <Input
                            type="file"
                            name="imageUrl"
                            id="profilePic"
                            accept=".jpg, .jpeg, .png"
                            onChange={this.onImgChanged}
                          />
                          <FormText color="muted">
                            Images must be png, jpg or jpeg format.
											</FormText>
                        </FormGroup>
                      </Col> */}
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                    <Col md={{ size: 6 }}>
                      <FormGroup>
                          <Label for="Gender">Gender</Label>
                          <Input type="select" name="gender" id="gender" 
                            onChange={this.onChanged}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Input>
                        </FormGroup>
                        </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup> 
                    <Row>
                      <Col md={{ size: 6 }}>
                        <FormGroup>
                          <Label for="Entry date">Entry Date</Label>
                          <Input
                            onChange={this.onChanged}
                            type="date"
                            name="entryDate"
                            id="entryDate">
                          </Input>
                        </FormGroup>

                      </Col>
                      <Col md={{ size: 6 }}>
                        <FormGroup>
                          <Label for="Registration date">Registration Date</Label>
                          <Input
                            onChange={this.onChanged}
                            type="date"
                            name="registrationDate"
                            id="registrationDate">
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                  {this.props.isLoading ? (
                    <Spinner color="danger" />
                  ) : (
                      <Button color="success">Register</Button>
                    )}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                  className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleSuccess}>Modal title</ModalHeader>
                  <ModalBody>
                    Registration Successful!
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggleSuccess}>Ok</Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

    )
  }
}
const mapStateToProps = state => ({
  isLoading: state.customer.isLoading,
  customerCreated: state.customer.customerCreated,
  error: state.customer.error
});

const mapDispatchToProps = dispatch => ({

  onAddCustomerInit: () => dispatch(addCustomerInit()),
  onAddCustomer: customerData => dispatch(addCustomer(customerData))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add_Customer);



