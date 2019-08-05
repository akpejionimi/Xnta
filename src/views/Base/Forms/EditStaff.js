import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as dateFns from 'date-fns';
import Sub from "../../../subs"
import { Redirect } from "react-router-dom";

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
import { editStaffInit, editStaff } from "../../../components/Store/actions/staff";

class Edit_Staff extends Component {
    storeSubscription;
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

        this.toggleSuccess = this.toggleSuccess.bind(this);

    }
    componentDidMount = () => {
        const staffId = +this.props.match.params.staffId;;
        this.props.onEditStaffInit(staffId);

        let staffEditAction = false;
        this.storeSubscription = store.subscribe(() => {
            const newVal = store.getState().staff.staffUpdated;
            if (staffEditAction !== newVal && newVal) {
                staffEditAction = newVal;
                this.toggleSuccess();
            }
            const staff = store.getState().staff.staff
            if (staff) {
                console.log(staff);
                
                this.setState({
                    fullName: staff.fullName,
                    phoneNo: staff.phoneNo,
                    email: staff.email,
                    status: staff.status,
                    gender: staff.gender,
                    department: staff.department,
                    entryDate: dateFns.format(staff.entryDate, 'YYYY-MM-DD'),
                    dateEmployed: dateFns.format(staff.dateEmployed, 'YYYY-MM-DD')
                })
            }
        });

        this.sub = new Sub()
        this.sub.subscribe("customer.customer", (value) => {
            // console.log(value);
        });

    };
    componentWillUnmount() {
        this.storeSubscription();
        this.sub.unSubscribe('staff.staff');
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
        const formData = {
            fullName: this.state.fullName,
            phoneNo: this.state.phoneNo,
            email: this.state.email,
            gender: this.state.gender,
            status: this.state.status,
            department: this.state.department,
            entryDate: dateFns.format(this.state.entryDate, 'YYYY-MM-DD'),
            dateEmployed: dateFns.format(this.state.dateEmployed, 'YYYY-MM-DD')
        };
        this.props.onEditStaff(JSON.stringify(formData));
    };

    render() {

        return (
            <Container className="card-design">
        <Row>
          <Col md={{ size: 12 }}>
            <Card>
              <CardHeader tag="h2">Edit Staff</CardHeader>
              <CardBody>
              {this.props.staffUpdated && <Redirect to={`/staff/${this.props.staff.staffId}`} />}
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
                            defaultValue={this.props.staff && this.props.staff.fullName}
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
                            defaultValue={this.props.staff && this.props.staff.email}
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
                            defaultValue={this.props.staff && this.props.staff.phoneNo}
                            onChange={this.onChanged}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={{ size: 6 }}>
                        <FormGroup>
                          <Label for="Department">Department</Label>
                          <Input type="select" name="department" id="department" 
                          defaultValue={this.props.staff && this.props.staff.department}
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
                            defaultValue={this.props.staff && this.props.staff.gender}
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
                          defaultValue={this.props.staff && this.props.staff.status}
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
                            defaultValue={this.props.staff && this.props.staff.entryDate}
                            id="entryDate"
                            >
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
                        id="dateEmployed"
                        defaultValue={this.props.staff && this.props.staff.dateEmployed}
                        >
                      </Input>
                    </FormGroup>
                  </Col>
                  </Row>
                  </FormGroup>
                  {this.props.isLoading ? (
                                        <Spinner color="danger" />
                                    ) : (
                                            <div>
                                                <Button color="success">Update</Button>
                                            </div>
                                        )}
                </Form>
                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                  className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleSuccess}>Modal title</ModalHeader>
                  <ModalBody>
                    Update Successful!
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
    staff: state.staff.staff,
    isLoading: state.staff.isLoading,
    staffUpdated: state.staff.staffUpdated,
    error: state.staff.error
});

const mapDispatchToProps = dispatch => ({

    onEditStaffInit: (staffId) => dispatch(editStaffInit(staffId)),
    onEditStaff: staffData => dispatch(editStaff(staffData))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit_Staff);



