/// Test utils.

exports.mockAudio = () => {
  before(() => {
    global.$STATIC = '/'
    global.Audio = class {}
  })

  after(() => {
    delete global.$STATIC
    delete global.Audio
  })
}
