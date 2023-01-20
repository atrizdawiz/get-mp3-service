# Install dependencies only when needed
FROM node:18-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Build application
RUN yarn build

# Production image, copy all the files, install ffmpeg and run express server
FROM node:18-alpine AS runner
WORKDIR /app

RUN apk add ffmpeg


RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeUser -u 1001
RUN mkdir downloads
RUN chown -R nodeUser:nodejs /app

COPY --from=builder --chown=nodeUser:nodejs /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

USER nodeUser

EXPOSE 3000

CMD ["yarn", "start"]