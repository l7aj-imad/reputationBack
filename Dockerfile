FROM node:12 AS builder
WORKDIR /app
COPY ./digitalreputationapi/package*.json ./
RUN yarn install
COPY ./digitalreputationapi .
RUN yarn run build

# -------------------------

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3001
CMD ["yarn", "run", "start:prod"]