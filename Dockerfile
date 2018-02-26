FROM node

RUN mkdir /code
WORKDIR /code
COPY index.html app.js package.json /code/
RUN npm install

EXPOSE 8081
CMD node app.js


