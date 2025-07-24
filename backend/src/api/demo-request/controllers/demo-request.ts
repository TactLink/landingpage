/**
 * demo-request controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::demo-request.demo-request', ({ strapi }) => ({
  async create(ctx) {
    // Create the entry as usual
    const response = await super.create(ctx);

    // Extract submitted data
    const { name, email, organization, role, memberSize, country, phone } = ctx.request.body.data;

    // Determine recipient based on country
    let to = 'info@tactlink.com'; // default for Singapore and Other
    if (country === 'Thailand') to = 'info.thailand@tactlink.com';
    else if (country === 'Indonesia') to = 'info.indonesia@tactlink.com';
    else if (country === 'Cambodia') to = 'info.cambodia@tactlink.com';
    else if (country === 'Malaysia') to = 'info.malaysia@tactlink.com';
    else if (country === 'Vietnam') to = 'info.vietnam@tactlink.com';

    // Send email
    await strapi.plugin('email').service('email').send({
      to,
      subject: 'New Demo Request',
      text: `New request from ${name} (${email})`,
      html: `
        <p>New request from <strong>${name}</strong> (${email})</p>
        <p>Organization: ${organization}</p>
        <p>Role: ${role}</p>
        <p>Member Size: ${memberSize}</p>
        <p>Country: ${country}</p>
        <p>Phone: ${phone}</p>
      `,
    });

    return response;
  }
}));
