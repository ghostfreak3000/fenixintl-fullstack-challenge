FROM node:10-alpine

ADD . /code
WORKDIR /code

ENV PATH /code/node_modules/.bin:$PATH

# if running docker on a windows host, 
# configure react-scripts to use polling to enable hot reload ( bug with volumes on windows -- https://stackoverflow.com/a/53950476/1677589)
# you can comment this out when using docker in a non-windows host to improve performance
ENV CHOKIDAR_USEPOLLING true

RUN yarn install

CMD ["npm", "start"]