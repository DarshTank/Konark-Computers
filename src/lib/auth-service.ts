import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

export interface AuthResult {
    user: {
        uid: string;
        email: string | null;
        displayName: string | null;
    } | null;
    error: string | null;
}

export const signInWithGoogle = async (): Promise<AuthResult> => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        if (!user.email) {
            await firebaseSignOut(auth);
            return { user: null, error: "No email provided by Google." };
        }

        // Check Whitelist
        const adminUsersRef = collection(db, "admin_users");
        const q = query(adminUsersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            await firebaseSignOut(auth);
            return { user: null, error: "Access Denied: Email not in whitelist." };
        }

        return {
            user: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            },
            error: null
        };
    } catch (error: any) {
        console.error("Login Error:", error);
        return { user: null, error: error.message || "An unexpected error occurred." };
    }
};

export const signInWithEmailOnly = async (email: string, password: string): Promise<AuthResult> => {
    try {
        const { signInWithEmailAndPassword } = await import("firebase/auth");
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Check Whitelist
        const adminUsersRef = collection(db, "admin_users");
        const q = query(adminUsersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            await firebaseSignOut(auth);
            return { user: null, error: "Access Denied: Email not in whitelist." };
        }

        return {
            user: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            },
            error: null
        };
    } catch (error: any) {
        console.error("Email Login Error:", error);
        return { user: null, error: error.message || "Login failed." };
    }
};

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error("Sign Out Error:", error);
    }
};
