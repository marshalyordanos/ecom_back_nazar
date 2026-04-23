# Mobile Socket Notifications Guide

This guide explains how notifications work in this project and how to connect your mobile app to Socket.IO in a simple way.

## 1) How notifications work

### Backend flow

1. Business events happen (order created, payment received, payment refunded, shipment updates, etc.).
2. Backend creates notification rows in DB using `createNotification(...)` in `src/services/notification.service.ts`.
3. Backend publishes notification payload to Redis channel `notification`.
4. Socket server (`src/lib/socket.ts`) subscribes to Redis and emits:
   - `notification` to `user:<userId>` room
   - `notification:broadcast` (global channel)
5. Connected clients with valid JWT receive real-time events.

### Admin events

- Admin fan-out helpers:
  - `notifyAllAdminsOrderEvent(...)`
  - `notifyAllAdminsPaymentEvent(...)`
- They create DB notifications for all non-`user` roles and emit via socket.
- Admin events are socket-only (no Expo push from these helpers).

## 2) Socket auth requirement

Socket auth uses the same access token as API auth.

- Event path: `/socket.io`
- Token transport:
  - `auth.token` (preferred)
  - fallback: query `token`

Server joins user room after token validation:

- Room name format: `user:<userId>`

## 3) Mobile app connection (React Native / Expo)

Install client:

```bash
npm i socket.io-client
```

Example:

```ts
import { io, Socket } from 'socket.io-client'

type NotificationPayload = {
  id: string
  userId?: string | null
  type: string
  title: string
  message: string
  metadata?: Record<string, unknown>
  createdAt: string
}

let socket: Socket | null = null

export function connectNotifications(params: {
  apiBaseUrl: string // example: http://localhost:8000/api/v1
  accessToken: string
  onNotification: (payload: NotificationPayload) => void
}) {
  const socketBase = params.apiBaseUrl.replace(/\/api\/v1\/?$/, '')

  socket = io(socketBase, {
    path: '/socket.io',
    auth: { token: params.accessToken },
    transports: ['websocket']
  })

  socket.on('connect', () => {
    console.log('socket connected', socket?.id)
  })

  socket.on('notification', params.onNotification)
}

export function disconnectNotifications() {
  if (!socket) return
  socket.off('notification')
  socket.disconnect()
  socket = null
}
```

## 4) Recommended app lifecycle

- On login:
  - Save access token
  - Connect socket
- On token refresh:
  - Reconnect socket with new token
- On logout:
  - Disconnect socket
  - Clear local notification state

## 5) What to do when notification arrives

In `onNotification(payload)`:

1. Add payload to local notification list
2. Increase unread badge count
3. Optionally show in-app toast/banner
4. Refresh APIs that show counts/lists

For this project:

- Customer apps usually refresh:
  - notifications list
  - unread count
- Admin app refreshes:
  - dashboard notification summary
  - dashboard unread notification metrics

## 6) API endpoints related to notifications

Customer notification endpoints:

- `GET /api/v1/users/notifications`
- `GET /api/v1/users/notifications/unread-count`
- `POST /api/v1/users/notifications/read-all`
- `POST /api/v1/users/notifications/:id/read`

Push-token endpoints (optional, Expo):

- `POST /api/v1/users/me/push-token`
- `DELETE /api/v1/users/me/push-token`

If you are using socket-only behavior for a specific audience, you can skip push-token registration for that audience.

## 7) Quick troubleshooting

- No events received:
  - check access token is valid and current
  - check socket base URL (must remove `/api/v1`)
  - confirm backend logs show socket connection
  - confirm Redis is reachable and `REDIS_URL` set
- Connected but no user notifications:
  - verify event has correct `userId`
  - verify server joined `user:<userId>` room
- Duplicate notifications:
  - ensure listener cleanup on unmount/logout
  - avoid creating multiple socket instances in parallel
