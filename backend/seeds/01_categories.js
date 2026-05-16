export async function seed(knex) {
  await knex('categories').del();
  await knex('categories').insert([
    {
      name: 'Rice',
      slug: 'rice',
      description: 'Basmati & Exotic Varieties',
      image_url: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80',
      sort_order: 1,
    },
    {
      name: 'Dry Fruits',
      slug: 'dry-fruits',
      description: 'Hand-Sorted  Treasures',
      image_url: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=600&auto=format&fit=crop&q=80',
      sort_order: 2,
    },
    {
      name: 'Whole Spices',
      slug: 'spices',
      description: "Kashmir's Aromatic Heritage",
      image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
      sort_order: 3,
    },
    {
      name: 'Wellness',
      slug: 'health',
      description: 'Superfoods & Breakfast Essentials',
      image_url: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&auto=format&fit=crop&q=80',
      sort_order: 4,
    },
    {
      name: 'Heritage Pulses',
      slug: 'pulses',
      description: 'Bhaderwahi & Traditional Varieties',
      image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&auto=format&fit=crop&q=80',
      sort_order: 5,
    },
    {
      name: 'Gift Hampers',
      slug: 'gifts',
      description: 'Curated Luxury Food Gifts',
      image_url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80',
      sort_order: 6,
    },
  ]);
}
