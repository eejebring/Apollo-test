import {Field, ID, ObjectType} from "type-graphql"

@ObjectType()
export class Book {
	@Field(() => ID)
	id: string;

	@Field()
	title: string;

	@Field()
	author: string;
}