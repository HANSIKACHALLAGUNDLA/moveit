import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock3 } from 'lucide-react';
import { useTransport } from '../context/TransportContext';

export default function FindBusPage(){
  const { buses } = useTransport();
  const sorted=[...buses].sort((a,b)=>a.occupancyPercent-b.occupancyPercent);
  return <div className="premium-page"><div className="premium-container">
    <div className="hero-kicker">JOURNEY PLANNER</div>
    <h1 style={{fontSize:'clamp(2rem,4vw,3.5rem)'}}>Find a Bus</h1>
    <p style={{marginTop:8}}>Choose using live ETA and capacity instead of guesswork.</p>
    <div className="premium-panel" style={{marginTop:26,padding:18,display:'grid',gridTemplateColumns:'1fr 1fr auto',gap:12,alignItems:'end'}}>
      <label style={{fontSize:12,color:'var(--text-muted)'}}>FROM<input className="input" value="Virar Station" readOnly/></label>
      <label style={{fontSize:12,color:'var(--text-muted)'}}>TO<input className="input" value="Global City" readOnly/></label>
      <button className="btn btn-primary"><Search size={16}/> Search</button>
    </div>
    <div style={{marginTop:28}}><h2>Recommended Buses</h2><p style={{fontSize:13}}>Lower crowding is prioritized.</p></div>
    <div className="trip-list" style={{marginTop:14}}>{sorted.slice(0,5).map(bus=>
      <Link to={'/passenger/bus/'+bus.id} className="premium-panel" key={bus.id} style={{padding:18,display:'grid',gridTemplateColumns:'1fr auto auto',gap:18,alignItems:'center'}}>
        <div style={{display:'flex',gap:12,alignItems:'center'}}><div style={{width:44,height:44,borderRadius:12,display:'grid',placeItems:'center',background:'rgba(56,200,255,.1)',color:'var(--primary)'}}><MapPin size={19}/></div><div><strong>{bus.busNumber}</strong><div className="premium-muted" style={{fontSize:12}}>{bus.route}</div></div></div>
        <div style={{textAlign:'right'}}><strong style={{color:'var(--primary)'}}>{bus.etaMinutes} min</strong><div style={{fontSize:11}}><Clock3 size={11}/> ETA</div></div>
        <div style={{textAlign:'right'}}><strong>{bus.availableCapacity}</strong><div style={{fontSize:11,color:bus.occupancyPercent>80?'var(--danger)':'var(--success)'}}>{bus.occupancyPercent}% occupied</div></div>
      </Link>)}</div>
  </div></div>;
}