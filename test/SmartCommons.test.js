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
      newOwner = await smartcommons.addMember(owner, 'Owner Test', 'owner', 500000)
      newBuyer = await smartcommons.addMember(buyer, 'Buyer Test', 'buyer', 900000)
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
      var memberName = "TestOwner";
      var  memberStatus = "owner";
      var memberAccount = owner;
      var memberBudget = 600000;

      var smartCommonsContract;

      return Smartcommons.deployed().then(function(instance) {
        smartCommonsContract = instance;
        return instance.addMember(memberAccount, memberName, memberStatus, memberBudget);
      }).then(function(){
        return smartCommonsContract.getOwner(memberAccount);
      }).then(function(result){
        var name = result;
        assert.equal(name, "TestOwner", "Owner name is correct.")
      })
    })
    
    it('should create a sales transaction', async () => {
      var commons;
      const event = result.logs[0].args

      return Smartcommons.deployed().then(function(instance) {
        commons = instance;
        return commons.createSaleTransaction(event.id, buyer, 5000, 100);
      }).then(function(result) {
        const transactionDetails = result.logs[0].args
        assert.equal('Cool Apt.', transactionDetails.propertyName, 'Sold apt. name is correct.')
        assert.equal(5000, transactionDetails.uplift_value, 'Uplift value of the transaction is correct.')
        assert.equal(100, transactionDetails.uplift_cont_rate, 'Uplift cont rate of the transaction is correct')
      })
    })

  })
})