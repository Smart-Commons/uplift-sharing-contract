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
                placeholder="Owner/Buyer"
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
        <button type="submit" className="btn btn-primary">Add Property</button>
        </form>
        <p> </p>
            <h2>List of Owners</h2>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Address</th>
                <th scope="col">Name</th>
                <th scope="col">Budget</th>
                </tr>
            </thead>
            <tbody id="ownersList">
                { this.props.owners.map((owner, key) => {
                    return(
                        <tr key={key}>
                        <th scope="row">{owner.memberAddress}</th>
                        <td>{owner.name}</td>
                        <td>{owner.budget.toString()}</td>
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
            const price = this.propertyPrice.value
            const location = this.propertyLocation.value
            const owner = this.propertyOwner.value
            this.props.addProperty(name, location, owner, price)
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
                id="propertyPrice"
                type="text"
                ref={(input) => { this.propertyPrice = input }}
                className="form-control"
                placeholder="Price"
                required />
            </div>
            <div className="form-group mr-sm-2">
                <input
                id="propertyLocation"
                type="text"
                ref={(input) => { this.propertyLocation = input }}
                className="form-control"
                placeholder="Location"
                required />
            </div>
            <div className="form-group mr-sm-2">
                <input
                id="propertyOwner"
                type="text"
                ref={(input) => { this.propertyOwner = input }}
                className="form-control"
                placeholder="Owner"
                required />
            </div>
            <button type="submit" className="btn btn-primary">Add Property</button>
            </form>
            <p> </p>
            <h2>Buy Property</h2>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Location</th>
                <th scope="col">Owner</th>
                <th scope="col">Purchase?</th>
                </tr>
            </thead>
            <tbody id="propertyList">
                { this.props.properties.map((property, key) => {
                    return(
                        <tr key={key}>
                        <th scope="row">{property.id.toString()}</th>
                        <td>{property.name}</td>
                        <td>{property.price.toString()}</td>
                        <td>{property.location}</td>
                        <td>{property.owner}</td>
                        <td>
                            <button
                                name={property.id}
                                value={property.price}
                                onClick={(event) => {
                                    alert('10% of uplift cont. will be transferred to investment fund. Do you agree?')
                                }}
                                >
                                Buy
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