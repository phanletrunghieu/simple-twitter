FROM node:10.16.3-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn && \
    yarn telemetry_disable && \
    yarn cache clean && \
    yarn fetch-pkg
COPY . .
RUN yarn build && yarn dist

FROM alpine:3.9
RUN apk add --no-cache libstdc++
WORKDIR /
ENV NODE_ENV production
COPY --from=builder /app/dist/my-app app
CMD ["/app"]