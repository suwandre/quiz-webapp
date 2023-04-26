const withFonts = require('next-fonts');
const withVideos = require('next-videos');

module.exports = withVideos(withFonts({
  webpack(config, options) {
    return config;
  }
}));