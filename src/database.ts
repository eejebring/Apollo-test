import {MongoClient} from "mongodb"


const url = "mongodb://localhost:27017"
const dbName = "mongodb"
const client = new MongoClient(url)

async function initMongo() {
	try {
		await client.connect()
		console.log("Connected successfully to server")
		const db = client.db(dbName)
		return db
	} catch (err) {
		console.log(err.stack)
	} finally {
		await client.close()
	}
}

//export const db = await mongoose.connect(url) //await initMongo()
