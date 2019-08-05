export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Staff',
      url: '/staff',
      icon: 'icon-people',
      children: [
        {
          name: 'All staff',
          url: '/staff/all-staff',
          icon: 'icon-people',
        },
        {
          name: 'Add Staff',
          url: '/staff/add-staff',
          icon: 'icon-user-follow',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
      ],
    },
    {
      name: 'Customer',
      url: '/customer',
      icon: 'icon-people',
      children: [
        {
          name: 'All customers',
          url: '/customers/all-customer',
          icon: 'icon-people',
          
        },
        {
          name: 'Add customer',
          url: '/customers/add-customer',
          icon: 'icon-user-follow',
          badge: {
            variant: 'secondary',
            text: 'NEW',
          },
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star',
        },
      ],
    },
    {
      title: true,
      name: 'Products',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Products',
      url: '/product',
      icon: 'icon-bell',
      children: [
        {
          name: 'Products Sign ups',
          url: '/product/product-sign-up',
          icon: 'icon-bell',
        },
        {
          name: 'Product Payments',
          url: '/product/product-payment',
          icon: 'icon-bell',
        },
        {
          name: 'Savings product',
          url: '/product/product-savings',
          icon: 'icon-bell',
        },
      ],
    },
    
    {
      divider: true,
    },
    {
      title: true,
      name: 'Extras',
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'icon-ban',
      attributes: { disabled: true },
    },
    
  ],
};
