const { Client } = require('pg');

// Test different connection methods for Supabase
async function testSupabaseConnection() {
  const connectionMethods = [
    {
      name: 'Standard Connection',
      config: {
        host: 'db.jfudrxydxczsdsktqvcv.supabase.co',
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: 'Xo1ZnmjfSseF6qNx',
        ssl: { rejectUnauthorized: false }
      }
    },
    {
      name: 'IPv4 Forced',
      config: {
        host: 'db.jfudrxydxczsdsktqvcv.supabase.co',
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: 'Xo1ZnmjfSseF6qNx',
        ssl: { rejectUnauthorized: false },
        family: 4
      }
    },
    {
      name: 'Connection String',
      config: {
        connectionString: 'postgresql://postgres:Xo1ZnmjfSseF6qNx@db.jfudrxydxczsdsktqvcv.supabase.co:5432/postgres',
        ssl: { rejectUnauthorized: false }
      }
    }
  ];

  for (const method of connectionMethods) {
    console.log(`\n🔍 Testing: ${method.name}`);
    
    const client = new Client(method.config);
    
    try {
      await client.connect();
      console.log('✅ Connection successful!');
      
      const result = await client.query('SELECT NOW() as current_time');
      console.log('✅ Query successful:', result.rows[0]);
      
      await client.end();
      console.log('🎉 This method works! Use this configuration.');
      return method.config;
      
    } catch (error) {
      console.log('❌ Failed:', error.message);
      await client.end();
    }
  }
  
  console.log('\n❌ All connection methods failed. Try alternative database providers.');
  return null;
}

testSupabaseConnection(); 