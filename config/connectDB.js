import * as express from "express"
import { MongoClient } from "mongodb"
import config from "."

export default async function (
    MONGO_URI,
    app,
) {
    const client = new MongoClient(MONGO_URI)
    try {
        await client.connect()
        console.log("\n🟢 Database connected.")
    } catch (err) {
        await client.close()
        throw new Error("❌ Database connection error.")
    }
}