import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as dateFns from 'date-fns';
import Sub from '../../../subs'
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
    // Modal,
    // ModalHeader,
    // ModalBody,
    // ModalFooter,
    Container,
    Form,
} from 'reactstrap';
import store from '../../../components/Store';
import { editCustomer, editCustomerInit } from "../../../components/Store/actions/customer";

class Edit_Customer extends Component {
    storeSubscription;
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
            success: false,
        }

        this.toggleSuccess = this.toggleSuccess.bind(this);

    }
    componentDidMount = () => {
        const customerId = +this.props.match.params.customerId;;
        this.props.onEditCustomerInit(customerId);

        // let customerEditAction = false;
        this.storeSubscription = store.subscribe(() => {
            // const newVal = store.getState().customer.customerUpdated;
            // if (customerEditAction !== newVal && newVal) {
            //     customerEditAction = newVal;
            //     this.toggleSuccess();
            // }
            const customer = store.getState().customer.customer
            if (customer) {
                this.setState({
                    fullName: customer.fullName,
                    phoneNo: customer.phoneNo,
                    email: customer.email,
                    status: customer.status,
                    gender: customer.gender,
                    entryDate: dateFns.format(customer.entryDate, 'YYYY-MM-DD'),
                    registrationDate: dateFns.format(customer.registrationDate, 'YYYY-MM-DD')
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
        this.sub.unSubscribe('customer.customer');
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
            status: this.state.status,
            gender: this.state.gender,
            entryDate: dateFns.format(this.state.entryDate, 'YYYY-MM-DD'),
            registrationDate: dateFns.format(this.state.registrationDate, 'YYYY-MM-DD')
        };
        this.props.onEditCustomer(JSON.stringify(formData));
        console.log(formData);

    };
    render() {

        return (
            <Container className="card-design">
                <Row>
                    <Col md={{ size: 12 }}>
                        <Card>
                            <CardHeader tag="h2">Edit Customer</CardHeader>
                            <CardBody>
                                {this.props.customerUpdated && <Redirect to={`/customers/${this.props.customer.customerId}`} />}
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
                                                        defaultValue={this.props.customer && this.props.customer.fullName}
                                                        // ref={(input)=>this.getFullName = input}
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
                                                        defaultValue={this.props.customer && this.props.customer.email}
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
                                                        defaultValue={this.props.customer && this.props.customer.phoneNo}
                                                        onChange={this.onChanged} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={{ size: 6 }}>
                                                <FormGroup>
                                                    <Label for="Gender">Gender</Label>
                                                    <Input type="select" name="gender" id="gender"
                                                        onChange={this.onChanged}
                                                        defaultValue={this.props.customer && this.props.customer.gender}>
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
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
                                        <FormGroup>
                                            <Row>
                                                <Col md={{ size: 6 }}>
                                                    <FormGroup>
                                                        <Label for="Status">Status</Label>
                                                        <Input type="select" name="status" id="status"
                                                            onChange={this.onChanged}
                                                            defaultValue={this.props.customer && this.props.customer.status}>
                                                            <option value="">Select Status</option>
                                                            <option value="Active">Active</option>
                                                            <option value="Inactive">Inactive</option>
                                                            <option value="Pending">Pending</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </FormGroup>
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
                                                        id="entryDate"
                                                        defaultValue={this.props.customer && this.props.customer.entryDate}
                                                    >
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
                                                        id="registrationDate"
                                                        defaultValue={this.props.customer && this.props.customer.registrationDate}>

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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {/* <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                                    className={'modal-success ' + this.props.className}>
                                    <ModalHeader toggle={this.toggleSuccess}>DONE</ModalHeader>
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
                </Row> */}
            </Container>

        )
    }
}
const mapStateToProps = state => ({
    customer: state.customer.customer,
    isLoading: state.customer.isLoading,
    customerUpdated: state.customer.customerUpdated,
    error: state.customer.error
});

const mapDispatchToProps = dispatch => ({
    onEditCustomerInit: (customerId) => dispatch(editCustomerInit(customerId)),
    onEditCustomer: customerData => dispatch(editCustomer(customerData))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit_Customer);
