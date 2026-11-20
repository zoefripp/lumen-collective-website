const withMDX = require('@next/mdx')()

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/our-team',
        destination: '/about#meet-zoe',
        permanent: true,
      },
      {
        source: '/services/support-coordination',
        destination: '/support-coordination',
        permanent: true,
      },
      {
        source: '/services/recovery-coaching',
        destination: '/recovery-coaching',
        permanent: true,
      },
      {
        source: '/services/counselling',
        destination: '/counselling',
        permanent: true,
      },
    ];
  },
})
