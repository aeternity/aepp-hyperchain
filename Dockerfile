FROM node:18-alpine AS base-builder
RUN apk add make gcc g++ git python3
RUN corepack enable
RUN corepack prepare pnpm@8.6.5 --activate
WORKDIR /app
RUN mkdir node_modules
COPY package.json .
COPY pnpm-lock.yaml .

FROM base-builder AS prod-deps
WORKDIR /app
RUN pnpm i --prod

FROM base-builder AS build
WORKDIR /app
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package.json .
COPY pnpm-lock.yaml .
COPY --from=build /app/build /app/build
COPY --from=prod-deps /app/node_modules /app/node_modules
EXPOSE 3000
CMD [ "node", "build/index.js" ]
