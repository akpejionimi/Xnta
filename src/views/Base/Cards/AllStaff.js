import React, { Component } from 'react';

import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import {Card,Col, Row } from 'reactstrap';


import StaffList from '../../../components/StaffList'
import { getStaffs } from "../../../components/Store/actions/staff";


class Customers extends Component {
  componentDidMount() {
    this.props.onGetStaffs();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <div className="staffs">
                <div className="staffs">
                  {this.props.isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Spinner color="dark" />
                    </div>
                  ) : (
                      <StaffList staffs={this.props.staffs} />
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
  staffs: state.staff.staffs,
  isLoading: state.staff.isLoading,
});

const mapDispatchToProps = dispatch => ({
  onGetStaffs: () => dispatch(getStaffs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customers);

