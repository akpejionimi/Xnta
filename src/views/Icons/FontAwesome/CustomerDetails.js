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

import { getSingleCustomer } from "../../../components/Store/actions/customer";

class CustomerDetails extends Component {
    componentDidMount = () => {
        const customerId = +this.props.match.params.customerId;
        this.props.onGetSingleCustomer(customerId);

    };
 
    render() {
        const btnStyle = {
            float: 'right',
           
          };
        // const {customer} = customer.find(customer => customer.customerId.toString() === this.props.match.params.customerId)
        const { customer } = this.props;
        console.log(customer);
        
        const customerDetail = customer ? Object.entries(customer) : [['customerId', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={{ size: 6, offset: 3 }} >
                        <Card>
                            <CardHeader className="tx-right">
                                <Link to={`/customers/edit/${this.props.match.params.customerId}`}><Button style={btnStyle} color="outline-primary" size="lg">Edit Customer</Button></Link>

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