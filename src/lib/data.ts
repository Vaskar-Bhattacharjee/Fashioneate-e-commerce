// src/lib/data.ts

export const Fallback_Products = [
  {
    _id: "1", // Strings are better to simulate MongoDB ObjectIds
    name: "Minimalist Silk Blazer",
    description: "A tailored silhouette crafted from 100% mulberry silk. This blazer features structured shoulders and a hidden button closure.",
    newprice: 450,
    comparePrice: 550,
    image: "https://images.pexels.com/photos/7622259/pexels-photo-7622259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imagePublicId: "fallback_1",
    category: "Women's Fashion",
    newArrival: true,
    quantity: 15,
    unit: "piece",
    size: [ "S", "M", "L", "XL", "2XL", "3XL" ], 
    status: "active",
    isFeatured: true
  },
  {
    _id: "2",
    name: "Classic Wool Overcoat",
    description: "Timeless outerwear designed for durability and warmth. Made from heavy-weight Italian wool with a deep navy hue.",
    newprice: 890,
    comparePrice: 1100,
    image: "https://images.pexels.com/photos/9849633/pexels-photo-9849633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imagePublicId: "fallback_2",
    category: "Men's Collection",
    newArrival: true,
    quantity: 10,
    unit: "piece",
    size:  ["S", "M", "L", "XL", "2XL", "3XL" ],
    status: "active",
    isFeatured: false
  },
  {
    _id: "3",
    name: "Leather Tote Bag",
    description: "Handcrafted pebble-grain leather bag featuring gold-toned hardware and a spacious interior lined with premium suede.",
    newprice: 1200,
    comparePrice: 1500,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imagePublicId: "fallback_3",
    category: "Accessories",
    newArrival: false,
    quantity: 5,
    unit: "piece",
    size: "M",
    status: "active",
    isFeatured: true
  },
  {
   _id: "4",
   name: "Classic Wool Overcoat",
    description: "Handcrafted pebble-grain leather bag featuring gold-toned hardware and a spacious interior lined with premium suede.",
    newprice: 490,
    comparePrice: 1500,
    image: "https://images.pexels.com/photos/34976586/pexels-photo-34976586.jpeg",
    imagePublicId: "fallback_4",
    category: "Accessories",
    newArrival: true,
    quantity: 5,
    unit: "piece",
    size: ["M"],
    status: "active",
    isFeatured: true

  },
    {
   _id: "5",
   name: "Wedding Lehenga",
    description: "Handcrafted pebble-grain leather bag featuring gold-toned hardware and a spacious interior lined with premium suede.",
    newprice: 2000,
    comparePrice: 2500,
    image: "https://images.pexels.com/photos/33121540/pexels-photo-33121540.jpeg",
    imagePublicId: "fallback_5",
    category: "Women's Fashion",
    newArrival: true,
    quantity: 5,
    unit: "piece",
    size: ["M", "2xl"],
    status: "active",
    isFeatured: true

  },
  {
    _id: "6",
    name: "Minimalist Silk Blazer",
    description: "A tailored silhouette crafted from 100% mulberry silk. This blazer features structured shoulders and a hidden button closure.",
    newprice: 450,
    comparePrice: 550,
    image: "https://images.pexels.com/photos/7622259/pexels-photo-7622259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imagePublicId: "fallback_1",
    category: "Mens's Fashion",
    newArrival: true,
    quantity: 15,
    unit: "piece",
    size: "M", 
    status: "active",
    isFeatured: true
  }
];