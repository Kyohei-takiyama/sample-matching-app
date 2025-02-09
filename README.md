## frontend

initial setup
npm create vite@latest frontend -- --template react-ts

deploy vercel

.env ファイルを含めていないため、環境変数の設定は vercel の UI から実施

Tailwindow css + shadcn

## backend

hono
https://hono.dev/docs/getting-started/aws-lambda

```bash
cd iac
cdk deploy
```

## infra

aws cdk
setup:https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/getting_started.html

how to deploy
iac

```bash
cd iac
cdk deploy
```
