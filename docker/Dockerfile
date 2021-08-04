### Development stage
FROM  registry-dev.cloud.inuits.io/node:lts as development-stage

WORKDIR /app
ENTRYPOINT ["/entrypoint.sh"]

COPY docker/entrypoint*.sh /
COPY package.json package-lock.json ./

COPY ./ ./

