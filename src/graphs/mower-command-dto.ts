import {Field, ObjectType} from "type-graphql"
import {MowerCommands} from "./mower-commands-enum"


@ObjectType({description: "This object represents a real-world mower"})
export class MowerCommandDto {
	@Field(() => MowerCommands, {name: "MowerCommand", description: "The command to execute on the mower"})
	command: MowerCommands
}