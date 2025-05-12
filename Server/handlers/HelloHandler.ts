import { Request, Response } from "express";
import dotenv from "dotenv";
import initDB from "../lib/db";

dotenv.config()

export default async function helloHandler(req: Request, res: Response) {
	console.log("HelloHandler called");
	const connection = await initDB()
	res.status(200).json({ message: "Hello, World!" });
}