// import { MongoClient } from 'mongodb'
//
// const connectDB = async () => {
// 	const uri = process.env.MONGODB_URI
//
// 	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
// 	client.connect((err) => {
// 		const collection = client.db('test').collection('devices')
//
// 		// perform actions on the collection object
// 		client.close(collection)
// 	})
// }
// export default connectDB
//
import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(
			// `mongodb+srv://Kayla_Brown:Kayla26@cluster0.ggvzc.mongodb.net/test?authSource=admin&replicaSet=atlas-klwurw-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
			// `mongodb+srv://Kayla_Brown:Kayla26@cluster0.ggvzc.mongodb.net/Off_Set_Designs_Database?retryWrites=true&w=majority`,
			`mongodb+srv://Joshua_Vaughn:Trigun123@cluster0.ggvzc.mongodb.net/Off_Set_Designs_Database?retryWrites=true&w=majority`,
			process.env.MONGO_URI,
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useCreateIndex: true,
			},
		)

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
	} catch (error) {
		console.error(`Error: ${error.message}`.red.underline.bold)
		process.exit(1)
	}
}

export default connectDB
