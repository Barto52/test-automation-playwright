FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install playwright@1.49

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
