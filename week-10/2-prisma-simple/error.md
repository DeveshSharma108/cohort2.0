# 🚀 Prisma Migration Error - Connection Pooling Issue  

## ❌ Error Faced  
When running Prisma migrations, the following error occurred:  

---------------------------------------------------------------------------
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "neondb", schema "public" at "ep-crimson-thunder-a8wbzjqd-pooler.eastus2.azure.neon.tech"

Error: ERROR: database "prisma_migrate_shadow_db_4509f3af-cc0c-436c-8865-868c66a692d6" is being accessed by other users
DETAIL: There is 1 other session using the database.
   0: schema_core::state::DevDiagnostic
             at schema-engine/core/src/state.rs:267

## 🔍 Cause  
- I was using **Prisma v5.9.1**, which **does not support migrations with a pooled connection string**.  
- The pooled connection **keeps multiple active sessions**, causing conflicts during migrations.  
- Prisma creates a temporary "shadow database" for migrations, and multiple sessions prevented exclusive access.

## ✅ Solution  
- **Upgrade to Prisma v5.10+**, which **supports migrations via pooled connections**.  
- Now, **only one `DATABASE_URL`** is required for both migrations and app queries.  

## 💡 Workaround for Older Versions (<5.10)  
If using **Prisma v5.9.1 or older**, define two separate database URLs:  
1. **`DATABASE_URL`** → Used only for migrations (non-pooled connection)  
2. **`DATABASE_POOL_URL`** → Used for queries in the application (pooled connection)  

Example `.env`:  
```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
DATABASE_POOL_URL="postgresql://user:password@host/dbname?sslmode=require&pgbouncer=true"
