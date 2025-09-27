// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Staking is ReentrancyGuard{
  using SafeMath for uint256;

  IERC20 public s_stakingToken;

  // This is for Reward token using the ERC20 Interface
  IERC20 public s_rewardToken;

  uint public constant REWARD_RATE=1e18;

  // We'll keep info of how many people have into our app till now
  uint private totalStakedTokens;
  uint public rewardPerTokenStored;
  uint public lastUpdateTime;

  mapping(address=>uint) public stakedBalance;
  mapping(address=>uint) public rewards;
  mapping(address=>uint) public userRewardPerTokenPaid;

  event Staked(address indexed user, uint256 indexed amount);
  event Withdrawn(address indexed user, uint256 indexed amount);
  event RewardsClaimed(address indexed user, uint256 indexed amount);

  constructor(address stakingToken,address rewardToken){
    // This variable will give us access to IERC20 functions for Staking options
    s_stakingToken=IERC20(stakingToken);
    s_rewardToken=IERC20(rewardToken);
  }

   function rewardPerToken() public view returns(uint){
    if(totalStakedTokens==0){
        return rewardPerTokenStored;
    }
    uint totalTime = block.timestamp.sub(lastUpdateTime);
    uint totalRewards = REWARD_RATE.mul(totalTime); 
    return rewardPerTokenStored.add(totalRewards.mul(1e18).div(totalStakedTokens));
  }


  function earned(address account) public view returns(uint){
    return stakedBalance[account].mul(rewardPerToken().sub(userRewardPerTokenPaid[account])).div(1e18).add(rewards[account]);
  }

  modifier updateReward(address account){
    rewardPerTokenStored=rewardPerToken();
    lastUpdateTime=block.timestamp;
    rewards[account]=earned(account);
    userRewardPerTokenPaid[account]=rewardPerTokenStored;
    _;
  }


    function stake(uint amount) external nonReentrant updateReward(msg.sender){
    require(amount>0,"Amount must be greater than zero");
    totalStakedTokens=totalStakedTokens.add(amount);
    stakedBalance[msg.sender]=stakedBalance[msg.sender].add(amount);
    emit Staked(msg.sender,amount);
    bool success = s_stakingToken.transferFrom(msg.sender,address(this),amount);
    require(success,"Transfer Failed");
  }


  


  

}
