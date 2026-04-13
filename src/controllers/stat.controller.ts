import { Request, Response, NextFunction } from 'express'
import * as statService from '../services/stat.service'

export async function getEcommerceUsers(req: Request, res: Response, next: NextFunction) {
	try {
		const data = await statService.getEcommerceUsers()
		res.json({ data })
	} catch (err) {
		next(err)
	}
}

export async function getEcommerceSummary(req: Request, res: Response, next: NextFunction) {
	try {
		const data = await statService.getEcommerceSummary()
		res.json({ data })
	} catch (err) {
		next(err)
	}
}

