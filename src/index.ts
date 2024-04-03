import {ApolloServer} from "@apollo/server"
import {buildTypeDefsAndResolvers} from "type-graphql"
import mongoose from "mongoose"
import {MowerDto} from "./graphs/mower-dto"
import {MowerResolver} from "./resolvers/mower-resolver"
import {mowerRepo} from "./repositories/mower-repo"
import {createServer} from "http"

import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer"

import {WebSocketServer} from "ws"

import {useServer} from "graphql-ws/lib/use/ws"
import {makeExecutableSchema} from "@graphql-tools/schema"
import express from "express"
import cors from "cors"
import {expressMiddleware} from "@apollo/server/express4"

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

const schema = makeExecutableSchema({typeDefs, resolvers})

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express()

const httpServer = createServer(app)

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
	server: httpServer,
	path: "/subscriptions",
})

// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({schema}, wsServer)

// Set up ApolloServer.
const apolloServer = new ApolloServer({
	schema,
	plugins: [
		ApolloServerPluginDrainHttpServer({httpServer}),
		{
			async serverWillStart() {
				return {
					async drainServer() {
						await serverCleanup.dispose()
					},
				}
			},
		},
	],
})

await apolloServer.start()
app.use("/graphql", cors<cors.CorsRequest>(), express.json(), expressMiddleware(apolloServer))

const PORT = 4000

// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
	console.log(`Server is now running on http://localhost:${PORT}/graphql`)
})