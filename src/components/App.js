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

      const ownerCount = await smartcommons.methods.ownerCount.call()
      const buyerCount = await smartcommons.methods.buyerCount.call()
      this.setState({ ownerCount })
      this.setState({ buyerCount })
      //Load members
      // for (var i = 1; i <= buyerCount; i++){
      //   const buyer = await smartcommons.methods.buyersOfProperty(i).call()
      //   this.setState({
      //     properties: [...this.state.buyersOfProperty, buyer]
      //   })
      // }
      for (var j = 1; j <= ownerCount; j++){
        const owner = await smartcommons.methods.ownersOfProperty(j).call()
        this.setState({
          owners: [...this.state.ownersOfProperty, owner]
        })
      }

      console.log("these are number of properties")
      //console.log(propertyCount.toString())
      console.log(this.state.properties)
      console.log("these are number of members")
      console.log(ownerCount.toString())
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
      buyers: [],
    }
    this.addProperty = this.addProperty.bind(this)
    this.addMember = this.addMember.bind(this)
  }

  addProperty(name, location, owner, price){
    this.setState({ loading: true })
    this.state.smartcommons.methods.addProperty(name, location, this.state.account, price).send({ from: this.state.account }).once('receipt', (receipt) => {this.setState({ loading: false })})
  }

  addMember(name, type, budget){
    const webthree = window.web3
    this.setState({ loading: true })
    var newAccount = webthree.eth.accounts.create();
    console.log("new account:")
    console.log(newAccount.address)
    this.state.smartcommons.methods.addMember(newAccount.address, name, type, budget).send({ from: this.state.account }).once('receipt', (receipt) => {this.setState({ loading: false })})
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
          <main role="main" className="col-lg-12 d-flex">
            { this.state.loading
            ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
            : <Main 
              properties={this.state.properties}
              owners={this.state.owners} 
              addProperty={this.addProperty}
              addMember={this.addMember} />
            }
          </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
