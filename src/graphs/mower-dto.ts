import {Field, ID, ObjectType} from "type-graphql"
import "reflect-metadata"

@ObjectType()
export class MowerDTO {
	@Field(() => ID, {name: "id"})
	id: string

	@Field(() => String)
	name: string

	@Field(() => String)
	owner: string
}