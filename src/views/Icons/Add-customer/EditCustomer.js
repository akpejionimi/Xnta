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
import { editCustomer, editCustomerInit } from "../../../components/Store/actions/customer";

class Edit_Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNo: "",
            email: "",
            entryDate: "",
            registrationDate: "",
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

        // store.pipe(
        //   filter(val => val),
        //   take(1)
        // ).subscribe(() => this.toggleSuccess)

        this.toggleSuccess = this.toggleSuccess.bind(this);

    }
    componentDidMount = () => {
        const customerId = +this.props.match.params.customerId;;
        this.props.onEditCustomerInit(customerId);

    };

    // cancel = () => {
    //    +this.props.history.goBack("/customers/all-customers");
    // }

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
        const formData = {
            fullName: this.state.fullName,
            phoneNo: this.state.phoneNo,
            email: this.state.email,
            entryDate: this.state.entryDate,
            registrationDate: this.state.registrationDate
        };
        this.props.onEditCustomer(JSON.stringify(formData));
    };

    render() {

        return (
            <Container className="card-design">
                <Row>
                    <Col md={{ size: 12 }}>
                        <Card>
                            <CardHeader tag="h2">Edit Customer</CardHeader>
                            <CardBody>
                                {/* {this.props.customerUpdated && !this.state.customerEditActionAction ? this.openModal() : ""} */}
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
                                                {/* <Button color="danger" onClick={this.cancel}>Cancel</Button> */}
                                                <Button color="success">Update</Button>

                                            </div>
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
                </Row>
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

    onEditCustomerInit: () => dispatch(editCustomerInit()),
    onEditCustomer: customerData => dispatch(editCustomer(customerData))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit_Customer);



