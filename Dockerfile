FROM node:22.0.0-alpine AS base
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . .
# now build the app
RUN npm run build

# now create a new image
FROM node:22.0.0-alpine
WORKDIR /app
# only copy the public folder and the .next folder
COPY --from=base /app/public /app/public
COPY --from=base /app/.next/standalone /app
COPY --from=base /app/.next/static /app/.next/static


WORKDIR /app
EXPOSE 3001
ENV PORT=3001

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]