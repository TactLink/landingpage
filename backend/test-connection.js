const { Client } = require('pg');

// Test database connection
async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Testing database connection...');
    await client.connect();
    console.log('✅ Database connection successful!');
    
    const result = await client.query('SELECT NOW()');
    console.log('✅ Database query successful:', result.rows[0]);
    
    await client.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

testConnection(); 