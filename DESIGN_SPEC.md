# JKsportshub Website - Complete Design Screens

## 1. HOME PAGE (Landing Page)

### Header (Sticky Navigation)
- **Background**: #121212 (Dark charcoal)
- **Logo**: JKsportshub with blue accent
- **Navigation**: Home, Academy, Shop (dropdown), Contact
- **Right Side**: Search icon, Login button
- **Mobile**: Hamburger menu

### Hero Section
- **Background**: Full-width dynamic sports image with gradient overlay
- **Headline**: "ELEVATE YOUR GAME" (Large, bold, white text)
- **Subtext**: Description about premium sports equipment
- **CTA Buttons**: 
  - Primary: "Shop Gear" (Blue bg, white text)
  - Secondary: "Explore Academy" (Transparent border)
- **Stats**: 500+ Products, 50K+ Customers, 4.9 Rating

### Deals of the Day Section
- **Background**: Clean white (#FFFFFF)
- **Card Design**:
  - White rounded cards with subtle shadow
  - Product image on top
  - Title below image
  - Price row: Bold current price (₹2,999), struck-through original (₹3,499), green discount badge
  - No "Add to Cart" button - entire card is clickable
  - Hover: Lift effect + shadow
- **Grid**: 2 columns mobile, 4 columns desktop

### Featured Products Section
- **Layout**: Same as Deals section
- **Background**: Light grey (#FAFAFA)

### Footer
- **Background**: Light grey (#F5F5F5)
- **4-Column Grid**:
  1. About (Logo + description + Email/WhatsApp with icons)
  2. Quick Links (Home, About, Academy, Products, Contact with chevrons)
  3. Categories (With sport icons)
  4. Connect With Us (Social buttons)
- **Bottom Bar**: Copyright © 2026, Privacy | Terms

---

## 2. PRODUCTS LISTING PAGE (/products)

### Header
- Same as Home page

### Breadcrumb
- Home > All Products

### Page Title
- "All Products" with product count

### Filters Sidebar (Left)
- **Categories**: Checkboxes for each category
- **Price Range**: Min-Max slider
- **Sort By**: Dropdown (Price Low-High, Price High-Low, Newest)

### Product Grid
- **Grid**: 2 cols mobile, 3 cols tablet, 4 cols desktop
- **Card Design**:
  - White card with shadow
  - Product image (aspect 1:1)
  - Product name
  - Price with discount
  - Rating stars
  - "Add to Cart" button
- **Pagination**: Page numbers at bottom

### Empty State
- "No products found" with search icon
- "Clear filters" button

---

## 3. PRODUCT DETAIL PAGE (PDP) (/products/[slug])

### Header
- Same sticky navigation

### Breadcrumb
- Home > Category > Product Name

### Main Layout (2 columns on desktop)

**Left Column (60%):**
- Large product image gallery
- Thumbnail carousel below main image
- Image zoom on hover

**Right Column (40%):**
- Product Name (H1)
- Rating: 4.5/5 stars + review count
- Price: Current price, MRP struck through, discount %
- Short description
- **Variant Selectors**:
  - Size: Pill buttons (S, M, L, XL)
  - Color: Color swatches
- **Quantity**: +/- selector
- **Action Buttons**:
  - "Add to Cart" (Blue, full width)
  - "Buy Now" (Green, full width)
- **Trust Badges**: Free shipping, COD available, Easy returns

### Product Details Tabs
- **Tabs**: Description | Specifications | Reviews | Shipping
- Content in collapsible sections for mobile

### Related Products
- "You may also like" carousel
- 4-6 similar products

---

## 4. CATEGORY PAGE (/category/[slug])

### Header
- Same navigation

### Category Hero
- Banner image (category specific)
- Category name overlaid
- Subcategory links (horizontal scroll on mobile)

### Layout
- Same as Products listing page
- Pre-filtered by category

### Subcategories Grid
- Icons with category names
- Click to filter

---

## 5. ACADEMY PAGE (/academy)

### Header
- Same sticky nav

### Hero Section
- **Split Layout**: Left text, Right image
- **Headline**: "Train with the Pros"
- **Subtext**: Professional coaching programs
- **CTA**: "Enroll Now" button

### Features Grid (3 columns)
- Expert Coaching (icon)
- State-of-the-art Facilities (icon)
- Flexible Timings (icon)

### Program Tiers (Pricing Cards)
- **3 Cards**: Beginner, Intermediate, Elite
- **Intermediate card highlighted** with accent border
- **Each card**:
  - Program name
  - Price (monthly/annual toggle)
  - Feature list with checkmarks
  - "Enroll Now" CTA

### Testimonials
- Student quotes with photos
- Carousel/slider

### FAQ Section
- Accordion style questions

### Contact CTA
- "Questions? Contact us" section

---

## 6. CONTACT PAGE (/contact)

### Header
- Same navigation

### Layout (2 columns)

**Left Column:**
- **Headline**: "Get in Touch"
- Contact info:
  - Email icon + address
  - Phone icon + number
  - WhatsApp icon + number
  - Location icon + address
- Social media links

**Right Column:**
- **Contact Form**:
  - Name (text input)
  - Email (email input)
  - Phone (tel input)
  - Subject (dropdown)
  - Message (textarea)
  - "Send Message" button

### Map Section
- Embedded Google Map
- Store location marked

---

## 7. CART PAGE (/cart)

### Header
- Same navigation

### Page Title
- "Shopping Cart" with item count badge

### Cart Layout (2 columns on desktop)

**Left Column (Cart Items):**
- **Cart Item Card**:
  - Product image (thumbnail)
  - Product name + variant
  - Unit price
  - Quantity selector (+/-)
  - Remove button (trash icon)
  - Item total
- **Continue Shopping** link

**Right Column (Order Summary):**
- **Summary Card**:
  - Subtotal
  - Shipping (Free/Calculated)
  - Discount code input
  - Total amount (bold)
  - "Proceed to Checkout" button (Blue)
  - "Cash on Delivery available" note

### Empty Cart State
- Empty cart illustration
- "Your cart is empty" text
- "Start Shopping" button

---

## 8. CHECKOUT PAGE (/checkout)

### Header
- Simplified logo (no navigation to avoid distractions)
- Progress steps: Cart > Information > Shipping > Payment

### Checkout Form (Single column, multi-step or long form)

**Step 1: Contact Information**
- Email input
- Phone input
- "Continue to Shipping" button

**Step 2: Shipping Address**
- Full name
- Address line 1 & 2
- City
- State dropdown
- PIN code
- "Continue to Payment" button

**Step 3: Payment**
- **Payment Options**:
  - Credit/Debit Card (form fields)
  - UPI
  - Cash on Delivery
- **Order Summary** (collapsible on mobile):
  - Items list
  - Subtotal
  - Shipping
  - Total
- "Complete Order" button

---

## 9. ABOUT PAGE (/about)

### Header
- Same navigation

### Hero Section
- Company mission statement
- Large typography

### Our Story Section
- Text with image
- Timeline of company growth

### Team Section
- Team member cards with photos
- Name, role, brief bio

### Values/Mission
- 3-4 value cards with icons

### Partners/Brands
- Logo carousel of partner brands

---

## 10. USER ACCOUNT PAGES

### Login Page (/login)
- **Layout**: Centered card, single column
- **Fields**:
  - Email
  - Password
  - "Remember me" checkbox
  - "Login" button (Blue)
  - "Forgot password?" link
  - "Don't have an account? Register" link
- Social login options (Google)

### Register Page (/register)
- **Fields**:
  - Full Name
  - Email
  - Phone
  - Password
  - Confirm Password
  - Terms checkbox
  - "Create Account" button
- "Already have an account? Login" link

### Dashboard (/account)
- **Sidebar Navigation**:
  - Dashboard
  - My Orders
  - Addresses
  - Profile
  - Wishlist
  - Logout

**Dashboard Home:**
- Welcome message
- Recent orders summary
- Quick actions (Continue shopping, View orders)

**Orders Page:**
- Order history list
- Each order:
  - Order number, date
  - Status badge (Delivered, Processing, etc.)
  - Items summary
  - Total
  - "View Details" / "Reorder" buttons

**Order Detail Page:**
- Order timeline (Placed → Processing → Shipped → Delivered)
- Full item list with images
- Shipping address
- Payment method
- Invoice download

---

## 11. ADMIN DASHBOARD SCREENS

### Admin Login (/admin/login)
- Simple dark theme login form
- Email + Password
- Sign in button

### Admin Dashboard (/admin)
- **Stats Cards** (4 columns):
  - Total Orders
  - Total Revenue
  - Products Count
  - Pending Orders
- **Quick Links** grid
- **Recent Orders** table

### Products Management (/admin/products)
- **Header**: "Products" + "New Product" button
- **Table**: Image, Name, Category, Price, Stock, Actions (Edit/Delete)
- **Filters**: Search, Category dropdown
- **Pagination**

### Add/Edit Product (/admin/products/new or /admin/products/[id])
- **Form Sections**:
  - Basic Info (Name, Slug, Description)
  - Pricing (Price, Compare Price, Cost)
  - Inventory (SKU, Stock, Track quantity)
  - Images (Upload + gallery)
  - Category (Dropdown)
  - Variants (Size, Color options)
  - SEO (Meta title, description)
- **Save** and **Save & Publish** buttons

### Categories Management (/admin/categories)
- **Tree/List view** of categories
- Add/Edit category modal
- Drag to reorder

### Orders Management (/admin/orders)
- **Filters**: Status, Date range, Customer
- **Table**: Order ID, Customer, Date, Total, Status, Actions
- **Bulk actions**: Update status, Export

### Order Detail (/admin/orders/[id])
- Customer info
- Order items (editable quantities/prices)
- Status dropdown
- Add tracking number
- Print invoice

### Customers (/admin/customers)
- Customer list with search
- Customer detail view with order history

---

## DESIGN SYSTEM SPECIFICATIONS

### Colors
- **Primary**: Blue (#3B82F6)
- **Primary Dark**: #2563EB
- **Accent/Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Background Light**: #FAFAFA
- **Background White**: #FFFFFF
- **Background Dark**: #121212
- **Text Primary**: #1F2937
- **Text Secondary**: #6B7280
- **Text Muted**: #9CA3AF
- **Border**: #E5E7EB

### Typography
- **Headings**: Inter or system font, bold weight
- **Body**: Inter or system font, regular weight
- **H1**: 2.5rem (40px)
- **H2**: 2rem (32px)
- **H3**: 1.5rem (24px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)

### Spacing Scale
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

### Border Radius
- Small: 4px (buttons)
- Medium: 8px (cards)
- Large: 12px (modals)
- XL: 16px (hero sections)
- Full: 9999px (pills, avatars)

### Shadows
- Small: 0 1px 2px rgba(0,0,0,0.05)
- Medium: 0 4px 6px rgba(0,0,0,0.1)
- Large: 0 10px 15px rgba(0,0,0,0.1)

### Buttons
- **Primary**: Blue bg, white text, rounded-md, hover darker
- **Secondary**: White bg, gray border, hover gray-50
- **Ghost**: Transparent, hover gray-100
- **Danger**: Red bg, white text

### Form Inputs
- Border: 1px solid gray-300
- Rounded: 6px
- Focus: Blue ring
- Padding: 0.5rem 0.75rem

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## RESPONSIVE BEHAVIOR

### Mobile (< 640px)
- Single column layouts
- Hamburger navigation
- Stacked product cards (2 cols max)
- Bottom-fixed CTA buttons
- Touch-friendly tap targets (min 44px)

### Tablet (640px - 1024px)
- 2-column layouts where applicable
- Sidebar becomes overlay drawer
- Product grid: 3 columns

### Desktop (> 1024px)
- Full multi-column layouts
- 4-column product grids
- Hover interactions enabled
- Sticky sidebars

---

## INTERACTION STATES

### Hover States
- Buttons: Darken background, slight scale
- Cards: Lift up (shadow increase), border highlight
- Links: Color change to primary
- Images: Subtle zoom (scale 1.05)

### Active/Press States
- Buttons: Scale down slightly (0.98)
- Cards: Darken slightly

### Loading States
- Skeleton screens for lists
- Spinner buttons for async actions
- Progress bars for multi-step forms

### Empty States
- Illustration + friendly message
- Clear CTA to take action

---

This comprehensive design system covers all screens needed for a complete e-commerce sports equipment website with admin panel.
