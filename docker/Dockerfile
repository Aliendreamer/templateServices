# Use an official node as a parent image.
FROM node:lts-alpine3.19

ENV NODE_ENV=development

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.0.0/wait /wait

RUN apk update && apk add --no-cache nano sudo bash
RUN bash


# Set the working directory to /app.
RUN mkdir /app
WORKDIR /app
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.12.0/wait wait
# Copy the current directory contents into the container at /app.
COPY package.json /app
COPY yarn.lock /app
COPY . /app
COPY --chown=node:node . /app

RUN find . -type d  -mindepth 1 -maxdepth 1 \( -path ./node_modules \) -prune -o -print0 |xargs -0 chown -R node:node
RUN chmod +x /app/wait

USER node
# Make port 5000 available to the world outside this container.
EXPOSE 5000
# Make debug ports available for development.
EXPOSE 9222
EXPOSE 9229

STOPSIGNAL SIGTERM

CMD ./wait && yarn start