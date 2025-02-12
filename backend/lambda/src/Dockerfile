FROM node:20 AS builder

WORKDIR /app
RUN npm init -y
RUN npm install -g typescript
RUN npm install uuid
RUN npm install --save-dev @types/node @types/aws-lambda @types/uuid
COPY migration.ts ./
RUN tsc migration.ts

FROM public.ecr.aws/lambda/nodejs:20

# Builder ステージで生成された migration.js をコピー
COPY --from=builder /app/migration.js ${LAMBDA_TASK_ROOT}/
# Builder ステージでインストールした node_modules をコピー（依存関係のため）
COPY --from=builder /app/node_modules ${LAMBDA_TASK_ROOT}/node_modules
# prisma ディレクトリのコピー
COPY ./prisma ${LAMBDA_TASK_ROOT}/

RUN npm i -g prisma

CMD [ "migration.handler" ]
