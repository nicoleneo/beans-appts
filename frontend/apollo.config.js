module.exports = {
    client: {
      service: {
        name: 'Beans Appointments',
        // URL to the GraphQL API
        url: `${process.env.VUE_APP_MY_API}/graphql`,
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }