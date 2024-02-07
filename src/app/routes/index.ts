import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { CowRoutes } from '../modules/cow/cow.route';
import { UserAuthRoutes } from '../modules/user/userAuth.route';
const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: UserAuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cow',
    route: CowRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
