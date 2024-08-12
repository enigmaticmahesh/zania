FROM  node:20.16-slim

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 5173

CMD ["yarn", "run", "dev-docker"]