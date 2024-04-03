import {Field, ID, ObjectType} from "type-graphql"
import "reflect-metadata"

@ObjectType({description: "This object represents a real-world mower"})
export class MowerDto {
	@Field(() => ID, {name: "id", description: "The id of the mower"})
	id: string

	@Field(() => String, {description: "The name of the mower"})
	name: string

	@Field(() => String, {description: "The owner of the mower"})
	owner: string
}