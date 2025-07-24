export default {
  routes: [
    {
      method: 'GET',
      path: '/partners',
      handler: 'partner.find',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/partners/:id',
      handler: 'partner.findOne',
      config: {
        policies: [],
      },
    },
  ],
}; 