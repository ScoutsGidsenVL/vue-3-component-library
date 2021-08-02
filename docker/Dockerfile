### Development stage
FROM node:lts-alpine as development-stage
RUN yarn global add @vue/cli@3.9.1 
WORKDIR /vue-3-component-library
RUN apk add --no-cache git
CMD npm install && npm run build
