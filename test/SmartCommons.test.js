const Smartcommons = artifacts.require('./SmartCommons.sol')

contract('SmartCommons', (accounts) => {
  let smartcommons

  before(async () => {
    smartcommons = await Smartcommons.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await smartcommons.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await smartcommons.name()
      assert.equal(name, 'Smart Commons')
    })

  })
})