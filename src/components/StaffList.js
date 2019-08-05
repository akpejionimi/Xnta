import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import * as dateFns from 'date-fns';
// import Moment from "react-moment";
import {
  Card,
  CardBody,
  Badge,
  Row,
  Col,
  CardHeader,
  Table,
  Button
} from "reactstrap";

import { deleteStaff, deleteStaffInit } from "../components/Store/actions/staff";


function StaffRow(props) {
  const staff = props.staff
  const StaffLink = `/staff/${staff.staffId}`
  const StaffEditLink = `/staff/edit/${staff.staffId}`


  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }
  return (
    <tr key={staff.staffId.toString()}>
      {/* <th scope="row"><Link to={StaffLink}>{staff.staffId}</Link></th> */}
      <td><Link to={StaffLink}>{staff.fullName}</Link></td>
      <td>{staff.email}</td>
      <td>{staff.phoneNo}</td>
      <td>{staff.gender}</td>
      <td>{staff.department}</td>
      <td><Link to={StaffLink}><Badge color={getBadge(staff.status)}>{staff.status}</Badge></Link></td>
      <td>{dateFns.format(staff.dateEmployed,"DD-MM-YYYY")}</td>
      <td>{dateFns.format(staff.entryDate,"DD-MM-YYYY")}</td>
      <td><Link to={StaffEditLink}><Button color="primary">Edit</Button></Link>
        <Button onClick={() => props.removeStaff(staff)} color="danger">Remove</Button>
      </td>
    </tr>
  )
}

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.removeStaff = this.removeStaff.bind(this)
  }
  removeStaff(staff) {
    console.log(this.props);
    this.props.onDeleteStaff(staff.staffId)
  }

  render() {
    return (
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Staff <small className="text-muted">List</small>
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    {/* <th scope="col">CustomerId</th> */}
                    <th scope="col">FullName</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Department</th>
                    <th scope="col">status</th>
                    <th scope="col">registered</th>
                    <th scope="col">Entry Date</th>
                    <th scope="col">Actions</th>

                  </tr>
                </thead>
                <tbody>
                  {this.props.staffs.map((staff, index) =>
                    <StaffRow key={index} staff={staff} removeStaff={this.removeStaff} />
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

    );
  }
};
const mapStateToProps = state => ({
  staff: state.staff.staff,
  staffDeleted: state.staff.staffDeleted
});

const mapDispatchToProps = dispatch => ({
  onDeleteStaffInit: (staffId) => dispatch(deleteStaffInit(staffId)),
  onDeleteStaff: staffId => dispatch(deleteStaff(staffId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffList);




