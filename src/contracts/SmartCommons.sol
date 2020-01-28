pragma solidity ^0.5.0;

contract SmartCommons {
    string public name;
     
    struct Member {
        uint id;
        string name;
        string memberType;
        address memberAddress;
        uint budget;
    }

    uint[] public membersList;
    uint public ownerCount = 0;
    uint public buyerCount = 0;
    mapping(uint => Member) public buyersOfProperty;
    mapping(uint => Member) public owners;

    function addMember(string memory _name, string memory _type, uint _budget) public {
        require(bytes(_name).length > 0);
        require(bytes(_type).length > 0);
        require(_budget > 0);

        address newMemberAddress;

        if (keccak256(abi.encodePacked(_type)) == keccak256(abi.encodePacked('buyer'))) {
            buyerCount++;
            Member memory buyer = Member(buyerCount, _name, _type, newMemberAddress, _budget);
            buyersOfProperty[buyerCount] = buyer;

        } else if (keccak256(abi.encodePacked(_type)) == keccak256(abi.encodePacked('owner'))) {
            ownerCount++;
            Member memory owner = Member(ownerCount, _name, _type, newMemberAddress, _budget);
            owners[ownerCount] = owner;
        }     
    }


    function getBuyer(uint _buyerId) view public returns (string memory) {
        return (buyersOfProperty[_buyerId].name);
    }

    function getOwner(uint _ownerId) view public returns (string memory) {
        return (owners[_ownerId].name);
    }

    struct Property {
        uint id;
        string name;
        string location;
        string owner;
        uint registered_valuation;
        uint sell_value;
        uint uplift_percentage;
        bool purchased;
        string registered_date;
    }

    uint public propertyCount = 0;
    mapping(uint => Property) public properties;

    event PropertyCreated (
        uint id,
        string name,
        string location,
        string owner,
        uint registered_valuation,
        uint sell_value,
        uint uplift_percentage,
        string registered_date
    );

    function addProperty(string memory _name, string memory _location, uint _ownerId, uint _registered_valuation, uint _sell_value, uint _uplift_percentage, string memory _registered_date) public {
        require(bytes(_name).length > 0);
        require(bytes(_location).length > 0);
        require(_registered_valuation > 0);
        require(_uplift_percentage > 0);
        
        string memory owner = getOwner(_ownerId);
        propertyCount++;
        properties[propertyCount] = Property(propertyCount, _name, _location, owner, _registered_valuation, _sell_value, _uplift_percentage, false, _registered_date);
        emit PropertyCreated(propertyCount, _name, _location, owner, _registered_valuation, _sell_value, _uplift_percentage, _registered_date);
    }

    struct InvestmentFund {
        string funder;
        uint total_amount;
    }
    uint public nrofInvestments = 0;
    mapping(uint => InvestmentFund) public funders;

   

    struct PropertySale {
        uint id;
        uint propertyId;
        string propertyName;
        string fromOwner;
        string toOwner;
        uint uplift_value;
        uint uplift_cont_rate;
    }

    uint public propertySaleCount = 0;
    mapping(uint => PropertySale) public propertySales;

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
        propertySales[propertySaleCount] = PropertySale(propertySaleCount, _propertyId, _property.name, currentOwner, _property.owner, _uplift_value, _uplift_cont_rate);
        nrofInvestments ++;
        funders[nrofInvestments] = InvestmentFund(currentOwner, _uplift_value * _uplift_cont_rate / 100);
        emit PropertySold(propertySaleCount, _property.name, _uplift_value, _uplift_cont_rate);
    }

    constructor() public {
        name = "Smart Commons";
    }
}