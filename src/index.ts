import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"
import {buildTypeDefsAndResolvers} from "type-graphql"
import mongoose from "mongoose"
import {MowerDto} from "./graphs/mower-dto"
import {MowerResolver} from "./resolvers/mower-resolver"
import {mowerRepo} from "./repositories/mower-repo"

const db_url = "mongodb://localhost:27017"
await mongoose.connect(db_url)

// Create a new mower on startup to populate the database
const newMower = new mowerRepo({name: "Grassy", owner: "Emil Ejebring"})
await newMower.save()


const {typeDefs, resolvers} = await buildTypeDefsAndResolvers({
	resolvers: [MowerDto, MowerResolver]
})

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const sandbox_url = (await startStandaloneServer(server, {
	listen: {port: 4000},
})).url

console.log(`🚀  Sandbox ready at: ${sandbox_url}`)