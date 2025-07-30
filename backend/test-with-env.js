const { Client } = require('pg');

// Test database connection using environment variables
async function testConnection() {
  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL environment variable not set');
    console.log('\nTo test locally, set your DATABASE_URL:');
    console.log('Windows: set DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres');
    console.log('Mac/Linux: export DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres');
    return;
  }

  console.log('Testing connection with DATABASE_URL...');
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('✅ Database connection successful!');
    
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Database query successful:', result.rows[0]);
    
    await client.end();
    console.log('\n🎉 Connection test passed!');
    
  } catch (error) {
    console.error('\n❌ Database connection failed:', error.message);
    console.log('\n🔧 Check your DATABASE_URL format and credentials');
  }
}

testConnection(); 