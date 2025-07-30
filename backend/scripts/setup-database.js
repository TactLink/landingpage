const { execSync } = require('child_process');

console.log('Setting up Strapi database...');

try {
  // Build Strapi
  console.log('Building Strapi...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Strapi build completed');
  console.log('Database tables should be created automatically on first startup');
  console.log('Check your Supabase dashboard for new tables');
  
} catch (error) {
  console.error('❌ Error during setup:', error.message);
  process.exit(1);
} 