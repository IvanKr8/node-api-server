FROM node:14 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/.env .env

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

CMD ["npm", "run", "server"]