FROM node:latest

WORKDIR /app
COPY ./ .

# Install and run pm2
RUN ["npm", "install", "-g", "pm2"]
CMD ["pm2", "start", "--no-daemon", "process.json", "--env", "production"]
