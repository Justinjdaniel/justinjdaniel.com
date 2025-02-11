# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Add package files for caching
COPY package*.json ./
COPY bun.lockb ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Labels
LABEL org.opencontainers.image.source="https://github.com/justinjdaniel/justinjdaniel.com" \
    org.opencontainers.image.description="Personal website of Justin J Daniel" \
    org.opencontainers.image.licenses="MIT"

# Start the application
CMD ["node", "server.js"]
