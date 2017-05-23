FROM node:latest
#FROM node:alpine-node

WORKDIR /app
COPY ./ .

RUN ["npm", "install", "-g", "pm2"]
CMD ["pm2", "start", "--no-daemon",  "processe.json"]


# Install 'oh-my-zsh'
#RUN ["apt-get", "update"]
#RUN ["apt-get", "install", "-y", "zsh"]
#RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true