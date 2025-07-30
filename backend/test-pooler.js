const { Client } = require('pg');

// Test Supabase connection pooling
async function testPoolerConnection() {
  const config = {
    connectionString: 'postgresql://postgres.jfudrxydxczsdsktqvcv:Xo1ZnmjfSseF6qNx@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres',
    ssl: {
      rejectUnauthorized: false
    }
  };

  console.log('Testing Supabase connection pooling...');
  console.log('Host: aws-0-ap-southeast-1.pooler.supabase.com');
  
  const client = new Client(config);

  try {
    console.log('\nConnecting to database...');
    await client.connect();
    console.log('✅ Database connection successful!');
    
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Database query successful:', result.rows[0]);
    
    await client.end();
    console.log('\n🎉 Connection pooling works! Use this for deployment.');
    
  } catch (error) {
    console.error('\n❌ Database connection failed:', error.message);
    console.log('\n🔧 This might be a network issue or credential problem.');
  }
}

testPoolerConnection(); 