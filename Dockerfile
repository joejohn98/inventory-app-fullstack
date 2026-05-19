# Stage 1: Install dependencies and generate Prisma client

FROM node:24-alpine AS deps

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

# Dummy URL so prisma generate succeeds during build (no DB connection needed)
ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
ENV DATABASE_URL=${DATABASE_URL}

RUN npm ci
 
RUN npx prisma generate

# Stage 2: Build the application
 
FROM node:24-alpine AS builder

WORKDIR /app



COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npm run build

# Stage 3: Run the application (lean production image)

FROM node:24-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl

ENV NODE_ENV=production

RUN addgroup -S nodejs && \
    adduser -S nextjs -G nodejs

COPY --chown=nextjs:nodejs package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/src/generated ./src/generated

USER nextjs 

EXPOSE 3000

CMD ["npm", "start"]
