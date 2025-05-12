import { Request, Response } from 'express';
import Logger from '../lib/logger';
import initDB from '../lib/db';

export default async function RegisterHandler(req: Request, res: any) {
	Logger.logInfo('RegisterHandler called');
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			Logger.logError('Missing required fields for registration');
			return res.status(400).json({ message: 'All fields are required.' });
		}
		const connection = await initDB();
		if (!connection) {
			Logger.logError('Database connection failed');
			return res.status(500).json({ message: 'Internal server error.' });
		}
		const existingUser = await connection
			.from('Users')
			.select('*')
		console.log(existingUser.data)
		// if (existingUser.data) {
		// 	Logger.logError('User already exists');
		// 	return res.status(400).json({ message: 'User already exists.' });
		// }

		return res.status(200).json({ message: 'User registered successfully.' });

	} catch (error) {
		console.error('Error during registration:', error);
		return res.status(500).json({ message: 'Internal server error.' });
	}
}
