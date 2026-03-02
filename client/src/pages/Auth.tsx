import { useState } from 'react';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
      const body = mode === 'signup'
        ? { email, password, name, newsletterOptIn: newsletter }
        : { email, password };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      setMessage(mode === 'signup' ? 'Account created! Welcome to PlantBandBees.' : 'Welcome back!');
      setTimeout(() => { window.location.href = '/dashboard'; }, 1200);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:'100vh', background:'#f8faf5', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
      <div style={{ background:'white', borderRadius:'20px', padding:'2.5rem', width:'100%', maxWidth:'420px', boxShadow:'0 8px 32px rgba(0,0,0,0.10)' }}>
        <div style={{ textAlign:'center', marginBottom:'1.5rem' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>🌿</div>
          <h1 style={{ color:'#1a2e0e', fontSize:'1.5rem', margin:'0 0 0.25rem' }}>PlantBandBees</h1>
          <p style={{ color:'#8aaa6a', fontSize:'0.9rem', margin:0 }}>Premium plants for Knoxville hosts</p>
        </div>
        <div style={{ display:'flex', background:'#f0f7e8', borderRadius:'50px', padding:'4px', marginBottom:'1.5rem' }}>
          <button onClick={() => { setMode('login'); setMessage(''); }} style={{ flex:1, padding:'0.5rem', borderRadius:'50px', border:'none', background: mode==='login' ? '#2d5016':'transparent', color: mode==='login' ? 'white':'#2d5016', fontWeight:'600', cursor:'pointer', fontSize:'0.9rem' }}>Log In</button>
          <button onClick={() => { setMode('signup'); setMessage(''); }} style={{ flex:1, padding:'0.5rem', borderRadius:'50px', border:'none', background: mode==='signup' ? '#2d5016':'transparent', color: mode==='signup' ? 'white':'#2d5016', fontWeight:'600', cursor:'pointer', fontSize:'0.9rem' }}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          {mode === 'signup' && (
            <input type='text' placeholder='Full Name' value={name} onChange={e => setName(e.target.value)} required style={{ padding:'0.75rem 1rem', border:'2px solid #d4e6c3', borderRadius:'10px', fontSize:'1rem', outline:'none' }} />
          )}
          <input type='email' placeholder='Email Address' value={email} onChange={e => setEmail(e.target.value)} required style={{ padding:'0.75rem 1rem', border:'2px solid #d4e6c3', borderRadius:'10px', fontSize:'1rem', outline:'none' }} />
          <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required style={{ padding:'0.75rem 1rem', border:'2px solid #d4e6c3', borderRadius:'10px', fontSize:'1rem', outline:'none' }} />
          {mode === 'signup' && (
            <label style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem', cursor:'pointer', padding:'0.75rem', background:'#f0f7e8', borderRadius:'10px' }}>
              <input type='checkbox' checked={newsletter} onChange={e => setNewsletter(e.target.checked)} style={{ marginTop:'2px', accentColor:'#2d5016' }} />
              <span style={{ fontSize:'0.85rem', color:'#2d5016', lineHeight:'1.4' }}>Subscribe to our newsletter for plant tips, seasonal updates, and exclusive host offers</span>
            </label>
          )}
          {message && (
            <div style={{ padding:'0.75rem', borderRadius:'10px', background: message.includes('!') ? '#f0f7e8':'#fff0f0', color: message.includes('!') ? '#2d5016':'#cc0000', fontSize:'0.9rem', textAlign:'center' }}>{message}</div>
          )}
          <button type='submit' disabled={loading} style={{ padding:'0.85rem', borderRadius:'50px', border:'none', background:'#2d5016', color:'white', fontWeight:'700', fontSize:'1rem', cursor: loading ? 'not-allowed':'pointer', opacity: loading ? 0.7:1 }}>
            {loading ? 'Loading...' : mode === 'signup' ? 'Create My Account' : 'Log In'}
          </button>
        </form>
        <div style={{ textAlign:'center', marginTop:'1.25rem' }}>
          <a href='/catalogue' style={{ color:'#8aaa6a', fontSize:'0.85rem', textDecoration:'none' }}>Browse Plant Catalogue without signing in</a>
        </div>
      </div>
    </div>
  );
}
