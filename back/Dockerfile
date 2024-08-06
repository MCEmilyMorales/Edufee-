FROM node:22.4
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3005
CMD [ "npm", "run", "start"]
