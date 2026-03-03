# Firebase Setup Instructions (Post-Migration)

This document outlines the steps required to set up your new Firebase project and connect it to your application, following the decision to use **Clerk for authentication** and **Firebase for the database (Firestore) and storage.**

## Step 1: Create a New Firebase Project

1.  Go to the **[Firebase Console](https://console.firebase.google.com/)**.
2.  Click **"Add project"** and give it a name (e.g., "sol-and-clay").
3.  Once the project is created, navigate to the **"Build"** section in the left-hand menu.
4.  Click on **"Firestore Database"** -> **"Create database"**. Start in **production mode**.
5.  Go back to the "Build" section and click on **"Storage"** -> **"Get started"**. Follow the prompts to enable it.

## Step 2: Update Your Environment Variables

1.  In your Firebase project, go to **Project Settings** (click the gear icon at the top of the left menu).
2.  Scroll down to the "Your apps" section and click on the **Web icon (`</>`)** to create a new web app.
3.  Give it a nickname and register the app.
4.  Firebase will show you a `firebaseConfig` object. Copy the values from this object.
5.  Open the `.env.local` file in your `sol-and-clay` directory.
6.  Update the following variables with the values you just copied:
    *   `NEXT_PUBLIC_FIREBASE_API_KEY`
    *   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    *   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    *   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    *   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    *   `NEXT_PUBLIC_FIREBASE_APP_ID`
    *   `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## Step 3: Deploy Your Database Security Rules

1.  You will need the Firebase CLI. If you don't have it, install it by running `npm install -g firebase-tools`.
2.  Log in to Firebase by running `firebase login`.
3.  From your project's root directory (`D:\Medha's Project\sol-and-clay`), run the following command to deploy the security rules that we've configured:
    ```bash
    firebase deploy --only firestore:rules
    ```

## Step 4: Implement Your Backend Logic

As a final reminder, all database operations (creating, updating, deleting data) must now be done through **API routes** in your Next.js application. Your client-side code is blocked from writing directly to the database for security reasons. These API routes will verify the Clerk JWT and then use the Firebase Admin SDK to access the database.

You are now set up to continue building your application.
