import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  RewardsClaimed,
  Staked,
  Withdrawn
} from "../generated/Contract/Contract"

export function createRewardsClaimedEvent(
  user: Address,
  amount: BigInt
): RewardsClaimed {
  let rewardsClaimedEvent = changetype<RewardsClaimed>(newMockEvent())

  rewardsClaimedEvent.parameters = new Array()

  rewardsClaimedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  rewardsClaimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return rewardsClaimedEvent
}

export function createStakedEvent(user: Address, amount: BigInt): Staked {
  let stakedEvent = changetype<Staked>(newMockEvent())

  stakedEvent.parameters = new Array()

  stakedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  stakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return stakedEvent
}

export function createWithdrawnEvent(user: Address, amount: BigInt): Withdrawn {
  let withdrawnEvent = changetype<Withdrawn>(newMockEvent())

  withdrawnEvent.parameters = new Array()

  withdrawnEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawnEvent
}
