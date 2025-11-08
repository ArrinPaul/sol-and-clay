# **App Name**: Sol & Clay

## Core Features:

- Homepage Hero Section: Display a full-bleed hero section with looping video or slideshow of studio scenes and a primary CTA to explore the collection.
- Collections Index: Showcase a responsive grid of collection cards with images, titles, short descriptions, and filters for various categories.
- Product Detail Page: Display an image gallery with thumbnails, product information (name, price, materials, dimensions, stock), 'Story Behind The Piece' section, and an 'Add to Cart' button.
- Customization Tool: Provide a 'Customize This Piece' form allowing users to submit custom order requests; upload their request which saves data and images to Firestore Storage. LLM as tool which, upon a new entry, evaluates and filters submissions by specified attributes to prevent spam. Shortlisted collaborations have admin flag set.
- Admin Dashboard: Provide a role-protected admin panel to manage collections, products, orders, collaborations, and custom orders, including CSV export for orders and a simple analytics overview.
- Secure Payment Processing: Integrate Stripe Checkout for secure payment processing, including server-side checkout session creation, webhook handling to update order status in Firestore, and email confirmation upon successful payment.
- User Authentication and Roles: Implement Firebase Authentication with role-based access control to manage user roles (admin, editor, maker, customer) and restrict access to specific features and data.

## Style Guidelines:

- Primary color: Dark Chocolate (#332219) for a warm, earthy feel.
- Accent color: Soft Pastel Pink (#F7C7C7) for highlighting key elements.
- Background color: Warm Cream (#F8F4F0) - desaturated near the primary color in HSL, bright for readability.
- Headings: 'Cormorant Garamond' serif for headings, providing a literary, vintage feel.
- Body: 'Inter' sans-serif for body text, ensuring a modern and neutral look.
- Implement a lightweight Canvas-based 'Moving Brown Aura' background with soft radial gradients and slow organic motion.
- Use Framer Motion for scroll-triggered fades, parallax offsets, and hover micro-interactions to create smooth and handcrafted animations.