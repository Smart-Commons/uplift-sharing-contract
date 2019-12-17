const Smartcommons = artifacts.require('./SmartCommons.sol')
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('SmartCommons', ([deployer, seller, buyer]) => {
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

  describe('propertySales', async () => {
      let result, propertySaleCount

      before(async () => {
          result = await smartcommons.createPropertySale('Block 8th Apt.', 300000, 200000, 10, 'Berlin', { from: seller })
          propertySaleCount = await smartcommons.propertySaleCount()
      })

      it('creates propertySale', async () => {
            assert.equal(propertySaleCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), propertySaleCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Block 8th Apt.', 'name is correct')
            assert.equal(event.price, '300000', 'price is correct')
            assert.equal(event.uplift_value, '200000', 'uplift value is correct')
            assert.equal(event.uplift_cont_rate, '10', 'uplift cont rate is correct')
            assert.equal(event.owner, seller, 'owner is correct')
            assert.equal(event.purchased, false, 'purchased is correct')
      })
  })
})