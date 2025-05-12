export enum LogLevel {
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
	WARNING = "WARNING",
	INFO = "INFO"
}

export enum LogColor {
	RED = "\x1b[31m",
	GREEN = "\x1b[32m",
	YELLOW = "\x1b[33m",
	BLUE = "\x1b[34m",
	RESET = "\x1b[0m"
}

export default class Logger {

	static logSuccess = async (message: string) => {
		const date = new Date()
		console.log(`${LogColor.GREEN} [SUCES] ${date.toUTCString()} - ${message} ${LogColor.RESET}`)
	}
	static logError = async (message: string) => {
		const date = new Date()
		console.log(`${LogColor.RED} [ERROR] ${date.toUTCString()} - ${message} ${LogColor.RESET}`)
	}
	static logWarning = async (message: string) => {
		const date = new Date()
		console.log(`${LogColor.YELLOW} [WARNG] ${date.toUTCString()} - ${message} ${LogColor.RESET}`)
	}
	static logInfo = async (message: string) => {
		const date = new Date()
		console.log(`${LogColor.BLUE} [INFFO] ${date.toUTCString()} - ${message} ${LogColor.RESET}`)
	}


	static log = async (message: string, Level: LogLevel) => {
		const date = new Date()
		switch (Level) {
			case LogLevel.SUCCESS:
				console.log(`${LogColor.GREEN} [SUCES] ${date.toUTCString()} - ${Level} - ${message} ${LogColor.RESET}`)
				break
			case LogLevel.ERROR:
				console.log(`${LogColor.RED} [ERROR] ${date.toUTCString()} - ${Level} - ${message} ${LogColor.RESET}`)
				break
			case LogLevel.WARNING:
				console.log(`${LogColor.YELLOW} [WARNG] ${date.toUTCString()} - ${Level} - ${message} ${LogColor.RESET}`)
				break
			case LogLevel.INFO:
				console.log(`${LogColor.BLUE} [INFFO] ${date.toUTCString()} - ${Level} - ${message} ${LogColor.RESET}`)
				break
			default:
				console.log(`${date.toUTCString()} - ${Level} - ${message}`)
				break
		}
	}
}