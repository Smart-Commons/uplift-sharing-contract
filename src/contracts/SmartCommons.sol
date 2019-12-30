pragma solidity ^0.5.0;

contract SmartCommons {
    string public name;
 
    uint public propertySaleCount = 0;
    mapping(uint => PropertySale) public property_sales;

    enum MemberType {owner, buyer}
    
    struct Member {
        address memberAddress;
        string name;
        MemberType memberType;
    }

    uint public ownerCount = 0;
    uint public buyerCount = 0;
    mapping(address => Member[]) public buyersOfProperty;
    mapping(address => Member[]) public ownersOfProperty;

    function createBuyer(address _memberAddress, string memory _name) public {

        Member memory buyer = Member(msg.sender, _name, MemberType.buyer);
        buyersOfProperty[_memberAddress].push(buyer);
    }

    function createOwner(address _memberAddress, string memory _name) public {

        Member memory owner = Member(msg.sender, _name, MemberType.owner);
        ownersOfProperty[_memberAddress].push(owner);
    }

    function getBuyer(address _buyerAddress) public {}
    function getOwner(address _ownerAddress) public {} 


    struct Property {
        uint id;
        address owner_address;
        string name;
        string location;
        uint price;
    }
    uint public propertyCount = 0;
    mapping(uint => Property) public properties;
    
    event PropertyCreated (
        uint id,
        address owner_address,
        string name,
        string location,
        uint price
    );

    function newProperty(string memory _name, string memory _location, uint _price) public {
        require(bytes(_name).length > 0);
        require(bytes(_location).length > 0);
        require(_price > 0);
        
        propertyCount++;
        properties[propertyCount] = Property(propertyCount, msg.sender, _name, _location, _price);
        emit PropertyCreated(propertyCount, msg.sender, _name, _location, _price);
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
        string name;
        uint price;
        uint uplift_value;
        uint uplift_cont_rate;
        address owner;
        bool purchased;
        string location;
    }

    event PropertySaleCreated(
        uint id,
        string name,
        uint price,
        uint uplift_value,
        uint uplift_cont_rate,
        address owner,
        bool purchased
    );

    function createPropertySale(string memory _name, uint _price, uint _uplift_value, uint _uplift_cont_rate, string memory _location) public {
        require(bytes(_name).length > 0);
        require(_price > 0);
        require(_uplift_value > 0);
        require(_uplift_cont_rate > 0);

        propertySaleCount ++;
        property_sales[propertySaleCount] = PropertySale(propertySaleCount, _name, _price, _uplift_value, _uplift_cont_rate, msg.sender, false, _location);
        emit PropertySaleCreated(propertySaleCount, _name, _price, _uplift_value, _uplift_cont_rate, msg.sender, false);
    }



    constructor() public {
        name = "Smart Commons";
    }
}