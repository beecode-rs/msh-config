FROM milosbugarinovic/msh-lib-base:node20.12.2-alpine3.19

USER root

COPY . .

RUN chown node:node -R .

USER node

RUN npm ci        && \
    npm run lint
