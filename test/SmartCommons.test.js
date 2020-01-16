const Smartcommons = artifacts.require('./SmartCommons.sol')
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('SmartCommons', ([deployer, owner, buyer]) => {
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

  describe('properties', async () => {
    let result, propertyCount, newOwner, newBuyer, buyerCount, ownerCount
    before(async () => {
      result = await smartcommons.addProperty('Cool Apt.', 'Berlin', owner, 300000)
      newOwner = await smartcommons.addMember('testBuyer', 'buyer', 500000)
      newBuyer = await smartcommons.addMember('testBuyer2', 'buyer', 100000)
      propertyCount = await smartcommons.propertyCount()
      ownerCount = await smartcommons.ownerCount()
      buyerCount = await smartcommons.buyerCount()
    })

    it('creates properties', async () => {
      assert.equal(propertyCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), propertyCount.toNumber(), 'id is correct')
      assert.equal(event.name, 'Cool Apt.', 'name is correct')
      assert.equal(event.price, 300000, 'price is correct')
      // TODO: you should test the owner here somehow.
      await await smartcommons.addProperty('', 'Berlin', owner, 0).should.be.rejected;
      await await smartcommons.addProperty('Example', 'Berlin', owner, 0).should.be.rejected;
    })

    it('should add a new member', async () => {
      // Set the names of test data
      var memberName = "TestBuyer";
      var  memberStatus = "buyer";
      var memberBudget = 6000;

      var smartCommonsContract;

      return Smartcommons.deployed().then(function(instance) {
        smartCommonsContract = instance;
        return instance.addMember(memberName, memberStatus, memberBudget);
      }).then(function(){
        return smartCommonsContract.getBuyer(3);
      }).then(function(result){
        var name = result;
        assert.equal(name, "TestBuyer", "Buyer name is correct.")
      })
    })
    
    

  })
})