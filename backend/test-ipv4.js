const { Client } = require('pg');

// Test database connection with IPv4 forced
async function testConnection() {
  // Using actual Supabase credentials
  const config = {
    host: 'db.jfudrxydxczsdsktqvcv.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Landing999$$$',
    ssl: {
      rejectUnauthorized: false
    },
    // Force IPv4
    family: 4
  };

  console.log('Testing Supabase connection with IPv4...');
  console.log('Host:', config.host);
  
  const client = new Client(config);

  try {
    console.log('\nConnecting to database...');
    await client.connect();
    console.log('✅ Database connection successful!');
    
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Database query successful:', result.rows[0]);
    
    await client.end();
    console.log('\n🎉 Connection test passed!');
    
  } catch (error) {
    console.error('\n❌ Database connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check if your Supabase project is active');
    console.log('2. Verify your database password');
    console.log('3. Make sure the project reference is correct');
    console.log('4. Try a different region in Supabase');
  }
}

testConnection(); 