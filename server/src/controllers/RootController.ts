import { Response, Request, NextFunction } from 'express'
import { get, controller, use } from './decorators'

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session.uid && req.session) {
    next()
    return
  }
  res.status(403)
  res.send('Not permitted')
}
@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {}

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected route, logged in user')
  }
}
