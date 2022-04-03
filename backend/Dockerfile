FROM node:14.17


# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production


# Copy all local files into the image.
COPY . .
RUN npm install
RUN npm run build

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM node:14.18.1-alpine

WORKDIR /app
COPY --from=0 /app .
RUN npm install pm2 -g
# COPY . .

EXPOSE 8000