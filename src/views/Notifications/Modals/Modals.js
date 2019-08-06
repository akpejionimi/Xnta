import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllSavingsProduct from "../Modals/allSavingsProducts"
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
import { addSavingsProduct, addSavingsProductInit } from "../../../components/Store/actions/savingsproduct";

class Modals extends Component {

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
    };

    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggleLargeView = this.toggleLargeView.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);

    let savProdCreationAction = false;
    store.subscribe(() => {
      const newVal = store.getState().savingsProduct.savingsProductCreated;

      if (savProdCreationAction !== newVal && newVal) {
        savProdCreationAction = newVal;
        this.toggleSuccess();
      }
    });
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
    e.target.reset();
    const formData = {
      productName: this.state.productName,
      productDuration: this.state.productDuration,
      moneyValue: this.state.moneyValue,
    };
    this.props.onAddSavingsProduct(JSON.stringify(formData));
    // console.log(formData);

  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Savings Products
              </CardHeader>
              <CardBody>
                <Button onClick={this.toggleLarge} className="mr-1">Add Product</Button>
                <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                  className={'modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleLarge}>Savings Product</ModalHeader>
                  <ModalBody>
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
                                        <Label for="name">Product Name</Label>
                                        <Input
                                          type="text"
                                          name="productName"
                                          id="productName"
                                          placeholder="Product Name"
                                          // required="required"
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
                                          onChange={this.onChanged} />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                </FormGroup>
                                {this.props.isLoading ? (
                                  <Spinner color="danger" />
                                ) : (
                                    <Button color="success">Create</Button>
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
                                <ModalHeader toggle={this.toggleSuccess}>Product Created</ModalHeader>
                                <ModalBody>
                                  Created Successfully!
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
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggleLarge}>Cancel</Button>
                  </ModalFooter>
                </Modal>

                <Button onClick={this.toggleLargeView} className="mr-1">View Savings Products</Button>
                <Modal isOpen={this.state.largeView} toggle={this.toggleLargeView}
                  className={'modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleLargeView}>Savings Products</ModalHeader>
                  <ModalBody>
                   <AllSavingsProduct/>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggleLargeView}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isLoading: state.savingsProduct.isLoading,
  savingsProductCreated: state.savingsProduct.savingsProductCreated,
  error: state.customer.error
});

const mapDispatchToProps = dispatch => ({

  onAddSavingsProductInit: () => dispatch(addSavingsProductInit()),
  onAddSavingsProduct: savingsProductData => dispatch(addSavingsProduct(savingsProductData))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modals);

