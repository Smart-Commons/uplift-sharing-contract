## Smart Commons Solidity (ETH) Prototype

### Infrastructure Overview
![Smart Commons Infrastructure](infrastructure-overview.png)


### Installation.
First of all, download & install [Ganache](https://www.trufflesuite.com/ganachehttps://www.trufflesuite.com/ganache) 
<br />

Then clone the project to your computer.
<br />

`$ git clone git@github.com:lucidmindsai/smart-commons.git`
<br />

Navigate to the project's root folder.
<br />

`$ cd smart-commons`
<br />

Install all the project dependencies. Before that make sure you have `npm` installed in your computer. If not check [NPM Website](https://www.npmjs.com/https://www.npmjs.com/) for installation guideline.
<br />

If `npm` is in place, install all the dependencies:<br />
`$ npm install`
<br />


### __Attention.__
> Please note that all configuration to your local Ganache blockchain i.e., `127.0.0.1:7545` is already configured. On the other hand the default file structure of this Truffle project is changed: Smart contract files are moved under `/src` directory so the ***React App*** can reach them easily.


Now compile the whole project:<br />
`$ truffle compile`
<br />

Run the migrations:<br />

`$ truffle migration`
<br />

  > This is very similar to running migration on standart databases. But keep in mind that __blockchain is immutable__.


To test if everything is in place, let's do a quick try on the truffle console:<br />

`$ truffle console`
<br />

Then get a copy of the Smart Contract:
<br />

`truffle(development)> smartcommons = await SmartCommons.deployed()`
<br />

Retrieve the address of the contract:
<br />

`> smartcommons.address`
<br />

Get the name of the contract (check the constructor)
<br />

`name = await smartcommons.name()`
<br />

This will return `undefined`. Type `name` to see the result on the console.


Last but not least, run the whole test suite:
`$ truffle test`

<br />

If you ran into any problem(s), feel free to poke `@Oz` on Slack or reach him at `oguzhan@lucidminds.ai`.

