import dotenv from "dotenv";
import path from "path"
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import Logger from "./logger";

dotenv.config({
	path: path.resolve(__dirname, "../.env.local"),
});

let supabaseConnection: null | SupabaseClient = null
export default async function initDB() {
	try {
		if (supabaseConnection) return supabaseConnection
		const supabaseUrl = process.env.MY_SUPABASE_URI
		const supabaseKey = process.env.MY_SUPABASE_KEY
		if (!supabaseUrl || !supabaseKey) {
			Logger.logError("Supabase URL or Key is not defined")
			return
		}
		supabaseConnection = createClient(
			supabaseUrl,
			supabaseKey
		)
		Logger.logSuccess("Supabase connection initialized");
		return supabaseConnection;
	} catch (error: any) {
		console.error(error);
	}
}


