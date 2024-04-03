import {Query, Resolver} from "type-graphql"
import {MowerDTO} from "../graphs/mower-dto"
import {mowerRepo} from "../repositories/mower-repo"

@Resolver(() => MowerDTO)
export class MowerResolver {
	@Query(() => [MowerDTO])
	async mowers(): Promise<MowerDTO[]> {
		const mowerDocument = await mowerRepo.find()
		const mowers = mowerDocument.map((mower): MowerDTO => {
			return {id: mower._id.toString(), name: mower.name, owner: mower.owner}
		})
		//console.log(mowers)
		return mowers
	}
}