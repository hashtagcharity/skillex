FROM node:0.10-wheezy

ENV PORT 3000
# has to be stated explicitly
EXPOSE 3000

ADD . /skillex

# RUN apt-get update -y
RUN cd /skillex && npm install

WORKDIR /skillex

CMD ["node", "index.js"]
