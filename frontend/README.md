# Frontend

Frontend implementation in Next.js

### Tech stack

- `Next.js` (As wrapper around React)
- `shadcn-ui` (UI components)
- `tailwind` (CSS library for layouts)
- `react-hook-form` (Forms + validations)
- `@reduxjs/toolkit` (API queries / mutations)
- `react-use-websocket` (Websockets from backend)
- `react-redux` (Mostly for RTK)

### Test server

```shell
npm i yarn -g
yarn && yarn dev
```

### Deploy

```shell

# Environment setup
cp .env.example .env

# With docker
docker-compose up --build -d

# With native
npm i yarn -g
yarn
yarn build
yarn start
```

### Configuration

Please look inside `.env.example` for more information
