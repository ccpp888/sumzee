#build phase
FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . . 
RUN npm run build

#run phase (nginx started up automatically on container start)
FROM nginx
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
