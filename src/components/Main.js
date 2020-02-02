import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content" className="row"> 
          <div id="addMember" className="col mr-5 ml-3">
          <h3>Member Registration</h3>
          <form className="registration-form mb-5" onSubmit={(event) => {
            event.preventDefault()
            const name = this.memberName.value
            const type = this.memberType.value
            const budget = this.memberBudget.value
            this.props.addMember(name, type, budget)
            }}>
            <div className="form-group mr-sm-2">
                <input
                id="memberName"
                type="text"
                ref={(input) => { this.memberName = input }}
                className="form-control"
                placeholder="Name"
                required />
            </div>
            <div className="form-group mr-sm-2">
                <input
                id="memberType"
                type="text"
                ref={(input) => { this.memberType = input }}
                className="form-control"
                placeholder="owner/buyer"
                required />
            </div>
            <div className="form-group mr-sm-2">
                <input
                id="memberBudget"
                type="text"
                ref={(input) => { this.memberBudget = input }}
                className="form-control"
                placeholder="Budget"
                required />
            </div>
        <button type="submit" className="btn btn-dark">register</button>
        </form>
        <p> </p>
            <h3>List of Participants</h3>
            <table className="table mt-5 mr-5">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Budget</th>
                <th scope="col">Member Type</th>
                </tr>
            </thead>
            <tbody id="buyersList">
                { this.props.buyersOfProperty.map((buyer, key) => {
                    return(
                        <tr key={key}>
                        <th scope="row"></th>
                        <td>{buyer.id.toString()}</td>
                        <td>{buyer.name}</td>
                        <td>{buyer.budget.toString()}</td>
                        <td>{buyer.memberType}</td>
                        </tr>
                    )
                    })}
            </tbody>
            <tbody id="ownersList">
                { this.props.owners.map((owner, key) => {
                    return(
                        <tr key={key}>
                        <th scope="row"></th>
                        <td>{owner.id.toString()}</td>
                        <td>{owner.name}</td>
                        <td>{owner.budget.toString()}</td>
                        <td>{owner.memberType}</td>
                        </tr>
                    )
                    })}
            </tbody>
            </table>
        <h3>Sales Transactions</h3>
            <table className="table mt-5 mr-5">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Property Id</th>
                <th scope="col">Property Name</th>
                <th scope="col">Prev Owner</th>
                <th scope="col">Current Owner</th>
                <th scope="col">Uplift by Infrastructure</th>
                <th scope="col">Uplift To Be Invested</th>
                <th scope="col">Algorithm Hash</th>
                </tr>
            </thead>
            <tbody id="salesTransactions">
                { this.props.propertySales.map((sale, key) => {
                    return(
                        <tr key={key}>
                        <th scope="row"></th>
                        <td>{sale.propertyId.toString()}</td>
                        <td>{sale.propertyName}</td>
                        <td>{sale.fromOwner}</td>
                        <td>{sale.toOwner}</td>
                        <td>{sale.uplift_value.toString()}</td>
                        <td>{sale.uplift_cont_rate.toString()}</td>
                        <td>{sale.algoHash}</td>
                        </tr>
                    )
                    })}
            </tbody>
            </table>
            </div>

        <div className="col ml-5">
            <h3>List of equity contributors</h3>
            <table className="table mt-5 mr-5">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Participant</th>
                <th scope="col">Amount</th>
                </tr>
            </thead>
            <tbody id="fundersList">
                { this.props.funders.map((funder, key) => {
                    return(
                        <tr key={key}>
                        <th scope="row"></th>
                        <td>{funder.funder}</td>
                        <td>{funder.total_amount.toString()}</td>
                        </tr>
                    )
                    })}
            </tbody>
            </table>
        </div>
        <div className="col ml-5">
            <h3>Register a Property</h3>
            <form className="mb-5" onSubmit={(event) => {
            event.preventDefault()
            const name = this.propertyName.value
            const location = this.propertyLocation.value
            const owner_id = this.propertyOwner.value
            const registered_valuation = this.propertyValuation.value
            const sell_value = this.propertySellValue.value
            const uplift_percentage = this.propertyUplift.value
            const registered_date = this.propertyDate.value
            this.props.addProperty(name, location, owner_id, registered_valuation, sell_value, uplift_percentage, registered_date)
            }}>
            <div className="form-group mr-sm-2">
                <input
                id="propertyName"
                type="text"
                ref={(input) => { this.propertyName = input }}
                className="form-control"
                placeholder="Name"
                required />
            </div>

            <div className="form-group mr-sm-2">
                <input
                id="propertyLocation"
                type="text"
                ref={(input) => { this.propertyLocation = input }}
                className="form-control"
                placeholder="location"
                required />
            </div>
            
            <div className="form-group mr-sm-2">
                <input
                id="propertyOwner"
                type="text"
                ref={(input) => { this.propertyOwner = input }}
                className="form-control"
                placeholder="Owner ID"
                required />
            </div>

            <div className="form-group mr-sm-2">
                <input
                id="propertyValuation"
                type="text"
                ref={(input) => { this.propertyValuation = input }}
                className="form-control"
                placeholder="Registered Valuation"
                required />
            </div>

            <div className="form-group mr-sm-2">
                <input
                id="propertySellValue"
                type="text"
                ref={(input) => { this.propertySellValue = input }}
                className="form-control"
                placeholder="Current Sell Value"
                required />
            </div>

            <div className="form-group mr-sm-2">
                <input
                id="propertyUplift"
                type="text"
                ref={(input) => { this.propertyUplift = input }}
                className="form-control"
                placeholder="Uplift Percent"
                required />
            </div>

            <div className="form-group mr-sm-2">
                <input
                id="propertyDate"
                type="text"
                ref={(input) => { this.propertyDate = input }}
                className="form-control"
                placeholder="Reg. Date (DD-MM-YYYY)"
                required />
            </div>

            <button type="submit" className="btn btn-dark">Add Property</button>
            </form>
            <p> </p>
            <div className="col ml-5">
            <h3>Properties</h3>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">Owner</th>
                <th scope="col">Reg. Valuation</th>
                <th scope="col">Sell Value</th>
                <th scope="col">Uplift %</th>
                <th scope="col">Reg. Date</th>
                <th scope="col">Buyer Id</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody id="propertyList">
                { this.props.properties.map((property, key) => {
                    return(
                        <tr ng-repeat="name in getdrugnameNewArray" key={key}>
                        <th scope="row">{property.id.toString()}</th>
                        <td>{property.name}</td>
                        <td>{property.location}</td>
                        <td>{property.owner}</td>
                        <td>{property.registered_valuation.toString()}</td>
                        <td>{property.sell_value.toString()}</td>
                        <td>{property.uplift_percentage.toString()}</td>
                        <td>{property.registered_date}</td>
                        <td><input id="buyerId" type="text" placeholder="Buyer ID"></input></td>
                        <td>
                            { !property.purchased
                                ? <button
                                    className="btn btn-outline-dark"
                                    name={property.id}
                                    value={property.sell_value}
                                    onClick={(event) => {
                                        var currentBuyerId = document.getElementById("buyerId").value;
                                        this.props.createSaleTransaction(property.id, Number(currentBuyerId), Number(property.sell_value), Number(property.uplift_percentage))
                                    }}
                                >
                                    Create Sale Transaction
                                </button>
                            : null
                        }
                        </td>
                        </tr>
                    )
                    })}
            </tbody>
            </table>
            </div>
        </div>
      </div>
    );
  }
}

export default Main;