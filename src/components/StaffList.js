import React from "react";
import { Link } from "react-router-dom";
// import Moment from "react-moment";
import {
	Card,
    CardBody,
    Badge,
    Row,
    Col,
    CardHeader,
    Table
} from "reactstrap";

function StaffRow(props) {
    const staff = props.staff
    const StaffLink = `/staff/${staff.staffId}`
  
    const getBadge = (entryDate) => {
      return entryDate === 'Active' ? 'success' :
        entryDate === 'Inactive' ? 'secondary' :
          entryDate === 'Pending' ? 'warning' :
            entryDate === 'Banned' ? 'danger' :
              'primary'
    }
  
    return (
      <tr key={staff.staffId.toString()}>
        <th scope="row"><Link to={StaffLink}>{staff.staffId}</Link></th>
        <td><Link to={StaffLink}>{staff.fullName}</Link></td>
        <td>{staff.email}</td>
        <td>{staff.phoneNo}</td>
        <td>{staff.department}</td>
        <td>{staff.dateEmployed}</td>
        <td><Link to={StaffLink}><Badge color={getBadge(staff.entryDate)}>{staff.entryDate}</Badge></Link></td>
  
      </tr>
    )
  }

const StaffList = ({staffs}) => {
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
                    <th scope="col">staffId</th>
                    <th scope="col">FullName</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Department</th>
                    <th scope="col">Date Employed</th>
                    <th scope="col">Entry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {staffs.map((staff, index) =>
                    <StaffRow key={index} staff={staff} />
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
	);
};

export default StaffList;



