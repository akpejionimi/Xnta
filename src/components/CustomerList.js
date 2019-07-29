import React from "react";
import { Link } from "react-router-dom";
// import {connect} from 'react-redux'
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

// import { deleteCustomer, deleteCustomerInit } from "../components/Store/actions/customer";

function CustomerRow(props) {
  const customer = props.customer
  const CustomerLink = `/customer/${customer.customerId}`
  const CustomerEditLink = `/customers/edit/${customer.customerId}`
  // const CustomerDeleteLink = `/customer/del/${customer.customerId}`

  const getBadge = (entryDate) => {
    return entryDate === 'Active' ? 'success' :
      entryDate === 'Inactive' ? 'secondary' :
        entryDate === 'Pending' ? 'warning' :
          entryDate === 'Banned' ? 'danger' :
            'primary'
  }
  return (
    <tr key={customer.customerId.toString()}>
      <th scope="row"><Link to={CustomerLink}>{customer.customerId}</Link></th>
      <td><Link to={CustomerLink}>{customer.fullName}</Link></td>
      <td>{customer.email}</td>
      <td>{customer.phoneNo}</td>
      <td>{customer.accountNo}</td>
      <td>{customer.registrationDate}</td>
      <td><Link to={CustomerLink}><Badge color={getBadge(customer.entryDate)}>{customer.entryDate}</Badge></Link></td>
      <td><Link to={CustomerEditLink}><Button color="primary">Edit</Button></Link>
          {/* <Button onClick={this.props.customer.customerId} color="danger">Remove</Button> */}
          </td>
    </tr>
  )
}

const CustomerList = ({ customers }) => {
  return (
    <Row>
      <Col xl={12}>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Customers <small className="text-muted">List</small>
          </CardHeader>
          <CardBody>
            <Table responsive hover>
              <thead>
                <tr>
                  <th scope="col">CustomerId</th>
                  <th scope="col">FullName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Account Number</th>
                  <th scope="col">registered</th>
                  <th scope="col">Entry Date</th>
                  <th scope="col">Actions</th>

                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) =>
                  <CustomerRow key={index} customer={customer} />
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
 
  );
};
// const mapStateToProps = state => ({
//   customer: state.customer.customer,
//   customerDeleted: state.customer.customerDeleted
// });

// const mapDispatchToProps = dispatch => ({
//   onDeleteCustomerInit: (customerId) => dispatch(deleteCustomerInit(customerId)),
//   onDeleteCustomer: customerId => dispatch(deleteCustomer(customerId))
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CustomerList);

export default CustomerList;



