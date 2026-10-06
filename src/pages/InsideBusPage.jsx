import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Bus, Clock3, MapPin, Users, LogOut } from 'lucide-react';
import { useTransport } from '../context/TransportContext';

export default function InsideBusPage(){
  const {busId}=useParams(); const navigate=useNavigate();
  const {getBusById,setActiveTrip}=useTransport(); const bus=getBusById(busId);
  if(!bus)return <div className="premium-page"><div className="premium-container"><h2>Bus not found</h2></div></div>;
  const stops=bus.stopsSequence||[];
  const board=()=>{setActiveTrip({busId:bus.id,busNumber:bus.busNumber,origin:stops[0]?.name||'Virar Station',destination:bus.targetStop||bus.nextStop,startTime:new Date().toISOString(),startOccupancy:bus.occupancyPercent});navigate('/passenger/check-out')};
  return <div className="premium-page"><div className="premium-container">
    <div className="hero-kicker">PASSENGER JOURNEY</div><h1>Inside Bus</h1><p style={{marginTop:6}}>{bus.busNumber} · {bus.route}</p>
    <div className="journey-layout" style={{marginTop:22}}>
      <div className="journey-image" style={{backgroundImage:'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1500&q=88")'}}>
        <div className="journey-overlay"><div className="floating-callout" style={{display:'inline-block',marginBottom:12,color:'var(--success)'}}>● YOU'RE ON BOARD</div><h2 style={{fontSize:'clamp(2rem,4vw,3.5rem)'}}>{bus.busNumber}</h2><p>{bus.currentLocation} → {bus.targetStop}</p></div>
      </div>
      <div className="journey-side">
        <div className="premium-panel" style={{padding:22}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div className="premium-muted">Occupancy</div><div style={{fontSize:30,fontWeight:900}}>{bus.occupancyPercent}%</div><div style={{fontSize:12}}>{bus.availableCapacity} seats available</div></div><div className="occupancy-ring" style={{'--percent':bus.occupancyPercent+'%'}}><span>{bus.availableCapacity}</span></div></div>
          <div style={{marginTop:18,display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><div className="floating-callout"><Users size={14}/> {bus.occupancyPercent}% full</div><div className="floating-callout"><Clock3 size={14}/> {bus.etaMinutes} min</div></div>
        </div>
        <div className="premium-panel" style={{padding:22}}>
          <div className="premium-muted" style={{fontSize:12}}>NEXT STOP</div><h2 style={{marginTop:5}}>{bus.nextStop}</h2><div style={{color:'var(--primary)',fontWeight:800,marginTop:4}}>{bus.etaMinutes} min</div>
          <div className="stop-list" style={{marginTop:14}}>{stops.map((s,i)=><React.Fragment key={s.name}><div className="stop-row"><span className={'stop-dot '+(s.status==='next'?'active':'')}/><span style={{color:s.status==='next'?'var(--text-primary)':undefined,fontWeight:s.status==='next'?800:500}}>{s.name}</span><span style={{fontSize:11}}>{s.time}</span></div>{i<stops.length-1&&<div className="stop-line"/>}</React.Fragment>)}</div>
        </div>
        <button className="btn btn-primary btn-lg" onClick={board}><LogOut size={18}/> Check Out</button>
        <Link className="btn btn-secondary" to={'/passenger/next-stop/'+bus.id}><MapPin size={16}/> View Next Stop</Link>
      </div>
    </div>
  </div></div>;
}