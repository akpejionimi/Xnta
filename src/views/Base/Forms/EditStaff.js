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
import { editStaffInit, editStaff } from "../../../components/Store/actions/staff";

class Edit_Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            phoneNo: '',
            department: '',
            operatorLevel: '',
            dateEmployed: '',
            entryDate: '',
            success: false
        }


        let customerEditAction = false;
        store.subscribe(() => {
            const newVal = store.getState().customer.customerUpdated;

            if (customerEditAction !== newVal && newVal) {
                customerEditAction = newVal;
                this.toggleSuccess();
            }
        });

        this.toggleSuccess = this.toggleSuccess.bind(this);

    }
    componentDidMount = () => {
        const staffId = +this.props.match.params.staffId;;
        this.props.onEditStaffInit(staffId);

    };


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
            operatorLevel: this.state.operatorLevel,
            department: this.state.department,
            entryDate: this.state.entryDate,
            dateEmployed: this.state.dateEmployed
        };
        this.props.onEditCustomer(JSON.stringify(formData));
    };

    render() {

        return (
            <Container className="card-design">
                <Row>
                    <Col md={{ size: 12 }}>
                        <Card>
                            <CardHeader tag="h2">Edit Staff</CardHeader>
                            <CardBody>
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
                                                        defaultValue={this.props.staff && this.props.staff.fullName}
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
                                                        defaultValue={this.props.staff && this.props.staff.email}
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
                                            <Col md={{ size: 6 }}>
                                                <FormGroup>
                                                    <Label for="operator level">Operator level</Label>
                                                    <Input type="select" name="operatorLevel" id="operatorLevel"
                                                        defaultValue={this.props.staff && this.props.staff.operatorLevel}
                                                        onChange={this.onChanged}>
                                                        <option value="">Select Operator Level</option>
                                                        <option value="inputter">Inputter</option>
                                                        <option value="Authorizer">Authorizer</option>
                                                        <option value="SuperAdmin">SuperAdmin</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col md={{ size: 6 }}>
                                                <FormGroup>
                                                    <Label for="Entry date">Entry Date</Label>
                                                    <Input
                                                        defaultValue={this.props.staff && this.props.staff.entryDate}
                                                        onChange={this.onChanged}
                                                        type="date"
                                                        name="entryDate"
                                                        id="entryDate">
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <Col md={{ size: 6 }}>
                                        <FormGroup>
                                            <Label for="Date Employed">Date Employed</Label>
                                            <Input
                                                onChange={this.onChanged}
                                                type="date"
                                                name="dateEmployed"
                                                id="dateEmployed"
                                                defaultValue={this.props.staff && this.props.staff.dateEmployed}>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    {this.props.isLoading ? (
                                        <Spinner color="danger" />
                                    )
                                        :
                                        (
                                            <Button color="success">Update</Button>
                                        )}

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



