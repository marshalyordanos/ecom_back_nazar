import { Router } from 'express'
import * as statController from '../controllers/stat.controller'
import { protect, restrictTo } from '../middleware/auth.middleware'
import { requirePermission } from '../middleware/permission.middleware'

const router = Router()

router.use(protect)
router.use(restrictTo('admin'))

router.get(
  '/ecommerce/users',
  requirePermission('statistics', 'read'),
  statController.getEcommerceUsers
)
router.get(
  '/ecommerce/summary',
  requirePermission('statistics', 'read'),
  statController.getEcommerceSummary
)

export default router

