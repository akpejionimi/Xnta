import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Spinner,
    Container,
    Card,
    CardBody,
    CardHeader,
    Button,
    Col,
    Row,
    Table
} from "reactstrap";

import { getSingleSavingsProduct } from "../../../components/Store/actions/savingsproduct";

class SavingsProductDetails extends Component {
    componentDidMount = () => {
        const productId = +this.props.match.params.productId;
        this.props.onGetSingleSavingsProduct(productId);
        console.log(productId);
        
    };
 
    render() {
        const btnStyle = {
            float: 'right',
          };
        // const {savingsProduct} = savingsProduct.find(savingsProduct => savingsProduct.productId.toString() === this.props.match.params.productId)
        const { savingsProduct } = this.props;
        const savingsProductDetail = savingsProduct ? Object.entries(savingsProduct) : [['productId', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={{ size: 6, offset: 3 }} >
                        <Card>
                            <CardHeader className="tx-right">
                                <Link to={`/savings-products/edits/${this.props.match.params.productId}`}><Button style={btnStyle} color="outline-primary" size="lg">Edit Product</Button></Link>

                            </CardHeader>
                            <CardBody>
                                <Container>
                                    <h1>Details</h1>
                                    {this.props.isLoading ? (
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <Spinner color="dark" />
                                        </div>
                                    ) : (
                                            <Table responsive striped hover>
                                                <tbody>
                                                    {
                                                        savingsProductDetail.map(([key, value]) => {
                                                            return (

                                                                <tr key={key}>
                                                                    <td>{`${key}:`}</td>
                                                                    <td><strong>{value}</strong></td>
                                                                </tr>


                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        )}
                                </Container>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                
            </div>

        );
    }
}

const mapStateToProps = state => ({
    savingsProduct: state.savingsProduct.savingsProduct,
    isLoading: state.savingsProduct.isLoading
});

const mapDispatchToProps = dispatch => ({
    onGetSingleSavingsProduct : productId => dispatch(getSingleSavingsProduct(productId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SavingsProductDetails);