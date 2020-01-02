pragma solidity ^0.5.0;

contract SmartCommons {
    string public name;
 
    enum MemberType {owner, buyer}
    
    struct Member {
        address memberAddress;
        string name;
        MemberType memberType;
        uint budget;
    }

    uint public ownerCount = 0;
    uint public buyerCount = 0;
    mapping(address => Member) public buyersOfProperty;
    mapping(address => Member) public ownersOfProperty;

    function addMember(address _memberAddress, string memory _name, MemberType _type, uint _budget) public {

        if (_type == MemberType.buyer) {
             Member memory buyer = Member(_memberAddress, _name, MemberType.buyer, _budget);
             buyersOfProperty[_memberAddress] = buyer;
             buyerCount++;

        } else if (_type == MemberType.owner) {
            Member memory owner = Member(_memberAddress, _name, MemberType.owner, _budget);
            ownersOfProperty[_memberAddress] = owner;
            ownerCount++;
        }
    }

    function getBuyer(address _buyerAddress) view public returns (string memory) {
        return buyersOfProperty[_buyerAddress].name;
    }

    function getOwner(address _ownerAddress) view public returns (string memory) {
        return ownersOfProperty[_ownerAddress].name;
    }

    struct Property {
        uint id;
        string name;
        string location;
        string owner;
        uint price;
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

    function addProperty(string memory _name, string memory _location, address _ownerAddress, uint _price) public {
        require(bytes(_name).length > 0);
        require(bytes(_location).length > 0);
        require(_price > 0);
        
        string memory owner = getOwner(_ownerAddress);
        propertyCount++;
        properties[propertyCount] = Property(propertyCount, _name, _location, owner, _price);
        emit PropertyCreated(propertyCount, _name, _location, owner, _price);
    }

    struct InvestmentFund {
        address fund;
        uint total_amount;
        mapping (uint => Member) members;
    }
    uint public totalInvestmentFund = 0;
    mapping (address => Member[]) funders;


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
        uint uplift_value,
        uint uplift_cont_rate
    );

    function createSaleTransaction(uint _propertyId, address _buyerAddress, uint _uplift_value, uint _uplift_cont_rate) public {
        require(_uplift_value > 0);
        require(_uplift_cont_rate > 0);
        string memory newOwner = getBuyer(_buyerAddress);
        Property memory _property = properties[_propertyId];
        _property.owner = newOwner;
        propertySaleCount ++;
        property_sales[propertySaleCount] = PropertySale(propertySaleCount, _property, _uplift_value, _uplift_cont_rate);
        //emit PropertySold(propertySaleCount, _property, _uplift_value, _uplift_cont_rate);
    }

    constructor() public {
        name = "Smart Commons";
    }
}