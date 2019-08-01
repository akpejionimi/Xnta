import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Container,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    Table
} from "reactstrap";

import { deleteCustomer, deleteCustomerInit } from "../../../components/Store/actions/customer";

class DeleteCustomer extends Component {
    componentDidMount = () => {
        const customerId = +this.props.match.params.customerId;
        this.props.onDeleteCustomerInit(customerId);
    };

    render() {
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
    customerDeleted: state.customer.customerDeleted
});

const mapDispatchToProps = dispatch => ({
    onDeleteCustomerInit: (customerId) => dispatch(deleteCustomerInit(customerId)),
    onDeleteCustomer: customerId => dispatch(deleteCustomer(customerId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteCustomer);