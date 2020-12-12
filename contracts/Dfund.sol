// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

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
    
    event LogCampaignCreated(uint id, string title, address addr, address creator);
    event LogContributionSent(address projectAddress, address contributor, uint amount);
    event LogRequestCreated();
    event LogRequestFinilized();
    event LogRequestApproved();

    event LogFailure(string message);
    
    
    
    modifier isCreator {
         require(msg.sender == campaign.creator);
        _;
    }
    
    
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
    
    /*
    *   @desc funding
    */
    function fund() public payable{
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
       
    }
    
    /*
    * @make request for withdraw
    */
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
    }
    
    /*
    * @ approve request
    */
    function approveRequest(uint index) public {
         Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    // finialize request
    function finializeRequest(uint index) public isCreator{
        
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount/2 ));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
        
    }  
    
    // kill/destroy contract by creator
     function kill() public isCreator {
        selfdestruct(campaign.creator);
    }
    
    /**
     * Do not allow direct deposits.
     */
    // fallback() external payable {
    //         revert();
    //     }
    
    
}
