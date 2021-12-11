FROM node:17.1.0
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . /app
EXPOSE 3005
CMD ["node","app.js" ]


