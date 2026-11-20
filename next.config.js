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
    ];
  },
})
