export default ({ env }) => ({
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'en',
      locales: ['en', 'zh', 'id'],
    },
  },

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
