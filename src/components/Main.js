import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content" className="col-12"> 
          <div id="addMember" className="col-6">
          <h1>Add New Members</h1>
          <form  onSubmit={(event) => {
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
        <button type="submit" className="btn btn-primary">Add Member</button>
        </form>
        <p> </p>
            <h2>List of Participants</h2>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Address</th>
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
                        <td>{buyer.memberAddress}</td>
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
                        <td>{owner.memberAddress}</td>
                        <td>{owner.name}</td>
                        <td>{owner.budget.toString()}</td>
                        <td>{owner.memberType}</td>
                        </tr>
                    )
                    })}
            </tbody>
            </table>
        </div>
        <div className="col-6">
            <h1>Add New Property</h1>
            <form onSubmit={(event) => {
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

            <button type="submit" className="btn btn-primary">Add Property</button>
            </form>
            <p> </p>
            <h2>Properties</h2>
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
                </tr>
            </thead>
            <tbody id="propertyList">
                { this.props.properties.map((property, key) => {
                    return(
                        <tr key={key}>
                        <th scope="row">{property.id.toString()}</th>
                        <td>{property.name}</td>
                        <td>{property.location}</td>
                        <td>{property.owner}</td>
                        <td>{property.registered_valuation.toString()}</td>
                        <td>{property.sell_value.toString()}</td>
                        <td>{property.uplift_percentage.toString()}</td>
                        <td>{property.registered_date}</td>                        
                        <td>
                            <button
                                name={property.id}
                                value={property.price}
                                onClick={(event) => {
                                    alert('10% of uplift cont. will be transferred to investment fund. Do you agree?')
                                }}
                                >
                                Create Sale Transaction
                                </button>
                            
                            </td>
                        </tr>
                    )
                    })}
            </tbody>
            </table>
        </div>
      </div>
    );
  }
}

export default Main;