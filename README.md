# Fullstack notifications

Monorepository with notifications stats viewer (backend + frontend)

Built with Next.js + Django + (Redis + PostgreSQL)

### Features

- Frontend (Next.js)
- Backend REST (Django + DRF)
- Invalidation with channels (redis + websocket consumer)
- Auth (Redux-toolkit, JWT, djoser, drf-simple-jwt, cookies)
- UI (shadcn-ui + tailwind)
- FSD (frontend)
- Dashboard

### Invalidation (websocket consumer)

Client (frontend) will connect to the `websocket` stream, where backend will send invalidation context, after that client will immediatly update their data, some sort of `reactive` rerender, under the hood works with `Redis pub-sub layer` + `channels` + `daphne`

### TODO

- More tests
- Documentation
- Deploy (+CI/CD)
- Fix period select
- Inject more redux

### Previews

![](/docs/dashboard.png)
![](/docs/auth.png)
