import React, {Component} from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import * as dateFns from "date-fns";
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

import { deleteCustomer, deleteCustomerInit } from "../components/Store/actions/customer";

function CustomerRow(props) {
  const customer = props.customer
  const CustomerLink = `/customers/${customer.customerId}`
  const CustomerEditLink = `/customers/edit/${customer.customerId}`
  

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          // entryDate === 'Banned' ? 'danger' :
            'primary'
  }
  return (
    <tr key={customer.customerId.toString()}>
      {/* <th scope="row"><Link to={CustomerLink}>{customer.customerId}</Link></th> */}
      <td><Link to={CustomerLink}>{customer.fullName}</Link></td>
      <td>{customer.email}</td>
      <td>{customer.phoneNo}</td>
      <td>{customer.gender}</td>
      <td>{customer.accountNo}</td>
      <td><Link to={CustomerLink}><Badge color={getBadge(customer.status)}>{customer.status}</Badge></Link></td>
      <td>{dateFns.format(customer.registrationDate,"DD-MM-YYYY")}</td>
      <td>{dateFns.format(customer.entryDate,"DD-MM-YYYY")}</td>
      <td><Link to={CustomerEditLink}><Button color="primary"><i className= "fa fa-edit"></i></Button></Link>
          <Button onClick={() => props.removeCustomer(customer)} color="danger"><i className= "fa fa-trash"></i></Button>
          </td>
    </tr>
  )
}

class CustomerList extends Component {
  constructor(props){
    super(props);
    this.state = {}

    this.removeCustomer = this.removeCustomer.bind(this)
  }
  removeCustomer (customer) {
    console.log(this.props);
    
    this.props.onDeleteCustomer(customer.customerId)
  }
  // CustomerEdit (customer) {    
    
  // }


  render(){
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
                    {/* <th scope="col">CustomerId</th> */}
                    <th scope="col">FullName</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Account No.</th>
                    <th scope="col">Status</th>
                    <th scope="col">registered</th>
                    <th scope="col">Entry Date</th>
                    <th scope="col">Actions</th>
  
                  </tr>
                </thead>
                <tbody>
                  {this.props.customers.map((customer, index) =>
                    <CustomerRow key={index} customer={customer} removeCustomer={this.removeCustomer}/>
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
)(CustomerList);




