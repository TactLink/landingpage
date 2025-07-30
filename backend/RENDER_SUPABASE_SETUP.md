# Render + Supabase Setup for Strapi

This guide will help you configure your Strapi backend to use Supabase (PostgreSQL) instead of SQLite to prevent data loss during Render restarts.

## ✅ What's Already Done

1. ✅ Added PostgreSQL dependencies (`pg` and `@types/pg`)
2. ✅ Updated database configuration to use PostgreSQL by default
3. ✅ Created secret generation script

## 🔧 Next Steps

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the project to be set up (usually takes 1-2 minutes)

### 2. Get Supabase Connection Details

1. In your Supabase dashboard, go to **Settings** > **Database**
2. Copy the connection string from the "Connection string" section
3. Note your database password (you set this during project creation)

### 3. Generate Strapi Secrets

Run this command in your backend directory:
```bash
node generate-secrets.js
```

This will generate all the required secrets for your environment variables.

### 4. Configure Render Environment Variables

In your Render dashboard:

1. Go to your Strapi service
2. Navigate to **Environment** > **Environment Variables**
3. Add these variables:

#### Database Configuration
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

#### Strapi Configuration (use the values from generate-secrets.js)
```
JWT_SECRET=[generated-value]
ADMIN_JWT_SECRET=[generated-value]
API_TOKEN_SALT=[generated-value]
APP_KEYS=[key1,key2,key3,key4]
TRANSFER_TOKEN_SALT=[generated-value]
NODE_ENV=production
```

### 5. Update Your Connection String

Replace the placeholders in `DATABASE_URL`:
- `[YOUR-PASSWORD]` → Your Supabase database password
- `[YOUR-PROJECT-REF]` → Your project reference (found in the connection string)

Example:
```
DATABASE_URL=postgresql://postgres:mypassword123@db.abcdefghijklmnop.supabase.co:5432/postgres
```

### 6. Redeploy Your Application

1. Save all environment variables in Render
2. Trigger a new deployment
3. Monitor the logs to ensure successful connection

## 🔍 Verification

After deployment, check:

1. **Render Logs**: Look for successful database connection messages
2. **Supabase Dashboard**: Check the "Table Editor" to see if Strapi tables were created
3. **Strapi Admin**: Access your admin panel and verify data persistence

## 🚨 Important Notes

- **Data Migration**: If you have existing data in SQLite, you'll need to export and re-import it
- **SSL Required**: Supabase requires SSL connections
- **IP Restrictions**: Make sure your Supabase project allows connections from Render's IP addresses
- **Backup**: Always backup your data before making database changes

## 🐛 Troubleshooting

### Common Issues:

1. **Connection Refused**: Check if your Supabase project is active
2. **SSL Errors**: Ensure `DATABASE_SSL=true` is set
3. **Authentication Failed**: Verify your database password
4. **Timeout Errors**: Check your network connectivity

### Debug Commands:

```bash
# Test database connection locally (if you have the credentials)
psql "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
```

## 📞 Support

If you encounter issues:
1. Check Render logs for error messages
2. Verify all environment variables are correctly set
3. Test the database connection using the Supabase dashboard
4. Ensure your Supabase project is not paused

---

**Your data will now persist across Render restarts! 🎉** 