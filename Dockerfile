FROM node:20-alpine

WORKDIR /app

LABEL description = "React Todo App with CRUD"
LABEL created_at = "2025-02-07"

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm","run","dev"]
