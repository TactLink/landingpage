export default ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.mailgun.org'),
        port: env.int('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME', 'tactlink@sandbox9731a2a5156a4eb99fb34cbb7d9f1be6.mailgun.org'),
          pass: env('SMTP_PASSWORD', '2ce89a481663acb2941897c622800bbb-45de04af-cfe22994'),
        },
        secure: env.bool('SMTP_SECURE', false),
      },
      settings: {
        defaultFrom: env('SMTP_FROM', 'tactlink@sandbox9731a2a5156a4eb99fb34cbb7d9f1be6.mailgun.org'),
        defaultReplyTo: env('SMTP_REPLY_TO', 'tactlink@sandbox9731a2a5156a4eb99fb34cbb7d9f1be6.mailgun.org'),
      },
    },
  },
});
