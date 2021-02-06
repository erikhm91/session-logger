# FROM arm32v7/node:12.20.1-alpine3.12

#try with buster to hopefully get python preinstalled.
FROM arm32v7/node:12-stretch


#install python - needed for node-gyp
# RUN npm install python (need to first access apt-get command or smth)
# RUN sudo apt-get update -y
# RUN sudo apt-get install -y python

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

#create working directory in container
WORKDIR /usr/src/app

#copy package.json and package-lock.json
COPY package*.json ./
COPY . .
# RUN apk add --no-cache --virtual .gyp \
#         python \
#         make \
#         g++ 
#         #\
#     # && npm install \
#     #     [ your npm dependencies here ] \
#     # && apk del .gyp


# To handle 'not get uid/gid' error
USER root
RUN npm config set unsafe-perm true && npm i -g @sap/cds-dk && npm install

#bundle app source

EXPOSE 4004
CMD ["npm", "start"]