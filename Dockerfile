FROM node:18-alpine AS base
RUN apk add make gcc g++ git python3
RUN corepack enable
RUN corepack prepare pnpm@7.9.0 --activate
WORKDIR /app
RUN mkdir node_modules
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:18-alpine AS runtime
RUN apk add make gcc g++ git python3
RUN corepack enable
RUN corepack prepare pnpm@7.9.0 --activate
WORKDIR /app
# ENV NODE_ENV=production
RUN mkdir node_modules
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --prod
COPY --from=base /app/build /app/build
EXPOSE 3000
CMD [ "node", "build/index.js" ]
