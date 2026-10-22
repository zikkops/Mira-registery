// Mock data only — no database yet.

export type Category =
  | "Kitchen"
  | "Dining"
  | "Bedroom"
  | "Living"
  | "Bath"
  | "Appliances"
  | "Outdoor"
  | "Experiences";

export type Supplier = {
  id: string;
  name: string;
  specialty: string;
};

export type RegistryItem = {
  id: string;
  name: string;
  description: string;
  category: Category;
  supplierId: string;
  price: number;
  funded: number;
  contributors: number;
  image: string;
};

export type Contribution = {
  name: string;
  amount: number;
  item: string;
  message: string;
  when: string;
};

export type Registry = {
  slug: string;
  partnerOne: string;
  partnerTwo: string;
  date: string;
  venue: string;
  city: string;
  story: string;
  items: RegistryItem[];
  contributions: Contribution[];
};

// Product photos are hotlinked from Unsplash (free to use under the Unsplash License).
export const photo = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const suppliers: Supplier[] = [
  { id: "maison", name: "Maison Cuisine", specialty: "Cookware & tableware" },
  { id: "dreamwell", name: "Dreamwell Beds", specialty: "Beds & mattresses" },
  { id: "oakhaus", name: "Oak & Haus", specialty: "Furniture" },
  { id: "linen", name: "The Linen Room", specialty: "Bedding & bath" },
  { id: "volt", name: "Volt Home", specialty: "Appliances" },
  { id: "ember", name: "Ember Outdoor", specialty: "Grills & garden" },
  { id: "wander", name: "Wander Travel", specialty: "Honeymoons & experiences" },
];

export const supplierById = (id: string) => suppliers.find((s) => s.id === id);

export const categories: Category[] = [
  "Kitchen",
  "Dining",
  "Bedroom",
  "Living",
  "Bath",
  "Appliances",
  "Outdoor",
  "Experiences",
];

const registries: Registry[] = [
  {
    slug: "sarah-and-james",
    partnerOne: "Sarah",
    partnerTwo: "James",
    date: "June 14, 2027",
    venue: "The Olive Grove Estate",
    city: "Napa Valley",
    story:
      "We met at a friend's dinner party where James burned the risotto and Sarah saved it. Eight years later we're building our first home together — and we'd love your help filling it with things we'll use every day.",
    items: [
      // Kitchen
      { id: "i1", name: "Enameled Cast Iron Dutch Oven", description: "5.5 qt in flame orange, for Sunday stews and many more risottos.", category: "Kitchen", supplierId: "maison", price: 420, funded: 420, contributors: 6, image: "1590794056226-79ef3a8147e1" },
      { id: "i2", name: "Stainless Steel Cookware Set", description: "12-piece tri-ply set with lids, induction ready.", category: "Kitchen", supplierId: "maison", price: 1200, funded: 780, contributors: 9, image: "1604414499020-f9ac575bc5ec" },
      { id: "i3", name: "Non-Stick Pan Collection", description: "Two frying pans and a sauté pan with ceramic coating.", category: "Kitchen", supplierId: "maison", price: 340, funded: 95, contributors: 2, image: "1584990347193-6bebebfeaeee" },
      { id: "i4", name: "Japanese Chef Knife Set", description: "Seven Damascus steel knives with a magnetic walnut block.", category: "Kitchen", supplierId: "maison", price: 650, funded: 260, contributors: 4, image: "1780761423578-378dea8c11af" },
      { id: "i5", name: "Stand Mixer", description: "5 qt tilt-head mixer with dough hook, whisk and paddle.", category: "Kitchen", supplierId: "volt", price: 520, funded: 520, contributors: 7, image: "1758565810987-ca8d617ea7be" },
      // Dining
      { id: "i6", name: "Stoneware Dinnerware Set", description: "Service for eight — plates, bowls and mugs in glazed earth tones.", category: "Dining", supplierId: "maison", price: 480, funded: 310, contributors: 5, image: "1484632152040-840235adc262" },
      { id: "i7", name: "Crystal Wine Glasses", description: "Set of eight hand-blown universal wine glasses.", category: "Dining", supplierId: "maison", price: 280, funded: 40, contributors: 1, image: "1510812431401-41d2bd2722f3" },
      { id: "i8", name: "Solid Oak Dining Table", description: "Seats six with four matching chairs — for all the dinner parties to come.", category: "Dining", supplierId: "oakhaus", price: 1850, funded: 1850, contributors: 17, image: "1758977404039-6e834be8eca8" },
      // Bedroom
      { id: "i9", name: "Upholstered King Bed Frame", description: "Linen headboard with solid wood legs and slatted base.", category: "Bedroom", supplierId: "dreamwell", price: 2400, funded: 1350, contributors: 14, image: "1560185128-e173042f79dd" },
      { id: "i10", name: "Hybrid Memory Foam Mattress", description: "King size, medium-firm, with a 10 year warranty.", category: "Bedroom", supplierId: "dreamwell", price: 1600, funded: 400, contributors: 4, image: "1635594202056-9ea3b497e5c0" },
      { id: "i11", name: "Linen Bedding Bundle", description: "Duvet cover, fitted sheet and four pillowcases in white.", category: "Bedroom", supplierId: "linen", price: 380, funded: 120, contributors: 2, image: "1617325247661-675ab4b64ae2" },
      { id: "i12", name: "Pair of Bedside Lamps", description: "Opal glass globe lamps with dimmable warm light.", category: "Bedroom", supplierId: "oakhaus", price: 290, funded: 0, contributors: 0, image: "1585128719715-46776b56a0d1" },
      // Living
      { id: "i13", name: "Emerald Velvet Sofa", description: "Three-seater mid-century sofa with tapered oak legs.", category: "Living", supplierId: "oakhaus", price: 3100, funded: 950, contributors: 11, image: "1555041469-a586c61ea9bc" },
      { id: "i14", name: "Tan Leather Chesterfield", description: "Hand-tufted full grain leather sofa, made to order.", category: "Living", supplierId: "oakhaus", price: 3800, funded: 600, contributors: 5, image: "1691480152351-4b3f2c89ccff" },
      { id: "i15", name: "Mustard Accent Armchair", description: "A reading chair for the sunny corner.", category: "Living", supplierId: "oakhaus", price: 720, funded: 480, contributors: 6, image: "1586023492125-27b2c045efd7" },
      { id: "i16", name: "Hand-Knotted Wool Rug", description: "8 × 10 ft traditional pattern in ivory and crimson.", category: "Living", supplierId: "oakhaus", price: 1150, funded: 210, contributors: 3, image: "1767159601823-96d0295344ce" },
      // Bath
      { id: "i17", name: "Turkish Cotton Towel Set", description: "Eight towels — bath sheets, hand towels and washcloths.", category: "Bath", supplierId: "linen", price: 240, funded: 60, contributors: 1, image: "1523471826770-c437b4636fe6" },
      { id: "i18", name: "Matching Waffle Robes", description: "His & hers organic cotton robes.", category: "Bath", supplierId: "linen", price: 220, funded: 220, contributors: 3, image: "1704428381481-92bf396b24bd" },
      // Appliances
      { id: "i19", name: "Espresso Machine", description: "Dual boiler with built-in grinder and steam wand.", category: "Appliances", supplierId: "volt", price: 980, funded: 640, contributors: 8, image: "1620807773206-49c1f2957417" },
      { id: "i20", name: "Front-Load Washing Machine", description: "Energy efficient 9 kg washer with steam cycle.", category: "Appliances", supplierId: "volt", price: 1100, funded: 300, contributors: 3, image: "1626806819282-2c1dc01a5e0c" },
      { id: "i21", name: "French Door Refrigerator", description: "Stainless steel, 28 cu ft with ice & water dispenser.", category: "Appliances", supplierId: "volt", price: 2600, funded: 1450, contributors: 12, image: "1721613877687-c9099b698faa" },
      { id: "i22", name: "Robot Vacuum & Mop", description: "Self-emptying base, maps every room.", category: "Appliances", supplierId: "volt", price: 690, funded: 150, contributors: 2, image: "1558317374-067fb5f30001" },
      // Outdoor
      { id: "i23", name: "Charcoal Kettle Grill", description: "For long summer evenings with friends.", category: "Outdoor", supplierId: "ember", price: 450, funded: 180, contributors: 3, image: "1763062690254-be377d55dacf" },
      { id: "i24", name: "Patio Lounge Set", description: "All-weather sofa, two chairs and a coffee table.", category: "Outdoor", supplierId: "ember", price: 1900, funded: 520, contributors: 5, image: "1623625434531-d130448273c1" },
      // Experiences
      { id: "i25", name: "Honeymoon on the Amalfi Coast", description: "Seven nights, flights and a sunset boat tour.", category: "Experiences", supplierId: "wander", price: 6500, funded: 4120, contributors: 31, image: "1612698093158-e07ac200d44e" },
      { id: "i26", name: "Couples Spa Day", description: "Massages, thermal pools and lunch for two.", category: "Experiences", supplierId: "wander", price: 450, funded: 300, contributors: 4, image: "1772915022472-ffc1df2d6051" },
    ],
    contributions: [
      { name: "Aunt Linda", amount: 250, item: "Honeymoon on the Amalfi Coast", message: "Drink a limoncello for me! So proud of you both.", when: "2 days ago" },
      { name: "Marco & Elena", amount: 150, item: "Stainless Steel Cookware Set", message: "For many more (unburnt) risottos 😄", when: "4 days ago" },
      { name: "The Thompsons", amount: 400, item: "Upholstered King Bed Frame", message: "Sweet dreams in your new home!", when: "1 week ago" },
      { name: "Priya", amount: 75, item: "Espresso Machine", message: "Can't wait for the first flat white at yours.", when: "1 week ago" },
    ],
  },
];

export const getRegistry = (slug: string) => registries.find((r) => r.slug === slug);
export const allRegistrySlugs = () => registries.map((r) => r.slug);

export const formatMoney = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
