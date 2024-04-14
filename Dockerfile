FROM node:14

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 3000

COPY . .

CMD ["node", "server.js"]