import { useState } from 'react';

const plants = [
  { id: 1, name: 'Philodendron', category: 'Foliage', image: 'https://images.unsplash.com/photo-1616413913080-29b4c6fac12f?w=400', description: 'Classic tropical beauty with heart-shaped glossy leaves. Incredibly forgiving and grows quickly.', care: 'Low to bright indirect light. Water when top inch is dry.', toxicToDogs: true, tags: ['low-light', 'trailing'] },
  { id: 2, name: 'Pothos', category: 'Foliage', image: 'https://images.unsplash.com/photo-1585687433353-8f3b56c8c4a1?w=400', description: 'The ultimate trailing vine nearly indestructible and stunning in hanging baskets.', care: 'Low to bright light. Water every 1-2 weeks.', toxicToDogs: true, tags: ['trailing', 'hanging'] },
  { id: 3, name: 'Parlor Palm', category: 'Palms', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', description: 'Tropical elegance with feathery graceful fronds. Brings resort-style atmosphere to any room.', care: 'Bright indirect light. Keep soil moist.', toxicToDogs: false, tags: ['tall', 'tropical', 'dog-safe'] },
  { id: 4, name: 'Prayer Plant', category: 'Foliage', image: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?w=400', description: 'Dramatic foliage with intricate patterns. Leaves fold at night in magical daily movement.', care: 'Bright indirect light. Keep moist.', toxicToDogs: false, tags: ['patterned', 'dog-safe'] },
  { id: 5, name: 'Croton', category: 'Foliage', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400', description: 'Living flames with spectacular leaves blazing reds oranges and yellows.', care: 'Very bright light. Keep soil moist.', toxicToDogs: false, tags: ['colorful', 'dog-safe'] },
  { id: 6, name: 'Anthurium', category: 'Flowering', image: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=400', description: 'Exotic waxy blooms in bold reds pinks and corals that last for weeks.', care: 'Bright indirect light. Keep moist.', toxicToDogs: true, tags: ['flowering', 'tropical'] },
  { id: 7, name: 'Asparagus Fern', category: 'Ferns', image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=400', description: 'Ethereal and light with needle-like foliage creating a soft wispy appearance.', care: 'Bright indirect light. Allow to dry slightly.', toxicToDogs: true, tags: ['wispy', 'delicate'] },
  { id: 8, name: 'Caladium', category: 'Foliage', image: 'https://images.unsplash.com/photo-1620803366004-119b57f54cd6?w=400', description: 'Living art with massive heart-shaped leaves in stunning color combinations.', care: 'Bright indirect light. Keep moist.', toxicToDogs: true, tags: ['colorful', 'dramatic'] },
  { id: 9, name: 'Orchid', category: 'Orchids', image: 'https://images.unsplash.com/photo-1566842600175-97dca3c5ad8e?w=400', description: 'Natures luxury. Exotic blooms with arching sprays lasting weeks to months.', care: 'Bright indirect light. Weekly watering.', toxicToDogs: false, tags: ['flowering', 'luxury', 'dog-safe'] },
  { id: 10, name: 'Air Plant', category: 'Air Plants', image: 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=400', description: 'Magical plants requiring no soil. Display on driftwood or in glass orbs.', care: 'Bright indirect light. Soak 2-3x weekly.', toxicToDogs: false, tags: ['no-soil', 'dog-safe'] },
  { id: 11, name: 'Jade Plant', category: 'Succulents', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400', description: 'Sculptural succulents with thick glossy jade-green leaves. Bonsai-like quality.', care: 'Very bright light. Let soil dry completely.', toxicToDogs: true, tags: ['succulent', 'sculptural'] },
  { id: 12, name: 'Corn Plant', category: 'Foliage', image: 'https://images.unsplash.com/photo-1601985705806-5b9a10234c27?w=400', description: 'Tall architectural plants with corn-like leaves striped in gold or cream.', care: 'Low to bright indirect light. Water when dry.', toxicToDogs: true, tags: ['tall', 'architectural'] },
  { id: 13, name: 'Schefflera', category: 'Trees', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400', description: 'Tall tree-like plants with glossy umbrella-shaped leaflets. Instant tropical architecture.', care: 'Bright indirect light. Let soil dry between waterings.', toxicToDogs: true, tags: ['tall', 'tree-form'] },
  { id: 14, name: 'Aloe Vera', category: 'Succulents', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400', description: 'Natures medicine cabinet. Sculptural rosettes of fleshy spiky leaves with soothing gel.', care: 'Very bright light. Water every 2-3 weeks.', toxicToDogs: true, tags: ['succulent', 'medicinal'] },
  { id: 15, name: 'Swedish Ivy', category: 'Trailing', image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400', description: 'Charming trailing plant with soft rounded green leaves and purple undersides.', care: 'Bright indirect light. Keep consistently moist.', toxicToDogs: false, tags: ['trailing', 'dog-safe'] },
];

const categories = ['All','Foliage','Flowering','Succulents','Orchids','Air Plants','Palms','Ferns','Trees','Trailing'];

export default function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dogSafeOnly, setDogSafeOnly] = useState(false);
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [search, setSearch] = useState('');

  const filtered = plants.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchDog = !dogSafeOnly || !p.toxicToDogs;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchDog && matchSearch;
  });

  const toggleSelect = (id) => setSelectedPlants(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  return (
    <div style={{ minHeight:'100vh', background:'#f8faf5', padding:'2rem' }}>
      <div style={{ textAlign:'center', padding:'3rem 0 2rem' }}>
        <h1 style={{ fontSize:'2.5rem', color:'#1a2e0e' }}>Plant Catalogue</h1>
        <p style={{ color:'#5a7a4a' }}>Browse our curated selection for your Knoxville Airbnb</p>
      </div>
      <div style={{ maxWidth:'1200px', margin:'0 auto 2rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
        <input type='text' placeholder='Search plants...' value={search} onChange={e => setSearch(e.target.value)} style={{ width:'100%', padding:'0.75rem 1rem', border:'2px solid #d4e6c3', borderRadius:'50px', fontSize:'1rem', outline:'none', boxSizing:'border-box' }} />
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
          {categories.map(cat => (<button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding:'0.4rem 1rem', borderRadius:'50px', border:'2px solid #2d5016', background: selectedCategory===cat ? '#2d5016':'white', color: selectedCategory===cat ? 'white':'#2d5016', cursor:'pointer', fontSize:'0.85rem' }}>{cat}</button>))}
        </div>
        <label style={{ display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer', color:'#2d5016' }}>
          <input type='checkbox' checked={dogSafeOnly} onChange={e => setDogSafeOnly(e.target.checked)} /> Show dog-safe plants only
        </label>
      </div>
      <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1.5rem' }}>
        {filtered.map(plant => (
          <div key={plant.id} style={{ background:'white', borderRadius:'16px', overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.08)', border: selectedPlants.includes(plant.id) ? '2px solid #2d5016':'2px solid transparent', display:'flex', flexDirection:'column' }}>
            <div style={{ position:'relative', height:'200px', overflow:'hidden' }}>
              <img src={plant.image} alt={plant.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} loading='lazy' />
              <span style={{ position:'absolute', top:'10px', right:'10px', background: plant.toxicToDogs ? '#ff4444':'#2d5016', color:'white', padding:'0.25rem 0.6rem', borderRadius:'20px', fontSize:'0.75rem', fontWeight:'600' }}>{plant.toxicToDogs ? 'Toxic to Dogs' : 'Dog Safe'}</span>
            </div>
            <div style={{ padding:'1.25rem', flex:1 }}>
              <div style={{ fontSize:'0.75rem', textTransform:'uppercase', color:'#8aaa6a', marginBottom:'0.25rem', fontWeight:'600' }}>{plant.category}</div>
              <h3 style={{ fontSize:'1.2rem', color:'#1a2e0e', margin:'0 0 0.5rem' }}>{plant.name}</h3>
              <p style={{ fontSize:'0.9rem', color:'#5a7a4a', lineHeight:'1.5', margin:'0 0 0.75rem' }}>{plant.description}</p>
              <p style={{ fontSize:'0.8rem', color:'#888', margin:'0 0 0.75rem', fontStyle:'italic' }}>{plant.care}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.25rem' }}>{plant.tags.map(tag => (<span key={tag} style={{ fontSize:'0.7rem', color:'#8aaa6a', background:'#f0f7e8', padding:'0.2rem 0.5rem', borderRadius:'10px' }}>#{tag}</span>))}</div>
            </div>
            <button onClick={() => toggleSelect(plant.id)} style={{ margin:'0 1.25rem 1.25rem', padding:'0.65rem', borderRadius:'50px', border:'2px solid #2d5016', background: selectedPlants.includes(plant.id) ? '#2d5016':'white', color: selectedPlants.includes(plant.id) ? 'white':'#2d5016', fontWeight:'600', cursor:'pointer' }}>
              {selectedPlants.includes(plant.id) ? 'Selected' : '+ Select Plant'}
            </button>
          </div>
        ))}
      </div>
      {selectedPlants.length > 0 && (
        <div style={{ position:'fixed', bottom:'2rem', left:'50%', transform:'translateX(-50%)', background:'#1a2e0e', color:'white', padding:'1rem 1.5rem', borderRadius:'50px', display:'flex', alignItems:'center', gap:'1.5rem', boxShadow:'0 8px 32px rgba(0,0,0,0.3)', zIndex:100 }}>
          <span>{selectedPlants.length} plant{selectedPlants.length > 1 ? 's':''} selected</span>
          <button style={{ background:'#f5c842', color:'#1a2e0e', border:'none', padding:'0.5rem 1.25rem', borderRadius:'50px', fontWeight:'700', cursor:'pointer' }}>Save to My Account</button>
        </div>
      )}
    </div>
  );
}
