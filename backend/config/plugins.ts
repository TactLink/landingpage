export default ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.mailgun.org',
        port: 587,
        auth: {
          user: 'tactlink@sandbox9731a2a5156a4eb99fb34cbb7d9f1be6.mailgun.org',
          pass: '2ce89a481663acb2941897c622800bbb-45de04af-cfe22994',
        },
        secure: false,
      },
      settings: {
        defaultFrom: 'tactlink@sandbox9731a2a5156a4eb99fb34cbb7d9f1be6.mailgun.org',
        defaultReplyTo: 'tactlink@sandbox9731a2a5156a4eb99fb34cbb7d9f1be6.mailgun.org',
      },
    },
  },
});
