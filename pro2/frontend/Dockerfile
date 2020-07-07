FROM node:14.5.0-alpine3.10

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY ./ ./
#COPY .next /app/.next

RUN npm run build

CMD ["npm", "start"]



