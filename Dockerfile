FROM node:13.12 AS builder
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npm run build


FROM node:13.12-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]