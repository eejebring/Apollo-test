import {Field, ID, ObjectType} from "type-graphql"

@ObjectType()
export class Mower {
	@Field(() => ID)
	id: string;

	@Field()
	name: string;

	@Field()
	owner: string;
}