# Node version
FROM node:22-slim

# Set environment
ENV NODE_ENV=development

# Expose port for Vite
EXPOSE 5173

# Working directory
WORKDIR /usr/src/note-app/frontend

# Copy package files
COPY --chown=node:node package.json package-lock.json* ./

# Install dependencies
RUN npm ci && npm cache clean --force

USER node

HEALTHCHECK --interval=30s CMD node healthcheck.js

# Copy source code
COPY --chown=node:node . .

# Run Vite dev server, accessible from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
