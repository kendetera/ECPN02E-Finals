// Creates (or resets) an admin account so you can log in the first time.
// Usage: npm run create-admin -- <username> <password>
import bcrypt from 'bcryptjs';
import { db } from '../supabase.js';

const [username, password] = process.argv.slice(2);
if (!username || !password) {
  console.error('Usage: npm run create-admin -- <username> <password>');
  process.exit(1);
}

const password_hash = await bcrypt.hash(password, 10);
const { error } = await db.from('users').upsert({ username, password_hash, role: 'admin' }, { onConflict: 'username' });
if (error) {
  console.error('Failed:', error.message);
  process.exit(1);
}
console.log(`Admin account "${username}" is ready.`);
