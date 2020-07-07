FROM node:14.5.0-alpine3.10

WORKDIR /app

COPY package.json package.json

COPY ./ ./

RUN npm install

#COPY ./ ./
#COPY .next /app/.next

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]


# docker build -t frontend .
# docker run -itd -p 3000:3000 frontend

# Or
# docker-compose build
# docker-compose up

