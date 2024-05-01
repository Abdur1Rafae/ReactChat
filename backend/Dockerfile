FROM node:alpine

ENV MONGODB_URI=value

ENV JWT_SECRET=value

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]

