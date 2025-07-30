# Step-by-Step Guide: Fix Strapi Data Persistence with Supabase

## 🎯 Goal
Configure Strapi to use Supabase (PostgreSQL) instead of SQLite so your data persists when Render restarts.

---

## ✅ Step 1: Create Supabase Account & Project

1. **Go to Supabase**: Visit [https://supabase.com](https://supabase.com)
2. **Sign Up**: Create a new account or log in
3. **Create Project**: Click "New Project"
4. **Fill Details**:
   - Project name: `tactlink-strapi` (or your preferred name)
   - Database password: Create a strong password (save this!)
   - Region: Choose closest to your users
5. **Wait**: Project setup takes 1-2 minutes

---

## ✅ Step 2: Get Database Connection Details

1. **Open Project**: Click on your new project
2. **Go to Settings**: Click "Settings" in the left sidebar
3. **Database Tab**: Click "Database" tab
4. **Copy Connection String**: Find "Connection string" section
5. **Save These Details**:
   - Connection string (looks like: `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres`)
   - Database password (you set this in Step 1)
   - Project reference (the part after `db.` and before `.supabase.co`)

---

## ✅ Step 3: Generate Strapi Secrets

1. **Open Terminal**: In your backend directory
2. **Run Command**:
   ```bash
   node -e "const crypto = require('crypto'); console.log('JWT_SECRET:', crypto.randomBytes(32).toString('base64')); console.log('ADMIN_JWT_SECRET:', crypto.randomBytes(32).toString('base64')); console.log('API_TOKEN_SALT:', crypto.randomBytes(32).toString('base64')); console.log('APP_KEYS:'); for(let i=0;i<4;i++) console.log(crypto.randomBytes(32).toString('base64')); console.log('TRANSFER_TOKEN_SALT:', crypto.randomBytes(32).toString('base64'));"
   ```
3. **Copy All Values**: Save these generated secrets

---

## ✅ Step 4: Configure Render Environment Variables

1. **Open Render Dashboard**: Go to [https://render.com](https://render.com)
2. **Select Your Service**: Click on your Strapi backend service
3. **Environment Tab**: Click "Environment" in the left sidebar
4. **Add Variables**: Click "Add Environment Variable" for each:

### Database Variables:
```
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DATABASE_HOST=db.[YOUR-PROJECT-REF].supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=[YOUR-PASSWORD]
DATABASE_SSL=true
DATABASE_SCHEMA=public
```

### Strapi Secret Variables:
```
JWT_SECRET=[generated-value-from-step-3]
ADMIN_JWT_SECRET=[generated-value-from-step-3]
API_TOKEN_SALT=[generated-value-from-step-3]
APP_KEYS=[key1,key2,key3,key4-from-step-3]
TRANSFER_TOKEN_SALT=[generated-value-from-step-3]
NODE_ENV=production
```

**Replace**:
- `[YOUR-PASSWORD]` → Your Supabase database password
- `[YOUR-PROJECT-REF]` → Your project reference
- `[generated-value-from-step-3]` → Values from Step 3

---

## ✅ Step 5: Redeploy Your Application

1. **Save Variables**: Click "Save Changes" in Render
2. **Manual Deploy**: Click "Manual Deploy" → "Deploy latest commit"
3. **Monitor Logs**: Watch the deployment logs for success/errors
4. **Wait**: Deployment takes 2-5 minutes

---

## ✅ Step 6: Verify Setup

1. **Check Render Logs**: Look for "Database connection established" messages
2. **Test Supabase**: Go to Supabase dashboard → "Table Editor" → Check if Strapi tables exist
3. **Access Admin**: Go to your Strapi admin panel and verify it works
4. **Test Data**: Create some test content and restart Render to verify persistence

---

## 🚨 Important Notes

- **Backup First**: Export any existing data before switching
- **SSL Required**: Supabase requires SSL connections
- **Password Security**: Use a strong database password
- **IP Access**: Supabase allows connections from anywhere by default

---

## 🐛 If Something Goes Wrong

### Common Issues:
1. **Connection Failed**: Check if Supabase project is active
2. **SSL Errors**: Ensure `DATABASE_SSL=true`
3. **Wrong Password**: Double-check your database password
4. **Invalid URL**: Verify your connection string format

### Debug Steps:
1. Check Render deployment logs
2. Verify all environment variables are set correctly
3. Test connection in Supabase dashboard
4. Ensure project is not paused

---

## 🎉 Success!

Once completed, your Strapi data will persist across all Render restarts! 