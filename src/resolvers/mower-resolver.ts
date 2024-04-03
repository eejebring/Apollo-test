import {Query, Resolver, Subscription} from "type-graphql"
import {MowerDto} from "../graphs/mower-dto"
import {mowerRepo} from "../repositories/mower-repo"
import {MowerCommands} from "../graphs/mower-commands-enum"
import {MowerCommandDto} from "../graphs/mower-command-dto"

@Resolver(() => MowerDto)
export class MowerResolver {
	@Query(() => [MowerDto], {description: "Get all mowers"})
	async mowers(): Promise<MowerDto[]> {
		const mowerDocument = await mowerRepo.find()
		const mowers = mowerDocument.map((mower): MowerDto => {
			return {id: mower._id.toString(), name: mower.name, owner: mower.owner}
		})
		//console.log(mowers)
		return mowers
	}

	@Subscription(() => MowerCommandDto, {
		topics: "NewMowerCommand",
		name: "NewMowerCommands",
		description: "Get a random mower command WIP"
	})
	NewMowerCommand(): MowerCommandDto {
		switch (Math.floor(Math.random() * 4)) {
			case 0:
				return {command: MowerCommands.FORWARD}
			case 1:
				return {command: MowerCommands.BACKWARD}
			case 2:
				return {command: MowerCommands.LEFT}
			case 3:
				return {command: MowerCommands.RIGHT}
		}
	}
}