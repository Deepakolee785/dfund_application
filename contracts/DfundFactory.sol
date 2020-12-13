// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "./Dfund.sol";

/// @title Dfund smart contract
/// @notice crowdfunding smart contract
/// @author Deepak Oli

contract DfundFactory{
    Dfund[] public deployedCampaigns;

       event LogCampaignCreated(
        address addr,
        address payable creator,
        string title,
        string description,
        uint goalAmount,
        uint minimumContribution,
        uint deadline,
        string country,
        string category,
        string imageHash
    );

    event LogFailure(string message);
    
    /// @notice create campaign and save in network
    /// @param title campaign title
    /// @param description description of campaign
    /// @param category category to which campaign belong
    /// @param country country of origin
    /// @param goalAmount goal amount of campaign
    /// @param minimumContrubution minimun contribution which determines approver
    /// @param deadline end date of campaign
    /// @param imageHash image hash string
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

         if (goalAmount <= 0) {
            LogFailure("Campaign goal amount must be greater than 0");
             revert();
        }

        if (block.number >= deadline) {
            LogFailure("Campaign deadline must be greater than the current block");
            revert();
        }

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

        emit LogCampaignCreated(
            address(newCampaign),
            msg.sender,
            title,
            description,
            goalAmount,
            minimumContrubution,
            deadline,
            country,
            category,
            imageHash
        );
    }
    
    /// @return array of deployed campaign addresses
    function getDeployedCampaigns() public view returns(Dfund[] memory){
       return deployedCampaigns; 
    }
}
