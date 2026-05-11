-- ============================================================
-- GrowingWeed.com — Seed Data
-- Run after schema.sql in Supabase SQL Editor
-- ============================================================

-- --------------------------------------------------------
-- Strains
-- --------------------------------------------------------
insert into public.strains (slug, name, type, description, thc_min, thc_max, cbd_min, cbd_max, effects, flavors, medical_uses, image_url, rating, review_count) values
(
  'blue-dream',
  'Blue Dream',
  'hybrid',
  'Blue Dream is a sativa-dominant hybrid originating in California that has achieved legendary status among West Coast strains. A cross between Blueberry and Haze, Blue Dream delivers swift symptom relief without heavy sedative effects, making it a popular daytime medication for patients treating pain, depression, nausea, and other ailments. Its balanced effects combine cerebral stimulation with full-body relaxation that eases you gently.',
  17, 24, 0.1, 0.2,
  ARRAY['Euphoric','Creative','Uplifted','Relaxed','Happy'],
  ARRAY['Blueberry','Sweet','Vanilla','Earthy'],
  ARRAY['Depression','Chronic Pain','Nausea','Headaches','Fatigue'],
  'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=800&h=450&fit=crop',
  4.5, 2847
),
(
  'og-kush',
  'OG Kush',
  'hybrid',
  'OG Kush arrived in Los Angeles in the early 1990s when a Northern California grower met Matt "Bubba" Berger, who brought with him what was called "The Kush," bred from bag seed from Florida. OG Kush is a legend in the cannabis world, giving rise to dozens of famous descendant strains. The genetic lineage is still under dispute, but OG Kush is known for its unique terpene profile — a fuel, skunk, and spice aroma.',
  20, 27, 0.1, 0.3,
  ARRAY['Relaxed','Happy','Euphoric','Uplifted','Sleepy'],
  ARRAY['Earthy','Pine','Woody','Citrus'],
  ARRAY['Stress','Anxiety','Pain','Insomnia','Depression'],
  'https://images.unsplash.com/photo-1616690248054-8f37e3524bdf?w=800&h=450&fit=crop',
  4.7, 5231
),
(
  'girl-scout-cookies',
  'Girl Scout Cookies',
  'hybrid',
  'Girl Scout Cookies, or GSC, is an OG Kush and Durban Poison hybrid cross whose reputation grew too large to stay within the borders of its California homeland. With a sweet and earthy aroma, GSC launches you to euphoria''s top floor where full-body relaxation meets a time-bending cerebral space. A little goes a long way with this hybrid, whose THC levels reportedly clock in at between 25-28% in winning cuts.',
  25, 28, 0.1, 0.2,
  ARRAY['Happy','Relaxed','Euphoric','Uplifted','Creative'],
  ARRAY['Sweet','Earthy','Mint','Pungent'],
  ARRAY['Stress','Pain','Depression','Appetite Loss','Fatigue'],
  'https://images.unsplash.com/photo-1585071550721-fdb5d80a7e3c?w=800&h=450&fit=crop',
  4.8, 6102
),
(
  'sour-diesel',
  'Sour Diesel',
  'sativa',
  'Sour Diesel, sometimes called Sour D or Sour Deez, is an invigorating sativa-dominant strain named after its pungent, diesel-like aroma. This fast-acting strain delivers energizing, dreamy cerebral effects that have pushed Sour Diesel to its legendary status. Stress, pain, and depression fade away in long-lasting relief that makes Sour Diesel a top choice among medical patients.',
  20, 25, 0.1, 0.2,
  ARRAY['Energetic','Happy','Uplifted','Euphoric','Creative'],
  ARRAY['Diesel','Citrus','Earthy','Pungent'],
  ARRAY['Depression','Pain','Stress','Fatigue','PTSD'],
  'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&h=450&fit=crop',
  4.6, 4189
),
(
  'granddaddy-purple',
  'Granddaddy Purple',
  'indica',
  'Granddaddy Purple (or GDP) is a famous indica cross introduced to the California market in 2003. It crosses Mendo Purps, Skunk, and Afghanistan, resulting in a vigorous plant with large, compact buds. Its complex grape and berry aroma is inherited from its Mendo Purps and Skunk lineage, while Afghani passes on its oversized bud structure. Its potent effects are clearly felt in both mind and body.',
  17, 23, 0.1, 0.2,
  ARRAY['Relaxed','Sleepy','Happy','Euphoric','Hungry'],
  ARRAY['Grape','Berry','Sweet','Earthy'],
  ARRAY['Pain','Insomnia','Stress','Muscle Spasms','Appetite Loss'],
  'https://images.unsplash.com/photo-1564669504903-0efe0b1b32e2?w=800&h=450&fit=crop',
  4.6, 3752
),
(
  'northern-lights',
  'Northern Lights',
  'indica',
  'Northern Lights is one of the most famous strains of all time, a pure indica celebrated for its resinous buds, fast flowering, and resilience during growth. This strain has given rise to many famous hybrids including Shiva Skunk and Super Silver Haze. Northern Lights'' psychoactive effects settle in firmly throughout the body, relaxing muscles and easing the mind in dreamy euphoria.',
  16, 21, 0.1, 0.1,
  ARRAY['Relaxed','Sleepy','Happy','Euphoric','Hungry'],
  ARRAY['Pine','Earthy','Sweet','Spicy'],
  ARRAY['Insomnia','Pain','Stress','Depression','Anxiety'],
  'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=450&fit=crop',
  4.7, 4023
),
(
  'jack-herer',
  'Jack Herer',
  'sativa',
  'Jack Herer is a sativa-dominant cannabis strain that has gained as much renown as the man it was named after. Created in the Netherlands in the mid-1990s by Sensi Seeds, this spicy, pine-scented strain combines a Haze hybrid with a Northern Lights #5 and Shiva Skunk cross. Jack Herer captures both the cerebral elevation associated with sativas and the heavy resin production of indicas.',
  15, 24, 0.05, 0.1,
  ARRAY['Happy','Uplifted','Creative','Energetic','Euphoric'],
  ARRAY['Pine','Earthy','Woody','Spicy'],
  ARRAY['Stress','Depression','Fatigue','Anxiety','Pain'],
  'https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=800&h=450&fit=crop',
  4.5, 3298
),
(
  'wedding-cake',
  'Wedding Cake',
  'hybrid',
  'Wedding Cake, also known as Pink Cookies, is a phenotype of Animal Cookies and is a cross between Triangle Kush and Animal Mints. This strain provides a relaxing, euphoric high with a rich, tangy flavor profile with undertones of earthy pepper. Wedding Cake is a potent and flavorful strain that is quickly becoming a fan favorite across the country.',
  22, 27, 0.05, 0.1,
  ARRAY['Relaxed','Happy','Euphoric','Uplifted','Creative'],
  ARRAY['Sweet','Vanilla','Earthy','Pepper'],
  ARRAY['Anxiety','Stress','Pain','Depression','Insomnia'],
  'https://images.unsplash.com/photo-1555685813-83d94a81f69e?w=800&h=450&fit=crop',
  4.4, 2156
);

-- --------------------------------------------------------
-- Dispensaries
-- --------------------------------------------------------
insert into public.dispensaries (slug, name, description, address, city, state, zip, country, phone, website, hours, amenities, images, verified, rating, review_count) values
(
  'green-leaf-collective',
  'Green Leaf Collective',
  'Green Leaf Collective is Denver''s premier cannabis dispensary, offering an extensive selection of recreational and medical marijuana products. Our knowledgeable staff is dedicated to helping you find the perfect product for your needs. We carry top-shelf flower, concentrates, edibles, and tinctures from Colorado''s best cultivators.',
  '1234 Colfax Ave',
  'Denver',
  'CO',
  '80204',
  'US',
  '+1 (303) 555-0101',
  'https://greenleafco.example.com',
  '{"Monday":"9:00 AM – 10:00 PM","Tuesday":"9:00 AM – 10:00 PM","Wednesday":"9:00 AM – 10:00 PM","Thursday":"9:00 AM – 10:00 PM","Friday":"9:00 AM – 11:00 PM","Saturday":"9:00 AM – 11:00 PM","Sunday":"10:00 AM – 9:00 PM"}',
  ARRAY['ATM','Parking','Wheelchair Accessible','Online Ordering','Express Pickup','Loyalty Program'],
  ARRAY['https://images.unsplash.com/photo-1587222373464-39fced4c63c3?w=1200&h=500&fit=crop'],
  true,
  4.6,
  1284
),
(
  'the-cannabis-corner',
  'The Cannabis Corner',
  'Located in the heart of Seattle, The Cannabis Corner is your neighborhood cannabis shop. We pride ourselves on curating the finest locally grown flower and handcrafted concentrates. Our friendly budtenders are always on hand to guide both first-time visitors and seasoned enthusiasts to the perfect product.',
  '420 Pike St',
  'Seattle',
  'WA',
  '98101',
  'US',
  '+1 (206) 555-0202',
  'https://cannabiscorner.example.com',
  '{"Monday":"10:00 AM – 9:00 PM","Tuesday":"10:00 AM – 9:00 PM","Wednesday":"10:00 AM – 9:00 PM","Thursday":"10:00 AM – 9:00 PM","Friday":"10:00 AM – 10:00 PM","Saturday":"10:00 AM – 10:00 PM","Sunday":"11:00 AM – 8:00 PM"}',
  ARRAY['Parking','Online Ordering','Express Pickup','Delivery','Pet Friendly'],
  ARRAY['https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=1200&h=500&fit=crop'],
  true,
  4.4,
  876
),
(
  'high-desert-wellness',
  'High Desert Wellness',
  'High Desert Wellness serves the greater Las Vegas area with a curated menu of premium cannabis products. We specialize in CBD and medical-grade offerings, with a calming atmosphere perfect for those seeking therapeutic relief. Our highly trained staff take the time to understand your wellness goals.',
  '789 Desert Inn Rd',
  'Las Vegas',
  'NV',
  '89109',
  'US',
  '+1 (702) 555-0303',
  'https://highdesertwellness.example.com',
  '{"Monday":"8:00 AM – 12:00 AM","Tuesday":"8:00 AM – 12:00 AM","Wednesday":"8:00 AM – 12:00 AM","Thursday":"8:00 AM – 12:00 AM","Friday":"8:00 AM – 2:00 AM","Saturday":"8:00 AM – 2:00 AM","Sunday":"8:00 AM – 12:00 AM"}',
  ARRAY['ATM','Parking','Wheelchair Accessible','Delivery','Loyalty Program','Security'],
  ARRAY['https://images.unsplash.com/photo-1543699936-67f9e6847c86?w=1200&h=500&fit=crop'],
  true,
  4.5,
  2103
),
(
  'emerald-city-cannabis',
  'Emerald City Cannabis',
  'Emerald City Cannabis is Portland''s most celebrated dispensary, consistently voted Best Dispensary by local publications. We stock over 300 products including rare small-batch strains, live resin concentrates, artisanal edibles, and premium topicals. Our state-of-the-art facility features private consultation rooms for a personalized experience.',
  '1600 SE Hawthorne Blvd',
  'Portland',
  'OR',
  '97214',
  'US',
  '+1 (503) 555-0404',
  'https://emeraldcitycannabis.example.com',
  '{"Monday":"9:00 AM – 9:00 PM","Tuesday":"9:00 AM – 9:00 PM","Wednesday":"9:00 AM – 9:00 PM","Thursday":"9:00 AM – 9:00 PM","Friday":"9:00 AM – 10:00 PM","Saturday":"9:00 AM – 10:00 PM","Sunday":"10:00 AM – 8:00 PM"}',
  ARRAY['Parking','Online Ordering','Express Pickup','Delivery','Loyalty Program','Private Consultations'],
  ARRAY['https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=500&fit=crop'],
  true,
  4.8,
  3547
);

-- --------------------------------------------------------
-- Seed Banks
-- --------------------------------------------------------
insert into public.seed_banks (slug, name, description, country, website, shipping_countries, verified, rating, review_count, strain_count) values
(
  'royal-queen-seeds',
  'Royal Queen Seeds',
  'Royal Queen Seeds is Europe''s fastest-growing cannabis seed company. Founded in 2013 in Barcelona, Spain, RQS has quickly established itself as a top-tier breeder known for its award-winning genetics, including Critical, Amnesia Haze, and Royal Gorilla. They offer feminized, autoflowering, and CBD seeds with rigorous quality control.',
  'Spain',
  'https://royalqueenseeds.com',
  ARRAY['United States','Canada','United Kingdom','Germany','France','Netherlands','Spain','Italy','Australia','New Zealand','Mexico','Brazil'],
  true,
  4.6,
  8934,
  400
),
(
  'barney-s-farm',
  'Barney''s Farm',
  'Barney''s Farm is one of the world''s oldest and most respected cannabis seed companies, established in 1985 in Amsterdam. Their legendary breeding program has produced multiple Cannabis Cup winners including Pineapple Chunk, Liberty Haze, and LSD. Known for exceptional stability and remarkable terpene profiles, Barney''s Farm seeds are trusted by growers worldwide.',
  'Netherlands',
  'https://barneysfarm.com',
  ARRAY['United States','Canada','United Kingdom','Germany','France','Netherlands','Spain','Italy','Switzerland','Belgium','Sweden','Portugal'],
  true,
  4.7,
  12045,
  600
),
(
  'seedsman',
  'Seedsman',
  'Seedsman is one of the world''s largest online cannabis seed banks, based in the United Kingdom. Established in 2003, they offer over 4,000 strains from 100+ breeders worldwide. Seedsman is renowned for their extensive catalog, competitive pricing, and discreet worldwide shipping. They also have their own in-house breeding program producing exclusive genetics.',
  'United Kingdom',
  'https://seedsman.com',
  ARRAY['United States','Canada','United Kingdom','Germany','France','Netherlands','Spain','Italy','Australia','Japan','South Korea','Mexico','Brazil','Argentina','Chile'],
  true,
  4.5,
  21078,
  4000
),
(
  'ilgm',
  'ILGM (I Love Growing Marijuana)',
  'I Love Growing Marijuana, commonly known as ILGM, is a premium seed bank founded by renowned grower Robert Bergman. ILGM stands out for its germination guarantee (ensuring 80%+ germination or replacement), beginner-friendly resources, and carefully selected genetics. They offer a curated library of high-quality feminized, autoflowering, and mixed packs suited to all skill levels.',
  'Netherlands',
  'https://ilgm.com',
  ARRAY['United States','Canada','United Kingdom','Germany','France','Australia','New Zealand'],
  true,
  4.8,
  15623,
  500
);

-- --------------------------------------------------------
-- Articles
-- --------------------------------------------------------
insert into public.articles (slug, title, content, excerpt, category, author_name, author_avatar, image_url, published_at, read_time) values
(
  'cannabis-legalization-2025-update',
  'Cannabis Legalization in 2025: What Changed and What''s Next',
  '## The Legalization Landscape in 2025

The past twelve months have been a watershed moment for cannabis policy reform across North America and Europe. Several new markets opened their doors to recreational sales, while existing markets matured and refined their regulatory frameworks.

## New Markets in 2025

Germany''s recreational market fully launched in early 2025, making it the first major European economy to fully legalize adult-use cannabis. Initial sales exceeded projections by 40%, with over 500 licensed retailers operating within the first six months.

In the United States, three additional states — Nebraska, South Carolina, and Kentucky — joined the growing list of recreational states following November ballot initiatives. This brings the total to 28 states with legal adult-use markets.

## Federal Rescheduling Progress

Perhaps most significantly, the DEA''s proposed rescheduling of cannabis from Schedule I to Schedule III moved forward in 2025. While not full legalization, the change has profound implications for research, banking access, and tax burdens on cannabis businesses operating under the punishing 280E tax code.

**The 280E issue alone has cost the legal cannabis industry hundreds of millions of dollars annually**, as businesses cannot deduct standard business expenses. Rescheduling would eliminate this burden and level the playing field with other industries.

## What''s Next

Looking ahead, advocates are optimistic but cautious. Federal legalization remains elusive, but incremental progress continues. The SAFE Banking Act, which would allow cannabis businesses access to federal financial services, remains a top priority for industry lobbying efforts.

International momentum is also building, with Canada evaluating export regulations, and several South American countries moving toward decriminalization or regulated markets.

The tide is clearly turning — the question is no longer if, but when.',
  'From Germany''s landmark launch to new U.S. state markets and federal rescheduling progress, 2025 has been a pivotal year for global cannabis policy.',
  'Policy',
  'Sarah Mitchell',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop',
  '2025-04-15 08:00:00+00',
  8
),
(
  'terpenes-guide-complete',
  'The Complete Guide to Cannabis Terpenes: What They Are and Why They Matter',
  '## What Are Terpenes?

Terpenes are aromatic compounds found in many plants, but cannabis produces them in particularly high concentrations. They are what give each strain its distinctive smell and flavor — from the piney freshness of OG Kush to the fruity sweetness of Blue Dream.

## Why Terpenes Matter Beyond Aroma

For years, the cannabis conversation focused almost entirely on THC and CBD percentages. But research increasingly shows that terpenes play a critical role in how a strain affects you through what scientists call the "entourage effect" — the synergistic interaction between cannabinoids and terpenes.

**Myrcene** is the most abundant terpene in cannabis. It has an earthy, musky scent and is associated with sedative, relaxing effects — the reason indica strains high in myrcene are often recommended for sleep.

**Limonene** has a bright citrus aroma and is associated with elevated mood and stress relief. It''s commonly found in sativa-leaning strains known for energizing effects.

**Caryophyllene** has a spicy, peppery scent and is unique among terpenes because it directly binds to CB2 receptors. It has anti-inflammatory properties and may help with anxiety and depression.

**Linalool** is the lavender-scented terpene associated with calm, anti-anxiety effects. It''s found in small amounts in many cannabis strains and may contribute to sedative profiles.

**Pinene** (alpha and beta) smells like pine needles and may improve alertness and memory retention. It can also counteract some of the short-term memory effects of THC.

## How to Use Terpene Information

When choosing a strain, look beyond the THC percentage. Ask your budtender about the dominant terpenes in a specific batch, or look for detailed lab reports that include terpene profiles alongside cannabinoid percentages. Two strains with identical THC levels can produce very different experiences based on their terpene content.',
  'Terpenes are the aromatic compounds that give cannabis its distinctive smell — but their role goes far beyond flavor. Learn how they shape your experience.',
  'Science',
  'Dr. James Rivera',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&h=450&fit=crop',
  '2025-04-08 10:00:00+00',
  10
),
(
  'cannabis-tourism-guide',
  'Cannabis Tourism in 2025: The World''s Top Destinations for Legal Travel',
  '## The Rise of Cannabis Tourism

Cannabis tourism has quietly become a multi-billion dollar industry, drawing travelers who want to experience legal markets in a structured, socially acceptable environment. Whether you''re a seasoned consumer or simply curious, knowing where to go — and what to expect — is essential.

## Amsterdam: The Original

Amsterdam''s famous coffeeshops remain a rite of passage for cannabis tourists, though the Dutch government has experimented with limiting access to residents only in some cities. The city remains globally iconic, and its tolerant culture and world-class infrastructure make it hard to beat.

## Colorado: Mature, Diverse, and Welcoming

Denver and its mountain communities (Telluride, Aspen, Vail) have embraced cannabis tourism wholeheartedly. Colorado''s market is among the most mature in the world — prices are competitive, product quality is high, and an entire ecosystem of cannabis-friendly hotels, tours, and experiences has emerged.

## Canada: Coast to Coast

Canada''s nationwide legalization means you can legally purchase and consume cannabis from Victoria, BC to Halifax, NS. The legal market has consolidated significantly since 2018, with quality improving and prices dropping. Quebec remains more restrictive, but Ontario, British Columbia, and Alberta all have thriving retail ecosystems.

**Pro Tip:** Book at a cannabis-friendly hotel or Airbnb — many properties now explicitly welcome consumers, providing designated outdoor spaces or consumption suites.

## Germany: The New Frontier

With its 2025 launch, Germany is now the most exciting new cannabis destination in Europe. Berlin''s counter-culture scene has embraced the market enthusiastically, and the country''s excellent infrastructure makes it easy to navigate as a tourist.

## Practical Tips for Cannabis Travel

Always verify current laws before traveling — regulations change frequently. Never cross international or state/provincial borders with cannabis products. Research consumption rules (indoor vs. outdoor) for each specific destination.',
  'From Amsterdam to Denver, Canada to Germany''s brand-new market — where cannabis tourism is thriving and what you need to know before you go.',
  'Lifestyle',
  'Emma Chen',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=450&fit=crop',
  '2025-04-01 09:00:00+00',
  7
),
(
  'cannabis-and-sleep-research',
  'Cannabis and Sleep: What the Latest Research Actually Says',
  '## The Sleep-Cannabis Connection

Millions of people report using cannabis to help them sleep. Anecdotally, indica strains high in myrcene seem to work. But what does the peer-reviewed science say? The picture is nuanced and sometimes counterintuitive.

## Short-Term Effects

In the short term, THC does appear to reduce the time it takes to fall asleep (sleep onset latency) and may increase deep sleep (slow-wave sleep). For people with insomnia, this can feel life-changing.

**However**, THC also suppresses REM sleep — the stage associated with dreaming and emotional memory consolidation. Reducing REM may feel beneficial in the short term (fewer nightmares, for instance) but has potential implications for long-term cognitive health.

## Tolerance and Dependence

Regular cannabis use for sleep leads to rapid tolerance — the same dose becomes less effective within weeks. Many heavy users report that they struggle to sleep at all without cannabis, suggesting a rebound insomnia effect when they try to quit.

A 2024 study in *Sleep Medicine Reviews* found that cannabis-dependent individuals had significantly worse sleep quality during abstinence compared to non-users, lasting up to three weeks after cessation.

## CBD and Sleep

Interestingly, CBD — in isolation — shows a more complex relationship with sleep. At low doses, CBD appears to be mildly alerting, potentially making it counterproductive for sleep. At high doses (150mg+), some studies suggest a sedating effect. Current evidence is preliminary, but CBD alone is not the sedative many marketing claims suggest.

## The Bottom Line

Cannabis can be a useful sleep aid for some people in the short term. If you choose to use it, low-to-moderate THC doses with a high myrcene and linalool profile may be most effective. Avoid making it a nightly habit, cycle use to prevent tolerance, and consult a healthcare provider if insomnia is chronic.',
  'THC can help you fall asleep faster — but the science around long-term cannabis use for sleep is more complicated. Here''s what researchers have found.',
  'Science',
  'Dr. James Rivera',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces',
  'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=450&fit=crop',
  '2025-03-22 11:00:00+00',
  9
);

-- --------------------------------------------------------
-- Growing Tips
-- --------------------------------------------------------
insert into public.growing_tips (slug, title, content, excerpt, difficulty, category, author_name, image_url, published_at, read_time) values
(
  'soil-vs-hydroponics-beginners-guide',
  'Soil vs. Hydroponics: Which Growing Medium Should You Choose?',
  '## The Great Growing Debate

Every new grower faces the same fundamental question: should I grow in soil or hydroponics? Both methods can produce exceptional cannabis, but they suit different growers, budgets, and goals. Here''s a practical breakdown.

## Growing in Soil

Soil is the most forgiving medium for beginners. Living soil contains a complex ecosystem of microbes, fungi, and organic matter that works with the plant''s root system to deliver nutrients naturally. Mistakes in watering frequency or nutrient dosing are buffered by the soil''s chemistry.

**Pros of Soil:**
- Forgiving for beginners — harder to over-water or over-feed
- Lower startup cost
- Rich, complex terpene profiles associated with organic grows
- Less equipment required

**Cons of Soil:**
- Slower growth and longer cycles compared to hydro
- Heavier pots, harder to move
- Potential for soil-borne pests (fungus gnats, root aphids)

**Best soil choice for cannabis:** Look for a well-draining mix with perlite. Commercial cannabis soils from brands like Fox Farm Ocean Forest or Roots Organics are formulated with the right pH and nutrient base. Avoid "hot" soils with too many added nutrients for seedlings.

## Growing in Hydroponics

Hydroponic systems deliver nutrients directly to the root zone in water, allowing precise control over what the plant receives. The result is significantly faster growth and potentially larger yields — but the learning curve is steeper.

**Pros of Hydroponics:**
- 20-50% faster growth than soil
- Higher potential yields
- Precise nutrient control
- No soil pests

**Cons of Hydroponics:**
- Higher upfront cost
- Requires more monitoring (pH, EC/TDS, temperature)
- Mistakes happen faster — a pH swing can lock out nutrients within hours
- More equipment to maintain and sterilize between grows

## My Recommendation for Beginners

Start in soil. Master the fundamentals — lighting, watering rhythm, training techniques, and reading plant health — before adding the complexity of hydro. Once you understand how cannabis grows, transitioning to DWC (Deep Water Culture) or coco coir will feel intuitive rather than overwhelming.',
  'Trying to decide between soil and hydroponics for your first grow? This guide breaks down the pros, cons, and ideal use cases for each method.',
  'beginner',
  'Grow Mediums',
  'Marcus Green',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=450&fit=crop',
  '2025-04-10 09:00:00+00',
  8
),
(
  'lst-training-guide',
  'Low Stress Training (LST): How to Bend Your Way to Bigger Yields',
  '## What Is Low Stress Training?

Low Stress Training (LST) is a technique where you gently bend and tie down the main stem and branches of your cannabis plant to manipulate its shape. By keeping the canopy flat and exposing more bud sites to direct light, you can dramatically increase your yield without adding more light or space.

## The Science Behind LST

Untrained cannabis plants grow in a natural Christmas tree shape — one dominant main cola and progressively smaller lower branches. Light only penetrates 12-18 inches into a canopy, so lower branches receive insufficient light intensity to produce dense buds.

LST disrupts the plant''s apical dominance — its natural tendency to focus growth energy into the top cola. By bending the main stem horizontal, you create multiple tops that all receive equal light exposure.

## How to LST Step by Step

**What you''ll need:** Soft plant ties or LST clips, small holes drilled around the rim of your pot, and a bit of patience.

**Step 1 — Start early.** Begin LST in the 3rd or 4th week of vegetative growth, when stems are still flexible. Older stems become rigid and may snap.

**Step 2 — Anchor the main stem.** Gently bend the main stem to a 90-degree angle and secure it with a plant tie attached to the pot rim. The stem will resist — go slowly.

**Step 3 — Work outward.** Over the next several days, continue bending and tying branches outward to keep the canopy level. New growth will naturally reach upward.

**Step 4 — Maintain throughout veg.** Check your ties every 2-3 days. Loosen any that are digging into the stem as it thickens.

**Step 5 — Flip to flower.** When your canopy is full and flat, flip to 12/12 lighting. You''ll be rewarded with multiple large colas rather than one dominant top.

## Results You Can Expect

A well-executed LST on a medium-sized plant can increase yield by 20-40% compared to the same plant grown untrained. Combined with proper lighting (600W+ HPS or equivalent LED), growers regularly report 2-4 oz from a single plant.',
  'LST is one of the most effective yield-boosting techniques for home growers. Learn how to train your plants for a flat, light-catching canopy with step-by-step instructions.',
  'intermediate',
  'Training',
  'Sarah Bloom',
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&h=450&fit=crop',
  '2025-04-03 10:00:00+00',
  9
),
(
  'cannabis-nutrient-deficiencies',
  'Diagnosing Cannabis Nutrient Deficiencies: A Visual Guide',
  '## Why Plants Show Deficiencies

Even with a good nutrient solution, cannabis plants can show deficiency symptoms if the pH is out of range, if root health is poor, or if specific micronutrients are being antagonized by others. Before adding more nutrients, always check your pH — most deficiencies are actually lockouts caused by incorrect pH.

## Key pH Ranges

**Soil:** Maintain pH 6.0–7.0, with 6.5 being ideal.
**Hydroponics/Coco:** Maintain pH 5.5–6.5, with 5.8–6.2 being ideal.

## The Most Common Deficiencies

**Nitrogen (N) Deficiency**
*Symptoms:* Yellowing starting from the oldest (bottom) leaves, moving upward. Leaves turn uniformly light green, then yellow, then fall off.
*Fix:* Increase nitrogen in your feeding schedule. In soil, top-dress with blood meal or worm castings. Check pH first — N availability drops sharply above pH 7.0.

**Calcium (Ca) Deficiency**
*Symptoms:* Brown or rust-colored spots on young leaves (new growth), twisted or cupped leaf tips, slow growth.
*Fix:* Add Cal-Mag supplement at 1-5ml/gallon. Calcium is immobile in the plant, so symptoms appear on new growth first. Very common in RO (reverse osmosis) water users.

**Magnesium (Mg) Deficiency**
*Symptoms:* Interveinal chlorosis — leaf turns yellow between the veins, which remain green. Affects middle and lower leaves.
*Fix:* Add Cal-Mag, or foliar spray with 1 teaspoon Epsom salt per liter of water for quick uptake.

**Phosphorus (P) Deficiency**
*Symptoms:* Leaves develop dark purple or reddish coloration, often starting on the underside. Slow bud development in flower.
*Fix:* Increase phosphorus in your feeding, especially during early flowering. pH lockout is a common cause — ensure pH is in range.

**Iron (Fe) Deficiency**
*Symptoms:* New growth turns bright yellow while leaf veins remain dark green. Classic interveinal chlorosis on young leaves.
*Fix:* Usually a pH issue (iron becomes unavailable above pH 7.0 in soil or above 6.5 in hydro). Flush and adjust pH before adding chelated iron supplements.',
  'Yellow leaves, purple stems, brown spots — cannabis deficiency symptoms can look alarming. This guide helps you identify and fix the most common nutrient problems.',
  'intermediate',
  'Plant Health',
  'Marcus Green',
  'https://images.unsplash.com/photo-1585840918710-a2ddc3e29742?w=800&h=450&fit=crop',
  '2025-03-28 08:00:00+00',
  11
),
(
  'autoflower-complete-guide',
  'The Complete Autoflower Growing Guide: From Seed to Harvest in 70 Days',
  '## Why Autoflowers Have Taken Over

Autoflowering cannabis has undergone a quiet revolution in the last decade. Early auto genetics were criticized for low yields and mediocre potency. Modern autoflowers from reputable breeders rival photoperiod strains in both yield and THC content — and they do it in 60-80 days from seed.

## How Autoflowers Work

Autoflowering strains contain genetics from Cannabis ruderalis, a subspecies adapted to the short summers of Central Asia and Eastern Europe. Unlike photoperiod strains, autos flower based on age rather than light cycle — they automatically begin flowering 3-4 weeks after germination regardless of light schedule.

This means you can run a simple 18/6 (18 hours light, 6 dark) or even 20/4 schedule from seed to harvest without ever changing your light timer.

## Setting Up for Autoflowers

**Pot size:** Use a 3-5 gallon fabric pot. Autoflowers don''t respond well to transplanting — germinate directly in your final container.

**Light:** 600W HPS or a quality LED at 300-400W (actual draw) handles 2-4 plants. Autos don''t need intense light during veg, but maximizing light during flower dramatically increases yields.

**Nutrients:** Go easy early on. Autos are smaller plants with smaller root systems — overfeeding during the first 3 weeks is a common mistake. Start at 25-50% of recommended doses.

## Week-by-Week Timeline

**Weeks 1-2 (Seedling):** Minimal nutrients, keep medium slightly moist.
**Weeks 3-4 (Early Veg):** Growth accelerates. Introduce LST if desired. Begin light nutrient feeding.
**Weeks 5-6 (Pre-Flower):** White pistils appear. Transition to bloom nutrients.
**Weeks 7-10 (Flower):** Buds swell rapidly. Monitor trichomes with a jeweler''s loupe. Heavy feeding, then flush in final week.
**Week 10-12 (Harvest):** Trichomes turn cloudy/amber. Harvest window is 1-2 weeks wide.

## Harvesting and Yield Expectations

A well-grown autoflower in a 5-gallon pot under good lighting can yield 2-4 ounces (60-120g) of dried flower. Elite auto strains in optimal conditions can exceed 6 ounces. With multiple plants and a perpetual grow setup, you can harvest every 2-3 weeks year-round.',
  'Modern autoflowers are fast, potent, and beginner-friendly. Learn everything you need to grow autoflowering cannabis from seed to harvest in under 80 days.',
  'beginner',
  'Getting Started',
  'Sarah Bloom',
  'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&h=450&fit=crop',
  '2025-03-15 10:00:00+00',
  12
);
