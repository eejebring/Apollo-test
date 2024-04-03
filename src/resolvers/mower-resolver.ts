import {Query, Resolver} from "type-graphql"
import {Mower} from "../types/mower"

@Resolver(() => Mower)
export class MowerResolver {
	@Query(() => Mower)
	books():Mower {
		const theBook :Mower =
			{
				id: "1",
				name: "Grassy",
				owner: "Emil Ejebring"
			}
		return theBook
	}
}