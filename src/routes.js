import React from 'react';

//Staff
const AllStaff = React.lazy(() => import('./views/Base/Cards/AllStaff'));
const AddStaff = React.lazy(() => import('./views/Base/Forms/AddStaff'));
const StaffDetails = React.lazy(() => import('./views/Base/Cards/StaffDetails'));
const EditStaff = React.lazy(() => import('./views/Base/Forms/EditStaff'));

const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
//Customer
const AddCustomer = React.lazy(() => import('./views/Icons/Add-customer/Add-Customer'));
const Customers = React.lazy(() => import('./views/Icons/SimpleLineIcons/AllCustomers'));
const CustomerDetails =React.lazy(() => import('./views/Icons/FontAwesome/CustomerDetails'));
const EditCustomer =React.lazy(() => import('./views/Icons/Add-customer/EditCustomer'));
// const DeleteCustomer =React.lazy(() => import('./views/Icons/FontAwesome/DeleteCustomer'));

const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/dashboard', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  //Staff routes
  { path: '/staff', exact: true, name: 'Staff',component: AllStaff },
  { path: '/staff/all-staff', name: 'All Staff', component: AllStaff },
  { path: '/staff/add-staff', name: 'Add Staff', component: AddStaff },
  { path: '/staff/:staffId',exact: true, name: 'staff details', component: StaffDetails },
  { path: '/staff/edit/:staffId',exact: true, name: ' Edit Staff', component: EditStaff },

  //customer routes
  { path: '/customers', exact: true, name: 'Customers',component: Customers},
  { path: '/customers/add-customer',exact: true, name: 'Add customer', component: AddCustomer },
  { path: '/customers/all-customer', exact:true, name: 'All customers', component: Customers },
  { path: '/customers/:customerId', exact: true, name: 'customer details', component: CustomerDetails },
  { path: '/customers/edit/:customerId',exact: true, name: 'Edit Customer', component: EditCustomer },
  // { path: '/customer/del/:customerId', exact: true, name: 'customer delete', component: DeleteCustomer },

  //Products
  { path: '/product', exact: true, name: 'Products', component: Alerts },
  { path: '/product/product-sign-up', name: 'Product Sign-up', component: Alerts },
  { path: '/product/product-payment', name: 'Product Payments', component: Badges },
  { path: '/product/product-savings', name: 'Product Savings', component: Modals },
  { path: '/settings', name: 'Settings', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
