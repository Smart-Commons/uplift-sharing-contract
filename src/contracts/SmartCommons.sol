pragma solidity ^0.5.0;

contract SmartCommons {
    string public name;
 
    uint public propertySaleCount = 0;
    mapping(uint => PropertySale) public property_sales;

    struct Member {
        uint id;
        string name;
        mapping(uint => Property) properties;
    }
    uint public memberCount = 0;
    mapping(uint => Member) public members;

    function createMember(string memory _name) public {
        memberCount++;
        members[memberCount++] = Member(memberCount, _name);
    }

    struct Property {
        uint id;
        string name;
        string location;
        uint price;
    }
    uint public propertyCount = 0;
    mapping(uint => Property) public properties;
    
    event PropertyCreated (
        uint id,
        string name,
        string location,
        uint price
    );

    function newProperty(string memory _name, string memory _location, uint _price) public {
        require(bytes(_name).length > 0);
        require(bytes(_location).length > 0);
        require(_price > 0);
        
        propertyCount++;
        properties[propertyCount] = Property(propertyCount, _name, _location, _price);
        emit PropertyCreated(propertyCount, _name, _location, _price);
    }

    struct InvestmentFund {
        address fund;
        uint total_amount;
        mapping (uint => Member) members;
    }
    uint public totalInvestmentFund = 0;


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