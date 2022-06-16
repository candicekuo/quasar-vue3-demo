const routes = [
  {
    path: '/overview',
    name: 'overview',
    component: () => import('pages/Login'),
    meta: {
      title: 'overview',
      icon: 'pin_drop',
      hide: false,
      hideChildren: true,
      permissions: 'sidebar:overview',
    },
  },
];

export default routes;
