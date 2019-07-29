import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Spinner,
    Container,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table
} from "reactstrap";

import { getSingleCustomer } from "../../../components/Store/actions/customer";

class CustomerDetails extends Component {
    componentDidMount = () => {
        const customerId = +this.props.match.params.customerId;
        this.props.onGetSingleCustomer(customerId);
        
    };

    render() {
        // const {customer} = customer.find(customer => customer.customerId.toString() === this.props.match.params.customerId)
        const { customer } = this.props;
        const customerDetail = customer ? Object.entries(customer) : [['customerId', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={{ size: 6, offset: 3 }} >
                        <Card>
                            <CardHeader>
                                <strong><i className="icon-info pr-1"></i>Customer Id: {this.props.match.params.customerId}</strong>
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
                                                    customerDetail.map(([key, value]) => {
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
    customer: state.customer.customer,
    isLoading: state.customer.isLoading
});

const mapDispatchToProps = dispatch => ({
    onGetSingleCustomer: customerId => dispatch(getSingleCustomer(customerId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerDetails);