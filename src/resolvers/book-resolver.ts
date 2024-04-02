import {Query, Resolver} from "type-graphql"
import {Book} from "../types/book"

@Resolver(() => Book)
export class BookResolver {
	@Query(() => Book)
	books():Book {
		const theBook :Book =
			{
				id: "1",
				title: "Harry Potter and the Chamber of Secrets",
				author: "J.K. Rowling"
			}
		return theBook
	}
}