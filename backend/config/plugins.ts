export default ({ env }) => ({
  // Email configuration removed to avoid nodemailer dependency issues
  // Add email configuration later if needed
  
  upload: {
    config: {
      provider: env('CLOUDINARY_NAME') ? '@strapi/provider-upload-cloudinary' : '@strapi/provider-upload-local',
      providerOptions: env('CLOUDINARY_NAME') ? {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      } : {},
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
