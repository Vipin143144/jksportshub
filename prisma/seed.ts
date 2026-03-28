import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

/** Deterministic unique image per product slug (demo stock photos). */
function productImageUrl(slug: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/640/640`;
}

const sampleNames = [
  "Indian Tennis Ball King Krushna Satpute KS Bat",
  "ISPL Star Mansoor M08 Premium Bats",
  "VM7 Premium Bats",
  "Strickers Bat X 83",
  "Apex Bottles Elite 51",
  "Apex Bottles Lite 76",
  "Strickers Bottles Elite 26",
  "Force Kettlebells Pro 65",
  "Vertex Kettlebells X 54",
  "Vertex Boots Ultra 22",
  "Active Boots Elite 54",
  "JK Bottles X 99",
  "Active Yoga Mats Pro 24",
  "Nova Kettlebells Elite 00",
  "Active Kettlebells Prime 21",
  "Force Kettlebells Pro 15",
  "Active Kettlebells Pro 06",
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@jksportshub.com";
  const password = process.env.ADMIN_PASSWORD ?? "Admin@1234";
  const passwordHash = await hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    create: { email, passwordHash, role: "admin" },
    update: { passwordHash },
  });

  await prisma.banner.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.sitePage.deleteMany();

  const accessories = await prisma.category.create({
    data: { slug: "accessories", name: "Accessories", sortOrder: 10 },
  });
  const cricket = await prisma.category.create({
    data: { slug: "cricket", name: "Cricket", sortOrder: 20 },
  });
  const fitness = await prisma.category.create({
    data: { slug: "fitness", name: "Fitness", sortOrder: 30 },
  });
  const football = await prisma.category.create({
    data: { slug: "football", name: "Football", sortOrder: 40 },
  });

  const accSubs = [
    ["bottles", "Bottles"],
    ["bags", "Bags"],
    ["caps", "Caps"],
    ["socks", "Socks"],
  ];
  const cricketSubs = [
    ["bat", "Bat"],
    ["ball", "Ball"],
    ["cricket-bat", "Cricket Bat"],
    ["bats", "Bats"],
    ["balls", "Balls"],
    ["pads", "Pads"],
    ["gloves", "Gloves"],
    ["helmets", "Helmets"],
  ];
  const fitSubs = [
    ["dumbbells", "Dumbbells"],
    ["resistance-bands", "Resistance Bands"],
    ["yoga-mats", "Yoga Mats"],
    ["kettlebells", "Kettlebells"],
  ];
  const footSubs = [
    ["boots", "Boots"],
    ["football-balls", "Balls"],
    ["jerseys", "Jerseys"],
    ["shin-guards", "Shin Guards"],
  ];

  for (const [slug, name] of accSubs) {
    await prisma.category.create({
      data: { slug, name, parentId: accessories.id, sortOrder: 10 },
    });
  }
  for (const [slug, name] of cricketSubs) {
    await prisma.category.create({
      data: { slug, name, parentId: cricket.id, sortOrder: 10 },
    });
  }
  for (const [slug, name] of fitSubs) {
    await prisma.category.create({
      data: { slug, name, parentId: fitness.id, sortOrder: 10 },
    });
  }
  for (const [slug, name] of footSubs) {
    await prisma.category.create({
      data: { slug, name, parentId: football.id, sortOrder: 10 },
    });
  }

  const leafCategories = await prisma.category.findMany({
    where: { parentId: { not: null } },
  });
  const bySlug = Object.fromEntries(leafCategories.map((c) => [c.slug, c]));

  await prisma.banner.createMany({
    data: [
      {
        imageUrl: "https://placehold.co/1600x520/1e3a5f/ffffff/png?text=Banner+1",
        linkUrl: "/products",
        label: "Shop Now",
        sortOrder: 0,
        active: true,
      },
      {
        imageUrl: "https://placehold.co/1600x520/0f766e/ffffff/png?text=Banner+2",
        linkUrl: "/category/accessories",
        label: "Browse Categories",
        sortOrder: 1,
        active: true,
      },
      {
        imageUrl: "https://placehold.co/1600x520/7c2d12/ffffff/png?text=Banner+3",
        linkUrl: "/contact",
        label: "Enquire Now",
        sortOrder: 2,
        active: true,
      },
    ],
  });

  const categoryCycle = [
    bySlug["bats"] ?? leafCategories[0],
    bySlug["bottles"] ?? leafCategories[0],
    bySlug["kettlebells"] ?? leafCategories[0],
    bySlug["boots"] ?? leafCategories[0],
    bySlug["yoga-mats"] ?? leafCategories[0],
    bySlug["gloves"] ?? leafCategories[0],
  ].filter(Boolean);

  const products: {
    slug: string;
    name: string;
    description: string;
    price: number;
    compareAtPrice: number | null;
    categoryId: string;
    featured: boolean;
    hotDeal: boolean;
  }[] = [];

  sampleNames.forEach((name, i) => {
    const cat = categoryCycle[i % categoryCycle.length];
    const base = 2000 + i * 137;
    const compare = i % 5 === 0 ? null : base + 400 + (i % 3) * 100;
    products.push({
      slug: slugify(name),
      name,
      description: `${name} — premium sports gear from JKsportshub.`,
      price: base,
      compareAtPrice: compare,
      categoryId: cat.id,
      featured: i < 14,
      hotDeal: i < 12,
    });
  });

  for (let i = 0; i < 192 - sampleNames.length; i++) {
    const n = sampleNames.length + i + 1;
    const cat = categoryCycle[i % categoryCycle.length];
    const label = `JK Sports Item ${n}`;
    const base = 1500 + (n % 80) * 97;
    const compare = n % 4 === 0 ? null : base + 200 + (n % 5) * 50;
    products.push({
      slug: `jk-sports-item-${n}`,
      name: label,
      description: `Quality equipment — ${label}.`,
      price: base,
      compareAtPrice: compare,
      categoryId: cat.id,
      featured: n % 7 === 0,
      hotDeal: n % 8 === 0,
    });
  }

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const created = await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        categoryId: p.categoryId,
        featured: p.featured,
        hotDeal: p.hotDeal,
        images: {
          create: [
            {
              url: productImageUrl(p.slug),
              sortOrder: 0,
            },
          ],
        },
      },
    });
    void created;
  }

  await prisma.sitePage.createMany({
    data: [
      {
        slug: "about",
        title: "About JKsportshub",
        body: `We are a sports e-commerce store offering curated products for cricket, football, fitness, and more. Our focus is quality, value, and quick customer support.

Need help choosing gear? Contact us — we'll respond fast.

Why shop with us?
• Sports-themed custom UI & easy navigation
• Clear categories and detailed product pages
• WhatsApp & Email enquiries — no payment gateway required
• Mobile-friendly & responsive design`,
      },
      {
        slug: "contact",
        title: "Contact / Enquiry",
        body:
          "Email us or message on WhatsApp for quotes and availability. We respond quickly during business hours.",
      },
      {
        slug: "academy",
        title: "JK Sports Academy",
        body:
          "Train smarter with JK Sports Academy—structured programs for cricket, football, and athletic conditioning. Join skill sessions, seasonal camps, and coach-led drills designed for juniors and serious players. Enquire via WhatsApp or email for schedules, batch availability, and group pricing.",
      },
    ],
  });

  console.log("Seed complete:", products.length, "products");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
