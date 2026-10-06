import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, MapPin, Navigation, Clock, Users } from 'lucide-react';
import { useTransport } from '../context/TransportContext';

export default function LiveMapPage(){
 const {buses,currentStop}=useTransport(); const visible=(buses||[]).slice(0,6);
 return <div className="premium-page"><div className="premium-container">
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',gap:20,marginBottom:22,flexWrap:'wrap'}}><div><div className="hero-kicker">LIVE NETWORK</div><h1 style={{fontSize:'clamp(2rem,4vw,3.4rem)'}}>Live Map</h1><p style={{marginTop:8}}>Follow active buses, stop demand and route movement across the network.</p></div><div className="floating-callout"><span style={{color:'var(--success)'}}>● Live</span> updates connected</div></div>
  <div className="map-stage"><div className="map-grid-lines"/>
   <div style={{position:'absolute',zIndex:7,top:18,left:18,right:18,display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}><div className="floating-callout"><strong>{currentStop?.name||'Virar Station'}</strong><br/><span style={{fontSize:12}}>{currentStop?.waitingPassengers||48} people waiting</span></div><div className="floating-callout"><Navigation size={14}/> Real-time network</div></div>
   <div className="route-line" style={{left:'16%',top:'65%',width:'64%',transform:'rotate(-17deg)'}}/><div className="route-line" style={{left:'28%',top:'30%',width:'48%',transform:'rotate(18deg)',opacity:.55}}/>
   {visible.map((bus,i)=><Link key={bus.id} to={'/passenger/bus/'+bus.id} className="bus-marker" style={{left:(16+i*12)+'%',top:(60-i*6)+'%'}} title={bus.busNumber}><Bus size={19}/></Link>)}
   <div style={{position:'absolute',zIndex:7,bottom:18,left:18,right:18,display:'flex',gap:10,flexWrap:'wrap'}}><div className="floating-callout"><Users size={14}/> <strong>{currentStop?.waitingPassengers||48}</strong> waiting</div><div className="floating-callout"><Bus size={14}/> <strong>{visible.length}</strong> active nearby</div><div className="floating-callout"><Clock size={14}/> Avg wait <strong>7 min</strong></div></div>
  </div>
  <div style={{marginTop:18,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>{visible.slice(0,4).map(bus=><Link key={bus.id} to={'/passenger/bus/'+bus.id} className="premium-panel" style={{padding:16,display:'flex',justifyContent:'space-between',gap:12}}><div><strong>{bus.busNumber}</strong><div className="premium-muted" style={{fontSize:12,marginTop:4}}>{bus.route}</div></div><div style={{textAlign:'right'}}><strong style={{color:'var(--primary)'}}>{bus.etaMinutes} min</strong><div style={{fontSize:12}}>{bus.occupancyPercent}% occupied</div></div></Link>)}</div>
 </div></div>;
}