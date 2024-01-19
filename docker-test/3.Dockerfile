FROM node:18-alpine3.14

ARG aaa
ARG bbb

WORKDIR /app

COPY ./arg-test.js .

ENV aaa=${aaa} \
    bbb=${bbb}

CMD ["node", "/app/arg-test.js"]
