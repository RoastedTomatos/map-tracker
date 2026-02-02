import type { Request, Response, NextFunction } from 'express'

const VALID_LOGIN_KEYS = new Set(['demo', 'test'])
const ACTIVE_ACCESS_KEYS = new Set<string>()

export function login(req: Request, res: Response) {
  const { key } = req.body

  if (!key || !VALID_LOGIN_KEYS.has(key)) {
    return res.status(401).json({ error: 'Invalid key' })
  }

  const accessKey = crypto.randomUUID()
  ACTIVE_ACCESS_KEYS.add(accessKey)

  res.json({ access_key: accessKey })
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  const accessKey = header?.replace('Bearer ', '')

  if (!accessKey || !ACTIVE_ACCESS_KEYS.has(accessKey)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  next()
}
