FROM node:alpine AS build

RUN mkdir -p /app
WORKDIR /app


COPY package.json  package.json

RUN npm install

COPY . .

RUN  npm run build
COPY nginx.conf /app/nginx.conf
EXPOSE  5173



FROM nginx:stable-alpine




COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf



# Запуск nginx на переднем плане
 CMD [ "nginx" , "-g" , "daemon off;" ]

