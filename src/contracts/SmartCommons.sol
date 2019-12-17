pragma solidity ^0.5.0;

contract SmartCommons {
    string public name;
    uint public propertySaleCount = 0;
    mapping(uint => PropertySale) public property_sales;


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