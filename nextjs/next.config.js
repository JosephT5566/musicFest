const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/timeline': { page: '/timeline' },
      '/map': { page: '/map' },
      '/links': { page: '/links' },
    }
  },
  assetPrefix: !debug ? '/musicFest/' : ''
}