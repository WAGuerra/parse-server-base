FROM node:12.13.0

#TODO change this
RUN mkdir server

# To use npm private packages
# See https://docs.npmjs.com/docker-and-private-modules for further details
ARG NPM_TOKEN

#TODO change this
ADD ./dist /server
WORKDIR /server
RUN npm install

# Removes unecessary file
RUN rm -f .npmrc

#TODO update environment variables
ENV PARSE_MOUNT /api
ENV DATABASE_NAME database
ENV DATABASE_URI mongodb://mongo:27017/
#FIXME change this!!!
ENV APP_ID appId
# Keep masterKey in secret!!
#FIXME change this!!!
ENV MASTER_KEY masterKey
ENV SERVER_DOMAIN https://domain.com.br
ENV PARSE_DASHBOARD_ROOT_USER_PASSWORD "dashboard-pass"
ENV PARSE_SERVER_PORT 1337

# Optional (default : 'parse/cloud/main.js')
# ENV CLOUD_CODE_MAIN cloudCodePath

EXPOSE 1337

# Uncomment if you want to access cloud code outside of your container
# A main.js file must be present, if not Parse will not start

# VOLUME /parse/cloud               

# As webpack.BannerPlugin will insert the shebangs '#!/usr/bin/env node'
# on top of the server.js script, it is possible to run the script
# directly by the command line.
#FIXME change the permission of the server.js to +x
CMD [ "./server.js" ]
