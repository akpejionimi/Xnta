import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as dateFns from 'date-fns';
import Sub from '../../../subs'
import { Redirect } from "react-router-dom";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    FormGroup,
    Input,
    Label,
    Alert,
    Spinner,
    Container,
    Form,
} from 'reactstrap';

import store from '../../../components/Store';
import { editSavingsProduct, editSavingsProductInit } from "../../../components/Store/actions/savingsproduct";

class Edit_Customer extends Component {
    storeSubscription;
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            large: false,
            largeView: false,
            productName: "",
            moneyValue: "",
            productDuration: "",
            success: false
        }

        this.toggle = this.toggle.bind(this);
        this.toggleLarge = this.toggleLarge.bind(this);
        this.toggleLargeView = this.toggleLargeView.bind(this);
        this.toggleSuccess = this.toggleSuccess.bind(this);

    }
    componentDidMount = () => {
        const productId = +this.props.match.params.productId;;
        this.props.onEditSavingsProductInit(productId);

        this.storeSubscription = store.subscribe(() => {

            const savingsProduct = store.getState().savingsProduct.savingsProduct
            if (savingsProduct) {
                console.log(savingsProduct);
                this.setState({
                    productName: savingsProduct.productName,
                    productDuration: savingsProduct.productDuration,
                    moneyValue: savingsProduct.moneyValue,
                })
            }
        });

        this.sub = new Sub()
        this.sub.subscribe("savingsProduct.savingsProduct", (value) => {
            // console.log(value);
        });
    };
    componentWillUnmount() {
        this.storeSubscription();
        this.sub.unSubscribe('savingsProduct.savingsProduct');
    }

    toggleSuccess() {
        this.setState({
          success: !this.state.success,
        });
      }
    
      toggle() {
        this.setState({
          modal: !this.state.modal,
        });
      }
    
      toggleLarge() {
        this.setState({
          large: !this.state.large,
        });
      }
    
      toggleLargeView() {
        this.setState({
          largeView: !this.state.largeView,
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
            productName: this.state.productName,
            productDuration: this.state.productDuration,
            moneyValue: this.state.moneyValue,
        };
        this.props.onEditSavingsProduct(JSON.stringify(formData));
        console.log(formData);

    };
    render() {

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Product
                            </CardHeader>
                            <CardBody>
                                <Button onClick={this.toggleLarge} className="mr-1">Edit Product</Button>
                                <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                                    className={'modal-lg ' + this.props.className}>
                                    <ModalHeader toggle={this.toggleLarge}>Product</ModalHeader>
                                    <ModalBody>
                                        <Container className="card-design">
                                            <Row>
                                                <Col md={{ size: 12 }}>
                                                    <Card>
                                                        <CardHeader tag="h2">Edit Product</CardHeader>
                                                        <CardBody>
                                                        {this.props.savingsProductUpdated && <Redirect to={`/savings-product/${this.props.savingsProduct.productId}`} />}
                                                            <Form onSubmit={this.save} action="POST" encType="application/json">
                                                                {this.props.error && (
                                                                    < Alert color="danger">{this.props.error.msg}</Alert>
                                                                )}
                                                                <FormGroup>
                                                                    <Row>
                                                                        <Col md={{ size: 6 }}>
                                                                            <FormGroup>
                                                                                <Label for="name">Product Name</Label>
                                                                                <Input
                                                                                    type="text"
                                                                                    name="productName"
                                                                                    id="productName"
                                                                                    placeholder="Product Name"
                                                                                    // required="required"
                                                                                    defaultValue={this.props.savingsProduct && this.props.savingsProduct.productName}
                                                                                    onChange={this.onChanged}
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col md={{ size: 6 }}>
                                                                            <FormGroup>
                                                                                <Label for="money Value">Money Value</Label>
                                                                                <Input
                                                                                    type="text"
                                                                                    placeholder="Enter whole (&#8358;) or zero for none"
                                                                                    min="0"
                                                                                    max="10000"
                                                                                    step="1"
                                                                                    // value=""
                                                                                    name="moneyValue"
                                                                                    id="moneyValue"
                                                                                    // required="required"
                                                                                    // type="decimal"
                                                                                    // name="moneyValue"
                                                                                    // id="moneyValue"
                                                                                    // placeholder="Money Value"
                                                                                    defaultValue={this.props.savingsProduct && this.props.savingsProduct.moneyValue}
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
                                                                                <Label for="Product Duration">Product Duration</Label>
                                                                                <Input
                                                                                    type="text"
                                                                                    name="productDuration"
                                                                                    id="productDuration"
                                                                                    placeholder="Product Duration"
                                                                                    maxLength="4"
                                                                                    // required="required"
                                                                                    defaultValue={this.props.savingsProduct && this.props.savingsProduct.productDuration}
                                                                                    onChange={this.onChanged} />
                                                                            </FormGroup>
                                                                        </Col>
                                                                    </Row>
                                                                </FormGroup>
                                                                {this.props.isLoading ? (
                                                                    <Spinner color="danger" />
                                                                ) : (
                                                                        <Button color="success">Update</Button>
                                                                        

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
                                                                <ModalHeader toggle={this.toggleSuccess}>Update Product</ModalHeader>
                                                                <ModalBody>
                                                                   Successfully updated!
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
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="secondary" onClick={this.toggleLarge}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    savingsProduct: state.savingsProduct.savingsProduct,
    isLoading: state.savingsProduct.isLoading,
    savingsProductUpdated: state.savingsProduct.savingsProductUpdated,
    error: state.savingsProduct.error
});

const mapDispatchToProps = dispatch => ({
    onEditSavingsProductInit: (productId) => dispatch(editSavingsProductInit(productId)),
    onEditSavingsProduct: savingsProductData => dispatch(editSavingsProduct(savingsProductData))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit_Customer);
