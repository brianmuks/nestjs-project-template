# Installing and Running

## Prerequisites

- Node.js 22 (`nvm use` reads `.nvmrc`).
- npm.
- Docker Desktop, or an accessible MongoDB instance.
- A Twilio account with one Verify Service configured for SMS.

## Local Development

```bash
nvm use
npm install
cp .env.example .env
docker compose -f docker-compose.document.yaml up -d mongo mongo-express maildev
npm run seed:run:document
npm run start:dev
```

Set real values in `.env` for:

```dotenv
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=replace-with-your-twilio-auth-token
TWILIO_VERIFY_SERVICE_SID=VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AUTH_JWT_SECRET=replace-with-a-long-random-secret
AUTH_REFRESH_SECRET=replace-with-a-different-long-random-secret
```

The local example runs the backend at <http://localhost:3008>, Swagger at
<http://localhost:3008/docs>, Mongo Express at <http://localhost:8081>, and
MailDev at <http://localhost:1080>.

## Containerized API

The Docker development file uses `env-example-document`, which binds the API
to port `3000` inside its all-container setup:

```bash
docker compose -f docker-compose.document.yaml --env-file env-example-document up --build
```

Replace the placeholder Twilio values before sending real verification codes.

## Verification

```bash
npm run lint
npm run type-check
npm test -- --runInBand
npm run build
```

---

Previous: [Introduction](introduction.md)

Next: [Architecture](architecture.md)
