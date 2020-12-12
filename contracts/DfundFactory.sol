// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./Dfund.sol";

contract DfundFactory{
    Dfund[] public deployedCampaigns;
    
    function createCampaign(
        string memory title,
        string memory description,
        string memory category,
        string memory country,
        uint goalAmount,
        uint minimumContrubution,
        uint deadline,
        string memory imageHash
    ) public{
        Dfund newCampaign = new Dfund({
            creator:msg.sender,
            title:title,
            description:description,
            category:category,
            country:country,
            goalAmount:goalAmount,
            minimumContrubution: minimumContrubution,
            deadline: deadline,
            imageHash:imageHash
        });
        
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns(Dfund[] memory){
       return deployedCampaigns; 
    }
}
