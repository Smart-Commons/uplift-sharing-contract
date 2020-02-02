import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar'
import Main from './Main'
import SmartCommons from '../abis/SmartCommons.json'


class App extends Component {
  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = SmartCommons.networks[networkId]

    if(networkData) {
      const smartcommons = web3.eth.Contract(SmartCommons.abi, networkData.address)
      this.setState({ smartcommons })
      const propertyCount = await smartcommons.methods.propertyCount.call()
      this.setState({ propertyCount })
      //Load properties
      for (var i = 1; i <= propertyCount; i++){
        const property = await smartcommons.methods.properties(i).call()
        this.setState({
          properties: [...this.state.properties, property]
        })
      }

      const buyerCount = await smartcommons.methods.buyerCount.call()
      console.log(buyerCount)
      for (var j = 1; j <= buyerCount; j++){
        const buyer = await smartcommons.methods.buyersOfProperty(j).call()
        this.setState({
          buyersOfProperty: [...this.state.buyersOfProperty, buyer]
        })
      }

      const ownerCount = await smartcommons.methods.ownerCount.call()
      for (var k = 1; k <= ownerCount; k++){
          const owner = await smartcommons.methods.owners(k).call()
          this.setState({
            owners: [...this.state.owners, owner]
          })
      }

      const salesCount = await smartcommons.methods.propertySaleCount.call()
      for (var s = 1; s <= salesCount; s++){
        const property_sale = await smartcommons.methods.propertySales(s).call()
        this.setState({
          propertySales: [...this.state.propertySales, property_sale]
        })
      }

      const equityShareCount = await smartcommons.methods.nrofInvestments.call()
      for (var k = 1; k <= equityShareCount; k++){
          const funder = await smartcommons.methods.funders(k).call()
          this.setState({
            funders: [...this.state.funders, funder]
          })
      }

      this.setState({ ownerCount })
      this.setState({ buyerCount })
      this.setState({ salesCount })      

      this.setState({loading: false})
    } else {
      window.alert('SmartCommons contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      propertyCount: 0,
      properties: [],
      loading: true,
      ownerCount: 0,
      owners: [],
      buyerCount: 0,
      buyersOfProperty: [],
      salesCount: 0,
      propertySales: [],
      funders: [],
      equityShareCount: 0,
    }
    this.addProperty = this.addProperty.bind(this)
    this.addMember = this.addMember.bind(this)
    this.createSaleTransaction = this.createSaleTransaction.bind(this)
  }

  addProperty(name, location, owner_id, registered_valuation, sell_value, uplift_percentage, registered_date){
    this.setState({ loading: true })
    this.state.smartcommons.methods.addProperty(name, location, owner_id, registered_valuation, sell_value, uplift_percentage, registered_date).send({ from: this.state.account }).once('receipt', (receipt) => {this.setState({ loading: false })})
  }

  addMember(name, type, budget){
    this.setState({ loading: true })
    this.state.smartcommons.methods.addMember(name, type, budget).send({ from: this.state.account }).once('receipt', (receipt) => {this.setState({ loading: false })})
  }

  createSaleTransaction(propertyId, buyerId, upliftValue, upliftContRate) {
    this.setState({ loading: true })
    this.state.smartcommons.methods.createSaleTransaction(propertyId, buyerId, upliftValue, upliftContRate).send({from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid">
          <div className="row">
          <main role="main" className="col-lg-12 d-flex">
            { this.state.loading
            ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
            : <Main 
              funders={this.state.funders}
              properties={this.state.properties}
              propertySales={this.state.propertySales}
              buyersOfProperty={this.state.buyersOfProperty} 
              owners={this.state.owners}
              addProperty={this.addProperty}
              addMember={this.addMember}
              createSaleTransaction={this.createSaleTransaction} />
            }
          </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
