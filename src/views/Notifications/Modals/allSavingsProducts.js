import React, { Component } from 'react';

import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import {Card,Col, Row } from 'reactstrap';


import SavingsProductList from '../../../components/SavingsProductList'
import { getSavingsProduct } from "../../../components/Store/actions/savingsproduct";


class AllSavingsProducts extends Component {
  componentDidMount() {
    this.props.onGetSavingsProduct();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <div className="savingsProducts">
                <div className="savingsProducts">
                  {this.props.isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Spinner color="dark" />
                    </div>
                  ) : (
                      <SavingsProductList savingsProducts={this.props.savingsProducts} />
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
  savingsProducts: state.savingsProduct.savingsProducts,
  isLoading: state.savingsProduct.isLoading,
  // isAuth: state.auth.token !== null,

});

const mapDispatchToProps = dispatch => ({
  onGetSavingsProduct: () => dispatch(getSavingsProduct())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllSavingsProducts);

