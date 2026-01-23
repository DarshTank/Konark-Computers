import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, developerKey } = await request.json();

    if (developerKey !== process.env.DEVELOPER_KEY) {
      return NextResponse.json({ error: 'Invalid developer key' }, { status: 403 });
    }

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if user already exists
    const usersRef = adminDb.collection('admin_users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (!snapshot.empty) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Create Firebase Auth User
    try {
        await adminAuth.createUser({
            email,
            password,
            displayName: name,
        });
    } catch (authError: any) {
        if (authError.code === 'auth/email-already-exists') {
             // User exists in Auth but passed the Firestore check above (so not in admin_users).
             // We updates their password/profile to match this new request so they can log in.
             try {
                const userRecord = await adminAuth.getUserByEmail(email);
                await adminAuth.updateUser(userRecord.uid, {
                    password,
                    displayName: name,
                });
             } catch (updateError) {
                 console.error('Error updating existing user:', updateError);
                 throw authError; // Re-throw original if update fails
             }
        } else {
            throw authError;
        }
    }

    const newUserRef = await usersRef.add({
      email,
      password_hash: passwordHash, // Kept for legacy visibility but not used for auth
      name,
      role: 'admin',
      is_active: true,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUserRef.id,
        email,
        name,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Register API Error:', error);
    return NextResponse.json({ 
        error: error instanceof Error ? error.message : 'Internal server error',
        details: error 
    }, { status: 500 });
  }
}
