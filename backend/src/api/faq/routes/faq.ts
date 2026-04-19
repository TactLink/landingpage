export default {
  routes: [
    {
      method: 'GET',
      path: '/faqs',
      handler: 'faq.find',
      config: {
        policies: [],
      },
    },
  ],
};
