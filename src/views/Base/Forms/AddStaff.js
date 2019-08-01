import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'

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
  Container,
  Form,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import store from '../../../components/Store';
import { addStaff, addStaffInit } from "../../../components/Store/actions/staff";


class AddStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      phoneNo: '',
      department: '',
      gender: '',
      status: '',
      dateEmployed: '',
      entryDate: '',
      success: false
    }

    let staffCreationAction = false;
    store.subscribe(() => {
      const newVal = store.getState().staff.staffCreated;

      if (staffCreationAction !== newVal && newVal) {
        staffCreationAction = newVal;
        this.toggleSuccess();
      }
    });

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

  save = e => {
    e.preventDefault();
    e.target.reset();
    const formData = {
      fullName: this.state.fullName,
      phoneNo: this.state.phoneNo,
      email: this.state.email,
      gender: this.state.gender,
      status: this.state.status,
      department: this.state.department,
      entryDate: this.state.entryDate,
      dateEmployed: this.state.dateEmployed
    };

    this.props.onAddStaff(JSON.stringify(formData));
  };


  render() {
    return (
      <Container className="card-design">
        <Row>
          <Col md={{ size: 12 }}>
            <Card>
              <CardHeader tag="h2">Register Staff</CardHeader>
              <CardBody>
                {/* {this.props.staffCreated && <Redirect to="/dashboard" />} */}
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
                            maxLength="11"
                            placeholder="Phone No"
                            onChange={this.onChanged}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={{ size: 6 }}>
                        <FormGroup>
                          <Label for="Department">Department</Label>
                          <Input type="select" name="department" id="department" 
                            onChange={this.onChanged}>
                            <option value="">Select Department</option>
                            <option value="Sales">Sales</option>
                            <option value="Administration">Administration</option>
                            <option value="Operations">Operations</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup>
                    <Row>
                      {/* <Col md={{ size: 6 }}>
                        <FormGroup>
                          <Label for="operator level">Operator level</Label>
                          <Input type="select" name="operatorLevel" id="operatorLevel" onChange={this.onChanged}>
                            <option value="">Select Operator Level</option>
                            <option value="inputter">Inputter</option>
                            <option value="Authorizer">Authorizer</option>
                            <option value="SuperAdmin">SuperAdmin</option>
                          </Input>
                        </FormGroup>
                      </Col> */}
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
                      <Label for="Date Employed">Date Employed</Label>
                      <Input
                        onChange={this.onChanged}
                        type="date"
                        name="dateEmployed"
                        id="dateEmployed">
                      </Input>
                    </FormGroup>
                  </Col>
                  </Row>
                  </FormGroup>
                  <Button color="success">Register</Button>
                </Form>
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
  isLoading: state.staff.isLoading,
  staffCreated: state.staff.staffCreated,
  error: state.staff.error
});

const mapDispatchToProps = dispatch => ({
  onAddStaffInit: () => dispatch(addStaffInit()),
  onAddStaff: staffData => dispatch(addStaff(staffData))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStaff);


