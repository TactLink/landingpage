# Render Environment Variables for Supabase

## 🎉 **SUCCESS!** 
The Supabase connection pooling works! Use these environment variables in your Render deployment.

## 📋 **Environment Variables for Render**

Add these to your Render dashboard → Environment → Environment Variables:

### **Database Configuration:**
```
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://postgres.jfudrxydxczsdsktqvcv:Xo1ZnmjfSseF6qNx@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
DATABASE_HOST=aws-0-ap-southeast-1.pooler.supabase.com
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres.jfudrxydxczsdsktqvcv
DATABASE_PASSWORD=Xo1ZnmjfSseF6qNx
DATABASE_SCHEMA=public
```

### **Strapi Secrets:**
```
JWT_SECRET=KEk1AyLo9Gh6I+ht39qHYelQdBtz+8pI56QQ2hi4pc4=
ADMIN_JWT_SECRET=420OGsyTEIHvTbiA6O5m7Pa91OPnz1AI8JLgoUTBQek=
API_TOKEN_SALT=ci3oUTF0U4DItmKcO5kjeqgI0DXOM7HBIhvE08yw9OE=
APP_KEYS=Ebe3bqMBVUnPQwxQmk1K6JXuCELXJ62SBCtuTnHnS9s=,XfERw9y3yYXzIT1UQmLAgmqI5opBzSTr+F6NVFTZUGk=,CPSXkMj3n7Y8h/5zopXDPvvnsc4seboe5SJZTfPmEdY=,de95iRZD9Cr65BbcFAlA5as4gSMWJnOw0Y6ku2aINVw=
TRANSFER_TOKEN_SALT=wLP9HzGJVfvcNuqX2Ei0Ldzcb2MI2ocJNMYJI/TeOnA=
NODE_ENV=production
```

## 🚀 **Deployment Steps**

1. **Go to Render Dashboard**
2. **Select your Strapi service**
3. **Navigate to Environment → Environment Variables**
4. **Add all variables above**
5. **Save changes**
6. **Deploy** (Manual Deploy → Deploy latest commit)

## ✅ **What This Fixes**

- **Data Persistence**: Your Strapi data will now survive Render restarts
- **No More Auto-Reset**: Database is persistent in Supabase
- **Connection Pooling**: Better performance and reliability
- **SSL Certificate Issues**: Fixed self-signed certificate problems

## 🔍 **Verification**

After deployment, check:
1. **Render Logs**: Look for "Database connection established"
2. **Supabase Dashboard**: Check "Table Editor" for Strapi tables
3. **Strapi Admin**: Access admin panel and create test content
4. **Restart Test**: Restart Render service and verify data persists

## 🎯 **Result**

Your Strapi will now have persistent data storage! 🎉 