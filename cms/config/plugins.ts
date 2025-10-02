export default ({ env }) => ({
  preview: {
    enabled: true,
    config: {
      async handler(uid, { documentId, locale, status }) {
        const document = await strapi.documents(uid).findOne({ documentId });

        // Generate preview URL based on content type
        let pathname = '';
        if (uid === 'api::blog.blog') {
          pathname = `/blog/${document.slug}`;
        }

        return `${env('PREVIEW_URL')}${pathname}`;
      },
    },
  },
});
