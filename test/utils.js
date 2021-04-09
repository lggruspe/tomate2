/// Test utils.

exports.mockAudio = () => {
  before(() => {
    global.Audio = class {}
  })

  after(() => {
    delete global.Audio
  })
}
