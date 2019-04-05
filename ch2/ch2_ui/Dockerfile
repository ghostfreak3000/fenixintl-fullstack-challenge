FROM node:10-alpine

ADD . /code
WORKDIR /code

ENV PATH /code/node_modules/.bin:$PATH

RUN yarn install

CMD ["npm", "start"]