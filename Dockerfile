FROM node:12

#create working directory in container
WORKDIR /usr/src/app

#copy package.json and package-lock.json
COPY package*.json ./
RUN  npm i -g @sap/cds-dk
RUN  npm install

#bundle app source
COPY . .
EXPOSE 4004
CMD ["npm", "start"]