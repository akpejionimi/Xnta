import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import * as dateFns from 'date-fns';
import {
	Spinner,
	Container,
	Card,
	CardBody,
	CardHeader,
	Col,
	Button,
	Row,
	Table
} from "reactstrap";

import { getSingleStaff } from "../../../components/Store/actions/staff";

class StaffDetail extends Component {
	componentDidMount = () => {
		const staffId = +this.props.match.params.staffId;
		this.props.onGetSingleStaff(staffId);
	};

	render() {
		const btnStyle = {
            float: 'right',
           
          };
		const { staff } = this.props;
		const staffDetail = staff ? Object.entries(staff) : [['staffId', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
		return (
			<div className="animated fadeIn">
				<Row>
					<Col lg={{ size: 6, offset: 3 }} >
						<Card>
							<CardHeader>
							<Link to={`/staff/edit/${this.props.match.params.staffId}`}><Button style={btnStyle} color="outline-primary" size="lg">Edit Staff</Button></Link>
							</CardHeader>
							<CardBody>
								<Container>
									<h1>Staff Details</h1>
									{this.props.isLoading ? (
										<div style={{ display: "flex", justifyContent: "center" }}>
											<Spinner color="dark" />
										</div>
									) : (
											<Table responsive striped hover>
												<tbody>
													{
														staffDetail.map(([key, value]) => {
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
	staff: state.staff.staff,
	isLoading: state.staff.isLoading
});

const mapDispatchToProps = dispatch => ({
	onGetSingleStaff: staffId => dispatch(getSingleStaff(staffId))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StaffDetail);