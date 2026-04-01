import { Router } from 'express'
import * as statController from '../controllers/stat.controller'
import { protect, restrictTo } from '../middleware/auth.middleware'

const router = Router()

router.use(protect)
router.use(restrictTo('admin'))

router.get('/ecommerce/users', statController.getEcommerceUsers)
router.get('/ecommerce/summary', statController.getEcommerceSummary)

export default router

