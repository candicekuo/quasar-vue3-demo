const routes = [
  {
    path: '/overview',
    name: 'overview',
    component: () => import('pages/Login'),
    meta: {
      title: 'CMS Map',
      icon: 'pin_drop',
      hide: true,
      hideChildren: false,
      permissions: 'sidebar:cms_map',
    },
  },
];

export default routes;
