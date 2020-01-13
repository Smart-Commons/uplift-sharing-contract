pragma solidity ^0.5.0;

contract SmartCommons {
    string public name;
     
    struct Member {
        address memberAddress;
        string name;
        string memberType;
        uint budget;
    }

    uint public ownerCount = 0;
    uint public buyerCount = 0;
    mapping(uint => Member) public buyersOfProperty;
    mapping(uint => Member) public ownersOfProperty;

    function addMember(address _memberAddress, string memory _name, string memory _type, uint _budget) public {

        if (keccak256(abi.encodePacked(_type)) == keccak256(abi.encodePacked('buyer'))) {
             Member memory buyer = Member(_memberAddress, _name, 'buyer', _budget);
             buyerCount++;
             buyersOfProperty[buyerCount] = buyer;
             

        } else if (keccak256(abi.encodePacked(_type)) == keccak256(abi.encodePacked('owner'))){
            Member memory owner = Member(_memberAddress, _name, 'owner', _budget);
            ownerCount++;
            ownersOfProperty[ownerCount] = owner;
            
        }
    }

    function getBuyer(uint _buyerId) view public returns (string memory) {
        return buyersOfProperty[_buyerId].name;
    }

    function getOwner(uint _ownerId) view public returns (string memory) {
        return ownersOfProperty[_ownerId].name;
    }

    struct Property {
        uint id;
        string name;
        string location;
        string owner;
        uint price;
        bool purchased;
    }

    uint public propertyCount = 0;
    mapping(uint => Property) public properties;
    
    event PropertyCreated (
        uint id,
        string name,
        string location,
        string owner,
        uint price
    );

    function addProperty(string memory _name, string memory _location, uint _ownerId, uint _price) public {
        require(bytes(_name).length > 0);
        require(bytes(_location).length > 0);
        require(_price > 0);
        
        string memory owner = getOwner(_ownerId);
        propertyCount++;
        properties[propertyCount] = Property(propertyCount, _name, _location, owner, _price, false);
        emit PropertyCreated(propertyCount, _name, _location, owner, _price);
    }

    struct InvestmentFund {
        string funder;
        uint total_amount;
    }
    uint public nrofInvestments = 0;
    mapping(uint => InvestmentFund) public funders;


    struct PropertySale {
        uint id;
        Property property;
        uint uplift_value;
        uint uplift_cont_rate;
    }

    uint public propertySaleCount = 0;
    mapping(uint => PropertySale) property_sales;

    event PropertySold(
        uint id,
        string propertyName,
        uint uplift_value,
        uint uplift_cont_rate
    );

    function createSaleTransaction(uint _propertyId, uint _buyerId, uint _uplift_value, uint _uplift_cont_rate) public {
        require(_uplift_value > 0);
        require(_uplift_cont_rate > 0);
        string memory newOwner = getBuyer(_buyerId);
        Property memory _property = properties[_propertyId];
        string memory currentOwner = _property.owner;
        _property.owner = newOwner;
        _property.purchased = true;
        propertySaleCount ++;
        property_sales[propertySaleCount] = PropertySale(propertySaleCount, _property, _uplift_value, _uplift_cont_rate);
        nrofInvestments ++;
        funders[nrofInvestments] = InvestmentFund(currentOwner, _uplift_value);
        emit PropertySold(propertySaleCount, _property.name, _uplift_value, _uplift_cont_rate);
    }

    constructor() public {
        name = "Smart Commons";
    }
}