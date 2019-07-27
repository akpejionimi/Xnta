import React, { Component } from 'react';

import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import {Card,Col, Row } from 'reactstrap';


import CustomerList from '../../../components/CustomerList'
import { getCustomers } from "../../../components/Store/actions/customer";


class Customers extends Component {
  componentDidMount() {
    this.props.onGetCustomers();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <div className="customers">
                <div className="customers">
                  {this.props.isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Spinner color="dark" />
                    </div>
                  ) : (
                      <CustomerList customers={this.props.customers} />
                    )}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  customers: state.customer.customers,
  isLoading: state.customer.isLoading,
  // isAuth: state.auth.token !== null,

});

const mapDispatchToProps = dispatch => ({
  onGetCustomers: () => dispatch(getCustomers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customers);

