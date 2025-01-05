FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 CMD curl -f http://localhost:3000 || exit 1
