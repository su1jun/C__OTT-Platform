```shell
npm install -D prisma
npx prisma init
```

- prisma 셋팅
- db 셋팅

```shell
npm install @prisma/client
```

https://cloud.mongodb.com/

```shell
npm install dotenv // add
npx prisma generate // add
npx prisma db push
```

```
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": MongoDB database "test" at "cluster0.aulnxko.mongodb.net"
Error: MongoDB error
Kind: An error occurred during DNS resolution: proto error: io error: 연결할 수 없는 네트워크에서 소켓 작업을 시도했습니다. (os error 10051), labels: {}
   0: schema_core::commands::schema_push::Calculate `from`
             at schema-engine\core\src\commands\schema_push.rs:27
   1: schema_core::state::SchemaPush
             at schema-engine\core\src\state.rs:461
```
>>> VPN 써야함

```shell
npm install -D @types/bcrypt
```