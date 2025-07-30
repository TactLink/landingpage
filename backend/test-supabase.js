const { Client } = require('pg');

// Replace these with your actual Supabase credentials
const TEST_CONFIG = {
  host: 'db.[YOUR-PROJECT-REF].supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: '[YOUR-PASSWORD]',
  ssl: {
    rejectUnauthorized: false
  }
};

// Test database connection
async function testConnection() {
  console.log('Testing Supabase connection...');
  console.log('Host:', TEST_CONFIG.host);
  console.log('Database:', TEST_CONFIG.database);
  console.log('User:', TEST_CONFIG.user);
  
  const client = new Client(TEST_CONFIG);

  try {
    console.log('\nConnecting to database...');
    await client.connect();
    console.log('✅ Database connection successful!');
    
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Database query successful:', result.rows[0]);
    
    await client.end();
    console.log('\n🎉 Connection test passed! Your Supabase credentials are working.');
    
  } catch (error) {
    console.error('\n❌ Database connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check if your Supabase project is active');
    console.log('2. Verify your database password');
    console.log('3. Make sure the project reference is correct');
    console.log('4. Check if your project allows external connections');
  }
}

testConnection(); 