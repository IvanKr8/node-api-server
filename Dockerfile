FROM node:20.15.1 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:20.15.1-alpine

WORKDIR /app

COPY --from=builder /app/.env .env

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

CMD ["npm", "run", "server"]