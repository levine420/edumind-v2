import { NextResponse } from 'next/server';
import db from '@/app/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  console.log('\n--- REGISTER API HIT ---');
  try {
    const { name, email, password } = await req.json();
    console.log('Received data:', { name, email });

    if (!name || !email || !password) {
      console.log('Validation failed: Missing fields.');
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const checkUserStmt = db.prepare('SELECT id FROM users WHERE email = ?');
    const existingUser = checkUserStmt.get(email);

    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }
    console.log('User does not exist, proceeding to create.');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed.');

    // Insert new user into the database
    const insertStmt = db.prepare(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    );
    const info = insertStmt.run(name, email, hashedPassword);
    console.log('DB insert result:', info);

    return NextResponse.json({
      message: 'User created successfully',
      userId: info.lastInsertRowid 
    }, { status: 201 });

  } catch (error) {
    console.error('--- REGISTER API ERROR ---:', error);
    return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
  }
}
