// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

/// @title Dfund smart contract
/// @notice crowdfunding smart contract
/// @author Deepak Oli

contract Dfund{
    
    struct Campaign{
        address payable creator;
        string title;
        string description;
        string category;
        string country;
        uint goalAmount;
        uint minimumContrubution;
        uint deadline;
        bool active;
        string imageHash;
    }
    
    struct Contribution {
        uint amount;
        address contributor;
    }
    
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Campaign public campaign;
    Request[] public requests;
    mapping (uint => Contribution) public contributions;
    uint public contributionCount;
    
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    // EVENTS
    event LogContributionSent(address projectAddress, address contributor, uint amount);
    event LogRequestCreated(address payable maker,string description, uint value, address payable recipient);
    event LogRequestFinilized();
    event LogRequestApproved();

    event LogFailure(string message);
    
    
    
    modifier isCreator {
         require(msg.sender == campaign.creator);
        _;
    }
    

    /// @param creator campaign creator
    /// @param title campaign title
    /// @param description description of campaign
    /// @param category category to which campaign belong
    /// @param country country of origin
    /// @param goalAmount goal amount of campaign
    /// @param minimumContrubution minimun contribution which determines approver
    /// @param deadline end date of campaign
    /// @param imageHash image hash string
    constructor(
        address creator,
        string memory title,
        string memory description,
        string memory category,
        string memory country,
        uint goalAmount,
        uint minimumContrubution,
        uint deadline,
        string memory imageHash
    )
        public
    {
        campaign = Campaign({
            creator:address(uint160(creator)),
            title:title,
            description:description,
            category:category,
            country:country,
            imageHash:imageHash,
            goalAmount:goalAmount,
            minimumContrubution:minimumContrubution,
            deadline: deadline,
            active:true
        });
    }
    
    /// @notice funding in different campaigns
    function fund() public payable{

          // Check amount sent is greater than 0
        if (msg.value <= 0) {
            emit LogFailure("Contributions must be greater than 0 wei");
            revert();
        }

        // when contrubution is greater or equals to min. contrubution add contrubutor to approvers list
        if(msg.value >= campaign.minimumContrubution){
            approvers[msg.sender] = true;
            approversCount++;
        }
        
        // add to contrubution list
        contributionCount++;
        contributions[contributionCount] = Contribution({
            amount:msg.value,
            contributor:msg.sender
        });

        emit LogContributionSent(address(this),msg.sender, msg.value);
       
    }
    

    /// @notice make request for withdraw
    function createRequest(
        string memory description,
        uint value, 
        address payable recipient
    ) public isCreator{
        Request memory newRequest = Request({
           description:description,
           value:value,
           recipient:recipient,
           complete:false,
           approvalCount:0
        });
        
        // save to requests array
        requests.push(newRequest);

        emit LogRequestCreated(campaign.creator,description,value,recipient);
    }
    
    /// @notice approve request
    function approveRequest(uint index) public {
         Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;

        emit LogRequestApproved();
    }
    
    /// @notice finalize the request and transfer fund to address
    /// @param index request index number
    function finializeRequest(uint index) public isCreator{
        
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount/2 ));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;

        emit LogRequestFinilized();   
    } 

    function getRequestsCount() public view returns (uint256){
        return requests.length;
    }

    
    /// @notice Kill/Destroy contract by creator
     function kill() public isCreator {
        selfdestruct(campaign.creator);
    }
    
    
    /// @notice Don't allow Ether to be sent blindly to this contract
    receive() external payable{
         revert();
    }
    
    
}
