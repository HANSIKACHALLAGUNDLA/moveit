import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Bus,Map,MapPin,ShieldCheck,ArrowRight,Users,Clock3 } from 'lucide-react';
import { useTransport } from '../context/TransportContext';

export default function LandingPage(){
 const navigate=useNavigate(); const {setUserRole,currentStop,buses}=useTransport();
 const enter=(role,path)=>{setUserRole(role);navigate(path)};
 return <div className="premium-page">
  <section className="hero-shell">
   <div className="hero-content">
    <div className="hero-kicker"><Bus size={16}/> Smart public transport coordination</div>
    <h1 className="hero-title">Your Journey,<br/>Our Priority.</h1>
    <p className="hero-copy">Track. Board. Ride. Repeat. MOVEIT brings live bus locations, capacity visibility and passenger demand into one intelligent journey.</p>
    <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
      <button className="btn btn-primary btn-lg" onClick={()=>enter('passenger','/passenger/find-bus')}>Find a Bus <ArrowRight size={17}/></button>
      <button className="btn btn-secondary btn-lg" onClick={()=>enter('passenger','/passenger/live-map')}><Map size={17}/> Live Map</button>
    </div>
    <div className="hero-stats">
      <div className="hero-stat"><b>{currentStop?.waitingPassengers||48}</b><span>people waiting at Virar Station</span></div>
      <div className="hero-stat"><b>{buses?.length||8}</b><span>buses in network</span></div>
      <div className="hero-stat"><b>Live</b><span>capacity visibility</span></div>
    </div>
   </div>
  </section>
  <section className="premium-container">
   <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:20,flexWrap:'wrap',marginBottom:18}}><div><div className="hero-kicker">THE PASSENGER JOURNEY</div><h2 style={{fontSize:'clamp(1.8rem,3vw,2.7rem)'}}>From waiting to checkout.</h2></div><Link to="/authority/dashboard" onClick={()=>setUserRole('authority')} className="btn btn-secondary"><ShieldCheck size={16}/> Authority view</Link></div>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:14}}>
    {[
      ['/passenger/live-map','Live Map',Map,'Watch buses move across the network.'],
      ['/passenger/find-bus','Find Bus',MapPin,'Compare ETA and available capacity.'],
      ['/passenger/my-trips','My Trips',Clock3,'Keep a clear history of your journeys.'],
      ['/passenger/dashboard','At My Stop',Users,'See waiting demand and approaching buses.']
    ].map(([to,title,Icon,copy])=><Link key={to} to={to} className="premium-panel" style={{padding:22,minHeight:150,transition:'var(--transition)'}}><Icon color="var(--primary)" size={22}/><h3 style={{marginTop:14}}>{title}</h3><p style={{fontSize:13,marginTop:5}}>{copy}</p><div style={{marginTop:16,color:'var(--primary)',fontSize:12,fontWeight:800}}>OPEN EXPERIENCE →</div></Link>)}
   </div>
  </section>
 </div>;
}