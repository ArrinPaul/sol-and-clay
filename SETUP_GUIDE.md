# 🚀 Setup Guide - Sol & Clay

This guide will walk you through setting up all the required services for your Sol & Clay e-commerce application.

## ✅ What's Already Done
- ✓ Next.js project structure
- ✓ Clerk authentication
- ✓ UI components and styling
- ✓ Code fixed and lint-free

## 📋 What You Need to Configure

### 1️⃣ Firebase (Database & Storage) - **REQUIRED**

Firebase is used for:
- Storing orders, collaborations, and user data
- Uploading collaboration images
- Cart persistence across devices

#### Steps:

**A. Create Firebase Project**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Name it `sol-and-clay` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

**B. Get Client Config**
1. In Firebase Console, click ⚙️ (Settings) > Project settings
2. Scroll to "Your apps" section
3. Click the web icon `</>`
4. Register app with nickname "Sol & Clay Web"
5. Copy the `firebaseConfig` object values to `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc
   ```

**C. Set Up Firestore Database**
1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in **production mode**" (our rules handle security)
4. Select your closest region
5. Click "Enable"

**D. Set Up Storage**
1. In Firebase Console, click "Storage"
2. Click "Get started"
3. Use the default security rules
4. Click "Done"

**E. Get Admin SDK Key (for server-side)**
1. In Firebase Console: ⚙️ > Project settings > Service accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Open it and copy **the entire JSON content**
5. In `.env.local`, add it as a **single line**:
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...
   ```
   ⚠️ Make sure it's all on one line!

**F. Deploy Firestore Rules**
```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# When prompted:
# - Use existing project: Select your project
# - Firestore rules file: Press enter (use firestore.rules)
# - Firestore indexes: Press enter (use firestore.indexes.json)

# Deploy the security rules
firebase deploy --only firestore:rules
```

---

### 2️⃣ Stripe (Payment Processing) - **REQUIRED**

Stripe handles all payment processing.

#### Steps:

**A. Create Stripe Account**
1. Go to [Stripe Signup](https://dashboard.stripe.com/register)
2. Create your account
3. You'll start in **Test mode** (perfect for development)

**B. Get API Keys**
1. In Stripe Dashboard, go to [Developers > API keys](https://dashboard.stripe.com/test/apikeys)
2. Copy the keys to `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

**C. Set Up Webhook (for order fulfillment)**
1. Go to [Developers > Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. Set endpoint URL:
   - For local dev: Use [Stripe CLI](https://stripe.com/docs/stripe-cli) (see below)
   - For production: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - ✓ `checkout.session.completed`
   - ✓ `checkout.session.expired`
   - ✓ `payment_intent.payment_failed`
   - ✓ `charge.refunded`
5. Click "Add endpoint"
6. Copy the "Signing secret" (starts with `whsec_`)
7. Add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

**D. Testing Webhooks Locally (Development)**
```bash
# Install Stripe CLI
# Windows: Download from https://github.com/stripe/stripe-cli/releases
# Mac: brew install stripe/stripe-cli/stripe
# Linux: See https://stripe.com/docs/stripe-cli

# Login to Stripe CLI
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:9003/api/webhooks/stripe

# This will give you a webhook secret - add it to .env.local
# Keep this terminal running while developing
```

**E. Test Payment Flow**
Use Stripe's test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Use any future expiry date, any CVC, any ZIP

---

### 3️⃣ Email Service (Optional but Recommended)

Send order confirmations and admin notifications.

#### Option A: Resend (Recommended - Easiest)

1. Go to [Resend Signup](https://resend.com/signup)
2. Create account (free tier: 100 emails/day)
3. Get API key from [API Keys page](https://resend.com/api-keys)
4. Add to `.env.local`:
   ```env
   EMAIL_PROVIDER=resend
   RESEND_API_KEY=re_...
   EMAIL_FROM=Sol & Clay <noreply@yourdomain.com>
   ADMIN_EMAIL=your-email@example.com
   ```
5. **Important**: In Resend dashboard, verify your domain or use their test domain

#### Option B: SendGrid (More features)

1. Go to [SendGrid Signup](https://signup.sendgrid.com/)
2. Create account (free tier: 100 emails/day)
3. Create API key from Settings > API Keys
4. Add to `.env.local`:
   ```env
   EMAIL_PROVIDER=sendgrid
   SENDGRID_API_KEY=SG...
   EMAIL_FROM=Sol & Clay <noreply@yourdomain.com>
   ADMIN_EMAIL=your-email@example.com
   ```

#### Option C: Skip Email (Development Only)
If you skip email setup, emails will be logged to the console instead of sent.

---

### 4️⃣ Google AI (Optional - For Collaboration Filtering)

Only needed if you want AI to filter spam collaboration requests.

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create API key
3. Add to `.env.local`:
   ```env
   GOOGLE_GENAI_API_KEY=AIzaSy...
   ```

---

## 🔧 Quick Setup Checklist

```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Fill in your keys in .env.local
# (See the sections above)

# 3. Install dependencies (if not done)
npm install

# 4. Deploy Firestore rules
firebase init firestore
firebase deploy --only firestore:rules

# 5. (Optional) Start Stripe webhook listener for local dev
stripe listen --forward-to localhost:9003/api/webhooks/stripe

# 6. Start development server
npm run dev
```

---

## 🧪 Testing Your Setup

### Test Firebase:
1. Try to submit a collaboration request at `/collaborate`
2. Check Firebase Console > Firestore Database for the new document

### Test Stripe:
1. Add items to cart
2. Go to checkout
3. Use test card: `4242 4242 4242 4242`
4. Complete payment
5. Check Stripe Dashboard > Payments for the transaction
6. Check Firebase Console > Firestore Database > orders for the order

### Test Email:
1. Complete a test order
2. Check your console logs (dev mode) or email inbox (production mode)

---

## 🔐 Security Notes

**Never commit these to git:**
- ❌ `STRIPE_SECRET_KEY`
- ❌ `FIREBASE_SERVICE_ACCOUNT_KEY`
- ❌ `SENDGRID_API_KEY` / `RESEND_API_KEY`
- ❌ `GOOGLE_GENAI_API_KEY`

**Safe to commit (public keys):**
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- ✅ `NEXT_PUBLIC_FIREBASE_*` (client config)
- ✅ `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

Your `.env.local` file is already in `.gitignore` ✓

---

## 🚀 Deploying to Production

### Update Environment Variables:

1. **Stripe**: Switch to live keys (remove `test` from key names)
2. **Firebase**: Use production mode (already set)
3. **Clerk**: Add production domain to allowed origins
4. **Email**: Verify your domain with email provider
5. **Next.js Config**: Update `NEXT_PUBLIC_SITE_URL` to your domain

### Deploy to Vercel (Recommended):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Or use: vercel env add
```

### Set up Stripe webhook for production:
1. Go to Stripe Dashboard > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Copy the new webhook secret
4. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables

---

## 📞 Need Help?

Common issues:

**"Firebase permission denied"**
- Run `firebase deploy --only firestore:rules`
- Make sure Firestore is enabled

**"Stripe webhook not working"**
- Check webhook secret matches
- For local dev, make sure `stripe listen` is running
- Check Stripe Dashboard > Webhooks for delivery attempts

**"Email not sending"**
- Check EMAIL_PROVIDER is set correctly
- Verify your sending domain with email provider
- Check console logs for errors

---

## 🎉 You're All Set!

Once configured, your app has:
- ✅ User authentication (Clerk)
- ✅ Cart with cross-device sync
- ✅ Payment processing with Stripe
- ✅ Order storage in Firebase
- ✅ Email confirmations
- ✅ Admin dashboard
- ✅ Rate limiting
- ✅ AI collaboration filtering

Happy selling! 🏺
