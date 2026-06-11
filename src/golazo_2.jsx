import { useState, useEffect, useRef, useCallback } from "react";
// Trophy image — place fifa_trophy.png inside C:\Users\HP\my-app\public\
const TROPHY_IMG = "/fifa_trophy.png";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const GROUPS = [
  { id:"A", danger:false, teams:[{name:"Mexico",flag:"🇲🇽",rank:18},{name:"South Africa",flag:"🇿🇦",rank:67},{name:"Korea Republic",flag:"🇰🇷",rank:24},{name:"Czechia",flag:"🇨🇿",rank:35}],
    fixtures:[
      {md:1,date:"Jun 11",time:"9PM ET",home:"Mexico",away:"South Africa",city:"Mexico City",venue:"Estadio Azteca",confirmed:true},
      {md:1,date:"Jun 12",time:"3PM ET",home:"Korea Republic",away:"Czechia",city:"Atlanta",venue:"Mercedes-Benz Stadium",confirmed:true},
      {md:2,date:"Jun 17",time:"6PM ET",home:"Mexico",away:"Czechia",city:"Dallas",venue:"AT&T Stadium",confirmed:false},
      {md:2,date:"Jun 17",time:"9PM ET",home:"South Africa",away:"Korea Republic",city:"Los Angeles",venue:"SoFi Stadium",confirmed:false},
      {md:3,date:"Jun 22",time:"3PM ET",home:"Czechia",away:"South Africa",city:"Houston",venue:"NRG Stadium",confirmed:false},
      {md:3,date:"Jun 22",time:"3PM ET",home:"Korea Republic",away:"Mexico",city:"Miami",venue:"Hard Rock Stadium",confirmed:false},
    ]},
  { id:"B", danger:false, teams:[{name:"Canada",flag:"🇨🇦",rank:49},{name:"Bosnia-Herz.",flag:"🇧🇦",rank:55},{name:"Qatar",flag:"🇶🇦",rank:62},{name:"Switzerland",flag:"🇨🇭",rank:17}],
    fixtures:[
      {md:1,date:"Jun 12",time:"6PM ET",home:"Canada",away:"Bosnia-Herz.",city:"Toronto",venue:"BMO Field",confirmed:true},
      {md:1,date:"Jun 12",time:"9PM ET",home:"Qatar",away:"Switzerland",city:"Dallas",venue:"AT&T Stadium",confirmed:false},
      {md:2,date:"Jun 18",time:"3PM ET",home:"Canada",away:"Switzerland",city:"Vancouver",venue:"BC Place",confirmed:false},
      {md:2,date:"Jun 18",time:"6PM ET",home:"Bosnia-Herz.",away:"Qatar",city:"New York",venue:"MetLife Stadium",confirmed:false},
      {md:3,date:"Jun 23",time:"3PM ET",home:"Switzerland",away:"Bosnia-Herz.",city:"Seattle",venue:"Lumen Field",confirmed:false},
      {md:3,date:"Jun 23",time:"3PM ET",home:"Qatar",away:"Canada",city:"Kansas City",venue:"Arrowhead Stadium",confirmed:false},
    ]},
  { id:"C", danger:true, teams:[{name:"Brazil",flag:"🇧🇷",rank:6},{name:"Morocco",flag:"🇲🇦",rank:12},{name:"Haiti",flag:"🇭🇹",rank:102},{name:"Scotland",flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",rank:37}],
    fixtures:[
      {md:1,date:"Jun 13",time:"6PM ET",home:"Brazil",away:"Morocco",city:"Dallas",venue:"AT&T Stadium",confirmed:true},
      {md:1,date:"Jun 13",time:"3PM ET",home:"Haiti",away:"Scotland",city:"Houston",venue:"NRG Stadium",confirmed:false},
      {md:2,date:"Jun 19",time:"9PM ET",home:"Brazil",away:"Scotland",city:"Los Angeles",venue:"SoFi Stadium",confirmed:false},
      {md:2,date:"Jun 19",time:"6PM ET",home:"Morocco",away:"Haiti",city:"Miami",venue:"Hard Rock Stadium",confirmed:false},
      {md:3,date:"Jun 24",time:"3PM ET",home:"Scotland",away:"Morocco",city:"Atlanta",venue:"Mercedes-Benz Stadium",confirmed:false},
      {md:3,date:"Jun 24",time:"3PM ET",home:"Haiti",away:"Brazil",city:"San Francisco",venue:"Levi's Stadium",confirmed:false},
    ]},
  { id:"D", danger:false, teams:[{name:"USA",flag:"🇺🇸",rank:11},{name:"Paraguay",flag:"🇵🇾",rank:65},{name:"Australia",flag:"🇦🇺",rank:23},{name:"Türkiye",flag:"🇹🇷",rank:38}],
    fixtures:[
      {md:1,date:"Jun 12",time:"9PM ET",home:"USA",away:"Paraguay",city:"Los Angeles",venue:"SoFi Stadium",confirmed:true},
      {md:1,date:"Jun 13",time:"9PM ET",home:"Australia",away:"Türkiye",city:"New York",venue:"MetLife Stadium",confirmed:false},
      {md:2,date:"Jun 18",time:"9PM ET",home:"USA",away:"Türkiye",city:"Dallas",venue:"AT&T Stadium",confirmed:false},
      {md:2,date:"Jun 19",time:"3PM ET",home:"Paraguay",away:"Australia",city:"Miami",venue:"Hard Rock Stadium",confirmed:false},
      {md:3,date:"Jun 24",time:"6PM ET",home:"Türkiye",away:"Paraguay",city:"Houston",venue:"NRG Stadium",confirmed:false},
      {md:3,date:"Jun 24",time:"6PM ET",home:"Australia",away:"USA",city:"Seattle",venue:"Lumen Field",confirmed:false},
    ]},
  { id:"E", danger:false, teams:[{name:"Germany",flag:"🇩🇪",rank:9},{name:"Curaçao",flag:"🇨🇼",rank:82},{name:"Côte d'Ivoire",flag:"🇨🇮",rank:49},{name:"Ecuador",flag:"🇪🇨",rank:44}],
    fixtures:[
      {md:1,date:"Jun 13",time:"3PM ET",home:"Germany",away:"Curaçao",city:"Philadelphia",venue:"Lincoln Financial Field",confirmed:true},
      {md:1,date:"Jun 14",time:"3PM ET",home:"Côte d'Ivoire",away:"Ecuador",city:"Atlanta",venue:"Mercedes-Benz Stadium",confirmed:false},
      {md:2,date:"Jun 19",time:"9PM ET",home:"Germany",away:"Ecuador",city:"San Francisco",venue:"Levi's Stadium",confirmed:false},
      {md:2,date:"Jun 20",time:"3PM ET",home:"Curaçao",away:"Côte d'Ivoire",city:"Kansas City",venue:"Arrowhead Stadium",confirmed:false},
      {md:3,date:"Jun 25",time:"3PM ET",home:"Ecuador",away:"Curaçao",city:"Boston",venue:"Gillette Stadium",confirmed:false},
      {md:3,date:"Jun 25",time:"3PM ET",home:"Côte d'Ivoire",away:"Germany",city:"Dallas",venue:"AT&T Stadium",confirmed:false},
    ]},
  { id:"F", danger:true, teams:[{name:"Netherlands",flag:"🇳🇱",rank:7},{name:"Japan",flag:"🇯🇵",rank:13},{name:"Sweden",flag:"🇸🇪",rank:20},{name:"Tunisia",flag:"🇹🇳",rank:31}],
    fixtures:[
      {md:1,date:"Jun 14",time:"6PM ET",home:"Netherlands",away:"Japan",city:"Seattle",venue:"Lumen Field",confirmed:true},
      {md:1,date:"Jun 14",time:"9PM ET",home:"Sweden",away:"Tunisia",city:"Los Angeles",venue:"SoFi Stadium",confirmed:false},
      {md:2,date:"Jun 20",time:"6PM ET",home:"Netherlands",away:"Tunisia",city:"Houston",venue:"NRG Stadium",confirmed:false},
      {md:2,date:"Jun 20",time:"9PM ET",home:"Japan",away:"Sweden",city:"Dallas",venue:"AT&T Stadium",confirmed:false},
      {md:3,date:"Jun 25",time:"6PM ET",home:"Tunisia",away:"Japan",city:"Miami",venue:"Hard Rock Stadium",confirmed:false},
      {md:3,date:"Jun 25",time:"6PM ET",home:"Sweden",away:"Netherlands",city:"San Francisco",venue:"Levi's Stadium",confirmed:false},
    ]},
  { id:"G", danger:false, teams:[{name:"Belgium",flag:"🇧🇪",rank:8},{name:"Egypt",flag:"🇪🇬",rank:36},{name:"Iran",flag:"🇮🇷",rank:22},{name:"New Zealand",flag:"🇳🇿",rank:93}],
    fixtures:[
      {md:1,date:"Jun 14",time:"3PM ET",home:"Belgium",away:"Egypt",city:"Miami",venue:"Hard Rock Stadium",confirmed:false},
      {md:1,date:"Jun 15",time:"3PM ET",home:"Iran",away:"New Zealand",city:"Seattle",venue:"Lumen Field",confirmed:false},
      {md:2,date:"Jun 20",time:"3PM ET",home:"Belgium",away:"New Zealand",city:"New York",venue:"MetLife Stadium",confirmed:false},
      {md:2,date:"Jun 21",time:"3PM ET",home:"Egypt",away:"Iran",city:"Houston",venue:"NRG Stadium",confirmed:false},
      {md:3,date:"Jun 26",time:"3PM ET",home:"Egypt",away:"New Zealand",city:"Los Angeles",venue:"SoFi Stadium",confirmed:false},
      {md:3,date:"Jun 26",time:"3PM ET",home:"Iran",away:"Belgium",city:"Philadelphia",venue:"Lincoln Financial Field",confirmed:false},
    ]},
  { id:"H", danger:true, teams:[{name:"Spain",flag:"🇪🇸",rank:2},{name:"Cape Verde",flag:"🇨🇻",rank:75},{name:"Saudi Arabia",flag:"🇸🇦",rank:56},{name:"Uruguay",flag:"🇺🇾",rank:10}],
    fixtures:[
      {md:1,date:"Jun 15",time:"6PM ET",home:"Spain",away:"Cape Verde",city:"New York",venue:"MetLife Stadium",confirmed:false},
      {md:1,date:"Jun 15",time:"9PM ET",home:"Uruguay",away:"Saudi Arabia",city:"Dallas",venue:"AT&T Stadium",confirmed:false},
      {md:2,date:"Jun 21",time:"6PM ET",home:"Spain",away:"Saudi Arabia",city:"Los Angeles",venue:"SoFi Stadium",confirmed:false},
      {md:2,date:"Jun 21",time:"9PM ET",home:"Cape Verde",away:"Uruguay",city:"Atlanta",venue:"Mercedes-Benz Stadium",confirmed:false},
      {md:3,date:"Jun 26",time:"6PM ET",home:"Saudi Arabia",away:"Cape Verde",city:"Miami",venue:"Hard Rock Stadium",confirmed:false},
      {md:3,date:"Jun 26",time:"6PM ET",home:"Uruguay",away:"Spain",city:"Boston",venue:"Gillette Stadium",confirmed:false},
    ]},
  { id:"I", danger:true, teams:[{name:"France",flag:"🇫🇷",rank:1},{name:"Senegal",flag:"🇸🇳",rank:14},{name:"Iraq",flag:"🇮🇶",rank:58},{name:"Norway",flag:"🇳🇴",rank:25}],
    fixtures:[
      {md:1,date:"Jun 15",time:"3PM ET",home:"France",away:"Iraq",city:"Houston",venue:"NRG Stadium",confirmed:false},
      {md:1,date:"Jun 16",time:"3PM ET",home:"Norway",away:"Senegal",city:"Kansas City",venue:"Arrowhead Stadium",confirmed:false},
      {md:2,date:"Jun 21",time:"3PM ET",home:"France",away:"Senegal",city:"San Francisco",venue:"Levi's Stadium",confirmed:false},
      {md:2,date:"Jun 22",time:"6PM ET",home:"Iraq",away:"Norway",city:"Seattle",venue:"Lumen Field",confirmed:false},
      {md:3,date:"Jun 27",time:"3PM ET",home:"Senegal",away:"Iraq",city:"Dallas",venue:"AT&T Stadium",confirmed:false},
      {md:3,date:"Jun 27",time:"3PM ET",home:"Norway",away:"France",city:"Philadelphia",venue:"Lincoln Financial Field",confirmed:false},
    ]},
  { id:"J", danger:false, teams:[{name:"Argentina",flag:"🇦🇷",rank:3},{name:"Algeria",flag:"🇩🇿",rank:40},{name:"Austria",flag:"🇦🇹",rank:26},{name:"Jordan",flag:"🇯🇴",rank:85}],
    fixtures:[
      {md:1,date:"Jun 16",time:"9PM ET",home:"Argentina",away:"Algeria",city:"Miami",venue:"Hard Rock Stadium",confirmed:false},
      {md:1,date:"Jun 16",time:"6PM ET",home:"Austria",away:"Jordan",city:"New York",venue:"MetLife Stadium",confirmed:false},
      {md:2,date:"Jun 22",time:"9PM ET",home:"Argentina",away:"Jordan",city:"Dallas",venue:"AT&T Stadium",confirmed:false},
      {md:2,date:"Jun 22",time:"3PM ET",home:"Algeria",away:"Austria",city:"Houston",venue:"NRG Stadium",confirmed:false},
      {md:3,date:"Jun 27",time:"6PM ET",home:"Algeria",away:"Jordan",city:"Los Angeles",venue:"SoFi Stadium",confirmed:false},
      {md:3,date:"Jun 27",time:"6PM ET",home:"Austria",away:"Argentina",city:"San Francisco",venue:"Levi's Stadium",confirmed:false},
    ]},
  { id:"K", danger:true, teams:[{name:"Portugal",flag:"🇵🇹",rank:5},{name:"DR Congo",flag:"🇨🇩",rank:55},{name:"Uzbekistan",flag:"🇺🇿",rank:70},{name:"Colombia",flag:"🇨🇴",rank:15}],
    fixtures:[
      {md:1,date:"Jun 16",time:"3PM ET",home:"Portugal",away:"DR Congo",city:"Boston",venue:"Gillette Stadium",confirmed:false},
      {md:1,date:"Jun 17",time:"3PM ET",home:"Colombia",away:"Uzbekistan",city:"Atlanta",venue:"Mercedes-Benz Stadium",confirmed:false},
      {md:2,date:"Jun 22",time:"3PM ET",home:"Portugal",away:"Uzbekistan",city:"Philadelphia",venue:"Lincoln Financial Field",confirmed:false},
      {md:2,date:"Jun 23",time:"6PM ET",home:"DR Congo",away:"Colombia",city:"Kansas City",venue:"Arrowhead Stadium",confirmed:false},
      {md:3,date:"Jun 28",time:"3PM ET",home:"DR Congo",away:"Uzbekistan",city:"Boston",venue:"Gillette Stadium",confirmed:false},
      {md:3,date:"Jun 28",time:"3PM ET",home:"Colombia",away:"Portugal",city:"Miami",venue:"Hard Rock Stadium",confirmed:false},
    ]},
  { id:"L", danger:false, teams:[{name:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",rank:4},{name:"Croatia",flag:"🇭🇷",rank:16},{name:"Ghana",flag:"🇬🇭",rank:60},{name:"Panama",flag:"🇵🇦",rank:72}],
    fixtures:[
      {md:1,date:"Jun 17",time:"9PM ET",home:"England",away:"Croatia",city:"San Francisco",venue:"Levi's Stadium",confirmed:true},
      {md:1,date:"Jun 17",time:"6PM ET",home:"Ghana",away:"Panama",city:"Seattle",venue:"Lumen Field",confirmed:false},
      {md:2,date:"Jun 23",time:"9PM ET",home:"England",away:"Ghana",city:"New York",venue:"MetLife Stadium",confirmed:false},
      {md:2,date:"Jun 23",time:"3PM ET",home:"Croatia",away:"Panama",city:"Kansas City",venue:"Arrowhead Stadium",confirmed:false},
      {md:3,date:"Jun 28",time:"6PM ET",home:"Croatia",away:"Ghana",city:"Dallas",venue:"AT&T Stadium",confirmed:false},
      {md:3,date:"Jun 28",time:"6PM ET",home:"Panama",away:"England",city:"Houston",venue:"NRG Stadium",confirmed:false},
    ]},
];

const OPENING_FIXTURES = [
  {date:"Jun 11",teams:"Mexico vs South Africa",city:"Mexico City",group:"A",hot:true,time:"9PM ET"},
  {date:"Jun 12",teams:"Canada vs Bosnia-Herz.",city:"Toronto",group:"B",hot:false,time:"6PM ET"},
  {date:"Jun 12",teams:"USA vs Paraguay",city:"Los Angeles",group:"D",hot:true,time:"9PM ET"},
  {date:"Jun 13",teams:"Brazil vs Morocco",city:"Dallas",group:"C",hot:true,time:"6PM ET"},
  {date:"Jun 13",teams:"Germany vs Curaçao",city:"Philadelphia",group:"E",hot:false,time:"3PM ET"},
  {date:"Jun 14",teams:"Netherlands vs Japan",city:"Seattle",group:"F",hot:true,time:"6PM ET"},
];

const STORYLINES = [
  {icon:"👑",tag:"DEFENDING CHAMPS",headline:"Messi & Argentina begin title defence vs Algeria on Jun 16",heat:98,accent:"#75AADB"},
  {icon:"⚡",tag:"MBAPPE WATCH",headline:"Mbappé leads France in Group I — can he finally win it all?",heat:96,accent:"#003189"},
  {icon:"🐐",tag:"FINAL DANCE?",headline:"Ronaldo's last World Cup — Portugal in Group K",heat:94,accent:"#006600"},
  {icon:"🌟",tag:"YOUNG GUN",headline:"Lamine Yamal, 18, carries Spain's hopes in Group H",heat:91,accent:"#AA151B"},
  {icon:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",tag:"THREE LIONS",headline:"England open vs Croatia on Jun 17 — revenge for 2018?",heat:89,accent:"#CF081F"},
  {icon:"🇧🇷",tag:"SAMBA MAGIC",headline:"Brazil vs Morocco is Jun 13's most anticipated group opener",heat:92,accent:"#009C3B"},
];

const FAVORITES = [
  {name:"Argentina",flag:"🇦🇷",group:"J",odds:"+320",rank:3,color:"#75AADB"},
  {name:"France",flag:"🇫🇷",group:"I",odds:"+380",rank:1,color:"#003189"},
  {name:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",group:"L",odds:"+480",rank:4,color:"#CF081F"},
  {name:"Brazil",flag:"🇧🇷",group:"C",odds:"+420",rank:6,color:"#009C3B"},
  {name:"Spain",flag:"🇪🇸",group:"H",odds:"+450",rank:2,color:"#AA151B"},
  {name:"Portugal",flag:"🇵🇹",group:"K",odds:"+600",rank:5,color:"#006600"},
];

const PLAYERS = [
  {name:"Lionel Messi",flag:"🇦🇷",country:"Argentina",position:"Forward",age:38,wcGoals:13,caps:180,accent:"#75AADB",tag:"THE GOAT",bio:"His 6th and final World Cup. Defending champion. Enough said."},
  {name:"Kylian Mbappé",flag:"🇫🇷",country:"France",position:"Forward",age:27,wcGoals:12,caps:88,accent:"#003189",tag:"GENERATIONAL",bio:"FIFA #1 nation's captain. The world is watching every single run."},
  {name:"Cristiano Ronaldo",flag:"🇵🇹",country:"Portugal",position:"Forward",age:41,wcGoals:8,caps:212,accent:"#006600",tag:"FINAL DANCE",bio:"One last shot at the only trophy missing from the GOAT debate."},
  {name:"Lamine Yamal",flag:"🇪🇸",country:"Spain",position:"Winger",age:18,wcGoals:0,caps:31,accent:"#AA151B",tag:"FUTURE IS NOW",bio:"18 years old. Euro 2024 winner. Spain's hope on the left flank."},
];

const NAV = ["Home","Groups","Fixtures","Buzz","Predictions","Kits","Debate"];

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function HeatBar({v,color="#D4AF37"}) {
  return (
    <div style={{background:"rgba(255,255,255,0.05)",borderRadius:"3px",height:"3px",overflow:"hidden"}}>
      <div style={{width:`${v}%`,height:"100%",background:`linear-gradient(90deg,${color},#FF6B35)`,borderRadius:"3px"}}/>
    </div>
  );
}

function NavBar({activeNav,setActiveNav,scrolled,onJoin}) {
  const [mobileOpen,setMobileOpen]=useState(false);
  const navStyle={
    position:"sticky",top:0,zIndex:100,
    display:"flex",alignItems:"center",justifyContent:"space-between",
    padding:"0 16px",height:"60px",
    background: scrolled||activeNav!=="Home" ? "rgba(6,10,16,0.95)" : "rgba(6,10,16,0.85)",
    backdropFilter:"blur(16px)",
    borderBottom:"1px solid rgba(212,175,55,0.12)",
    transition:"all 0.3s",
  };
  return (
    <>
      <nav style={navStyle}>
        {/* LOGO */}
        <div style={{display:"flex",alignItems:"center",gap:"9px",flexShrink:0}}>
          <div style={{width:"32px",height:"32px",background:"linear-gradient(135deg,#D4AF37,#FF6B35)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",animation:"glow 3s infinite"}}>⚽</div>
          <div>
            <div className="logo-name" style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.25rem",color:"#D4AF37",letterSpacing:"0.08em",lineHeight:1}}>GOLAZO</div>
            <div className="logo-sub" style={{fontSize:"0.5rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.2em",textTransform:"uppercase"}}>The FIFA 2026 Fan World</div>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="nav-links" style={{display:"flex",gap:"2px"}}>
          {NAV.map(n=>(
            <button key={n} className="nav-btn" onClick={()=>setActiveNav(n)} style={{
              background:"none",border:"none",cursor:"pointer",padding:"6px 10px",borderRadius:"6px",
              fontSize:"0.75rem",fontWeight:500,fontFamily:"'DM Sans',sans-serif",
              color:activeNav===n?"#D4AF37":"rgba(255,255,255,0.45)",
              borderBottom:activeNav===n?"2px solid #D4AF37":"2px solid transparent",
              transition:"all 0.2s",
            }}>{n}</button>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div style={{display:"flex",alignItems:"center",gap:"8px",flexShrink:0}}>
          <button className="join-btn desktop-only" onClick={onJoin} style={{background:"#D4AF37",color:"#060A10",border:"none",borderRadius:"8px",padding:"8px 18px",fontWeight:700,fontSize:"0.78rem",cursor:"pointer",transition:"all 0.2s",fontFamily:"'DM Sans',sans-serif"}}>Join the Fan World</button>
          {/* Mobile join */}
          <button className="mobile-join-btn" onClick={onJoin} style={{display:"none",background:"#D4AF37",color:"#060A10",border:"none",borderRadius:"8px",padding:"7px 12px",fontWeight:700,fontSize:"0.72rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>Join ⚽</button>
          {/* Hamburger */}
          <button className="hamburger-btn" onClick={()=>setMobileOpen(v=>!v)} style={{display:"none",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"7px 10px",color:"#D4AF37",cursor:"pointer",fontSize:"1rem",lineHeight:1}}>
            {mobileOpen?"✕":"☰"}
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      {mobileOpen&&(
        <div style={{position:"fixed",top:"60px",left:0,right:0,zIndex:99,background:"rgba(6,10,16,0.98)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(212,175,55,0.15)",padding:"8px 0 16px",animation:"fadeUp 0.2s ease both"}}>
          {NAV.map(n=>(
            <button key={n} onClick={()=>{setActiveNav(n);setMobileOpen(false);}} style={{
              display:"block",width:"100%",background:"none",border:"none",
              padding:"14px 24px",textAlign:"left",cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif",fontSize:"1rem",fontWeight:500,
              color:activeNav===n?"#D4AF37":"rgba(255,255,255,0.65)",
              borderLeft:activeNav===n?"3px solid #D4AF37":"3px solid transparent",
              transition:"all 0.15s",
            }}>{n}</button>
          ))}
          <div style={{margin:"8px 24px 0",paddingTop:"12px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
            <button onClick={()=>{onJoin();setMobileOpen(false);}} style={{background:"#D4AF37",color:"#060A10",border:"none",borderRadius:"10px",padding:"12px 24px",fontWeight:700,fontSize:"0.9rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",width:"100%"}}>
              🔥 Join The Fan World
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer style={{borderTop:"1px solid rgba(255,255,255,0.05)",padding:"28px",marginTop:"52px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
        <div style={{width:"26px",height:"26px",background:"linear-gradient(135deg,#D4AF37,#FF6B35)",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px"}}>⚽</div>
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"0.9rem",color:"#D4AF37",letterSpacing:"0.08em"}}>GOLAZO</div>
      </div>
      <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.18)"}}>Fan-made · Not affiliated with FIFA · Built for the beautiful game</div>
      <div style={{display:"flex",gap:"16px"}}>
        {["Twitter/X","Discord","Instagram"].map(s=><span key={s} style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.25)",cursor:"pointer"}}>{s}</span>)}
      </div>
    </footer>
  );
}

// ─── GROUPS PAGE COMPONENTS ───────────────────────────────────────────────────

function StandingsTable({teams}) {
  return (
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem"}}>
        <thead>
          <tr style={{borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
            {["#","Team","P","W","D","L","GF","GA","GD","Pts"].map(h=>(
              <th key={h} style={{padding:"8px 10px",textAlign:h==="Team"?"left":"center",fontSize:"0.62rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teams.map((t,i)=>(
            <tr key={t.name} style={{borderBottom:"1px solid rgba(255,255,255,0.04)",background:i<2?"rgba(212,175,55,0.03)":"transparent"}}>
              <td style={{padding:"11px 10px",textAlign:"center",color:i<2?"#D4AF37":"rgba(255,255,255,0.3)",fontWeight:700,fontSize:"0.75rem"}}>{i+1}</td>
              <td style={{padding:"11px 10px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <span style={{fontSize:"1.1rem"}}>{t.flag}</span>
                  <span style={{fontWeight:i<2?600:400,color:i<2?"#EEE9DF":"rgba(255,255,255,0.7)"}}>{t.name}</span>
                  {i<2&&<span style={{fontSize:"0.55rem",background:"rgba(212,175,55,0.15)",color:"#D4AF37",borderRadius:"3px",padding:"1px 5px",fontWeight:700}}>{i===0?"SEED 1":"SEED 2"}</span>}
                </div>
              </td>
              {[0,0,0,0,0,0,0,0].map((v,vi)=>(
                <td key={vi} style={{padding:"11px 10px",textAlign:"center",color:vi===7?"#D4AF37":"rgba(255,255,255,0.45)",fontWeight:vi===7?700:400,fontFamily:vi===7?"'Bebas Neue',cursive":"inherit",fontSize:vi===7?"0.95rem":"0.82rem"}}>{vi===6?"—":0}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{padding:"8px 10px",display:"flex",alignItems:"center",gap:"6px"}}>
        <div style={{width:"10px",height:"10px",borderRadius:"2px",background:"rgba(212,175,55,0.2)",border:"1px solid rgba(212,175,55,0.3)"}}/>
        <span style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em"}}>QUALIFY FOR ROUND OF 32</span>
      </div>
    </div>
  );
}

function FixtureRow({f,isLast}) {
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",borderRadius:"10px",border:`1px solid ${hov?"rgba(212,175,55,0.2)":"rgba(255,255,255,0.06)"}`,background:hov?"rgba(212,175,55,0.03)":"transparent",marginBottom:isLast?0:"4px",transition:"all 0.2s",cursor:"pointer"}}>
      <div style={{minWidth:"48px",textAlign:"center"}}>
        <div style={{fontSize:"0.58rem",color:"#D4AF37",fontWeight:700,letterSpacing:"0.1em",marginBottom:"2px"}}>MD{f.md}</div>
        <div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.35)"}}>{f.date}</div>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"center",gap:"8px"}}>
        <span style={{fontWeight:600,fontSize:"0.88rem"}}>{f.home}</span>
        <span style={{color:"rgba(255,255,255,0.2)",fontSize:"0.7rem",fontFamily:"'Bebas Neue',cursive",letterSpacing:"0.1em"}}>VS</span>
        <span style={{fontWeight:600,fontSize:"0.88rem"}}>{f.away}</span>
      </div>
      <div style={{textAlign:"right"}}>
        <div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.4)"}}>📍 {f.city}</div>
        <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.25)",marginTop:"2px"}}>{f.venue}</div>
      </div>
      <div style={{background:"rgba(255,255,255,0.05)",borderRadius:"6px",padding:"4px 9px",fontSize:"0.68rem",color:"rgba(255,255,255,0.5)",fontWeight:500,minWidth:"60px",textAlign:"center"}}>{f.time}</div>
      {f.confirmed&&<div style={{background:"rgba(34,197,94,0.12)",border:"1px solid rgba(34,197,94,0.25)",borderRadius:"4px",padding:"2px 6px",fontSize:"0.58rem",color:"#22C55E",fontWeight:700}}>✓</div>}
    </div>
  );
}

function GroupDetail({group,onBack}) {
  const [mdFilter,setMdFilter]=useState(0);
  const filtered=mdFilter===0?group.fixtures:group.fixtures.filter(f=>f.md===mdFilter);
  return (
    <div style={{animation:"fadeUp 0.35s ease forwards"}}>
      <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"28px"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"8px 14px",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:"0.78rem",fontFamily:"'DM Sans',sans-serif"}}>← All Groups</button>
        <div>
          <div style={{fontSize:"0.6rem",color:"#D4AF37",letterSpacing:"0.2em",textTransform:"uppercase"}}>{group.danger?"🔥 Death Group":"Group Stage"}</div>
          <h2 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2.2rem",letterSpacing:"0.04em",lineHeight:1}}>Group {group.id}</h2>
        </div>
        {group.danger&&<div style={{marginLeft:"auto",background:"rgba(255,107,53,0.12)",border:"1px solid rgba(255,107,53,0.3)",borderRadius:"8px",padding:"6px 14px",fontSize:"0.7rem",color:"#FF6B35",fontWeight:700}}>🔥 DEATH GROUP</div>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"28px"}}>
        <div>
          <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"12px"}}>Teams</div>
          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            {group.teams.map((t,i)=>(
              <div key={t.name} style={{display:"flex",alignItems:"center",gap:"12px",background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"10px",padding:"12px 14px"}}>
                <div style={{width:"24px",height:"24px",borderRadius:"50%",background:i<2?"rgba(212,175,55,0.2)":"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.68rem",fontWeight:700,color:i<2?"#D4AF37":"rgba(255,255,255,0.3)"}}>{i+1}</div>
                <span style={{fontSize:"1.4rem"}}>{t.flag}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:"0.88rem"}}>{t.name}</div>
                  <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)"}}>FIFA #{t.rank}</div>
                </div>
                {i===0&&<div style={{fontSize:"0.6rem",background:"rgba(212,175,55,0.12)",color:"#D4AF37",padding:"2px 6px",borderRadius:"4px",fontWeight:700}}>FAVOURITE</div>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"12px"}}>Standings</div>
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",overflow:"hidden"}}>
            <StandingsTable teams={group.teams}/>
          </div>
        </div>
      </div>
      <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
          <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.18em",textTransform:"uppercase"}}>Fixtures</div>
          <div style={{display:"flex",gap:"4px"}}>
            {[0,1,2,3].map(md=>(
              <button key={md} onClick={()=>setMdFilter(md)} style={{background:mdFilter===md?"#D4AF37":"rgba(255,255,255,0.05)",color:mdFilter===md?"#060A10":"rgba(255,255,255,0.45)",border:"none",borderRadius:"6px",padding:"5px 10px",fontSize:"0.68rem",fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}>
                {md===0?"All":`MD${md}`}
              </button>
            ))}
          </div>
        </div>
        {filtered.map((f,i)=><FixtureRow key={i} f={f} isLast={i===filtered.length-1}/>)}
      </div>
    </div>
  );
}

function GroupCard({group,onClick,index=0}) {
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onClick}
      style={{background:hov?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.02)",border:`1px solid ${group.danger?(hov?"rgba(255,107,53,0.45)":"rgba(255,107,53,0.2)"):(hov?"rgba(212,175,55,0.35)":"rgba(255,255,255,0.07)")}`,borderRadius:"14px",padding:"18px",cursor:"pointer",transition:"transform 0.25s ease,border-color 0.25s ease,background 0.25s ease",transform:hov?"translateY(-4px) scale(1.01)":"none",animation:`slideUp 0.45s ease ${index*0.05}s both`,boxShadow:hov?`0 12px 40px rgba(0,0,0,0.3)`:"none"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.3rem",color:"#D4AF37",letterSpacing:"0.06em"}}>Group {group.id}</div>
        {group.danger?<span style={{fontSize:"0.55rem",color:"#FF6B35",fontWeight:700,background:"rgba(255,107,53,0.1)",padding:"2px 7px",borderRadius:"4px"}}>🔥 DEATH</span>:<span style={{fontSize:"0.55rem",color:"rgba(255,255,255,0.2)"}}>4 TEAMS</span>}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"4px",marginBottom:"14px"}}>
        {group.teams.map((t,i)=>(
          <div key={t.name} style={{display:"flex",alignItems:"center",gap:"8px",padding:"5px 0",borderBottom:i<3?"1px solid rgba(255,255,255,0.04)":"none"}}>
            <span style={{fontSize:"1rem"}}>{t.flag}</span>
            <span style={{fontSize:"0.8rem",flex:1,color:i===0?"#EEE9DF":"rgba(255,255,255,0.5)",fontWeight:i===0?600:400}}>{t.name}</span>
            <span style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.2)"}}>#{t.rank}</span>
          </div>
        ))}
      </div>
      <div style={{background:"rgba(212,175,55,0.06)",borderRadius:"8px",padding:"8px 10px",border:"1px solid rgba(212,175,55,0.12)"}}>
        <div style={{fontSize:"0.58rem",color:"rgba(212,175,55,0.6)",letterSpacing:"0.12em",marginBottom:"3px"}}>OPENING MATCH</div>
        <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.65)",fontWeight:500}}>{group.fixtures[0].home} <span style={{color:"rgba(255,255,255,0.25)"}}>vs</span> {group.fixtures[0].away}</div>
        <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)",marginTop:"2px"}}>{group.fixtures[0].date} · {group.fixtures[0].time}</div>
      </div>
      <div style={{marginTop:"10px",fontSize:"0.65rem",color:hov?"#D4AF37":"rgba(255,255,255,0.2)",textAlign:"right",transition:"all 0.2s"}}>View group →</div>
    </div>
  );
}

function GroupsPage() {
  const [selected,setSelected]=useState(null);
  const [filter,setFilter]=useState("all");
  const visible=filter==="danger"?GROUPS.filter(g=>g.danger):GROUPS;
  const selectedGroup=selected?GROUPS.find(g=>g.id===selected):null;
  return (
    <div style={{padding:"40px 28px 60px",maxWidth:"1200px",margin:"0 auto"}}>

      <div style={{marginBottom:"28px",animation:"slideUp 0.5s ease both"}}>
        <div style={{fontSize:"0.62rem",color:"#D4AF37",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:"6px"}}>Official Draw · 48 Teams · 12 Groups</div>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"}}>
          <h1 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"clamp(2.4rem,6vw,4rem)",letterSpacing:"0.04em",lineHeight:1,background:"linear-gradient(120deg,#fff 0%,#E8D5A3 40%,#D4AF37 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Group Stage</h1>
          {!selectedGroup&&(
            <div style={{display:"flex",gap:"6px"}}>
              {[["all","All Groups"],["danger","🔥 Death Groups"]].map(([v,l])=>(
                <button key={v} onClick={()=>setFilter(v)} style={{background:filter===v?"#D4AF37":"rgba(255,255,255,0.05)",color:filter===v?"#060A10":"rgba(255,255,255,0.5)",border:"none",borderRadius:"8px",padding:"7px 14px",fontSize:"0.75rem",fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s"}}>{l}</button>
              ))}
            </div>
          )}
        </div>
      </div>
      {!selectedGroup&&(
        <>
          <div style={{display:"flex",gap:"24px",marginBottom:"24px",flexWrap:"wrap",background:"rgba(212,175,55,0.04)",border:"1px solid rgba(212,175,55,0.15)",borderRadius:"12px",padding:"16px 20px"}}>
            {[["12","Groups"],["48","Nations"],["5","Death Groups"],["104","Total Matches"],["Jun 11","Kick Off"],["Jul 19","Final"]].map(([v,l],i)=>(
              <div key={l} style={{textAlign:"center",animation:`slideUp 0.4s ease ${0.15+i*0.08}s both`}}>
                <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.4rem",color:"#D4AF37",lineHeight:1}}>{v}</div>
                <div style={{fontSize:"0.58rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.12em",textTransform:"uppercase",marginTop:"2px"}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:"4px",marginBottom:"24px",flexWrap:"wrap"}}>
            {GROUPS.map(g=>(
              <button key={g.id} onClick={()=>setSelected(g.id)} style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${g.danger?"rgba(255,107,53,0.25)":"rgba(255,255,255,0.08)"}`,borderRadius:"6px",padding:"5px 10px",cursor:"pointer",fontFamily:"'Bebas Neue',cursive",fontSize:"0.85rem",color:g.danger?"#FF6B35":"rgba(255,255,255,0.5)",transition:"all 0.15s"}}>{g.id}</button>
            ))}
          </div>
        </>
      )}
      {selectedGroup
        ? <GroupDetail group={selectedGroup} onBack={()=>setSelected(null)}/>
        : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:"12px"}}>{visible.map((g,i)=><GroupCard key={g.id} group={g} index={i} onClick={()=>setSelected(g.id)}/>)}</div>
      }
    </div>
  );
}

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────

function Countdown() {
  const [live,setLive]=useState(()=>new Date()>=new Date("2026-06-11T01:00:00Z"));
  const [t,setT]=useState({d:0,h:0,m:0,s:0});
  useEffect(()=>{
    if(live)return;
    const target=new Date("2026-06-11T01:00:00Z");
    const tick=()=>{
      const diff=target-new Date();
      if(diff<=0){setLive(true);return;}
      setT({d:Math.floor(diff/86400000),h:Math.floor((diff%86400000)/3600000),m:Math.floor((diff%3600000)/60000),s:Math.floor((diff%60000)/1000)});
    };
    tick();const id=setInterval(tick,1000);return()=>clearInterval(id);
  },[live]);

  if(live) return (
    <div className="hero-countdown" style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
      <div style={{display:"flex",alignItems:"center",gap:"10px",background:"rgba(255,59,48,0.1)",border:"1px solid rgba(255,59,48,0.35)",borderRadius:"12px",padding:"12px 20px"}}>
        <div style={{width:"10px",height:"10px",borderRadius:"50%",background:"#FF3B30",animation:"pulse 1s infinite",flexShrink:0}}/>
        <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2rem",color:"#FF3B30",letterSpacing:"0.1em",lineHeight:1}}>LIVE NOW</span>
      </div>
      <div style={{background:"rgba(0,0,0,0.4)",border:"1px solid rgba(212,175,55,0.25)",borderRadius:"12px",padding:"12px 16px"}}>
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1rem",color:"#D4AF37",letterSpacing:"0.06em",lineHeight:1}}>FIFA WORLD CUP 2026</div>
        <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.35)",letterSpacing:"0.08em",marginTop:"3px"}}>Jun 11 – Jul 19 · 104 Matches</div>
      </div>
    </div>
  );

  return (
    <div className="hero-countdown" style={{display:"flex",gap:"8px",justifyContent:"flex-start",flexWrap:"wrap"}}>
      {[["DAYS",t.d],["HRS",t.h],["MIN",t.m],["SEC",t.s]].map(([l,v])=>(
        <div key={l} style={{textAlign:"center",minWidth:"64px"}}>
          <div style={{background:"rgba(0,0,0,0.4)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:"10px",padding:"12px 8px",fontFamily:"'Bebas Neue',cursive",fontSize:"2.4rem",color:"#D4AF37",lineHeight:1,boxShadow:"0 0 20px rgba(212,175,55,0.15)"}}>{String(v).padStart(2,"0")}</div>
          <div style={{fontSize:"0.55rem",color:"rgba(255,255,255,0.35)",letterSpacing:"0.18em",marginTop:"5px"}}>{l}</div>
        </div>
      ))}
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({setActiveNav}) {
  const [hovFix,setHovFix]=useState(null);
  const [hovFav,setHovFav]=useState(null);
  const [prediction,setPrediction]=useState(null);
  const [hovPlayer,setHovPlayer]=useState(null);
  const [trophyLoaded,setTrophyLoaded]=useState(false);
  const [trophyError,setTrophyError]=useState(false);

  return (
    <>
      {/* ── HERO — split layout with trophy ── */}
      <section className="hero-grid" style={{minHeight:"95vh",display:"grid",gridTemplateColumns:"1fr 1fr",alignItems:"center",padding:"0 5vw",position:"relative",overflow:"hidden",gap:"40px"}}>
        {/* grid bg */}
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(212,175,55,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.025) 1px,transparent 1px)",backgroundSize:"56px 56px"}}/>
        {/* glow blobs */}
        <div style={{position:"absolute",top:"10%",left:"5%",width:"500px",height:"500px",background:"radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"0",right:"0",width:"600px",height:"600px",background:"radial-gradient(circle,rgba(255,107,53,0.06) 0%,transparent 65%)",pointerEvents:"none"}}/>

        {/* LEFT — text */}
        <div className="hero-text" style={{position:"relative",zIndex:1,animation:"fadeUp 0.8s ease forwards"}}>
          <div className="hero-badge" style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(212,175,55,0.1)",border:"1px solid rgba(212,175,55,0.35)",borderRadius:"20px",padding:"6px 16px",marginBottom:"28px",fontSize:"0.72rem",color:"#D4AF37",fontWeight:600,letterSpacing:"0.1em",flexWrap:"wrap"}}>
            <div style={{width:"7px",height:"7px",background:"#D4AF37",borderRadius:"50%",animation:"pulse 1.4s infinite"}}/>
            🔴 LIVE NOW · 48 TEAMS · MATCHDAY 1 UNDERWAY
          </div>

          <h1 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"clamp(4rem,8vw,7.5rem)",lineHeight:0.88,letterSpacing:"0.02em",marginBottom:"16px",background:"linear-gradient(150deg,#FFFFFF 0%,#E8D5A3 35%,#D4AF37 60%,#FF6B35 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
            IT'S<br/>ON
          </h1>

          <p style={{fontFamily:"'Instrument Serif',serif",fontStyle:"italic",fontSize:"1.1rem",color:"rgba(255,255,255,0.45)",marginBottom:"32px",lineHeight:1.6}}>
            48 nations. 3 countries. 1 trophy.<br/>The most electric World Cup ever has begun.
          </p>

          <Countdown/>

          <div className="hero-btns" style={{display:"flex",gap:"10px",flexWrap:"wrap",marginTop:"28px"}}>
            <button className="join-btn" onClick={()=>setActiveNav("Predictions")} style={{background:"#D4AF37",color:"#060A10",border:"none",borderRadius:"10px",padding:"13px 24px",fontWeight:700,fontSize:"0.88rem",cursor:"pointer",transition:"all 0.2s",fontFamily:"'DM Sans',sans-serif"}}>
              🔮 Lock In Your Prediction
            </button>
            <button onClick={()=>setActiveNav("Groups")} style={{background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.65)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",padding:"13px 24px",fontWeight:500,fontSize:"0.88rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
              📋 View All Groups
            </button>
          </div>

          {/* Mobile trophy */}
          <div className="mobile-trophy-show" style={{display:"none",textAlign:"center",margin:"16px 0 4px"}}>
            <img src="/fifa_trophy.png" alt="FIFA Trophy" style={{width:"120px",filter:"drop-shadow(0 0 30px rgba(212,175,55,0.5))",animation:"float-trophy 4s ease-in-out infinite"}} onError={e=>e.target.style.display="none"}/>
          </div>

          {/* Opening match badge */}
          <div style={{marginTop:"28px",display:"inline-flex",alignItems:"center",gap:"10px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"12px 18px"}}>
            <span style={{fontSize:"1.3rem",animation:"float 3s infinite"}}>🇲🇽</span>
            <div>
              <div style={{fontSize:"0.6rem",color:"#FF3B30",letterSpacing:"0.15em",textTransform:"uppercase",fontWeight:700}}>🔴 LIVE · Matchday 1 · 9PM ET</div>
              <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1rem",letterSpacing:"0.05em"}}>Mexico vs South Africa · Estadio Azteca</div>
            </div>
            <span style={{fontSize:"1.3rem",animation:"float 3s infinite",animationDelay:"0.5s"}}>🇿🇦</span>
          </div>
        </div>

        {/* RIGHT — Trophy */}
        <div className="hero-trophy-col" style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeUp 1s ease 0.2s both"}}>
          {/* radial glow behind trophy */}
          <div style={{position:"absolute",width:"420px",height:"420px",borderRadius:"50%",background:"radial-gradient(circle,rgba(212,175,55,0.18) 0%,rgba(255,107,53,0.08) 45%,transparent 70%)",animation:"glow 4s ease-in-out infinite"}}/>
          {/* gold ring */}
          <div style={{position:"absolute",width:"360px",height:"360px",borderRadius:"50%",border:"1px solid rgba(212,175,55,0.12)",animation:"spin-slow 20s linear infinite"}}/>
          <div style={{position:"absolute",width:"300px",height:"300px",borderRadius:"50%",border:"1px dashed rgba(212,175,55,0.08)",animation:"spin-slow 30s linear infinite reverse"}}/>

          {trophyError ? (
            /* fallback if image fails to load */
            <div style={{width:"220px",height:"220px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9rem",animation:"float-trophy 5s ease-in-out infinite",position:"relative",zIndex:2,filter:"drop-shadow(0 0 40px rgba(212,175,55,0.5))"}}>🏆</div>
          ) : (
            <img
              src={TROPHY_IMG}
              alt="FIFA World Cup Trophy"
              onLoad={()=>setTrophyLoaded(true)}
              onError={()=>setTrophyError(true)}
              style={{
                width:"min(340px,38vw)",
                position:"relative",zIndex:2,
                filter: trophyLoaded
                  ? "drop-shadow(0 0 60px rgba(212,175,55,0.45)) drop-shadow(0 20px 40px rgba(0,0,0,0.7)) blur(0px)"
                  : "blur(12px) drop-shadow(0 0 20px rgba(212,175,55,0.2))",
                opacity: trophyLoaded ? 1 : 0.4,
                transition:"filter 0.8s ease, opacity 0.8s ease",
                animation:"float-trophy 5s ease-in-out infinite",
                display:"block",
              }}
            />
          )}

          {/* floating stats badges */}
          <div style={{position:"absolute",top:"8%",right:"2%",background:"rgba(6,10,16,0.85)",backdropFilter:"blur(12px)",border:"1px solid rgba(212,175,55,0.25)",borderRadius:"10px",padding:"10px 14px",animation:"float 4s ease-in-out infinite",animationDelay:"0.5s"}}>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.5rem",color:"#D4AF37",lineHeight:1}}>48</div>
            <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em"}}>NATIONS</div>
          </div>
          <div style={{position:"absolute",bottom:"15%",left:"2%",background:"rgba(6,10,16,0.85)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,107,53,0.25)",borderRadius:"10px",padding:"10px 14px",animation:"float 4s ease-in-out infinite",animationDelay:"1.5s"}}>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.5rem",color:"#FF6B35",lineHeight:1}}>104</div>
            <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em"}}>MATCHES</div>
          </div>
          <div style={{position:"absolute",top:"35%",right:"-2%",background:"rgba(6,10,16,0.85)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",padding:"10px 14px",animation:"float 4s ease-in-out infinite",animationDelay:"2.5s"}}>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.5rem",color:"#EEE9DF",lineHeight:1}}>16</div>
            <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em"}}>STADIUMS</div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{background:"linear-gradient(90deg,#D4AF37,#E8A020,#FF6B35,#E8A020,#D4AF37)",padding:"9px 0",overflow:"hidden"}}>
        <div style={{display:"flex",gap:"0",whiteSpace:"nowrap",animation:"ticker 25s linear infinite"}}>
          {[...Array(2)].map((_,ri)=>(
            <span key={ri} style={{display:"flex"}}>
              {["🏆 48 TEAMS","⚽ 104 MATCHES","🏟️ 16 STADIUMS","🇺🇸🇲🇽🇨🇦 3 HOST NATIONS","📅 JUNE 11 – JULY 19","🥇 ARGENTINA DEFENDING","🌟 MESSI'S 6TH WORLD CUP","⚡ MBAPPE LEADS FRANCE","🔥 BRAZIL GROUP C","🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENGLAND VS CROATIA JUN 17"].map(s=>(
                <span key={s} style={{padding:"0 28px",color:"#060A10",fontWeight:700,fontSize:"0.75rem",letterSpacing:"0.08em"}}>{s}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── STADIUM ATMOSPHERE SECTION ── */}
      <section style={{position:"relative",overflow:"hidden",margin:"0"}}>
        {/* CSS stadium — geometric pitch lines */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(160deg,#050d1a 0%,#071220 40%,#0a1a10 100%)"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(ellipse 80% 50% at 50% 60%,rgba(34,100,34,0.18) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",backgroundSize:"44px 44px",pointerEvents:"none"}}/>
        {/* centre circle */}
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"320px",height:"320px",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.05)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"20px",height:"20px",borderRadius:"50%",background:"rgba(255,255,255,0.08)",pointerEvents:"none"}}/>
        {/* halfway line */}
        <div style={{position:"absolute",top:0,bottom:0,left:"50%",width:"1px",background:"rgba(255,255,255,0.04)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#060A10 0%,transparent 20%,transparent 80%,#060A10 100%)"}}/>
        <div style={{position:"relative",zIndex:1,padding:"64px 28px",maxWidth:"1100px",margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:"0.65rem",color:"#D4AF37",letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:"12px"}}>June 11 – July 19, 2026</div>
          <h2 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"clamp(3rem,8vw,6rem)",letterSpacing:"0.03em",lineHeight:0.9,marginBottom:"24px",background:"linear-gradient(180deg,#FFFFFF,#D4AF37)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
            FEEL<br/>THE FEVER
          </h2>
          <p style={{fontFamily:"'Instrument Serif',serif",fontStyle:"italic",fontSize:"1.1rem",color:"rgba(255,255,255,0.5)",maxWidth:"480px",margin:"0 auto 40px"}}>
            USA. Canada. Mexico. Three nations. The biggest World Cup in history.
          </p>
          <div style={{display:"flex",justifyContent:"center",gap:"12px",flexWrap:"wrap"}}>
            {[["🇺🇸","USA","11 venues"],["🇲🇽","Mexico","3 venues"],["🇨🇦","Canada","2 venues"]].map(([flag,name,venues])=>(
              <div key={name} style={{background:"rgba(255,255,255,0.05)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"14px",padding:"18px 24px",minWidth:"140px"}}>
                <div style={{fontSize:"2rem",marginBottom:"6px"}}>{flag}</div>
                <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.2rem",letterSpacing:"0.06em"}}>{name}</div>
                <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.4)",marginTop:"2px"}}>{venues}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIFA FAN FESTIVAL ── */}
      <section style={{padding:"60px 28px 0",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{marginBottom:"28px"}}>
          <div style={{fontSize:"0.65rem",color:"#D4AF37",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"5px"}}>Official FIFA Event · All 16 Host Cities</div>
          <h2 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2.2rem",letterSpacing:"0.04em",marginBottom:"16px"}}>FIFA Fan Festival™</h2>
          {/* what it is */}
          <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"20px",alignItems:"center",background:"rgba(212,175,55,0.05)",border:"1px solid rgba(212,175,55,0.15)",borderRadius:"14px",padding:"20px 24px",marginBottom:"24px"}}>
            <div>
              <p style={{fontSize:"0.9rem",color:"rgba(255,255,255,0.7)",lineHeight:1.7,marginBottom:"12px"}}>
                The <strong style={{color:"#D4AF37"}}>FIFA Fan Festival™</strong> is the official free public fan zone running alongside every match day of the World Cup. Set up in the heart of each host city, it's an outdoor venue with <strong style={{color:"#EEE9DF"}}>live match screenings</strong>, concerts, food, local culture, interactive football activities, and meet-and-greet events — no match ticket required.
              </p>
              <div style={{display:"flex",gap:"20px",flexWrap:"wrap"}}>
                {[["🎟️","No ticket needed"],["📺","Live match screenings"],["🎵","Concerts & music"],["⚽","Kick-about zones"],["🍔","Food & culture"]].map(([icon,label])=>(
                  <div key={label} style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.75rem",color:"rgba(255,255,255,0.5)"}}>
                    <span>{icon}</span><span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{textAlign:"center",padding:"16px 20px",background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:"10px",minWidth:"120px"}}>
              <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2rem",color:"#22C55E",lineHeight:1}}>FREE</div>
              <div style={{fontSize:"0.62rem",color:"rgba(34,197,94,0.7)",letterSpacing:"0.12em",marginTop:"4px"}}>EVERY DAY</div>
              <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.3)",marginTop:"6px"}}>Jun 11 – Jul 19</div>
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"10px"}}>
          {[
            {city:"New York/NJ",  flag:"🇺🇸", venue:"Liberty State Park",    matches:6, final:true },
            {city:"Los Angeles",  flag:"🇺🇸", venue:"Grand Park",            matches:6, final:false},
            {city:"Dallas",       flag:"🇺🇸", venue:"Fair Park",             matches:6, final:false},
            {city:"Houston",      flag:"🇺🇸", venue:"Aramco Arena",          matches:5, final:false},
            {city:"San Francisco",flag:"🇺🇸", venue:"Justin Herman Plaza",   matches:5, final:false},
            {city:"Miami",        flag:"🇺🇸", venue:"Bayfront Park",         matches:4, final:false},
            {city:"Seattle",      flag:"🇺🇸", venue:"Seattle Center",        matches:4, final:false},
            {city:"Boston",       flag:"🇺🇸", venue:"City Hall Plaza",       matches:4, final:false},
            {city:"Philadelphia", flag:"🇺🇸", venue:"Penn's Landing",        matches:4, final:false},
            {city:"Kansas City",  flag:"🇺🇸", venue:"Crown Center",          matches:4, final:false},
            {city:"Atlanta",      flag:"🇺🇸", venue:"Centennial Park",       matches:4, final:false},
            {city:"Mexico City",  flag:"🇲🇽", venue:"Zócalo",               matches:3, final:false},
            {city:"Guadalajara",  flag:"🇲🇽", venue:"TBA",                  matches:3, final:false},
            {city:"Monterrey",    flag:"🇲🇽", venue:"TBA",                  matches:3, final:false},
            {city:"Toronto",      flag:"🇨🇦", venue:"Nathan Phillips Square",matches:3, final:false},
            {city:"Vancouver",    flag:"🇨🇦", venue:"Jack Poole Plaza",      matches:3, final:false},
          ].map((f,i)=>{
            const [hov,setHov]=useState(false);
            return (
              <div key={f.city} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                style={{
                  background:hov?"rgba(212,175,55,0.06)":"rgba(255,255,255,0.02)",
                  border:`1px solid ${f.final?"rgba(212,175,55,0.35)":hov?"rgba(212,175,55,0.2)":"rgba(255,255,255,0.07)"}`,
                  borderRadius:"12px",padding:"16px",cursor:"pointer",
                  transition:"all 0.2s",transform:hov?"translateY(-2px)":"none",
                  position:"relative",overflow:"hidden",
                }}>
                {f.final&&<div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:"linear-gradient(90deg,#D4AF37,#FF6B35)"}}/>}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"10px"}}>
                  <span style={{fontSize:"1.6rem"}}>{f.flag}</span>
                  {f.final&&<span style={{fontSize:"0.55rem",background:"rgba(212,175,55,0.15)",color:"#D4AF37",borderRadius:"4px",padding:"2px 6px",fontWeight:700,letterSpacing:"0.08em"}}>🏆 FINAL</span>}
                </div>
                <div style={{fontWeight:700,fontSize:"0.85rem",marginBottom:"3px"}}>{f.city}</div>
                <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.35)",marginBottom:"10px"}}>{f.venue}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)"}}>Matches hosted</span>
                  <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1rem",color:"#D4AF37"}}>{f.matches}</span>
                </div>
                <div style={{marginTop:"8px",fontSize:"0.6rem",color:"rgba(34,197,94,0.8)",fontWeight:600,letterSpacing:"0.06em"}}>✓ FREE ENTRY</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PLAYER WATCH ── */}
      <section style={{padding:"60px 28px 0",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{marginBottom:"24px"}}>
          <div style={{fontSize:"0.65rem",color:"#D4AF37",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"5px"}}>The names you're watching</div>
          <h2 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2.2rem",letterSpacing:"0.04em"}}>Player Watch</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"12px"}}>
          {PLAYERS.map((p,i)=>(
            <div key={p.name} onMouseEnter={()=>setHovPlayer(i)} onMouseLeave={()=>setHovPlayer(null)}
              style={{
                background:hovPlayer===i?`linear-gradient(135deg,rgba(${hexToRgb(p.accent)},0.18),rgba(${hexToRgb(p.accent)},0.06))`:"rgba(255,255,255,0.025)",
                border:`1px solid ${hovPlayer===i?p.accent+"55":"rgba(255,255,255,0.07)"}`,
                borderRadius:"16px",padding:"22px",cursor:"pointer",
                transition:"all 0.3s",transform:hovPlayer===i?"translateY(-4px)":"none",
                boxShadow:hovPlayer===i?`0 16px 40px rgba(${hexToRgb(p.accent)},0.15)`:"none",
                position:"relative",overflow:"hidden",
              }}>
              {/* accent stripe */}
              <div style={{position:"absolute",top:0,left:0,right:0,height:"3px",background:`linear-gradient(90deg,${p.accent},transparent)`,borderRadius:"16px 16px 0 0"}}/>

              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"14px"}}>
                <div style={{fontSize:"2.4rem",lineHeight:1}}>{p.flag}</div>
                <div style={{background:`rgba(${hexToRgb(p.accent)},0.15)`,border:`1px solid rgba(${hexToRgb(p.accent)},0.3)`,borderRadius:"6px",padding:"3px 8px",fontSize:"0.58rem",fontWeight:700,color:p.accent,letterSpacing:"0.08em"}}>{p.tag}</div>
              </div>

              <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.35rem",letterSpacing:"0.04em",lineHeight:1,marginBottom:"3px"}}>{p.name}</div>
              <div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.4)",marginBottom:"14px"}}>{p.country} · {p.position} · Age {p.age}</div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"14px"}}>
                <div style={{background:"rgba(255,255,255,0.04)",borderRadius:"8px",padding:"8px 10px"}}>
                  <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.4rem",color:"#D4AF37",lineHeight:1}}>{p.wcGoals}</div>
                  <div style={{fontSize:"0.58rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.08em"}}>WC GOALS</div>
                </div>
                <div style={{background:"rgba(255,255,255,0.04)",borderRadius:"8px",padding:"8px 10px"}}>
                  <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.4rem",color:"#D4AF37",lineHeight:1}}>{p.caps}</div>
                  <div style={{fontSize:"0.58rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.08em"}}>INT'L CAPS</div>
                </div>
              </div>

              <p style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",lineHeight:1.5,margin:0}}>{p.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORYLINES — editorial cards ── */}
      <section style={{padding:"60px 0 0"}}>
        <div style={{padding:"0 28px",maxWidth:"1100px",margin:"0 auto",marginBottom:"24px"}}>
          <div style={{fontSize:"0.65rem",color:"#D4AF37",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"5px"}}>What everyone's talking about</div>
          <h2 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2.2rem",letterSpacing:"0.04em"}}>The Biggest Storylines</h2>
        </div>
        {/* horizontal scroll on mobile, grid on desktop */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"12px",padding:"0 28px",maxWidth:"1100px",margin:"0 auto"}}>
          {STORYLINES.map((s,i)=>{
            const [hov,setHov]=[useState(false),(v)=>{}];
            return (
              <StoryCard key={i} s={s}/>
            );
          })}
        </div>
      </section>

      {/* ── OPENING FIXTURES ── */}
      <section style={{padding:"52px 28px 0",maxWidth:"1100px",margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"22px"}}>
          <div>
            <div style={{fontSize:"0.65rem",color:"#D4AF37",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"5px"}}>Real fixtures · confirmed</div>
            <h2 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2rem",letterSpacing:"0.04em"}}>Opening Week</h2>
          </div>
          <button onClick={()=>setActiveNav("Fixtures")} style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.3)",background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>View all →</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"4px"}}>
          {OPENING_FIXTURES.map((f,i)=>(
            <div key={i} className="fix-row" onMouseEnter={()=>setHovFix(i)} onMouseLeave={()=>setHovFix(null)}
              style={{display:"flex",alignItems:"center",gap:"12px",padding:"14px 18px",borderRadius:"10px",border:"1px solid",cursor:"pointer",borderColor:hovFix===i?"rgba(212,175,55,0.2)":"rgba(255,255,255,0.06)",background:hovFix===i?"rgba(212,175,55,0.04)":"transparent",transition:"all 0.2s"}}>
              <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.3)",minWidth:"46px",fontWeight:500}}>{f.date}</div>
              <div style={{background:"rgba(212,175,55,0.1)",borderRadius:"4px",padding:"2px 7px",fontSize:"0.62rem",color:"#D4AF37",fontWeight:700,minWidth:"52px",textAlign:"center"}}>GRP {f.group}</div>
              <div style={{flex:1,fontWeight:600,fontSize:"0.9rem"}}>{f.teams}</div>
              <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.35)"}}>📍 {f.city}</div>
              <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.45)",minWidth:"58px",textAlign:"right"}}>{f.time}</div>
              {f.hot&&<div style={{background:"rgba(255,59,48,0.15)",border:"1px solid rgba(255,59,48,0.3)",borderRadius:"4px",padding:"2px 7px",fontSize:"0.6rem",color:"#FF3B30",fontWeight:700}}>🔥 HOT</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── TITLE FAVOURITES ── */}
      <section style={{padding:"52px 28px 0",maxWidth:"1100px",margin:"0 auto"}}>
        <div style={{marginBottom:"22px"}}>
          <div style={{fontSize:"0.65rem",color:"#D4AF37",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"5px"}}>Bookmaker consensus · June 2026</div>
          <h2 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2rem",letterSpacing:"0.04em"}}>Title Favourites</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))",gap:"10px"}}>
          {FAVORITES.map((f,i)=>(
            <div key={i} className="fav-card" onMouseEnter={()=>setHovFav(i)} onMouseLeave={()=>setHovFav(null)}
              style={{background:hovFav===i?`rgba(${hexToRgb(f.color)},0.12)`:"rgba(255,255,255,0.025)",border:`1px solid ${hovFav===i?f.color+"55":"rgba(255,255,255,0.07)"}`,borderRadius:"14px",padding:"20px 16px",cursor:"pointer",transition:"all 0.3s"}}>
              <div style={{fontSize:"2.2rem",marginBottom:"10px",animation:"float 3s ease-in-out infinite",animationDelay:`${i*0.25}s`}}>{f.flag}</div>
              <div style={{fontWeight:700,fontSize:"0.9rem",marginBottom:"2px"}}>{f.name}</div>
              <div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.35)",marginBottom:"10px"}}>Group {f.group} · FIFA #{f.rank}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.35)"}}>To win</span>
                <span style={{fontSize:"0.88rem",fontWeight:700,color:"#D4AF37",fontFamily:"'Bebas Neue',cursive",letterSpacing:"0.05em"}}>{f.odds}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PREDICTION CTA ── */}
      <section style={{padding:"52px 28px 0",maxWidth:"1100px",margin:"0 auto"}}>
        <div style={{background:"linear-gradient(135deg,rgba(212,175,55,0.08),rgba(255,107,53,0.06))",border:"1px solid rgba(212,175,55,0.2)",borderRadius:"20px",padding:"44px 36px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:"24px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",right:"-20px",top:"-20px",fontSize:"9rem",opacity:0.04,pointerEvents:"none"}}>🏆</div>
          <div>
            <div style={{fontSize:"0.65rem",color:"#D4AF37",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"8px"}}>Fan Predictions — Open Now</div>
            <h2 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2.4rem",letterSpacing:"0.04em",marginBottom:"10px"}}>Who Lifts The Trophy?</h2>
            <p style={{color:"rgba(255,255,255,0.45)",fontSize:"0.9rem",maxWidth:"460px"}}>Lock in before Jun 11. Track your call through every round. Brag rights await.</p>
          </div>
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"}}>
            {FAVORITES.map(f=>(
              <button key={f.name} className="predict-btn" onClick={()=>setPrediction(f.name)} style={{background:prediction===f.name?"#D4AF37":"rgba(255,255,255,0.05)",color:prediction===f.name?"#060A10":"rgba(255,255,255,0.7)",border:`1px solid ${prediction===f.name?"#D4AF37":"rgba(255,255,255,0.12)"}`,borderRadius:"10px",padding:"10px 16px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:prediction===f.name?700:500,fontSize:"0.82rem",transition:"all 0.2s",display:"flex",alignItems:"center",gap:"6px"}}>
                {f.flag} {f.name}
              </button>
            ))}
          </div>
          {prediction&&(
            <div style={{background:"rgba(212,175,55,0.12)",border:"1px solid rgba(212,175,55,0.3)",borderRadius:"10px",padding:"12px 24px",fontSize:"0.88rem",color:"#D4AF37",fontWeight:600,animation:"fadeUp 0.3s ease"}}>
              🔒 Prediction locked: {FAVORITES.find(f=>f.name===prediction)?.flag} {prediction} to win the 2026 World Cup
            </div>
          )}
          <button className="join-btn" style={{background:"#D4AF37",color:"#060A10",border:"none",borderRadius:"10px",padding:"13px 32px",fontWeight:700,fontSize:"0.92rem",cursor:"pointer",transition:"all 0.2s",fontFamily:"'DM Sans',sans-serif"}}>
            Submit & See Fan Votes →
          </button>
        </div>
      </section>

      {/* ── GROUPS PREVIEW ── */}
      <section style={{padding:"52px 28px 0",maxWidth:"1100px",margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"22px"}}>
          <div>
            <div style={{fontSize:"0.65rem",color:"#D4AF37",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"5px"}}>Official draw confirmed</div>
            <h2 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2rem",letterSpacing:"0.04em"}}>All 12 Groups</h2>
          </div>
          <button onClick={()=>setActiveNav("Groups")} style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.3)",background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Full groups view →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:"10px"}}>
          {GROUPS.map((g,i)=>(
            <div key={i} className="group-card" onClick={()=>setActiveNav("Groups")}
              style={{background:"rgba(255,255,255,0.02)",border:"1px solid",borderColor:g.danger?"rgba(255,107,53,0.25)":"rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px",cursor:"pointer",transition:"all 0.25s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
                <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.3rem",color:"#D4AF37",letterSpacing:"0.05em"}}>Group {g.id}</div>
                {g.danger&&<div style={{fontSize:"0.55rem",color:"#FF6B35",fontWeight:700,background:"rgba(255,107,53,0.12)",padding:"2px 6px",borderRadius:"4px"}}>🔥</div>}
              </div>
              {g.teams.map((t,j)=>(
                <div key={j} style={{fontSize:"0.78rem",color:j===0?"#EEE9DF":"rgba(255,255,255,0.55)",padding:"3px 0",borderBottom:j<3?"1px solid rgba(255,255,255,0.04)":"none",fontWeight:j===0?600:400}}>{t.flag} {t.name}</div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── DEBATE / KITS ── */}
      <section style={{padding:"40px 28px 0",maxWidth:"1100px",margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",padding:"28px 24px"}}>
            <div style={{fontSize:"1.6rem",marginBottom:"12px"}}>🎙️</div>
            <div style={{fontSize:"0.65rem",color:"#D4AF37",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"6px"}}>Fan debate · 3,200+ active</div>
            <h3 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.3rem",letterSpacing:"0.04em",marginBottom:"10px"}}>Debate Rooms</h3>
            <p style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.4)",lineHeight:1.6,marginBottom:"16px"}}>Is this Messi's last shot? Will Mbappé finally deliver? Drop your take.</p>
            <button className="join-btn" onClick={()=>setActiveNav("Debate")} style={{background:"#D4AF37",color:"#060A10",border:"none",borderRadius:"8px",padding:"10px 20px",fontWeight:700,fontSize:"0.8rem",cursor:"pointer",transition:"all 0.2s",fontFamily:"'DM Sans',sans-serif"}}>Enter Debate →</button>
          </div>
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",padding:"28px 24px"}}>
            <div style={{fontSize:"1.6rem",marginBottom:"12px"}}>👕</div>
            <div style={{fontSize:"0.65rem",color:"#D4AF37",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"6px"}}>Kit culture · all 48 kits</div>
            <h3 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.3rem",letterSpacing:"0.04em",marginBottom:"10px"}}>Jersey Gallery</h3>
            <p style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.4)",lineHeight:1.6,marginBottom:"16px"}}>Rate every kit. Fans have voted Brazil home as the best of 2026.</p>
            <button onClick={()=>setActiveNav("Kits")} style={{background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.65)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"10px 20px",fontWeight:500,fontSize:"0.8rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Browse Kits →</button>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── STORY CARD (editorial style) ────────────────────────────────────────────

function StoryCard({s}) {
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:hov?`linear-gradient(135deg,rgba(${hexToRgb(s.accent)},0.12),rgba(0,0,0,0.3))`:"rgba(255,255,255,0.025)",
        border:`1px solid ${hov?s.accent+"44":"rgba(255,255,255,0.07)"}`,
        borderRadius:"14px",padding:"22px",cursor:"pointer",
        transition:"all 0.3s",transform:hov?"translateY(-3px)":"none",
        position:"relative",overflow:"hidden",
      }}>
      {/* top accent bar */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${s.accent},transparent)`,opacity:hov?1:0,transition:"opacity 0.3s"}}/>
      <div style={{display:"flex",alignItems:"flex-start",gap:"14px"}}>
        <div style={{fontSize:"2rem",lineHeight:1,flexShrink:0}}>{s.icon}</div>
        <div style={{flex:1}}>
          <div style={{background:`rgba(${hexToRgb(s.accent)},0.15)`,border:`1px solid rgba(${hexToRgb(s.accent)},0.25)`,borderRadius:"4px",padding:"2px 8px",fontSize:"0.58rem",fontWeight:700,color:s.accent,letterSpacing:"0.12em",display:"inline-block",marginBottom:"8px"}}>{s.tag}</div>
          <div style={{fontSize:"0.9rem",fontWeight:500,lineHeight:1.5,color:"rgba(255,255,255,0.85)",marginBottom:"14px"}}>{s.headline}</div>
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
              <span style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.3)"}}>HEAT INDEX</span>
              <span style={{fontSize:"0.6rem",color:s.accent,fontWeight:700}}>{s.heat}%</span>
            </div>
            <HeatBar v={s.heat} color={s.accent}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FIXTURES — TIMEZONES & BROADCASTERS ─────────────────────────────────────

const TIMEZONES = {
  ET:   { label:"ET · New York",    offset:0,    flag:"🇺🇸" },
  PT:   { label:"PT · Los Angeles", offset:-3,   flag:"🇺🇸" },
  GMT:  { label:"GMT · London",     offset:4,    flag:"🇬🇧" },
  CET:  { label:"CET · Paris",      offset:6,    flag:"🇪🇺" },
  IST:  { label:"IST · Mumbai",     offset:9.5,  flag:"🇮🇳" },
  AEST: { label:"AEST · Sydney",    offset:14,   flag:"🇦🇺" },
};

const BROADCASTERS = {
  ET:   [{ name:"Fox Sports", tag:"English" }, { name:"Telemundo",  tag:"Español"  }, { name:"FS1/FS2",    tag:"Cable"    }],
  PT:   [{ name:"Fox Sports", tag:"English" }, { name:"Telemundo",  tag:"Español"  }, { name:"FS1/FS2",    tag:"Cable"    }],
  GMT:  [{ name:"BBC",        tag:"Free"    }, { name:"ITV",        tag:"Free"     }, { name:"TNT Sports", tag:"Cable"    }],
  CET:  [{ name:"ARD/ZDF",    tag:"🇩🇪 DE"  }, { name:"TF1",        tag:"🇫🇷 FR"   }, { name:"DAZN",       tag:"Streaming"}],
  IST:  [{ name:"Sports18",   tag:"TV"      }, { name:"JioCinema",  tag:"Free App" }, { name:"DD Sports",  tag:"Free TV"  }],
  AEST: [{ name:"SBS",        tag:"Free"    }, { name:"Optus Sport",tag:"Streaming"}, { name:"Paramount+", tag:"Streaming"}],
};

function convertTime(timeStr, offsetHours) {
  if(offsetHours === 0) return timeStr.replace(" ET","");
  const m = timeStr.match(/(\d+)(AM|PM)/i);
  if(!m) return timeStr;
  let h = parseInt(m[1]);
  const ap = m[2].toUpperCase();
  if(ap==="PM" && h!==12) h+=12;
  if(ap==="AM" && h===12) h=0;
  const totalMins = h*60 + Math.round((offsetHours%1)*60);
  let newH = Math.floor(h + offsetHours);
  let newM = Math.round((offsetHours%1)*60);
  if(newM<0){newM+=60;newH--;}
  let dayTag="";
  if(newH>=24){newH-=24;dayTag=" +1d";}
  if(newH<0){newH+=24;dayTag=" -1d";}
  const newAp = newH>=12?"PM":"AM";
  const disp = newH%12||12;
  const minStr = newM>0?`:${String(newM).padStart(2,"0")}`:"";
  return `${disp}${minStr}${newAp}${dayTag}`;
}

// finds the next upcoming match across all group fixtures
function getNextMatch() {
  const now = new Date();
  const year = 2026;
  const monthMap={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
  const all = GROUPS.flatMap(g=>g.fixtures.map(f=>({...f,groupId:g.id,
    homeTeam:g.teams.find(t=>t.name===f.home)||{flag:"",name:f.home,rank:"?"},
    awayTeam:g.teams.find(t=>t.name===f.away)||{flag:"",name:f.away,rank:"?"},
    danger:g.danger,
  })));
  const parsed = all.map(f=>{
    const [mon,day]=f.date.split(" ");
    const [timeNum,ampm]=f.time.replace(" ET","").match(/(\d+)(AM|PM)/i).slice(1);
    let h=parseInt(timeNum);
    if(ampm.toUpperCase()==="PM"&&h!==12)h+=12;
    if(ampm.toUpperCase()==="AM"&&h===12)h=0;
    return {...f, ts:new Date(year,monthMap[mon],parseInt(day),h,0,0)};
  }).filter(f=>f.ts>now).sort((a,b)=>a.ts-b.ts);
  return parsed[0]||null;
}

function NextMatchCountdown({target}) {
  const [t,setT]=useState({h:0,m:0,s:0});
  useEffect(()=>{
    const tick=()=>{
      const diff=target-new Date();
      if(diff<=0){setT({h:0,m:0,s:0});return;}
      const d=Math.floor(diff/86400000);
      const h=Math.floor((diff%86400000)/3600000);
      const m=Math.floor((diff%3600000)/60000);
      const s=Math.floor((diff%60000)/1000);
      setT(d>0?{label:`${d}d ${h}h`,m,s}:{h,m,s});
    };
    tick();const id=setInterval(tick,1000);return()=>clearInterval(id);
  },[target]);
  return (
    <div style={{display:"flex",gap:"6px",justifyContent:"center",alignItems:"center"}}>
      {t.label
        ? <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.6rem",color:"#D4AF37",letterSpacing:"0.05em"}}>{t.label} {String(t.m).padStart(2,"0")}m</span>
        : [["H",t.h],["M",t.m],["S",t.s]].map(([l,v])=>(
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.6rem",color:"#D4AF37",lineHeight:1,background:"rgba(0,0,0,0.3)",borderRadius:"6px",padding:"4px 8px",minWidth:"44px"}}>{String(v).padStart(2,"0")}</div>
            <div style={{fontSize:"0.5rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.12em",marginTop:"2px"}}>{l}</div>
          </div>
        ))
      }
    </div>
  );
}

// ─── FIXTURES PAGE ───────────────────────────────────────────────────────────

const KNOCKOUT_FIXTURES = [
  // Round of 32
  ...[...Array(16)].map((_,i)=>({round:"R32",match:i+1,date:["Jun 29","Jun 29","Jun 30","Jun 30","Jul 1","Jul 1","Jul 2","Jul 2","Jul 3","Jul 3","Jul 3","Jul 3","Jul 3","Jul 3","Jul 3","Jul 3"][i],time:["3PM ET","9PM ET","3PM ET","9PM ET","3PM ET","9PM ET","3PM ET","9PM ET","3PM ET","6PM ET","3PM ET","6PM ET","3PM ET","6PM ET","3PM ET","6PM ET"][i],home:"TBD",away:"TBD",city:"TBD",venue:"TBD",hot:false})),
  // Round of 16
  ...[...Array(8)].map((_,i)=>({round:"R16",match:i+1,date:["Jul 5","Jul 5","Jul 6","Jul 6","Jul 7","Jul 7","Jul 8","Jul 9"][i],time:["3PM ET","9PM ET","3PM ET","9PM ET","3PM ET","9PM ET","6PM ET","6PM ET"][i],home:"TBD",away:"TBD",city:"TBD",venue:"TBD",hot:false})),
  // Quarter-finals
  {round:"QF",match:1,date:"Jul 11",time:"3PM ET",home:"TBD",away:"TBD",city:"TBD",venue:"TBD",hot:true},
  {round:"QF",match:2,date:"Jul 11",time:"9PM ET",home:"TBD",away:"TBD",city:"TBD",venue:"TBD",hot:true},
  {round:"QF",match:3,date:"Jul 12",time:"3PM ET",home:"TBD",away:"TBD",city:"TBD",venue:"TBD",hot:true},
  {round:"QF",match:4,date:"Jul 13",time:"9PM ET",home:"TBD",away:"TBD",city:"TBD",venue:"TBD",hot:true},
  // Semi-finals
  {round:"SF",match:1,date:"Jul 15",time:"9PM ET",home:"TBD",away:"TBD",city:"New York/NJ",venue:"MetLife Stadium",hot:true},
  {round:"SF",match:2,date:"Jul 16",time:"9PM ET",home:"TBD",away:"TBD",city:"Los Angeles",venue:"SoFi Stadium",hot:true},
  // Third place
  {round:"3RD",match:1,date:"Jul 18",time:"6PM ET",home:"TBD",away:"TBD",city:"Miami",venue:"Hard Rock Stadium",hot:false},
  // Final
  {round:"FINAL",match:1,date:"Jul 19",time:"6PM ET",home:"TBD",away:"TBD",city:"New York/NJ",venue:"MetLife Stadium",hot:true},
];

const ROUND_LABELS = {R32:"Round of 32",R16:"Round of 16",QF:"Quarter-Finals",SF:"Semi-Finals","3RD":"Third Place","FINAL":"The Final"};
const ROUND_COLORS = {R32:"rgba(255,255,255,0.3)",R16:"#A78BFA",QF:"#38BDF8",SF:"#FB923C",FINAL:"#D4AF37","3RD":"rgba(255,255,255,0.3)"};

function FixturesPage() {
  const groupFixtures = GROUPS.flatMap(g =>
    g.fixtures.map(f => ({...f, groupId:g.id, danger:g.danger, stage:"group",
      homeTeam: g.teams.find(t=>t.name===f.home) || {flag:"",name:f.home,rank:"?"},
      awayTeam: g.teams.find(t=>t.name===f.away) || {flag:"",name:f.away,rank:"?"},
    }))
  );

  const allDates = [...new Set(groupFixtures.map(f=>f.date))].sort((a,b)=>{
    const months={Jun:6,Jul:7};
    const [am,ad]=a.split(" "); const [bm,bd]=b.split(" ");
    return (months[am]*100+parseInt(ad))-(months[bm]*100+parseInt(bd));
  });

  const [stage, setStage]             = useState("group");
  const [groupFilter, setGroupFilter] = useState("ALL");
  const [dateFilter, setDateFilter]   = useState("ALL");
  const [search, setSearch]           = useState("");
  const [knockRound, setKnockRound]   = useState("R32");
  const [tz, setTz]                   = useState("ET");

  const nextMatch = getNextMatch();

  // filtered group fixtures
  const visibleGroup = groupFixtures.filter(f => {
    if(groupFilter!=="ALL" && f.groupId!==groupFilter) return false;
    if(dateFilter!=="ALL" && f.date!==dateFilter) return false;
    if(search && !f.home.toLowerCase().includes(search.toLowerCase()) && !f.away.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // group by date for display
  const byDate = visibleGroup.reduce((acc,f)=>{
    acc[f.date] = acc[f.date]||[];
    acc[f.date].push(f);
    return acc;
  },{});

  const visibleKnock = KNOCKOUT_FIXTURES.filter(f=>f.round===knockRound);

  return (
    <div style={{padding:"40px 28px 60px",maxWidth:"1100px",margin:"0 auto"}}>

      {/* ── HEADER ── */}
      <div style={{marginBottom:"28px",animation:"slideUp 0.5s ease both"}}>
        <div style={{fontSize:"0.62rem",color:"#D4AF37",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:"6px"}}>Jun 11 – Jul 19 · 104 Matches · 16 Venues</div>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}}>
          <h1 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"clamp(2.4rem,6vw,4rem)",letterSpacing:"0.04em",lineHeight:1,background:"linear-gradient(120deg,#fff 0%,#E8D5A3 40%,#D4AF37 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Full Schedule</h1>
          {/* search */}
          <input
            placeholder="Search team..."
            value={search} onChange={e=>setSearch(e.target.value)}
            style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"8px 14px",color:"#EEE9DF",fontSize:"0.8rem",fontFamily:"'DM Sans',sans-serif",outline:"none",width:"180px"}}
          />
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div style={{display:"flex",gap:"20px",marginBottom:"24px",flexWrap:"wrap"}}>
        {[["104","Total Matches"],["72","Group Stage"],["32","Knockout"],["16","Venues"],["Jun 11","First Kick"],["Jul 19","The Final"]].map(([v,l],i)=>(
          <div key={l} style={{textAlign:"center",animation:`slideUp 0.4s ease ${0.1+i*0.07}s both`}}>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.4rem",color:"#D4AF37",lineHeight:1}}>{v}</div>
            <div style={{fontSize:"0.58rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.12em",textTransform:"uppercase",marginTop:"2px"}}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── NEXT MATCH BANNER ── */}
      {nextMatch && (
        <div style={{marginBottom:"28px",background:"linear-gradient(135deg,rgba(212,175,55,0.1),rgba(255,107,53,0.06))",border:"1px solid rgba(212,175,55,0.25)",borderRadius:"16px",padding:"20px 24px",position:"relative",overflow:"hidden",animation:"scaleIn 0.5s ease 0.2s both"}}>
          <div style={{position:"absolute",right:"-10px",top:"-10px",fontSize:"7rem",opacity:0.04,pointerEvents:"none"}}>⚽</div>
          <div style={{fontSize:"0.6rem",color:"#D4AF37",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"12px"}}>⚡ Next Match Up</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",alignItems:"center",gap:"16px",marginBottom:"16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <span style={{fontSize:"2.2rem"}}>{nextMatch.homeTeam.flag}</span>
              <div>
                <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.4rem",letterSpacing:"0.04em"}}>{nextMatch.home}</div>
                <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)"}}>FIFA #{nextMatch.homeTeam.rank}</div>
              </div>
            </div>
            <div style={{textAlign:"center"}}>
              <NextMatchCountdown target={nextMatch.ts}/>
              <div style={{fontSize:"0.7rem",color:"#D4AF37",fontWeight:600,marginTop:"4px"}}>{convertTime(nextMatch.time, TIMEZONES[tz].offset)} {tz}</div>
              <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.35)"}}>{nextMatch.date} · Grp {nextMatch.groupId}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"10px",justifyContent:"flex-end"}}>
              <div style={{textAlign:"right"}}>
                <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.4rem",letterSpacing:"0.04em"}}>{nextMatch.away}</div>
                <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)"}}>FIFA #{nextMatch.awayTeam.rank}</div>
              </div>
              <span style={{fontSize:"2.2rem"}}>{nextMatch.awayTeam.flag}</span>
            </div>
          </div>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap",borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:"12px",alignItems:"center"}}>
            <span style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.4)"}}>📍 {nextMatch.city} · {nextMatch.venue}</span>
            <div style={{display:"flex",gap:"6px",marginLeft:"auto",flexWrap:"wrap"}}>
              {BROADCASTERS[tz].map(b=>(
                <span key={b.name} style={{fontSize:"0.65rem",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"6px",padding:"3px 9px",color:"rgba(255,255,255,0.6)"}}>
                  📺 {b.name} <span style={{color:"rgba(255,255,255,0.3)"}}>{b.tag}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TIMEZONE TOGGLE ── */}
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"20px",flexWrap:"wrap"}}>
        <span style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",textTransform:"uppercase"}}>🌍 Timezone:</span>
        {Object.entries(TIMEZONES).map(([key,val])=>(
          <button key={key} onClick={()=>setTz(key)} style={{
            background:tz===key?"rgba(212,175,55,0.15)":"transparent",
            color:tz===key?"#D4AF37":"rgba(255,255,255,0.35)",
            border:`1px solid ${tz===key?"rgba(212,175,55,0.4)":"rgba(255,255,255,0.08)"}`,
            borderRadius:"6px",padding:"4px 10px",cursor:"pointer",
            fontFamily:"'DM Sans',sans-serif",fontSize:"0.72rem",fontWeight:tz===key?600:400,
            transition:"all 0.15s",display:"flex",alignItems:"center",gap:"4px",
          }}>{val.flag} {key}</button>
        ))}
      </div>

      {/* ── STAGE TOGGLE ── */}
      <div style={{display:"flex",gap:"6px",marginBottom:"20px"}}>
        {[["group","⚽ Group Stage"],["knockout","🏆 Knockout Rounds"]].map(([v,l])=>(
          <button key={v} onClick={()=>{setStage(v);setGroupFilter("ALL");setDateFilter("ALL");}} style={{
            background:stage===v?"#D4AF37":"rgba(255,255,255,0.05)",
            color:stage===v?"#060A10":"rgba(255,255,255,0.5)",
            border:"none",borderRadius:"8px",padding:"9px 18px",
            fontSize:"0.82rem",fontWeight:600,cursor:"pointer",
            fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s",
          }}>{l}</button>
        ))}
      </div>

      {stage==="group" ? (
        <>
          {/* ── GROUP FILTER TABS ── */}
          <div style={{display:"flex",gap:"4px",marginBottom:"12px",flexWrap:"wrap"}}>
            <button onClick={()=>setGroupFilter("ALL")} style={{background:groupFilter==="ALL"?"#D4AF37":"rgba(255,255,255,0.04)",color:groupFilter==="ALL"?"#060A10":"rgba(255,255,255,0.45)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"6px",padding:"5px 12px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.75rem",fontWeight:600,transition:"all 0.15s"}}>All Groups</button>
            {GROUPS.map(g=>(
              <button key={g.id} onClick={()=>{setGroupFilter(g.id);setDateFilter("ALL");}} style={{
                background:groupFilter===g.id?"#D4AF37":"rgba(255,255,255,0.04)",
                color:groupFilter===g.id?"#060A10":g.danger?"#FF6B35":"rgba(255,255,255,0.45)",
                border:`1px solid ${g.danger?"rgba(255,107,53,0.25)":"rgba(255,255,255,0.08)"}`,
                borderRadius:"6px",padding:"5px 10px",cursor:"pointer",
                fontFamily:"'Bebas Neue',cursive",fontSize:"0.85rem",transition:"all 0.15s",
              }}>Grp {g.id}</button>
            ))}
          </div>

          {/* ── DATE FILTER (when no group selected) ── */}
          {groupFilter==="ALL" && (
            <div style={{display:"flex",gap:"4px",marginBottom:"20px",flexWrap:"wrap"}}>
              <button onClick={()=>setDateFilter("ALL")} style={{background:dateFilter==="ALL"?"rgba(212,175,55,0.15)":"transparent",color:dateFilter==="ALL"?"#D4AF37":"rgba(255,255,255,0.3)",border:`1px solid ${dateFilter==="ALL"?"rgba(212,175,55,0.4)":"rgba(255,255,255,0.06)"}`,borderRadius:"6px",padding:"4px 10px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.7rem",transition:"all 0.15s"}}>All Dates</button>
              {allDates.map(d=>(
                <button key={d} onClick={()=>setDateFilter(d)} style={{
                  background:dateFilter===d?"rgba(212,175,55,0.15)":"transparent",
                  color:dateFilter===d?"#D4AF37":"rgba(255,255,255,0.3)",
                  border:`1px solid ${dateFilter===d?"rgba(212,175,55,0.4)":"rgba(255,255,255,0.06)"}`,
                  borderRadius:"6px",padding:"4px 10px",cursor:"pointer",
                  fontFamily:"'DM Sans',sans-serif",fontSize:"0.7rem",transition:"all 0.15s",
                }}>{d}</button>
              ))}
            </div>
          )}

          {/* ── MATCH LIST ── */}
          {visibleGroup.length===0
            ? <div style={{textAlign:"center",padding:"48px",color:"rgba(255,255,255,0.3)"}}>No matches found</div>
            : Object.entries(byDate).sort(([a],[b])=>{
                const months={Jun:6,Jul:7};
                const [am,ad]=a.split(" ");const [bm,bd]=b.split(" ");
                return (months[am]*100+parseInt(ad))-(months[bm]*100+parseInt(bd));
              }).map(([date,matches])=>(
              <div key={date} style={{marginBottom:"28px"}}>
                {/* date header */}
                <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}}>
                  <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1rem",color:"#D4AF37",letterSpacing:"0.08em"}}>{date}</div>
                  <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.06)"}}/>
                  <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.25)"}}>{matches.length} match{matches.length>1?"es":""}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                  {matches.map((f,i)=><MatchCard key={i} f={f} isGroup tz={tz}/>)}
                </div>
              </div>
            ))
          }
        </>
      ) : (
        <>
          {/* ── KNOCKOUT ROUND TABS ── */}
          <div style={{display:"flex",gap:"6px",marginBottom:"24px",flexWrap:"wrap"}}>
            {Object.entries(ROUND_LABELS).map(([k,label])=>(
              <button key={k} onClick={()=>setKnockRound(k)} style={{
                background:knockRound===k?ROUND_COLORS[k]:"rgba(255,255,255,0.04)",
                color:knockRound===k?(k==="FINAL"?"#060A10":"#fff"):"rgba(255,255,255,0.45)",
                border:`1px solid ${knockRound===k?ROUND_COLORS[k]:"rgba(255,255,255,0.08)"}`,
                borderRadius:"8px",padding:"7px 14px",cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif",fontSize:"0.78rem",fontWeight:600,
                transition:"all 0.2s",
              }}>{label}</button>
            ))}
          </div>

          {/* knockout round header */}
          <div style={{marginBottom:"20px",padding:"16px 20px",background:"rgba(255,255,255,0.02)",border:`1px solid ${ROUND_COLORS[knockRound]}22`,borderRadius:"12px",borderLeft:`3px solid ${ROUND_COLORS[knockRound]}`}}>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.4rem",color:ROUND_COLORS[knockRound],letterSpacing:"0.06em"}}>{ROUND_LABELS[knockRound]}</div>
            <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.35)",marginTop:"3px"}}>
              {knockRound==="R32"&&"16 matches · Jun 29 – Jul 3 · Teams determined by group standings"}
              {knockRound==="R16"&&"8 matches · Jul 5 – Jul 9 · Top 32 battle it out"}
              {knockRound==="QF"&&"4 matches · Jul 11 – Jul 13 · Last 8 standing"}
              {knockRound==="SF"&&"2 matches · Jul 15 – Jul 16 · Four nations, two spots"}
              {knockRound==="3RD"&&"1 match · Jul 18 · Battle for bronze"}
              {knockRound==="FINAL"&&"1 match · Jul 19 · MetLife Stadium, New York/NJ · The biggest night in football"}
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            {visibleKnock.map((f,i)=><MatchCard key={i} f={f} isGroup={false} tz={tz}/>)}
          </div>
        </>
      )}
    </div>
  );
}

function MatchCard({f, isGroup, tz="ET"}) {
  const [hov,setHov]=useState(false);
  const [showWtw,setShowWtw]=useState(false);
  const isTBD = f.home==="TBD";
  const roundColor = ROUND_COLORS[f.round] || "rgba(255,255,255,0.3)";
  const displayTime = convertTime(f.time, TIMEZONES[tz]?.offset||0);
  const broadcasters = BROADCASTERS[tz]||BROADCASTERS.ET;

  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        display:"grid",gridTemplateColumns:"1fr auto 1fr",alignItems:"center",
        gap:"16px",padding:"16px 20px",borderRadius:"12px",
        border:`1px solid ${hov?"rgba(212,175,55,0.25)":"rgba(255,255,255,0.07)"}`,
        background:hov?"rgba(212,175,55,0.03)":"rgba(255,255,255,0.015)",
        transition:"all 0.2s",cursor:"pointer",position:"relative",overflow:"hidden",
      }}>

      {/* left accent for hot matches */}
      {f.hot && <div style={{position:"absolute",left:0,top:0,bottom:0,width:"3px",background:"linear-gradient(180deg,#FF6B35,#D4AF37)"}}/>}

      {/* HOME TEAM */}
      <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
        {isGroup && f.homeTeam && <span style={{fontSize:"1.4rem"}}>{f.homeTeam.flag}</span>}
        {!isGroup && <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.7rem",color:"rgba(255,255,255,0.3)",fontWeight:700}}>?</div>}
        <div>
          <div style={{fontWeight:600,fontSize:"0.92rem",color:isTBD?"rgba(255,255,255,0.3)":"#EEE9DF"}}>{f.home}</div>
          {isGroup && f.homeTeam && <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.25)"}}>FIFA #{f.homeTeam.rank}</div>}
        </div>
      </div>

      {/* CENTER — time + badges */}
      <div style={{textAlign:"center",minWidth:"120px"}}>
        <div style={{display:"flex",gap:"4px",justifyContent:"center",marginBottom:"6px",flexWrap:"wrap"}}>
          {isGroup && (
            <span style={{fontSize:"0.58rem",background:f.danger?"rgba(255,107,53,0.12)":"rgba(212,175,55,0.1)",color:f.danger?"#FF6B35":"#D4AF37",border:`1px solid ${f.danger?"rgba(255,107,53,0.25)":"rgba(212,175,55,0.2)"}`,borderRadius:"4px",padding:"2px 6px",fontWeight:700,letterSpacing:"0.08em"}}>
              GRP {f.groupId}{f.danger?" 🔥":""}
            </span>
          )}
          {!isGroup && (
            <span style={{fontSize:"0.58rem",background:`rgba(${hexToRgb(roundColor)},0.1)`,color:roundColor,border:`1px solid rgba(${hexToRgb(roundColor)},0.25)`,borderRadius:"4px",padding:"2px 6px",fontWeight:700,letterSpacing:"0.06em"}}>
              {ROUND_LABELS[f.round]||f.round}
            </span>
          )}
          {f.hot && <span style={{fontSize:"0.58rem",background:"rgba(255,59,48,0.12)",color:"#FF3B30",border:"1px solid rgba(255,59,48,0.25)",borderRadius:"4px",padding:"2px 6px",fontWeight:700}}>🔥 HOT</span>}
        </div>
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.3rem",color:"rgba(255,255,255,0.2)",letterSpacing:"0.1em"}}>VS</div>
        <div style={{fontSize:"0.72rem",color:"#D4AF37",fontWeight:600,marginTop:"4px"}}>{displayTime} <span style={{fontSize:"0.58rem",opacity:0.6}}>{tz}</span></div>
        <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.25)",marginTop:"2px"}}>{f.date}</div>
      </div>

      {/* AWAY TEAM */}
      <div style={{display:"flex",alignItems:"center",gap:"10px",justifyContent:"flex-end",textAlign:"right"}}>
        <div>
          <div style={{fontWeight:600,fontSize:"0.92rem",color:isTBD?"rgba(255,255,255,0.3)":"#EEE9DF"}}>{f.away}</div>
          {isGroup && f.awayTeam && <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.25)"}}>FIFA #{f.awayTeam.rank}</div>}
        </div>
        {isGroup && f.awayTeam && <span style={{fontSize:"1.4rem"}}>{f.awayTeam.flag}</span>}
        {!isGroup && <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.7rem",color:"rgba(255,255,255,0.3)",fontWeight:700}}>?</div>}
      </div>

      {/* venue + WTW footer */}
      <div style={{gridColumn:"1/-1",borderTop:"1px solid rgba(255,255,255,0.04)",paddingTop:"8px",display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
        <span style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.25)"}}>📍 {f.city}</span>
        {f.venue && f.venue!=="TBD" && <span style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.2)"}}>{f.venue}</span>}
        {isGroup && <span style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.2)"}}>MD{f.md}</span>}
        {f.confirmed && <span style={{fontSize:"0.6rem",color:"rgba(34,197,94,0.7)",fontWeight:600}}>✓</span>}
        {/* Where to Watch toggle */}
        <button onClick={e=>{e.stopPropagation();setShowWtw(v=>!v);}} style={{marginLeft:"auto",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"5px",padding:"3px 9px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.62rem",color:"rgba(255,255,255,0.45)",transition:"all 0.15s"}}>
          📺 Where to Watch {showWtw?"▲":"▼"}
        </button>
      </div>
      {showWtw && (
        <div style={{gridColumn:"1/-1",background:"rgba(255,255,255,0.02)",borderRadius:"8px",padding:"10px 14px",display:"flex",gap:"8px",flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.3)",marginRight:"4px"}}>{TIMEZONES[tz]?.flag} {TIMEZONES[tz]?.label}:</span>
          {broadcasters.map(b=>(
            <span key={b.name} style={{background:"rgba(212,175,55,0.08)",border:"1px solid rgba(212,175,55,0.15)",borderRadius:"6px",padding:"4px 10px",fontSize:"0.68rem",color:"rgba(255,255,255,0.7)",display:"flex",alignItems:"center",gap:"5px"}}>
              <span style={{fontWeight:600}}>{b.name}</span>
              <span style={{fontSize:"0.58rem",color:"rgba(255,255,255,0.3)"}}>{b.tag}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PREDICTIONS PAGE ────────────────────────────────────────────────────────

const GOLDEN_BOOT = [
  {name:"Kylian Mbappé",    flag:"🇫🇷",team:"France",   accent:"#003189",pct:31},
  {name:"Lionel Messi",     flag:"🇦🇷",team:"Argentina",accent:"#75AADB",pct:28},
  {name:"Cristiano Ronaldo",flag:"🇵🇹",team:"Portugal", accent:"#006600",pct:12},
  {name:"Erling Haaland",   flag:"🇳🇴",team:"Norway",   accent:"#EF3340",pct:10},
  {name:"Harry Kane",       flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",team:"England",  accent:"#CF081F",pct:8 },
  {name:"Vinicius Jr",      flag:"🇧🇷",team:"Brazil",   accent:"#009C3B",pct:7 },
  {name:"Lamine Yamal",     flag:"🇪🇸",team:"Spain",    accent:"#AA151B",pct:4 },
];

const CHAMPION_PCT = {Argentina:28,France:22,Brazil:15,Spain:12,England:10,Portugal:8};

// All 48 teams flat list for extended champion picker
const ALL_TEAMS = GROUPS.flatMap(g=>g.teams.map(t=>({...t,groupId:g.id})));

function PredictionsPage() {
  const [champion,   setChampion]   = useState(null);
  const [goldenBoot, setGoldenBoot] = useState(null);
  const [groupPicks, setGroupPicks] = useState({});
  const [finalist,   setFinalist]   = useState(null);
  const [locked,     setLocked]     = useState(false);
  const [showAll,    setShowAll]    = useState(false);
  const [submitted,  setSubmitted]  = useState(false);

  // persist to localStorage
  useEffect(()=>{
    try {
      const s = localStorage.getItem("golazo_preds");
      if(s){ const p=JSON.parse(s); setChampion(p.champion||null); setGoldenBoot(p.goldenBoot||null); setGroupPicks(p.groupPicks||{}); setFinalist(p.finalist||null); setLocked(p.locked||false); setSubmitted(p.submitted||false); }
    } catch(e){}
  },[]);

  useEffect(()=>{
    try { localStorage.setItem("golazo_preds", JSON.stringify({champion,goldenBoot,groupPicks,finalist,locked,submitted})); } catch(e){}
  },[champion,goldenBoot,groupPicks,finalist,locked,submitted]);

  const picksDone  = [champion, goldenBoot].filter(Boolean).length + Object.keys(groupPicks).length;
  const picksTotal = 2 + 12; // champion + golden boot + 12 groups
  const pct        = Math.round((picksDone/picksTotal)*100);
  const canSubmit  = champion && goldenBoot;

  const handleLock = () => { setLocked(true); setSubmitted(true); };
  const handleEdit = () => { setLocked(false); setSubmitted(false); };

  return (
    <div style={{padding:"40px 28px 60px",maxWidth:"1100px",margin:"0 auto"}}>

      {/* ── HEADER ── */}
      <div style={{marginBottom:"32px",animation:"slideUp 0.5s ease both"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
          <div style={{width:"8px",height:"8px",borderRadius:"50%",background:locked?"#22C55E":"#FF6B35",animation:"pulseDot 1.5s ease infinite"}}/>
          <div style={{fontSize:"0.62rem",color:"#D4AF37",letterSpacing:"0.22em",textTransform:"uppercase"}}>
            {locked ? "🔒 Predictions Locked" : "⏳ Lock In Before Jun 11 · 9PM ET"}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}}>
          <h1 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"clamp(2.4rem,6vw,4rem)",letterSpacing:"0.04em",lineHeight:1,background:"linear-gradient(120deg,#fff 0%,#E8D5A3 40%,#D4AF37 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
            Your Predictions
          </h1>
          {submitted && (
            <button onClick={handleEdit} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"8px",padding:"8px 16px",color:"rgba(255,255,255,0.5)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.78rem"}}>
              ✏️ Edit Picks
            </button>
          )}
        </div>

        {/* progress bar */}
        <div style={{marginTop:"16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
            <span style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.4)"}}>{picksDone} of {picksTotal} predictions made</span>
            <span style={{fontSize:"0.68rem",color:"#D4AF37",fontWeight:600}}>{pct}%</span>
          </div>
          <div style={{background:"rgba(255,255,255,0.06)",borderRadius:"4px",height:"4px",overflow:"hidden"}}>
            <div style={{width:`${pct}%`,height:"100%",background:"linear-gradient(90deg,#D4AF37,#FF6B35)",borderRadius:"4px",transition:"width 0.4s ease"}}/>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1 — CHAMPION
      ══════════════════════════════════════════ */}
      <PredSection
        number="01" title="Who Lifts The Trophy?"
        subtitle="Pick the 2026 World Cup Champion"
        done={!!champion} locked={locked}
      >
        {/* top 6 favourites */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:"10px",marginBottom:"12px"}}>
          {FAVORITES.map((f,fi)=>{
            const sel = champion===f.name;
            const cpct = CHAMPION_PCT[f.name]||3;
            return (
              <TeamPickCard
                key={f.name} flag={f.flag} name={f.name}
                sub={`${f.odds} · Grp ${f.group}`}
                color={f.color} pct={cpct} selected={sel} locked={locked}
                index={fi}
                onClick={()=>!locked&&setChampion(f.name)}
              />
            );
          })}
        </div>
        {/* show all 48 toggle */}
        {!locked && (
          <button onClick={()=>setShowAll(v=>!v)} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:"8px",padding:"8px 16px",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.75rem",width:"100%",marginBottom: showAll?"12px":"0"}}>
            {showAll?"▲ Show Top Picks Only":"▼ Pick Any of 48 Teams"}
          </button>
        )}
        {showAll && !locked && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:"6px"}}>
            {ALL_TEAMS.filter(t=>!FAVORITES.find(f=>f.name===t.name)).map(t=>{
              const sel=champion===t.name;
              return (
                <button key={t.name} onClick={()=>setChampion(t.name)} style={{
                  background:sel?"rgba(212,175,55,0.15)":"rgba(255,255,255,0.025)",
                  border:`1px solid ${sel?"rgba(212,175,55,0.5)":"rgba(255,255,255,0.07)"}`,
                  borderRadius:"8px",padding:"8px 10px",cursor:"pointer",
                  display:"flex",alignItems:"center",gap:"7px",
                  color:sel?"#D4AF37":"rgba(255,255,255,0.6)",
                  fontFamily:"'DM Sans',sans-serif",fontSize:"0.78rem",fontWeight:sel?600:400,
                  transition:"all 0.15s",
                }}>
                  <span style={{fontSize:"1rem"}}>{t.flag}</span>{t.name}
                </button>
              );
            })}
          </div>
        )}
      </PredSection>

      {/* ══════════════════════════════════════════
          SECTION 2 — GOLDEN BOOT
      ══════════════════════════════════════════ */}
      <PredSection
        number="02" title="Golden Boot Winner"
        subtitle="Top scorer of the tournament"
        done={!!goldenBoot} locked={locked}
      >
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:"10px"}}>
          {GOLDEN_BOOT.map((p,pi)=>{
            const sel=goldenBoot===p.name;
            return (
              <TeamPickCard
                key={p.name} flag={p.flag} name={p.name}
                sub={p.team} color={p.accent} pct={p.pct}
                selected={sel} locked={locked} index={pi}
                onClick={()=>!locked&&setGoldenBoot(p.name)}
              />
            );
          })}
        </div>
      </PredSection>

      {/* ══════════════════════════════════════════
          SECTION 3 — GROUP WINNERS
      ══════════════════════════════════════════ */}
      <PredSection
        number="03" title="Group Winners"
        subtitle={`Pick the winner of each group — ${Object.keys(groupPicks).length}/12 done`}
        done={Object.keys(groupPicks).length===12} locked={locked}
      >
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"10px"}}>
          {GROUPS.map(g=>(
            <GroupPickCard
              key={g.id} group={g}
              picked={groupPicks[g.id]||null}
              locked={locked}
              onPick={team=>setGroupPicks(prev=>({...prev,[g.id]:team}))}
            />
          ))}
        </div>
      </PredSection>

      {/* ══════════════════════════════════════════
          SECTION 4 — FINALIST
      ══════════════════════════════════════════ */}
      <PredSection
        number="04" title="Who Reaches The Final?"
        subtitle="Pick the runner-up (champion already locked above)"
        done={!!finalist} locked={locked}
      >
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:"6px"}}>
          {ALL_TEAMS.filter(t=>t.name!==champion).map(t=>{
            const sel=finalist===t.name;
            return (
              <button key={t.name} onClick={()=>!locked&&setFinalist(t.name)} style={{
                background:sel?"rgba(212,175,55,0.12)":"rgba(255,255,255,0.025)",
                border:`1px solid ${sel?"rgba(212,175,55,0.4)":"rgba(255,255,255,0.07)"}`,
                borderRadius:"8px",padding:"8px 10px",cursor:locked?"default":"pointer",
                display:"flex",alignItems:"center",gap:"7px",
                color:sel?"#D4AF37":"rgba(255,255,255,0.55)",
                fontFamily:"'DM Sans',sans-serif",fontSize:"0.78rem",fontWeight:sel?600:400,
                transition:"all 0.15s",
              }}>
                <span style={{fontSize:"1rem"}}>{t.flag}</span>{t.name}
              </button>
            );
          })}
        </div>
      </PredSection>

      {/* ══════════════════════════════════════════
          PREDICTION CARD — SUMMARY + LOCK
      ══════════════════════════════════════════ */}
      <div style={{marginTop:"40px",background:"linear-gradient(135deg,rgba(212,175,55,0.08),rgba(255,107,53,0.05))",border:"1px solid rgba(212,175,55,0.2)",borderRadius:"20px",padding:"32px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"-20px",top:"-20px",fontSize:"9rem",opacity:0.04,pointerEvents:"none"}}>🏆</div>

        <div style={{fontSize:"0.62rem",color:"#D4AF37",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"8px"}}>
          {submitted?"🔒 Your Prediction Card":"📋 Your Prediction Card"}
        </div>
        <h2 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2rem",letterSpacing:"0.04em",marginBottom:"20px"}}>
          {submitted?"Predictions Locked In 🔥":"Review & Lock In"}
        </h2>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:"10px",marginBottom:"24px"}}>
          {/* champion */}
          <SummaryChip
            label="🏆 Champion"
            value={champion ? `${ALL_TEAMS.find(t=>t.name===champion)?.flag||""} ${champion}` : "Not picked"}
            done={!!champion}
          />
          {/* finalist */}
          <SummaryChip
            label="🥈 Finalist"
            value={finalist ? `${ALL_TEAMS.find(t=>t.name===finalist)?.flag||""} ${finalist}` : "Not picked"}
            done={!!finalist}
          />
          {/* golden boot */}
          <SummaryChip
            label="👟 Golden Boot"
            value={goldenBoot ? `${GOLDEN_BOOT.find(p=>p.name===goldenBoot)?.flag||""} ${goldenBoot}` : "Not picked"}
            done={!!goldenBoot}
          />
          {/* group winners */}
          <SummaryChip
            label="📊 Groups"
            value={`${Object.keys(groupPicks).length} / 12 picked`}
            done={Object.keys(groupPicks).length===12}
          />
        </div>

        {!submitted ? (
          <div style={{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap"}}>
            <button
              onClick={handleLock}
              disabled={!canSubmit}
              style={{
                background:canSubmit?"#D4AF37":"rgba(255,255,255,0.08)",
                color:canSubmit?"#060A10":"rgba(255,255,255,0.3)",
                border:"none",borderRadius:"10px",padding:"14px 32px",
                fontWeight:700,fontSize:"0.92rem",cursor:canSubmit?"pointer":"default",
                fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s",
              }}>
              🔒 Lock In My Predictions
            </button>
            {!canSubmit && <span style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.3)"}}>Pick a champion + golden boot to lock in</span>}
          </div>
        ) : (
          <div style={{display:"flex",alignItems:"center",gap:"16px",flexWrap:"wrap"}}>
            <div style={{background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.25)",borderRadius:"10px",padding:"12px 20px",display:"flex",alignItems:"center",gap:"8px"}}>
              <span style={{fontSize:"1.2rem"}}>✅</span>
              <div>
                <div style={{fontSize:"0.82rem",fontWeight:600,color:"#22C55E"}}>Predictions Locked!</div>
                <div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.4)"}}>Saved · Track through every round</div>
              </div>
            </div>
            <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.3)"}}>
              Editable until Jun 11 kickoff
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PREDICTION SUB-COMPONENTS ────────────────────────────────────────────────

function PredSection({number,title,subtitle,done,locked,children}) {
  return (
    <div style={{marginBottom:"36px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"}}>
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"0.85rem",color:done?"#22C55E":"rgba(255,255,255,0.2)",letterSpacing:"0.1em",minWidth:"28px"}}>{done?"✓":number}</div>
        <div style={{flex:1,height:"1px",background:done?"rgba(34,197,94,0.2)":"rgba(255,255,255,0.06)"}}/>
        <div style={{textAlign:"right"}}>
          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.3rem",letterSpacing:"0.04em",color:done?"#EEE9DF":"rgba(255,255,255,0.6)"}}>{title}</div>
          <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.3)"}}>{subtitle}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

function TeamPickCard({flag,name,sub,color,pct,selected,locked,onClick,index=0}) {
  const [hov,setHov]=useState(false);
  const rgb=hexToRgb(color);
  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onClick={onClick}
      style={{
        background:selected?`rgba(${rgb},0.15)`:"rgba(255,255,255,0.025)",
        border:`2px solid ${selected?color+"88":"rgba(255,255,255,0.07)"}`,
        borderRadius:"12px",padding:"14px 12px",cursor:locked?"default":"pointer",
        transition:"all 0.2s",transform:(!locked&&hov&&!selected)?"translateY(-3px) scale(1.02)":"none",
        position:"relative",overflow:"hidden",
        animation:`slideUp 0.4s ease ${index*0.07}s both`,
        boxShadow:selected?`0 8px 32px rgba(${rgb},0.25)`:hov?"0 6px 24px rgba(0,0,0,0.3)":"none",
      }}>
      {selected && <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${color},transparent)`}}/>}
      <div style={{fontSize:"1.8rem",marginBottom:"8px",lineHeight:1}}>{flag}</div>
      <div style={{fontWeight:700,fontSize:"0.85rem",marginBottom:"2px",color:selected?"#EEE9DF":"rgba(255,255,255,0.75)"}}>{name}</div>
      <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.35)",marginBottom:"10px"}}>{sub}</div>
      {/* community bar */}
      <div style={{fontSize:"0.58rem",color:"rgba(255,255,255,0.3)",marginBottom:"3px",display:"flex",justifyContent:"space-between"}}>
        <span>Fans pick</span><span style={{color:selected?color:"rgba(255,255,255,0.3)",fontWeight:600}}>{pct}%</span>
      </div>
      <div style={{background:"rgba(255,255,255,0.06)",borderRadius:"3px",height:"3px",overflow:"hidden"}}>
        <div style={{width:`${pct}%`,height:"100%",background:selected?color:"rgba(255,255,255,0.15)",borderRadius:"3px",transition:"width 0.4s"}}/>
      </div>
      {selected && <div style={{marginTop:"8px",fontSize:"0.6rem",color:color,fontWeight:700,letterSpacing:"0.08em"}}>✓ YOUR PICK</div>}
    </div>
  );
}

function GroupPickCard({group,picked,locked,onPick}) {
  const [open,setOpen]=useState(false);
  return (
    <div style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${picked?"rgba(212,175,55,0.25)":"rgba(255,255,255,0.07)"}`,borderRadius:"12px",padding:"14px",transition:"all 0.2s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.1rem",color:"#D4AF37",letterSpacing:"0.06em"}}>Group {group.id}</div>
        {group.danger&&<span style={{fontSize:"0.55rem",color:"#FF6B35",background:"rgba(255,107,53,0.1)",padding:"2px 6px",borderRadius:"4px",fontWeight:700}}>🔥 DEATH</span>}
      </div>
      {picked ? (
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{fontSize:"1.2rem"}}>{group.teams.find(t=>t.name===picked)?.flag}</span>
            <div>
              <div style={{fontWeight:600,fontSize:"0.85rem",color:"#D4AF37"}}>{picked}</div>
              <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.3)"}}>Your pick ✓</div>
            </div>
          </div>
          {!locked && <button onClick={()=>setOpen(v=>!v)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:"6px",padding:"4px 9px",cursor:"pointer",color:"rgba(255,255,255,0.4)",fontFamily:"'DM Sans',sans-serif",fontSize:"0.65rem"}}>Change</button>}
        </div>
      ) : (
        <button onClick={()=>!locked&&setOpen(v=>!v)} style={{width:"100%",background:"rgba(255,255,255,0.03)",border:"1px dashed rgba(255,255,255,0.1)",borderRadius:"8px",padding:"8px",cursor:"pointer",color:"rgba(255,255,255,0.3)",fontFamily:"'DM Sans',sans-serif",fontSize:"0.75rem",textAlign:"center"}}>
          + Pick Group Winner
        </button>
      )}
      {open && !locked && (
        <div style={{marginTop:"10px",display:"flex",flexDirection:"column",gap:"4px"}}>
          {group.teams.map(t=>(
            <button key={t.name} onClick={()=>{onPick(t.name);setOpen(false);}} style={{
              background:picked===t.name?"rgba(212,175,55,0.1)":"rgba(255,255,255,0.025)",
              border:`1px solid ${picked===t.name?"rgba(212,175,55,0.3)":"rgba(255,255,255,0.06)"}`,
              borderRadius:"7px",padding:"8px 10px",cursor:"pointer",
              display:"flex",alignItems:"center",gap:"8px",
              color:"rgba(255,255,255,0.7)",fontFamily:"'DM Sans',sans-serif",
              fontSize:"0.8rem",transition:"all 0.15s",textAlign:"left",
            }}>
              <span style={{fontSize:"1.1rem"}}>{t.flag}</span>
              <span style={{flex:1}}>{t.name}</span>
              <span style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.25)"}}>#{t.rank}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryChip({label,value,done}) {
  return (
    <div style={{background:done?"rgba(34,197,94,0.06)":"rgba(255,255,255,0.02)",border:`1px solid ${done?"rgba(34,197,94,0.2)":"rgba(255,255,255,0.07)"}`,borderRadius:"10px",padding:"12px 14px"}}>
      <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",marginBottom:"4px"}}>{label}</div>
      <div style={{fontSize:"0.88rem",fontWeight:600,color:done?"#EEE9DF":"rgba(255,255,255,0.3)"}}>{value}</div>
    </div>
  );
}

// ─── BUZZ PAGE ───────────────────────────────────────────────────────────────

const BUZZ_TAGS = [
  { id:"all",      label:"All",        color:"#D4AF37" },
  { id:"hot",      label:"🔥 Hot",     color:"#FF6B35" },
  { id:"transfer", label:"⚡ Transfer", color:"#A78BFA" },
  { id:"kit",      label:"👕 Kits",    color:"#38BDF8" },
  { id:"injury",   label:"🏥 Injury",  color:"#F87171" },
  { id:"quote",    label:"🗣️ Quote",   color:"#34D399" },
  { id:"stadium",  label:"🏟️ Stadium", color:"#FBBF24" },
  { id:"preview",  label:"🎯 Preview", color:"#FB923C" },
  { id:"stats",    label:"📊 Stats",   color:"#60A5FA" },
];

const BUZZ_ITEMS = [
  {
    id:1, tag:"hot", featured:true,
    headline:"Messi confirms his 6th World Cup — 'This one is for the ages'",
    body:"Lionel Messi, 38, has confirmed he will lead Argentina's title defence in what will almost certainly be his final World Cup. Speaking ahead of the squad announcement, Messi said: 'To defend the title in a tournament this size, with 48 nations — it's a challenge I couldn't walk away from.' Argentina open against Algeria on Jun 16 in Miami.",
    teams:[{flag:"🇦🇷",name:"Argentina"}],
    heat:98, time:"2h ago", author:"Golazo HQ",
  },
  {
    id:2, tag:"hot", featured:false,
    headline:"Mbappé named France captain — 'I was born for this moment'",
    body:"Kylian Mbappé leads France into his third World Cup as captain. At 27, this is widely seen as his peak tournament. France enter as FIFA #1 and many analysts' favourite to win Group I ahead of Senegal.",
    teams:[{flag:"🇫🇷",name:"France"}],
    heat:96, time:"4h ago", author:"Golazo HQ",
  },
  {
    id:3, tag:"quote",
    headline:"Ronaldo: 'There is no better way to end than lifting this trophy'",
    body:"Cristiano Ronaldo, 41, spoke to Portuguese media ahead of the tournament. With 212 international caps — a world record — this is his fifth and almost certainly final World Cup. Portugal are in Group K alongside Colombia.",
    teams:[{flag:"🇵🇹",name:"Portugal"}],
    heat:94, time:"5h ago", author:"Golazo HQ",
  },
  {
    id:4, tag:"stats",
    headline:"Lamine Yamal will be the youngest player in World Cup 2026 history at 18",
    body:"Spain's Lamine Yamal, who turns 19 in July, is set to become one of the youngest players to appear at a World Cup. Fresh off his Euro 2024 heroics, he starts on the left flank in what could be his first of many World Cups.",
    teams:[{flag:"🇪🇸",name:"Spain"}],
    heat:91, time:"6h ago", author:"Golazo HQ",
  },
  {
    id:5, tag:"preview",
    headline:"Group C is carnage — Brazil, Morocco, Haiti & Scotland in the tightest group",
    body:"Group C has been dubbed a 'group of death lite' — Brazil as favourites but Morocco, who reached the semis in 2022, are no pushovers. Brazil open against Morocco on Jun 13 in Dallas. Haiti and Scotland fight for the third spot.",
    teams:[{flag:"🇧🇷",name:"Brazil"},{flag:"🇲🇦",name:"Morocco"}],
    heat:92, time:"7h ago", author:"Golazo HQ",
  },
  {
    id:6, tag:"kit",
    headline:"Brazil's 2026 home kit voted best at the tournament by fans — and the internet agrees",
    body:"The iconic yellow and green returned with a modern twist. A subtle gradient on the collar and the Canarinha crest in gold thread. Fan polls across Twitter/X and Instagram have Brazil's home kit at #1 with 34% of votes.",
    teams:[{flag:"🇧🇷",name:"Brazil"}],
    heat:88, time:"1d ago", author:"Golazo HQ",
  },
  {
    id:7, tag:"transfer",
    headline:"Haaland's first World Cup — Norway finally qualify after 24-year wait",
    body:"Erling Haaland will play his first-ever World Cup at 25. Norway ended a 24-year absence from the tournament, with Haaland scoring 12 goals in qualifying. They face France and Senegal in Group I — possibly the toughest group draw.",
    teams:[{flag:"🇳🇴",name:"Norway"}],
    heat:85, time:"1d ago", author:"Golazo HQ",
  },
  {
    id:8, tag:"stadium",
    headline:"Estadio Azteca: 3 World Cups, 1 iconic roar — Mexico City opens the tournament",
    body:"The Azteca becomes the first stadium to host three World Cup finals matches (1970, 1986, 2026). With 87,000 fans expected on Jun 11, the atmosphere for Mexico vs South Africa will be unlike anything else in football.",
    teams:[{flag:"🇲🇽",name:"Mexico"}],
    heat:87, time:"1d ago", author:"Golazo HQ",
  },
  {
    id:9, tag:"preview",
    headline:"USA as host nation — the pressure, the party, and the path to the final",
    body:"The USA host their first World Cup since 1994. With 11 venues across the country and a fanbase that has grown enormously since then, USMNT face Paraguay, Türkiye and Australia in Group D — a winnable group on paper.",
    teams:[{flag:"🇺🇸",name:"USA"}],
    heat:83, time:"2d ago", author:"Golazo HQ",
  },
  {
    id:10, tag:"injury",
    headline:"England confirm full-strength squad — Bellingham leads the Golden Generation",
    body:"England enter their third consecutive major tournament with a squad many consider their strongest since 1966. Jude Bellingham leads as captain. England open against Croatia on Jun 17 in San Francisco — a rematch of the 2018 semi-final.",
    teams:[{flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",name:"England"}],
    heat:89, time:"2d ago", author:"Golazo HQ",
  },
  {
    id:11, tag:"stats",
    headline:"48 teams, 104 matches, 3 countries — the numbers behind the biggest World Cup ever",
    body:"For the first time ever: 48 nations competing, 12 groups, 16 stadiums across the USA, Canada and Mexico. The prize fund is $1.1 billion — the largest in World Cup history. Estimated global audience: 5.4 billion viewers.",
    teams:[{flag:"🇺🇸",name:"USA"},{flag:"🇲🇽",name:"Mexico"},{flag:"🇨🇦",name:"Canada"}],
    heat:80, time:"3d ago", author:"Golazo HQ",
  },
  {
    id:12, tag:"kit",
    headline:"France's new Mbappe-era kit unveiled — dark navy with a gold trim that slaps",
    body:"Nike unveiled France's 2026 World Cup kit to enormous fanfare. A deep navy base with the tri-color collar in thin gold piping. The away kit is a striking all-white with red detail. Both sold out within 48 hours of release.",
    teams:[{flag:"🇫🇷",name:"France"}],
    heat:82, time:"3d ago", author:"Golazo HQ",
  },
];

const HYPE_INDEX = [
  {team:"Argentina",flag:"🇦🇷",hype:98,color:"#75AADB"},
  {team:"France",   flag:"🇫🇷",hype:95,color:"#003189"},
  {team:"Brazil",   flag:"🇧🇷",hype:91,color:"#009C3B"},
  {team:"England",  flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",hype:88,color:"#CF081F"},
  {team:"Spain",    flag:"🇪🇸",hype:86,color:"#AA151B"},
  {team:"Portugal", flag:"🇵🇹",hype:84,color:"#006600"},
  {team:"USA",      flag:"🇺🇸",hype:79,color:"#3C3B6E"},
  {team:"Norway",   flag:"🇳🇴",hype:72,color:"#EF3340"},
];

// animated hype bar — grows from 0 on mount
function AnimHypeBar({pct, color}) {
  const [w, setW] = useState(0);
  useEffect(()=>{ const t=setTimeout(()=>setW(pct),300); return()=>clearTimeout(t); },[pct]);
  return (
    <div style={{background:"rgba(255,255,255,0.06)",borderRadius:"3px",height:"3px",overflow:"hidden",marginLeft:"24px"}}>
      <div className="hype-bar-fill" style={{width:`${w}%`,height:"100%",background:color,borderRadius:"3px"}}/>
    </div>
  );
}

// count-up number animation
function CountUp({value, suffix=""}) {
  const [display, setDisplay] = useState(0);
  useEffect(()=>{
    // extract numeric part
    const num = parseFloat(value.toString().replace(/[^0-9.]/g,""));
    if(isNaN(num)){setDisplay(value);return;}
    let start=0; const dur=1200; const step=16;
    const inc=num/(dur/step);
    const timer=setInterval(()=>{
      start+=inc;
      if(start>=num){setDisplay(value);clearInterval(timer);}
      else setDisplay(Math.floor(start)+(value.toString().includes(".")?"":"")+suffix);
    },step);
    return()=>clearInterval(timer);
  },[value]);
  return <>{display}</>;
}

// fade transition wrapper when tag changes
function FadeSwitch({tag, children}) {
  const [visible,setVisible]=useState(true);
  const [content,setContent]=useState(children);
  const prevTag=useRef(tag);
  useEffect(()=>{
    if(prevTag.current!==tag){
      setVisible(false);
      const t=setTimeout(()=>{ setContent(children); setVisible(true); prevTag.current=tag; },180);
      return()=>clearTimeout(t);
    } else { setContent(children); }
  },[tag,children]);
  return (
    <div style={{opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(8px)",transition:"opacity 0.18s ease, transform 0.18s ease"}}>
      {content}
    </div>
  );
}

function BuzzPage() {
  const [activeTag, setActiveTag] = useState("all");
  const [expanded,  setExpanded]  = useState(null);

  const filtered = activeTag==="all"
    ? BUZZ_ITEMS
    : BUZZ_ITEMS.filter(b=>b.tag===activeTag);

  const featured   = filtered.find(b=>b.featured) || filtered[0];
  const rest        = filtered.filter(b=>b.id!==featured?.id);
  const tagColor    = BUZZ_TAGS.find(t=>t.id===activeTag)?.color || "#D4AF37";

  return (
    <div style={{padding:"40px 28px 60px",maxWidth:"1200px",margin:"0 auto",animation:"fadeUp 0.4s ease forwards"}}>

      {/* ── HEADER ── */}
      <div style={{marginBottom:"28px",animation:"slideUp 0.6s ease both"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
          <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#FF6B35",animation:"pulseDot 1.5s ease infinite"}}/>
          <div style={{fontSize:"0.62rem",color:"#D4AF37",letterSpacing:"0.22em",textTransform:"uppercase"}}>Live Pulse · Updated Daily</div>
        </div>
        <h1 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"clamp(2.4rem,6vw,4.5rem)",letterSpacing:"0.04em",lineHeight:1,marginBottom:"8px",background:"linear-gradient(120deg,#fff 0%,#E8D5A3 40%,#D4AF37 70%,#FF6B35 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
          Buzz Feed
        </h1>
        <p style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.35)"}}>Everything happening in the world of FIFA 2026 — hype, drama, kits, and hot takes.</p>
      </div>

      {/* ── TRENDING STRIP ── */}
      <div style={{marginBottom:"28px",overflow:"hidden",borderRadius:"10px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",padding:"12px 0"}}>
        <div style={{display:"flex",gap:"0",whiteSpace:"nowrap",animation:"ticker 30s linear infinite"}}>
          {[...Array(2)].map((_,ri)=>(
            <span key={ri} style={{display:"flex"}}>
              {BUZZ_ITEMS.map(b=>(
                <span key={b.id} style={{padding:"0 24px",fontSize:"0.75rem",color:"rgba(255,255,255,0.45)",borderRight:"1px solid rgba(255,255,255,0.06)"}}>
                  <span style={{color:BUZZ_TAGS.find(t=>t.id===b.tag)?.color||"#D4AF37",marginRight:"6px",fontSize:"0.65rem",fontWeight:700}}>{b.tag.toUpperCase()}</span>
                  {b.headline.slice(0,50)}…
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── TAG FILTERS ── */}
      <div style={{display:"flex",gap:"6px",marginBottom:"24px",flexWrap:"wrap"}}>
        {BUZZ_TAGS.map(t=>(
          <button key={t.id} onClick={()=>setActiveTag(t.id)} style={{
            background:activeTag===t.id?`rgba(${hexToRgb(t.color)},0.15)`:"rgba(255,255,255,0.04)",
            color:activeTag===t.id?t.color:"rgba(255,255,255,0.45)",
            border:`1px solid ${activeTag===t.id?t.color+"55":"rgba(255,255,255,0.08)"}`,
            borderRadius:"20px",padding:"6px 14px",cursor:"pointer",
            fontFamily:"'DM Sans',sans-serif",fontSize:"0.75rem",fontWeight:activeTag===t.id?600:400,
            transition:"all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"20px",alignItems:"start"}}>

        {/* ── LEFT — FEED ── */}
        <div>
          <FadeSwitch tag={activeTag}>
            <>
              {featured && (
                <BuzzCard item={featured} featured={true} index={0} expanded={expanded===featured.id} onToggle={()=>setExpanded(v=>v===featured.id?null:featured.id)}/>
              )}
              <div style={{display:"flex",flexDirection:"column",gap:"8px",marginTop:"8px"}}>
                {rest.map((b,i)=>(
                  <BuzzCard key={b.id} item={b} featured={false} index={i+1} expanded={expanded===b.id} onToggle={()=>setExpanded(v=>v===b.id?null:b.id)}/>
                ))}
              </div>
            </>
          </FadeSwitch>
        </div>

        {/* ── RIGHT — HYPE INDEX ── */}
        <div style={{position:"sticky",top:"80px"}}>
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",padding:"20px",marginBottom:"16px",animation:"slideLeft 0.6s ease 0.2s both"}}>
            <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"4px"}}>
              <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#FF6B35",animation:"pulseDot 2s ease infinite"}}/>
              <div style={{fontSize:"0.62rem",color:"#D4AF37",letterSpacing:"0.18em",textTransform:"uppercase"}}>Social + Fan Sentiment</div>
            </div>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.4rem",letterSpacing:"0.04em",marginBottom:"16px"}}>Hype Index</div>
            {HYPE_INDEX.map((t,i)=>(
              <div key={t.team} style={{marginBottom:"12px",animation:`slideLeft 0.4s ease ${0.1+i*0.06}s both`}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                  <span style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.25)",minWidth:"16px"}}>{i+1}</span>
                  <span style={{fontSize:"1rem"}}>{t.flag}</span>
                  <span style={{fontSize:"0.82rem",fontWeight:500,flex:1}}>{t.team}</span>
                  <span style={{fontSize:"0.75rem",fontWeight:700,color:t.color}}>{t.hype}</span>
                </div>
                <AnimHypeBar pct={t.hype} color={t.color}/>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",padding:"20px",animation:"slideLeft 0.6s ease 0.4s both"}}>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.2rem",letterSpacing:"0.04em",marginBottom:"14px"}}>By The Numbers</div>
            {[["5.4B","Expected viewers"],["$1.1B","Total prize fund"],["48","Nations competing"],["6","Messi's World Cups"],["212","Ronaldo's caps"],["104","Matches to play"]].map(([v,l],i)=>(
              <div key={l} className="stat-row" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 6px",marginBottom:"2px",borderRadius:"6px",borderBottom:"1px solid rgba(255,255,255,0.04)",animation:`slideLeft 0.4s ease ${0.5+i*0.07}s both`}}>
                <span style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.4)"}}>{l}</span>
                <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.1rem",color:"#D4AF37",letterSpacing:"0.06em"}}>
                  <CountUp value={v}/>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BuzzCard({item, featured, expanded, onToggle, index=0}) {
  const [hov,setHov]=useState(false);
  const tag   = BUZZ_TAGS.find(t=>t.id===item.tag)||BUZZ_TAGS[0];
  const color = tag.color;

  return (
    <div
      className="buzz-card"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onClick={onToggle}
      style={{
        background:hov||expanded?`rgba(${hexToRgb(color)},0.04)`:"rgba(255,255,255,0.02)",
        border:`1px solid ${expanded?color+"55":hov?color+"33":"rgba(255,255,255,0.06)"}`,
        borderRadius:"14px",padding:featured?"24px":"16px 18px",
        cursor:"pointer",
        position:"relative",overflow:"hidden",marginBottom:featured?"8px":"0",
        animation:`slideUp 0.5s ease ${index*0.07}s both`,
      }}>
      {/* top color stripe */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${color},transparent)`,opacity:expanded||hov?1:0.4,transition:"opacity 0.2s"}}/>

      {/* tags + meta row */}
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px",flexWrap:"wrap"}}>
        <span style={{background:`rgba(${hexToRgb(color)},0.15)`,border:`1px solid rgba(${hexToRgb(color)},0.3)`,color:color,borderRadius:"20px",padding:"2px 10px",fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.1em"}}>
          {tag.label.toUpperCase()}
        </span>
        {item.teams.map(t=>(
          <span key={t.name} style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)",display:"flex",alignItems:"center",gap:"4px"}}>
            {t.flag} {t.name}
          </span>
        ))}
        <span style={{marginLeft:"auto",fontSize:"0.62rem",color:"rgba(255,255,255,0.25)"}}>{item.time}</span>
      </div>

      {/* headline */}
      <div style={{fontFamily:featured?"'Bebas Neue',cursive":"'DM Sans',sans-serif",fontSize:featured?"1.5rem":"0.92rem",fontWeight:featured?400:600,letterSpacing:featured?"0.03em":"normal",lineHeight:1.25,color:"#EEE9DF",marginBottom:"10px"}}>
        {item.headline}
      </div>

      {/* body — shown if featured or expanded */}
      {(featured || expanded) && (
        <p style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.5)",lineHeight:1.7,marginBottom:"12px"}}>
          {item.body}
        </p>
      )}

      {/* heat bar + read more */}
      <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}>
            <span style={{fontSize:"0.58rem",color:"rgba(255,255,255,0.25)"}}>HEAT</span>
            <span style={{fontSize:"0.58rem",color:color,fontWeight:700}}>{item.heat}%</span>
          </div>
          <AnimHypeBar pct={item.heat} color={color}/>
        </div>
        {!featured && (
          <span style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.25)",whiteSpace:"nowrap"}}>
            {expanded?"▲ Less":"▼ Read more"}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── KITS PAGE ───────────────────────────────────────────────────────────────

// Real kit images — saved to public/kits/ from FIFA store / Nike / Adidas press
const KIT_IMAGES = {
  "Brazil":      { home:"/kits/brazil_home.webp",      away:"/kits/brazil_away.webp"      },
  "Argentina":   { home:"/kits/argentina_home.webp",   away:"/kits/argentina_away.webp"   },
  "France":      { home:"/kits/france_home.webp",      away:"/kits/france_away.webp"      },
  "Spain":       { home:"/kits/spain_home.webp",       away:"/kits/spain_away.webp"       },
  "England":     { home:"/kits/england_home.webp",     away:"/kits/england_away.webp"     },
  "Germany":     { home:"/kits/germany_home.webp",     away:"/kits/germany_away.webp"     },
  "Portugal":    { home:"/kits/portugal_home.webp",    away:"/kits/portugal_away.webp"    },
  "Netherlands": { home:"/kits/netherlands_home.webp", away:"/kits/netherlands_away.webp" },
  "Croatia":     { home:"/kits/croatia_home.webp",     away:"/kits/croatia_away.webp"     },
  "Mexico":      { home:"/kits/mexico_home.webp",      away:"/kits/mexico_away.webp"      },
};

// API-Sports team IDs → free badge images (no auth needed for logos)
const TEAM_CREST = {
  "Mexico":         "https://media.api-sports.io/football/teams/16.png",
  "South Africa":   "https://media.api-sports.io/football/teams/48.png",
  "Korea Republic": "https://media.api-sports.io/football/teams/149.png",
  "Czechia":        "https://media.api-sports.io/football/teams/30.png",
  "Canada":         "https://media.api-sports.io/football/teams/100.png",
  "Bosnia-Herz.":   "https://media.api-sports.io/football/teams/22.png",
  "Qatar":          "https://media.api-sports.io/football/teams/163.png",
  "Switzerland":    "https://media.api-sports.io/football/teams/15.png",
  "Brazil":         "https://media.api-sports.io/football/teams/6.png",
  "Morocco":        "https://media.api-sports.io/football/teams/46.png",
  "Haiti":          "https://media.api-sports.io/football/teams/108.png",
  "Scotland":       "https://media.api-sports.io/football/teams/1108.png",
  "USA":            "https://media.api-sports.io/football/teams/62.png",
  "Paraguay":       "https://media.api-sports.io/football/teams/33.png",
  "Australia":      "https://media.api-sports.io/football/teams/25.png",
  "Türkiye":        "https://media.api-sports.io/football/teams/21.png",
  "Germany":        "https://media.api-sports.io/football/teams/25.png",
  "Curaçao":        "https://media.api-sports.io/football/teams/1570.png",
  "Côte d'Ivoire":  "https://media.api-sports.io/football/teams/52.png",
  "Ecuador":        "https://media.api-sports.io/football/teams/36.png",
  "Netherlands":    "https://media.api-sports.io/football/teams/1.png",
  "Japan":          "https://media.api-sports.io/football/teams/26.png",
  "Sweden":         "https://media.api-sports.io/football/teams/14.png",
  "Tunisia":        "https://media.api-sports.io/football/teams/51.png",
  "Belgium":        "https://media.api-sports.io/football/teams/1.png",
  "Egypt":          "https://media.api-sports.io/football/teams/47.png",
  "Iran":           "https://media.api-sports.io/football/teams/155.png",
  "New Zealand":    "https://media.api-sports.io/football/teams/173.png",
  "Spain":          "https://media.api-sports.io/football/teams/9.png",
  "Cape Verde":     "https://media.api-sports.io/football/teams/1570.png",
  "Saudi Arabia":   "https://media.api-sports.io/football/teams/152.png",
  "Uruguay":        "https://media.api-sports.io/football/teams/29.png",
  "France":         "https://media.api-sports.io/football/teams/2.png",
  "Senegal":        "https://media.api-sports.io/football/teams/44.png",
  "Iraq":           "https://media.api-sports.io/football/teams/156.png",
  "Norway":         "https://media.api-sports.io/football/teams/13.png",
  "Argentina":      "https://media.api-sports.io/football/teams/26.png",
  "Algeria":        "https://media.api-sports.io/football/teams/50.png",
  "Austria":        "https://media.api-sports.io/football/teams/1108.png",
  "Jordan":         "https://media.api-sports.io/football/teams/166.png",
  "Portugal":       "https://media.api-sports.io/football/teams/27.png",
  "DR Congo":       "https://media.api-sports.io/football/teams/53.png",
  "Uzbekistan":     "https://media.api-sports.io/football/teams/1570.png",
  "Colombia":       "https://media.api-sports.io/football/teams/31.png",
  "England":        "https://media.api-sports.io/football/teams/10.png",
  "Croatia":        "https://media.api-sports.io/football/teams/3.png",
  "Ghana":          "https://media.api-sports.io/football/teams/43.png",
  "Panama":         "https://media.api-sports.io/football/teams/108.png",
};

const KIT_DATA = {
  "Mexico":        {home:{p:"#006847",s:"#CE1126",c:"#FFFFFF",style:"solid"},  away:{p:"#FFFFFF",s:"#006847",c:"#CE1126",style:"solid"},  rating:4.5,votes:3241},
  "South Africa":  {home:{p:"#007A4D",s:"#FFB81C",c:"#000000",style:"solid"},  away:{p:"#000000",s:"#FFB81C",c:"#007A4D",style:"solid"},  rating:3.9,votes:891},
  "Korea Republic":{home:{p:"#C60C30",s:"#003478",c:"#FFFFFF",style:"solid"},  away:{p:"#003478",s:"#C60C30",c:"#FFFFFF",style:"solid"},  rating:4.0,votes:1204},
  "Czechia":       {home:{p:"#D7141A",s:"#FFFFFF",c:"#D7141A",style:"hoops"},  away:{p:"#FFFFFF",s:"#D7141A",c:"#D7141A",style:"solid"},  rating:3.5,votes:672},
  "Canada":        {home:{p:"#FF0000",s:"#FFFFFF",c:"#FF0000",style:"solid"},  away:{p:"#000000",s:"#FF0000",c:"#FF0000",style:"solid"},  rating:4.1,votes:1872},
  "Bosnia-Herz.":  {home:{p:"#003DA5",s:"#FFD700",c:"#003DA5",style:"sash"},   away:{p:"#FFFFFF",s:"#003DA5",c:"#003DA5",style:"solid"},  rating:3.7,votes:544},
  "Qatar":         {home:{p:"#8D1B3D",s:"#FFFFFF",c:"#8D1B3D",style:"solid"},  away:{p:"#FFFFFF",s:"#8D1B3D",c:"#8D1B3D",style:"solid"},  rating:3.2,votes:421},
  "Switzerland":   {home:{p:"#FF0000",s:"#FFFFFF",c:"#FF0000",style:"solid"},  away:{p:"#FFFFFF",s:"#FF0000",c:"#FF0000",style:"solid"},  rating:3.8,votes:788},
  "Brazil":        {home:{p:"#009C3B",s:"#FFDF00",c:"#003087",style:"solid"},  away:{p:"#003087",s:"#FFDF00",c:"#009C3B",style:"solid"},  rating:4.9,votes:8821},
  "Morocco":       {home:{p:"#C1272D",s:"#006233",c:"#C1272D",style:"solid"},  away:{p:"#006233",s:"#C1272D",c:"#006233",style:"solid"},  rating:4.3,votes:2341},
  "Haiti":         {home:{p:"#00209F",s:"#D21034",c:"#FFFFFF",style:"solid"},  away:{p:"#FFFFFF",s:"#00209F",c:"#D21034",style:"solid"},  rating:3.4,votes:312},
  "Scotland":      {home:{p:"#003A8C",s:"#FFFFFF",c:"#003A8C",style:"solid"},  away:{p:"#FFFFFF",s:"#003A8C",c:"#003A8C",style:"solid"},  rating:3.9,votes:1102},
  "USA":           {home:{p:"#002868",s:"#FFFFFF",c:"#BF0A30",style:"solid"},  away:{p:"#FFFFFF",s:"#002868",c:"#BF0A30",style:"solid"},  rating:4.0,votes:3910},
  "Paraguay":      {home:{p:"#D52B1E",s:"#FFFFFF",c:"#0038A8",style:"stripes"},away:{p:"#FFFFFF",s:"#D52B1E",c:"#0038A8",style:"solid"},  rating:3.6,votes:521},
  "Australia":     {home:{p:"#FFD200",s:"#00843D",c:"#003082",style:"solid"},  away:{p:"#003082",s:"#FFD200",c:"#00843D",style:"solid"},  rating:4.0,votes:1231},
  "Türkiye":       {home:{p:"#E30A17",s:"#FFFFFF",c:"#E30A17",style:"solid"},  away:{p:"#FFFFFF",s:"#E30A17",c:"#E30A17",style:"solid"},  rating:3.8,votes:987},
  "Germany":       {home:{p:"#FFFFFF",s:"#000000",c:"#000000",style:"solid"},  away:{p:"#000000",s:"#FFFFFF",c:"#FFFFFF",style:"solid"},  rating:4.1,votes:3102},
  "Curaçao":       {home:{p:"#002B7F",s:"#F9E814",c:"#009FC3",style:"solid"},  away:{p:"#009FC3",s:"#002B7F",c:"#F9E814",style:"solid"},  rating:3.5,votes:287},
  "Côte d'Ivoire": {home:{p:"#F77F00",s:"#009A44",c:"#FFFFFF",style:"stripes"},away:{p:"#009A44",s:"#F77F00",c:"#FFFFFF",style:"solid"},  rating:3.9,votes:712},
  "Ecuador":       {home:{p:"#FFD100",s:"#034EA2",c:"#CE1126",style:"solid"},  away:{p:"#034EA2",s:"#FFD100",c:"#CE1126",style:"solid"},  rating:3.7,votes:634},
  "Netherlands":   {home:{p:"#FF6600",s:"#FFFFFF",c:"#FF6600",style:"solid"},  away:{p:"#003DA5",s:"#FF6600",c:"#FF6600",style:"solid"},  rating:4.4,votes:2987},
  "Japan":         {home:{p:"#1A3567",s:"#FFFFFF",c:"#BC002D",style:"solid"},  away:{p:"#FFFFFF",s:"#1A3567",c:"#BC002D",style:"solid"},  rating:4.2,votes:2341},
  "Sweden":        {home:{p:"#006AA7",s:"#FECC02",c:"#006AA7",style:"solid"},  away:{p:"#FECC02",s:"#006AA7",c:"#006AA7",style:"solid"},  rating:4.1,votes:1231},
  "Tunisia":       {home:{p:"#E70013",s:"#FFFFFF",c:"#E70013",style:"solid"},  away:{p:"#FFFFFF",s:"#E70013",c:"#E70013",style:"solid"},  rating:3.5,votes:498},
  "Belgium":       {home:{p:"#ED2939",s:"#000000",c:"#000000",style:"solid"},  away:{p:"#000000",s:"#FFD700",c:"#ED2939",style:"solid"},  rating:4.2,votes:2109},
  "Egypt":         {home:{p:"#CE1126",s:"#FFFFFF",c:"#000000",style:"solid"},  away:{p:"#FFFFFF",s:"#CE1126",c:"#000000",style:"solid"},  rating:3.8,votes:876},
  "Iran":          {home:{p:"#239F40",s:"#FFFFFF",c:"#DA0000",style:"solid"},  away:{p:"#FFFFFF",s:"#239F40",c:"#DA0000",style:"solid"},  rating:3.6,votes:543},
  "New Zealand":   {home:{p:"#000000",s:"#FFFFFF",c:"#CC0000",style:"solid"},  away:{p:"#FFFFFF",s:"#000000",c:"#CC0000",style:"solid"},  rating:3.7,votes:412},
  "Spain":         {home:{p:"#AA151B",s:"#F1BF00",c:"#AA151B",style:"solid"},  away:{p:"#003DA5",s:"#AA151B",c:"#AA151B",style:"solid"},  rating:4.5,votes:4102},
  "Cape Verde":    {home:{p:"#003893",s:"#CF2027",c:"#FFFFFF",style:"stripes"},away:{p:"#CF2027",s:"#003893",c:"#FFFFFF",style:"solid"},  rating:3.8,votes:389},
  "Saudi Arabia":  {home:{p:"#007A3D",s:"#FFFFFF",c:"#007A3D",style:"solid"},  away:{p:"#FFFFFF",s:"#007A3D",c:"#007A3D",style:"solid"},  rating:3.5,votes:701},
  "Uruguay":       {home:{p:"#5EB6E4",s:"#FFFFFF",c:"#000000",style:"solid"},  away:{p:"#000000",s:"#5EB6E4",c:"#5EB6E4",style:"solid"},  rating:4.0,votes:1092},
  "France":        {home:{p:"#003189",s:"#FFFFFF",c:"#CF142B",style:"solid"},  away:{p:"#FFFFFF",s:"#003189",c:"#CF142B",style:"solid"},  rating:4.7,votes:6201},
  "Senegal":       {home:{p:"#00853F",s:"#FDEF42",c:"#E31B23",style:"solid"},  away:{p:"#FFFFFF",s:"#00853F",c:"#E31B23",style:"solid"},  rating:4.1,votes:1432},
  "Iraq":          {home:{p:"#CE1126",s:"#FFFFFF",c:"#000000",style:"solid"},  away:{p:"#000000",s:"#CE1126",c:"#FFFFFF",style:"solid"},  rating:3.4,votes:298},
  "Norway":        {home:{p:"#EF3340",s:"#002868",c:"#FFFFFF",style:"stripes"},away:{p:"#002868",s:"#EF3340",c:"#FFFFFF",style:"solid"},  rating:4.0,votes:1341},
  "Argentina":     {home:{p:"#75AADB",s:"#FFFFFF",c:"#75AADB",style:"stripes"},away:{p:"#FFFFFF",s:"#75AADB",c:"#000000",style:"solid"},  rating:4.8,votes:7821},
  "Algeria":       {home:{p:"#FFFFFF",s:"#D21034",c:"#006233",style:"solid"},  away:{p:"#D21034",s:"#FFFFFF",c:"#006233",style:"solid"},  rating:3.9,votes:891},
  "Austria":       {home:{p:"#ED2939",s:"#FFFFFF",c:"#ED2939",style:"solid"},  away:{p:"#FFFFFF",s:"#ED2939",c:"#ED2939",style:"solid"},  rating:3.7,votes:612},
  "Jordan":        {home:{p:"#007A3D",s:"#FFFFFF",c:"#CE1126",style:"solid"},  away:{p:"#CE1126",s:"#007A3D",c:"#FFFFFF",style:"solid"},  rating:3.5,votes:287},
  "Portugal":      {home:{p:"#006600",s:"#FF0000",c:"#FF0000",style:"solid"},  away:{p:"#FF0000",s:"#006600",c:"#006600",style:"solid"},  rating:4.4,votes:3892},
  "DR Congo":      {home:{p:"#007FFF",s:"#FFD700",c:"#CE1126",style:"solid"},  away:{p:"#FFD700",s:"#007FFF",c:"#CE1126",style:"solid"},  rating:3.8,votes:412},
  "Uzbekistan":    {home:{p:"#1EB53A",s:"#FFFFFF",c:"#009FCC",style:"solid"},  away:{p:"#FFFFFF",s:"#1EB53A",c:"#CE1126",style:"solid"},  rating:3.6,votes:301},
  "Colombia":      {home:{p:"#FDD116",s:"#003087",c:"#CE1126",style:"solid"},  away:{p:"#003087",s:"#FDD116",c:"#CE1126",style:"solid"},  rating:4.2,votes:2103},
  "England":       {home:{p:"#FFFFFF",s:"#003090",c:"#CF081F",style:"solid"},  away:{p:"#003090",s:"#FFFFFF",c:"#CF081F",style:"solid"},  rating:4.3,votes:4521},
  "Croatia":       {home:{p:"#FF0000",s:"#FFFFFF",c:"#FF0000",style:"hoops"},  away:{p:"#003DA5",s:"#FFFFFF",c:"#003DA5",style:"solid"},  rating:4.6,votes:5012},
  "Ghana":         {home:{p:"#006B3F",s:"#FCD116",c:"#CE1126",style:"solid"},  away:{p:"#FFFFFF",s:"#006B3F",c:"#CE1126",style:"solid"},  rating:3.8,votes:743},
  "Panama":        {home:{p:"#DA121A",s:"#FFFFFF",c:"#003580",style:"solid"},  away:{p:"#FFFFFF",s:"#DA121A",c:"#003580",style:"solid"},  rating:3.6,votes:398},
};

// CSS SVG jersey component
function JerseySVG({p, s, c, style="solid", size=70, crestUrl=null, teamName=""}) {
  const id = `grad_${p.replace("#","")}`;
  return (
    <svg width={size} height={size*1.3} viewBox="0 0 120 156" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* body shading gradient for 3D effect */}
        <linearGradient id={`${id}_body`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#000" stopOpacity="0.25"/>
          <stop offset="25%"  stopColor="#fff" stopOpacity="0.08"/>
          <stop offset="60%"  stopColor="#fff" stopOpacity="0.04"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0.2"/>
        </linearGradient>
        {/* sleeve gradient */}
        <linearGradient id={`${id}_sl`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#fff" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0.2"/>
        </linearGradient>
        {/* drop shadow filter */}
        <filter id={`${id}_shadow`} x="-20%" y="-5%" width="140%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>

      {/* ── LEFT SLEEVE ── */}
      <path d="M5 35 L30 22 L36 72 L8 76 Z" fill={s||p} filter={`url(#${id}_shadow)`}/>
      <path d="M5 35 L30 22 L36 72 L8 76 Z" fill={`url(#${id}_sl)`}/>
      {/* sleeve cuff */}
      <path d="M6 70 L8 76 L36 72 L34 66 Z" fill={c||p} opacity="0.9"/>

      {/* ── RIGHT SLEEVE ── */}
      <path d="M115 35 L90 22 L84 72 L112 76 Z" fill={s||p} filter={`url(#${id}_shadow)`}/>
      <path d="M115 35 L90 22 L84 72 L112 76 Z" fill={`url(#${id}_sl)`}/>
      {/* sleeve cuff */}
      <path d="M114 70 L112 76 L84 72 L86 66 Z" fill={c||p} opacity="0.9"/>

      {/* ── BODY ── */}
      <path d="M30 22 L30 148 Q60 152 90 148 L90 22 Q75 28 60 28 Q45 28 30 22Z"
        fill={p} filter={`url(#${id}_shadow)`}/>
      {/* style overlays */}
      {style==="stripes" && <>
        <clipPath id={`${id}_clip`}><path d="M30 22 L30 148 Q60 152 90 148 L90 22 Q75 28 60 28 Q45 28 30 22Z"/></clipPath>
        {[38,50,62,74].map(x=><rect key={x} x={x} y="22" width="6" height="130" fill={s} opacity="0.5" clipPath={`url(#${id}_clip)`}/>)}
      </>}
      {style==="hoops" && <>
        <clipPath id={`${id}_clip`}><path d="M30 22 L30 148 Q60 152 90 148 L90 22 Q75 28 60 28 Q45 28 30 22Z"/></clipPath>
        {[40,56,72,88,104,120,136].map(y=><rect key={y} x="28" y={y} width="64" height="7" fill={s} opacity="0.45" clipPath={`url(#${id}_clip)`}/>)}
      </>}
      {style==="sash" && <>
        <clipPath id={`${id}_clip`}><path d="M30 22 L30 148 Q60 152 90 148 L90 22 Q75 28 60 28 Q45 28 30 22Z"/></clipPath>
        <path d="M30 22 L90 100 L90 72 L30 0 Z" fill={s} opacity="0.4" clipPath={`url(#${id}_clip)`}/>
      </>}
      {/* body shading overlay */}
      <path d="M30 22 L30 148 Q60 152 90 148 L90 22 Q75 28 60 28 Q45 28 30 22Z"
        fill={`url(#${id}_body)`}/>
      {/* subtle fabric grain lines */}
      <path d="M30 22 L30 148 Q60 152 90 148 L90 22 Q75 28 60 28 Q45 28 30 22Z"
        fill="none" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.04"
        strokeDasharray="1 8"/>

      {/* ── COLLAR ── */}
      <path d="M44 28 Q60 44 76 28 Q72 14 60 11 Q48 14 44 28Z" fill={c||s||"#fff"}/>
      {/* collar shadow */}
      <path d="M44 28 Q60 44 76 28 Q72 21 60 19 Q48 21 44 28Z" fill="#000" opacity="0.15"/>

      {/* ── WAISTBAND ── */}
      <path d="M30 138 Q60 142 90 138 L90 148 Q60 152 30 148 Z" fill={c||s||p} opacity="0.6"/>

      {/* ── CREST / BADGE ── */}
      {crestUrl ? (
        <image href={crestUrl} x="45" y="48" width="30" height="30"
          preserveAspectRatio="xMidYMid meet"/>
      ) : (
        <text x="60" y="78" textAnchor="middle" fontFamily="sans-serif"
          fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.2)" letterSpacing="0.5">
          {teamName.slice(0,3).toUpperCase()}
        </text>
      )}
    </svg>
  );
}

// Hover wrapper — jersey pops out big on hover
function JerseyHoverWrap({children, primary="#D4AF37"}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        display:"flex", justifyContent:"center", alignItems:"center",
        position:"relative", zIndex: hov ? 50 : 1,
        marginBottom:"12px",
      }}
    >
      <div style={{
        transform: hov ? "scale(2.1) translateY(-18%)" : "scale(1) translateY(0)",
        transition:"transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        filter: hov
          ? `drop-shadow(0 16px 40px rgba(${hexToRgb(primary)},0.6)) drop-shadow(0 0 80px rgba(${hexToRgb(primary)},0.3))`
          : `drop-shadow(0 4px 12px rgba(0,0,0,0.4))`,
        position:"relative", zIndex: hov ? 50 : 1,
        willChange:"transform",
      }}>
        {children}
      </div>
      {/* glow ring on hover */}
      {hov && (
        <div style={{
          position:"absolute", inset:"-20%",
          borderRadius:"50%",
          background:`radial-gradient(circle, rgba(${hexToRgb(primary)},0.15) 0%, transparent 70%)`,
          pointerEvents:"none",
          animation:"fadeUp 0.2s ease both",
        }}/>
      )}
    </div>
  );
}

// Shows real webp photo if available, falls back to SVG jersey
function KitDisplay({kitImg, kit, size=70, crestUrl, teamName, primary, expanded}) {
  const [imgOk, setImgOk] = useState(!!kitImg);
  const [loaded, setLoaded] = useState(false);

  if(kitImg && imgOk) {
    return (
      <div style={{
        position:"relative", width:size, height:size*1.3,
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        {/* team colour glow behind jersey */}
        <div style={{
          position:"absolute", inset:0,
          background:`radial-gradient(ellipse at 50% 60%, rgba(${hexToRgb(primary||"#D4AF37")},0.25) 0%, transparent 70%)`,
          borderRadius:"10px", pointerEvents:"none",
        }}/>
        <img
          src={kitImg}
          alt={`${teamName} kit`}
          onLoad={()=>setLoaded(true)}
          onError={()=>setImgOk(false)}
          style={{
            maxHeight:`${size*1.25}px`, maxWidth:"100%",
            objectFit:"contain", position:"relative", zIndex:1,
            /* removes white background — white × dark bg = transparent */
            mixBlendMode:"multiply",
            opacity: loaded ? 1 : 0,
            transition:"opacity 0.5s ease",
          }}
        />
        {/* shimmer placeholder while loading */}
        {!loaded && (
          <div style={{
            position:"absolute", width:"60%", height:"80%",
            background:"linear-gradient(90deg,rgba(255,255,255,0.03) 25%,rgba(255,255,255,0.07) 50%,rgba(255,255,255,0.03) 75%)",
            backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite",
            borderRadius:"8px",
          }}/>
        )}
      </div>
    );
  }

  // fallback SVG jersey
  return <JerseySVG {...kit} size={size} crestUrl={crestUrl} teamName={teamName}/>;
}

function KitGridCard({team:t, index, globalKitType, expanded, onExpand, myVotes, onVote}) {
  const [localType, setLocalType] = useState(null); // null = follows global
  const kitType  = localType || globalKitType;
  const kit      = t.kit[kitType];
  const vKey     = `${t.name}_${kitType}`;
  const myVote   = myVotes[vKey];
  const fireCount  = Math.round(t.kit.votes * (t.kit.rating/5));
  const trashCount = t.kit.votes - fireCount;

  // reset local override when global changes
  useEffect(()=>{ setLocalType(null); },[globalKitType]);

  return (
    <div
      style={{
        background: expanded?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.02)",
        border:`1px solid ${expanded?"rgba(212,175,55,0.3)":"rgba(255,255,255,0.07)"}`,
        borderRadius:"14px", padding:"16px", cursor:"pointer",
        transition:"all 0.25s", animation:`slideUp 0.4s ease ${(index%12)*0.04}s both`,
        position:"relative",
      }}
      onClick={onExpand}>

      {/* group badge */}
      <div style={{position:"absolute",top:"10px",right:"10px",fontFamily:"'Bebas Neue',cursive",fontSize:"0.7rem",color:t.danger?"#FF6B35":"rgba(255,255,255,0.2)",letterSpacing:"0.08em",zIndex:2}}>GRP {t.groupId}</div>

      {/* per-card home/away flip */}
      <div style={{display:"flex",background:"rgba(255,255,255,0.05)",borderRadius:"6px",padding:"2px",marginBottom:"8px",position:"relative",zIndex:2}}
        onClick={e=>e.stopPropagation()}>
        {["home","away"].map(v=>(
          <button key={v} onClick={()=>setLocalType(localType===v&&v===globalKitType?null:v)} style={{
            flex:1, background:kitType===v?"rgba(212,175,55,0.2)":"transparent",
            color:kitType===v?"#D4AF37":"rgba(255,255,255,0.3)",
            border:"none", borderRadius:"5px", padding:"3px 0",
            cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
            fontSize:"0.62rem", fontWeight:kitType===v?700:400,
            transition:"all 0.15s", textTransform:"capitalize",
          }}>
            {v==="home"?"🏠":"✈️"} {v}
          </button>
        ))}
      </div>

      {/* jersey */}
      <JerseyHoverWrap primary={kit.p}>
        <KitDisplay
          kitImg={KIT_IMAGES[t.name]?.[kitType]}
          kit={kit} size={expanded?90:70}
          crestUrl={TEAM_CREST[t.name]} teamName={t.name}
          primary={kit.p}/>
      </JerseyHoverWrap>

      {/* team info */}
      <div style={{textAlign:"center",marginBottom:"10px"}}>
        <div style={{fontSize:"1.2rem",marginBottom:"2px"}}>{t.flag}</div>
        <div style={{fontWeight:700,fontSize:"0.85rem",marginBottom:"2px"}}>{t.name}</div>
        <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)",textTransform:"capitalize"}}>
          {kitType==="home"?"🏠 Home":"✈️ Away"} Kit
        </div>
      </div>

      {/* rating bar */}
      <div style={{marginBottom:"10px"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
          <span style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.3)"}}>Fan Rating</span>
          <span style={{fontSize:"0.7rem",fontWeight:700,color:"#D4AF37"}}>★ {t.kit.rating.toFixed(1)}</span>
        </div>
        <AnimHypeBar pct={(t.kit.rating/5)*100} color={kit.p==="#FFFFFF"?"#D4AF37":kit.p}/>
      </div>

      {/* expanded detail */}
      {expanded && (
        <div style={{marginBottom:"10px",animation:"fadeUp 0.3s ease both"}}>
          <div style={{display:"flex",justifyContent:"center",gap:"16px",marginBottom:"12px"}}>
            {[["#22C55E",fireCount,"🔥 Fire"],["#F87171",trashCount,"❌ Trash"],["#D4AF37",t.kit.votes,"Total"]].map(([c,v,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1rem",color:c}}>{v.toLocaleString()}</div>
                <div style={{fontSize:"0.58rem",color:"rgba(255,255,255,0.3)"}}>{l}</div>
              </div>
            ))}
          </div>
          {/* both kits side by side */}
          <div style={{display:"flex",gap:"8px",justifyContent:"center",marginBottom:"8px"}}>
            {["home","away"].map(type=>(
              <div key={type} style={{textAlign:"center"}}>
                <div style={{fontSize:"0.58rem",color:type===kitType?"#D4AF37":"rgba(255,255,255,0.3)",marginBottom:"4px",fontWeight:type===kitType?700:400,textTransform:"uppercase"}}>{type}</div>
                <KitDisplay kitImg={KIT_IMAGES[t.name]?.[type]} kit={t.kit[type]} size={48} crestUrl={TEAM_CREST[t.name]} teamName={t.name} primary={t.kit[type].p}/>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* vote buttons */}
      <div style={{display:"flex",gap:"6px"}} onClick={e=>e.stopPropagation()}>
        <button onClick={()=>onVote(t.name,kitType,"fire")} style={{
          flex:1,background:myVote==="fire"?"rgba(34,197,94,0.15)":"rgba(255,255,255,0.04)",
          border:`1px solid ${myVote==="fire"?"rgba(34,197,94,0.4)":"rgba(255,255,255,0.08)"}`,
          borderRadius:"7px",padding:"6px",cursor:"pointer",
          fontSize:"0.75rem",color:myVote==="fire"?"#22C55E":"rgba(255,255,255,0.4)",
          fontFamily:"'DM Sans',sans-serif",fontWeight:600,transition:"all 0.15s",
        }}>🔥 Fire</button>
        <button onClick={()=>onVote(t.name,kitType,"trash")} style={{
          flex:1,background:myVote==="trash"?"rgba(248,113,113,0.12)":"rgba(255,255,255,0.04)",
          border:`1px solid ${myVote==="trash"?"rgba(248,113,113,0.35)":"rgba(255,255,255,0.08)"}`,
          borderRadius:"7px",padding:"6px",cursor:"pointer",
          fontSize:"0.75rem",color:myVote==="trash"?"#F87171":"rgba(255,255,255,0.4)",
          fontFamily:"'DM Sans',sans-serif",fontWeight:600,transition:"all 0.15s",
        }}>❌ Trash</button>
      </div>
    </div>
  );
}

function KitsPage() {
  const [groupFilter, setGroupFilter] = useState("ALL");
  const [sort, setSort]               = useState("rating");
  const [votes, setVotes]             = useState({});
  const [expanded, setExpanded]       = useState(null);
  const [kitType, setKitType]         = useState("home"); // home | away

  // load votes from localStorage
  useEffect(()=>{
    try { const v=localStorage.getItem("golazo_kit_votes"); if(v) setVotes(JSON.parse(v)); } catch(e){}
  },[]);

  const saveVote=(teamName, type, vote)=>{
    const key=`${teamName}_${type}`;
    const updated={...votes,[key]:votes[key]===vote?null:vote};
    setVotes(updated);
    try{ localStorage.setItem("golazo_kit_votes",JSON.stringify(updated)); } catch(e){}
  };

  // build list of teams with their group info
  const allTeams = GROUPS.flatMap(g=>g.teams.map(t=>({
    ...t,
    groupId: g.id,
    danger: g.danger,
    kit: KIT_DATA[t.name],
  }))).filter(t=>t.kit);

  const filtered = groupFilter==="ALL" ? allTeams : allTeams.filter(t=>t.groupId===groupFilter);
  const sorted   = [...filtered].sort((a,b)=>{
    if(sort==="rating") return (b.kit.rating||0)-(a.kit.rating||0);
    if(sort==="votes")  return (b.kit.votes||0)-(a.kit.votes||0);
    return a.name.localeCompare(b.name);
  });

  // top 5 by rating for featured strip
  const topKits = [...allTeams].sort((a,b)=>(b.kit.rating||0)-(a.kit.rating||0)).slice(0,6);

  return (
    <div style={{padding:"40px 28px 60px",maxWidth:"1200px",margin:"0 auto",animation:"fadeUp 0.4s ease both"}}>

      {/* ── HEADER ── */}
      <div style={{marginBottom:"28px",animation:"slideUp 0.5s ease both"}}>
        <div style={{fontSize:"0.62rem",color:"#D4AF37",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:"6px"}}>All 48 Nations · Home & Away</div>
        <h1 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"clamp(2.4rem,6vw,4.5rem)",letterSpacing:"0.04em",lineHeight:1,marginBottom:"8px",background:"linear-gradient(120deg,#fff 0%,#E8D5A3 40%,#D4AF37 70%,#FF6B35 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
          Kit Gallery 2026
        </h1>
        <p style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.35)"}}>Rate every kit. Vote for the best and worst of the tournament.</p>
      </div>

      {/* ── TOP RATED STRIP ── */}
      <div style={{marginBottom:"32px"}}>
        <div style={{fontSize:"0.65rem",color:"#D4AF37",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"12px"}}>🏆 Fan Favourites</div>
        <div style={{display:"flex",gap:"10px",overflowX:"auto",paddingBottom:"8px"}}>
          {topKits.map((t,i)=>(
            <div key={t.name} onClick={()=>setExpanded(expanded===t.name?null:t.name)}
              style={{
                flexShrink:0,background:"rgba(255,255,255,0.03)",
                border:`1px solid ${i===0?"rgba(212,175,55,0.4)":"rgba(255,255,255,0.07)"}`,
                borderRadius:"12px",padding:"14px 16px",cursor:"pointer",
                textAlign:"center",minWidth:"110px",
                transition:"all 0.2s",animation:`slideUp 0.4s ease ${i*0.07}s both`,
              }}>
              {i===0 && <div style={{fontSize:"0.55rem",color:"#D4AF37",fontWeight:700,letterSpacing:"0.1em",marginBottom:"6px"}}>👑 #1 RATED</div>}
              <JerseyHoverWrap primary={t.kit[kitType].p}>
                <KitDisplay kitImg={KIT_IMAGES[t.name]?.[kitType]} kit={t.kit[kitType]} size={56} crestUrl={TEAM_CREST[t.name]} teamName={t.name} primary={t.kit[kitType].p}/>
              </JerseyHoverWrap>
              <div style={{marginTop:"8px"}}>
                <div style={{fontSize:"0.7rem",fontWeight:600}}>{t.flag} {t.name}</div>
                <div style={{fontSize:"0.65rem",color:"#D4AF37",fontWeight:700}}>★ {t.kit.rating.toFixed(1)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTROLS ── */}
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"20px",flexWrap:"wrap"}}>
        {/* kit type toggle */}
        <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:"8px",padding:"3px",border:"1px solid rgba(255,255,255,0.08)"}}>
          {[["home","🏠 Home"],["away","✈️ Away"]].map(([v,l])=>(
            <button key={v} onClick={()=>setKitType(v)} style={{background:kitType===v?"#D4AF37":"transparent",color:kitType===v?"#060A10":"rgba(255,255,255,0.4)",border:"none",borderRadius:"6px",padding:"5px 14px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.75rem",fontWeight:600,transition:"all 0.2s"}}>{l}</button>
          ))}
        </div>
        {/* group filter */}
        <div style={{display:"flex",gap:"4px",flexWrap:"wrap"}}>
          <button onClick={()=>setGroupFilter("ALL")} style={{background:groupFilter==="ALL"?"rgba(212,175,55,0.15)":"transparent",color:groupFilter==="ALL"?"#D4AF37":"rgba(255,255,255,0.35)",border:`1px solid ${groupFilter==="ALL"?"rgba(212,175,55,0.4)":"rgba(255,255,255,0.08)"}`,borderRadius:"6px",padding:"4px 12px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.72rem",transition:"all 0.15s"}}>All</button>
          {GROUPS.map(g=>(
            <button key={g.id} onClick={()=>setGroupFilter(g.id)} style={{background:groupFilter===g.id?"rgba(212,175,55,0.15)":"transparent",color:groupFilter===g.id?"#D4AF37":g.danger?"#FF6B35":"rgba(255,255,255,0.35)",border:`1px solid ${groupFilter===g.id?"rgba(212,175,55,0.4)":g.danger?"rgba(255,107,53,0.25)":"rgba(255,255,255,0.08)"}`,borderRadius:"6px",padding:"4px 9px",cursor:"pointer",fontFamily:"'Bebas Neue',cursive",fontSize:"0.82rem",transition:"all 0.15s"}}>{g.id}</button>
          ))}
        </div>
        {/* sort */}
        <div style={{marginLeft:"auto",display:"flex",gap:"4px"}}>
          {[["rating","⭐ Top Rated"],["votes","🔥 Most Voted"],["alpha","A–Z"]].map(([v,l])=>(
            <button key={v} onClick={()=>setSort(v)} style={{background:sort===v?"rgba(212,175,55,0.12)":"transparent",color:sort===v?"#D4AF37":"rgba(255,255,255,0.35)",border:`1px solid ${sort===v?"rgba(212,175,55,0.35)":"rgba(255,255,255,0.07)"}`,borderRadius:"6px",padding:"4px 10px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.7rem",transition:"all 0.15s"}}>{l}</button>
          ))}
        </div>
      </div>

      {/* ── KIT GRID ── */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:"10px"}}>
        {sorted.map((t,i)=>(
          <KitGridCard
            key={t.name} team={t} index={i}
            globalKitType={kitType}
            expanded={expanded===t.name}
            onExpand={()=>setExpanded(expanded===t.name?null:t.name)}
            myVotes={votes}
            onVote={saveVote}
          />
        ))}
      </div>

      {/* stats footer */}
      <div style={{marginTop:"32px",padding:"20px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"12px",display:"flex",gap:"24px",flexWrap:"wrap",justifyContent:"center"}}>
        {[["48","Kits rated"],["96","Home + Away"],["🔥 Brazil","Most loved"],["❌ Qatar","Most trash"]].map(([v,l])=>(
          <div key={l} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.3rem",color:"#D4AF37",lineHeight:1}}>{v}</div>
            <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",marginTop:"2px",textTransform:"uppercase"}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DEBATE PAGE ─────────────────────────────────────────────────────────────

const DEBATE_CATS = [
  {id:"all",     label:"All Debates",  color:"#D4AF37"},
  {id:"tournament",label:"🏆 Tournament",color:"#FF6B35"},
  {id:"players", label:"⚽ Players",   color:"#A78BFA"},
  {id:"predict", label:"🎯 Predictions",color:"#38BDF8"},
  {id:"hottake", label:"🔥 Hot Takes", color:"#F87171"},
  {id:"kits",    label:"👕 Kits",      color:"#34D399"},
];

const DEBATES = [
  {
    id:1, category:"tournament", featured:true, hot:true,
    question:"Who wins the 2026 World Cup?",
    context:"48 teams, 1 trophy. The world's greatest debate. Pick your champion.",
    sideA:{label:"Argentina",flag:"🇦🇷",color:"#75AADB",desc:"Defending champions. Messi's last dance. History on their side.",votes:28400},
    sideB:{label:"France",   flag:"🇫🇷",color:"#003189",desc:"FIFA #1. Mbappé at his peak. The most complete squad.",votes:19200},
  },
  {
    id:2, category:"players", featured:false, hot:true,
    question:"Right now — Messi or Mbappé?",
    context:"GOAT legacy vs peak performance. Who's the better player at this exact moment?",
    sideA:{label:"Messi",  flag:"🇦🇷",color:"#75AADB",desc:"37 WC goals. World champion. The greatest of all time.",votes:14200},
    sideB:{label:"Mbappé", flag:"🇫🇷",color:"#003189",desc:"27 years old. Peak speed. The future belongs to him.",votes:11800},
  },
  {
    id:3, category:"predict", featured:false, hot:true,
    question:"Will Mbappé finally deliver at a World Cup?",
    context:"He's had the chances. 2018 finalist, 2022 golden boot. 2026 is his moment — or isn't it?",
    sideA:{label:"Yes — this is his year",flag:"⚡",color:"#003189",desc:"Mature, captain, peak form. France are #1 for a reason.",votes:9800},
    sideB:{label:"No — again bottle job", flag:"❌",color:"#F87171",desc:"Pressure of a WC is different. History says so.",votes:5400},
  },
  {
    id:4, category:"tournament", featured:false, hot:false,
    question:"Who's the real Group of Death?",
    context:"Spain + Uruguay in H? France + Senegal in I? Brazil + Morocco in C? Only one can claim the title.",
    sideA:{label:"Group H — Spain/Uruguay",flag:"🔥",color:"#AA151B",desc:"Two top-10 teams fighting for 2 spots. Death.",votes:7200},
    sideB:{label:"Group I — France/Senegal",flag:"☠️",color:"#003189",desc:"The world's #1 team vs Africa's best. Carnage.",votes:8900},
  },
  {
    id:5, category:"players", featured:false, hot:false,
    question:"Ronaldo's last World Cup — does he retire happy?",
    context:"CR7 at 41. 212 caps. The only thing missing is the World Cup trophy. Does he get it?",
    sideA:{label:"Yes — Portugal go deep",flag:"🙏",color:"#006600",desc:"Portugal have Ronaldo + Bruno. Dangerous enough to surprise.",votes:6100},
    sideB:{label:"No — Group K is tough", flag:"💔",color:"#F87171",desc:"Colombia in the group. Career ends without the trophy.",votes:9200},
  },
  {
    id:6, category:"predict", featured:false, hot:false,
    question:"USA — do they reach the quarter finals?",
    context:"Home advantage. Massive crowds. A winnable Group D. But can USMNT handle the pressure?",
    sideA:{label:"Yes — host nation magic",flag:"🇺🇸",color:"#002868",desc:"History favours hosts. Group D is there for the taking.",votes:11200},
    sideB:{label:"No — out in groups",    flag:"😬",color:"#BF0A30",desc:"Türkiye and Australia are dangerous. It's not 1994.",votes:7800},
  },
  {
    id:7, category:"predict", featured:false, hot:true,
    question:"Dark horse of the tournament?",
    context:"Every World Cup has one. Who shocks the world in 2026?",
    sideA:{label:"Morocco",  flag:"🇲🇦",color:"#C1272D",desc:"Reached the SF in 2022. Group C is tough but they can handle it.",votes:12400},
    sideB:{label:"Colombia", flag:"🇨🇴",color:"#FDD116",desc:"Group K, quality squad, Falcao generation finally arrives.",votes:7800},
  },
  {
    id:8, category:"hottake", featured:false, hot:false,
    question:"Best kit of the tournament?",
    context:"Fans have spoken on the ratings. But head to head — who wins?",
    sideA:{label:"Brazil Home",   flag:"🇧🇷",color:"#009C3B",desc:"The iconic yellow-green. Timeless. 4.9/5 on Golazo.",votes:18200},
    sideB:{label:"Croatia Home",  flag:"🇭🇷",color:"#FF0000",desc:"The checkerboard. Instantly recognisable. 4.6/5 rated.",votes:14100},
  },
  {
    id:9, category:"hottake", featured:false, hot:false,
    question:"Is VAR helping or ruining the beautiful game?",
    context:"Every tournament brings the same debate. 2026 will be no different.",
    sideA:{label:"Helping — more fairness",flag:"✅",color:"#22C55E",desc:"Fewer clear errors. Goals that count actually count.",votes:9100},
    sideB:{label:"Ruining — kills the vibe",flag:"❌",color:"#F87171",desc:"Kills celebrations. Slows the game. Marginal calls ruin moments.",votes:14300},
  },
  {
    id:10, category:"players", featured:false, hot:false,
    question:"Who's the best young player of the tournament?",
    context:"A new generation takes the stage. Who defines the 2026 World Cup?",
    sideA:{label:"Lamine Yamal",  flag:"🇪🇸",color:"#AA151B",desc:"18 years old. Euro 2024 winner. Spain's left flank wizard.",votes:13200},
    sideB:{label:"Jude Bellingham",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",color:"#CF081F",desc:"England captain. Real Madrid midfielder. Born for this.",votes:11800},
  },
  {
    id:11, category:"tournament", featured:false, hot:false,
    question:"Brazil or Argentina — South American final?",
    context:"They're in different sides of the bracket. Could they meet in the final?",
    sideA:{label:"Brazil win it",   flag:"🇧🇷",color:"#009C3B",desc:"6th World Cup. Vinicius. Morocco tested in group stage.",votes:9800},
    sideB:{label:"Argentina retain",flag:"🇦🇷",color:"#75AADB",desc:"Back-to-back? Messi's going for the ultimate legacy.",votes:12400},
  },
  {
    id:12, category:"hottake", featured:false, hot:false,
    question:"48 teams — great idea or too many?",
    context:"This is the first 48-team World Cup. More nations, more matches, more drama. Or more filler?",
    sideA:{label:"Great — more nations!",flag:"🌍",color:"#D4AF37",desc:"Haiti, Jordan, Curaçao get their moment. Football belongs to everyone.",votes:16200},
    sideB:{label:"Too many — quality drops",flag:"📉",color:"#F87171",desc:"Group stage becomes predictable. Too many one-sided matches.",votes:11800},
  },
];

function DebatePage() {
  const [cat,    setCat]    = useState("all");
  const [myVotes,setMyVotes]= useState({});
  const [showForm,setShowForm]=useState(false);
  const [suggest,setSuggest]= useState("");
  const [submitted,setSubmitted]=useState(false);

  // load from localStorage
  useEffect(()=>{
    try{ const v=localStorage.getItem("golazo_debate_votes"); if(v) setMyVotes(JSON.parse(v)); }catch(e){}
  },[]);

  const vote=(debateId, side)=>{
    const current = myVotes[debateId];
    const updated  = {...myVotes, [debateId]: current===side ? null : side};
    setMyVotes(updated);
    try{ localStorage.setItem("golazo_debate_votes", JSON.stringify(updated)); }catch(e){}
  };

  const filtered = cat==="all" ? DEBATES : DEBATES.filter(d=>d.category===cat);
  const featured  = filtered.find(d=>d.featured) || filtered[0];
  const rest      = filtered.filter(d=>d.id!==featured?.id);

  return (
    <div style={{padding:"40px 28px 60px",maxWidth:"1100px",margin:"0 auto",animation:"fadeUp 0.4s ease both"}}>

      {/* ── HEADER ── */}
      <div style={{marginBottom:"28px",animation:"slideUp 0.5s ease both"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
          <div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#FF6B35",animation:"pulseDot 1.5s ease infinite"}}/>
          <div style={{fontSize:"0.62rem",color:"#D4AF37",letterSpacing:"0.22em",textTransform:"uppercase"}}>Fan Debates · Pick Your Side</div>
        </div>
        <h1 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"clamp(2.4rem,6vw,4.5rem)",letterSpacing:"0.04em",lineHeight:1,marginBottom:"8px",background:"linear-gradient(120deg,#fff 0%,#E8D5A3 40%,#D4AF37 70%,#FF6B35 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
          Debate Zone
        </h1>
        <p style={{fontSize:"0.85rem",color:"rgba(255,255,255,0.35)"}}>The hottest arguments in football. Pick a side. See where the world stands.</p>
      </div>

      {/* ── CATEGORY FILTERS ── */}
      <div style={{display:"flex",gap:"6px",marginBottom:"28px",flexWrap:"wrap"}}>
        {DEBATE_CATS.map(c=>(
          <button key={c.id} onClick={()=>setCat(c.id)} style={{
            background:cat===c.id?`rgba(${hexToRgb(c.color)},0.15)`:"rgba(255,255,255,0.04)",
            color:cat===c.id?c.color:"rgba(255,255,255,0.45)",
            border:`1px solid ${cat===c.id?c.color+"55":"rgba(255,255,255,0.08)"}`,
            borderRadius:"20px",padding:"6px 14px",cursor:"pointer",
            fontFamily:"'DM Sans',sans-serif",fontSize:"0.75rem",fontWeight:cat===c.id?600:400,
            transition:"all 0.2s",
          }}>{c.label}</button>
        ))}
        <button onClick={()=>setShowForm(v=>!v)} style={{marginLeft:"auto",background:"rgba(212,175,55,0.08)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:"20px",padding:"6px 14px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.75rem",color:"#D4AF37",fontWeight:600,transition:"all 0.2s"}}>
          + Suggest a Debate
        </button>
      </div>

      {/* ── SUGGEST FORM ── */}
      {showForm && (
        <div style={{marginBottom:"24px",background:"rgba(212,175,55,0.05)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:"14px",padding:"20px",animation:"slideUp 0.3s ease both"}}>
          {submitted ? (
            <div style={{textAlign:"center",padding:"8px"}}>
              <div style={{fontSize:"1.4rem",marginBottom:"6px"}}>🎙️</div>
              <div style={{fontWeight:600,color:"#D4AF37",marginBottom:"4px"}}>Debate suggested!</div>
              <div style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.4)"}}>We'll review and add the best ones.</div>
            </div>
          ) : (
            <>
              <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",marginBottom:"10px"}}>What debate do you want the community to vote on?</div>
              <div style={{display:"flex",gap:"8px"}}>
                <input value={suggest} onChange={e=>setSuggest(e.target.value)} placeholder="e.g. Is Haaland Norway's greatest ever player?" style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"9px 14px",color:"#EEE9DF",fontSize:"0.82rem",fontFamily:"'DM Sans',sans-serif",outline:"none"}}/>
                <button onClick={()=>{if(suggest.trim()){setSubmitted(true);}}} style={{background:"#D4AF37",color:"#060A10",border:"none",borderRadius:"8px",padding:"9px 18px",fontWeight:700,fontSize:"0.8rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Submit</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── FEATURED DEBATE ── */}
      {featured && <DebateCard debate={featured} myVote={myVotes[featured.id]} onVote={vote} featured={true} index={0}/>}

      {/* ── DEBATE GRID ── */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"12px",marginTop:"12px"}}>
        {rest.map((d,i)=>(
          <DebateCard key={d.id} debate={d} myVote={myVotes[d.id]} onVote={vote} featured={false} index={i+1}/>
        ))}
      </div>

      {/* ── COMMUNITY STATS ── */}
      <div style={{marginTop:"36px",padding:"20px 24px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"14px",display:"flex",gap:"24px",flexWrap:"wrap",alignItems:"center"}}>
        <div>
          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.8rem",color:"#D4AF37",lineHeight:1}}>{DEBATES.reduce((s,d)=>s+d.sideA.votes+d.sideB.votes,0).toLocaleString()}</div>
          <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",textTransform:"uppercase"}}>Total votes cast</div>
        </div>
        <div style={{width:"1px",height:"40px",background:"rgba(255,255,255,0.06)"}}/>
        <div>
          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.8rem",color:"#FF6B35",lineHeight:1}}>{DEBATES.length}</div>
          <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",textTransform:"uppercase"}}>Active debates</div>
        </div>
        <div style={{width:"1px",height:"40px",background:"rgba(255,255,255,0.06)"}}/>
        <div>
          <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.8rem",color:"#A78BFA",lineHeight:1}}>{Object.keys(myVotes).filter(k=>myVotes[k]).length}</div>
          <div style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",textTransform:"uppercase"}}>Your votes</div>
        </div>
        <div style={{marginLeft:"auto",fontSize:"0.75rem",color:"rgba(255,255,255,0.3)",maxWidth:"200px",textAlign:"right"}}>
          Supabase integration coming — your votes will be shared with the global Golazo community.
        </div>
      </div>
    </div>
  );
}

function DebateCard({debate, myVote, onVote, featured, index}) {
  const [hov,setHov]=useState(false);
  const hasVoted = myVote!=null;
  const total    = debate.sideA.votes + debate.sideB.votes;
  const pctA     = Math.round((debate.sideA.votes/total)*100);
  const pctB     = 100-pctA;
  const catColor = DEBATE_CATS.find(c=>c.id===debate.category)?.color||"#D4AF37";

  // animated bar width state
  const [barA,setBarA]=useState(0);
  const [barB,setBarB]=useState(0);
  useEffect(()=>{
    if(hasVoted){ const t=setTimeout(()=>{setBarA(pctA);setBarB(pctB);},100); return()=>clearTimeout(t); }
    else{ setBarA(0);setBarB(0); }
  },[hasVoted,pctA,pctB]);

  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:hov?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.02)",
        border:`1px solid ${hasVoted?"rgba(212,175,55,0.2)":hov?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.07)"}`,
        borderRadius:"16px",padding:featured?"28px":"20px",
        transition:"all 0.25s",position:"relative",overflow:"hidden",
        animation:`slideUp 0.5s ease ${index*0.06}s both`,
      }}>

      {/* top accent */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${catColor},${debate.sideA.color},${debate.sideB.color})`,opacity:hasVoted?1:0.4,transition:"opacity 0.4s"}}/>

      {/* header */}
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px",flexWrap:"wrap"}}>
        <span style={{background:`rgba(${hexToRgb(catColor)},0.15)`,border:`1px solid rgba(${hexToRgb(catColor)},0.3)`,color:catColor,borderRadius:"20px",padding:"2px 10px",fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.1em"}}>
          {DEBATE_CATS.find(c=>c.id===debate.category)?.label||debate.category.toUpperCase()}
        </span>
        {debate.hot && <span style={{background:"rgba(255,59,48,0.12)",border:"1px solid rgba(255,59,48,0.25)",color:"#FF3B30",borderRadius:"20px",padding:"2px 8px",fontSize:"0.58rem",fontWeight:700}}>🔥 TRENDING</span>}
        <span style={{marginLeft:"auto",fontSize:"0.65rem",color:"rgba(255,255,255,0.3)"}}>{(total/1000).toFixed(1)}K votes</span>
      </div>

      {/* question */}
      <h3 style={{fontFamily:"'Bebas Neue',cursive",fontSize:featured?"1.8rem":"1.25rem",letterSpacing:"0.03em",lineHeight:1.1,marginBottom:"6px",color:"#EEE9DF"}}>
        {debate.question}
      </h3>
      {debate.context && (
        <p style={{fontSize:"0.78rem",color:"rgba(255,255,255,0.35)",marginBottom:"20px",lineHeight:1.5}}>{debate.context}</p>
      )}

      {/* two sides */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"16px"}}>
        {[["A",debate.sideA],["B",debate.sideB]].map(([side,s])=>{
          const isMine=myVote===side;
          const pct=side==="A"?pctA:pctB;
          return (
            <button key={side} onClick={()=>onVote(debate.id,side)} style={{
              background:isMine?`rgba(${hexToRgb(s.color)},0.18)`:"rgba(255,255,255,0.03)",
              border:`2px solid ${isMine?s.color+"88":"rgba(255,255,255,0.08)"}`,
              borderRadius:"12px",padding:"14px 12px",cursor:"pointer",
              transition:"all 0.2s",textAlign:"left",position:"relative",overflow:"hidden",
            }}>
              {isMine && <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:s.color}}/>}
              <div style={{fontSize:"1.8rem",marginBottom:"6px",lineHeight:1}}>{s.flag}</div>
              <div style={{fontWeight:700,fontSize:"0.88rem",color:isMine?"#EEE9DF":"rgba(255,255,255,0.7)",marginBottom:"4px"}}>{s.label}</div>
              {featured && <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.35)",lineHeight:1.4,marginBottom:"8px"}}>{s.desc}</div>}
              {isMine && <div style={{fontSize:"0.6rem",color:s.color,fontWeight:700,letterSpacing:"0.08em"}}>✓ YOUR PICK</div>}
              {!isMine && !hasVoted && <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.3)"}}>Tap to vote →</div>}
              {hasVoted && !isMine && <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.3)"}}>{pct}% picked this</div>}
            </button>
          );
        })}
      </div>

      {/* vote result bar — shows after voting */}
      {hasVoted ? (
        <div style={{animation:"fadeUp 0.4s ease both"}}>
          <div style={{display:"flex",borderRadius:"8px",overflow:"hidden",height:"8px",marginBottom:"8px"}}>
            <div className="hype-bar-fill" style={{width:`${barA}%`,background:debate.sideA.color,transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)"}}/>
            <div className="hype-bar-fill" style={{width:`${barB}%`,background:debate.sideB.color,transition:"width 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.7rem"}}>
            <span style={{color:debate.sideA.color,fontWeight:700}}>{pctA}% — {debate.sideA.label}</span>
            <span style={{color:"rgba(255,255,255,0.25)"}}>{total.toLocaleString()} total</span>
            <span style={{color:debate.sideB.color,fontWeight:700}}>{debate.sideB.label} — {pctB}%</span>
          </div>
        </div>
      ) : (
        <div style={{textAlign:"center",fontSize:"0.68rem",color:"rgba(255,255,255,0.2)",borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"12px"}}>
          Vote to see how {(total/1000).toFixed(1)}K fans split on this
        </div>
      )}
    </div>
  );
}

// ─── COMING SOON ─────────────────────────────────────────────────────────────

function ComingSoon({page}) {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",gap:"16px",animation:"fadeUp 0.4s ease forwards"}}>
      <div style={{fontSize:"3rem"}}>⚽</div>
      <h2 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2.5rem",color:"#D4AF37",letterSpacing:"0.06em"}}>{page}</h2>
      <p style={{color:"rgba(255,255,255,0.35)",fontSize:"0.9rem"}}>Coming soon — building next</p>
    </div>
  );
}


// ─── EMAIL SIGNUP MODAL ───────────────────────────────────────────────────────

// 👉 Free setup: go to formspree.io → New Form → copy your form ID and paste it below
const FORMSPREE_ID = "xyzabcde"; // ← replace with your real Formspree form ID

const ALL_TEAMS_FLAT = GROUPS.flatMap(g => g.teams.map(t => ({...t, groupId:g.id})));

function EmailModal({open, onClose}) {
  const [name,   setName]   = useState("");
  const [email,  setEmail]  = useState("");
  const [team,   setTeam]   = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [hovBtn, setHovBtn] = useState(false);

  const selectedTeam = ALL_TEAMS_FLAT.find(t => t.name === team);

  const reset     = () => { setName(""); setEmail(""); setTeam(""); setStatus("idle"); };
  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name, email, team,
          _subject: `New Golazo Fan — ${name} backing ${team || "mystery team"} 🌍`,
          _replyto: email,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  if (!open) return null;

  const inputStyle = {
    width:"100%", background:"rgba(255,255,255,0.04)",
    border:"1px solid rgba(255,255,255,0.1)", borderRadius:"10px",
    padding:"11px 14px", color:"#EEE9DF", fontSize:"0.88rem",
    fontFamily:"'DM Sans',sans-serif", outline:"none", transition:"border-color 0.2s",
  };
  const labelStyle = {
    fontSize:"0.6rem", color:"rgba(255,255,255,0.35)", letterSpacing:"0.14em",
    textTransform:"uppercase", display:"block", marginBottom:"5px",
  };

  return (
    <div onClick={handleClose} style={{
      position:"fixed",inset:0,zIndex:2000,
      display:"flex",alignItems:"center",justifyContent:"center",
      background:"rgba(0,0,0,0.78)",backdropFilter:"blur(10px)",
      animation:"fadeUp 0.2s ease both",padding:"20px",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"linear-gradient(160deg,#0d1520 0%,#060A10 100%)",
        border:"1px solid rgba(212,175,55,0.25)",
        borderRadius:"20px", padding:"36px 32px",
        width:"100%", maxWidth:"420px",
        position:"relative", overflow:"hidden",
        animation:"scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
        boxShadow:"0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.08)",
      }}>
        {/* gold top bar */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:"3px",background:"linear-gradient(90deg,#D4AF37,#FF6B35)"}}/>
        {/* glow blob */}
        <div style={{position:"absolute",top:"-60px",right:"-60px",width:"200px",height:"200px",background:"radial-gradient(circle,rgba(212,175,55,0.1) 0%,transparent 70%)",pointerEvents:"none"}}/>
        {/* close */}
        <button onClick={handleClose} style={{position:"absolute",top:"14px",right:"14px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"6px",padding:"4px 9px",color:"rgba(255,255,255,0.4)",cursor:"pointer",fontSize:"0.75rem",fontFamily:"'DM Sans',sans-serif",lineHeight:1}}>✕</button>

        {status === "success" ? (
          <div style={{textAlign:"center",animation:"fadeUp 0.4s ease both",padding:"8px 0"}}>
            <div style={{fontSize:"4rem",marginBottom:"10px",animation:"float 2.5s ease-in-out infinite"}}>
              {selectedTeam ? selectedTeam.flag : "🏆"}
            </div>
            <div style={{fontSize:"0.6rem",color:"#22C55E",letterSpacing:"0.2em",fontWeight:700,textTransform:"uppercase",marginBottom:"8px"}}>✓ You're In The Fan World</div>
            <h2 style={{fontFamily:"'Bebas Neue',cursive",fontSize:"2rem",letterSpacing:"0.05em",marginBottom:"8px",background:"linear-gradient(120deg,#fff,#D4AF37)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              Welcome, {name.split(" ")[0]}!
            </h2>
            <p style={{fontSize:"0.82rem",color:"rgba(255,255,255,0.45)",lineHeight:1.6,marginBottom:"20px"}}>
              You're now part of the Golazo fan community. Expect match alerts, hot debates, and daily tournament drops — starting Jun 11. 🔥
            </p>
            {team && selectedTeam && (
              <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(212,175,55,0.08)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:"10px",padding:"10px 18px",marginBottom:"20px",fontSize:"0.82rem"}}>
                <span style={{fontSize:"1.3rem"}}>{selectedTeam.flag}</span>
                <span style={{color:"rgba(255,255,255,0.5)"}}>Backing</span>
                <span style={{fontWeight:700,color:"#D4AF37"}}>{team}</span>
                <span style={{color:"rgba(255,255,255,0.35)"}}>all the way 🙌</span>
              </div>
            )}
            <button onClick={handleClose} style={{background:"#D4AF37",color:"#060A10",border:"none",borderRadius:"10px",padding:"12px 28px",fontWeight:700,fontSize:"0.88rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",width:"100%",transition:"all 0.2s"}}>
              Back to Golazo →
            </button>
          </div>
        ) : (
          <>
            <div style={{marginBottom:"22px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
                <div style={{width:"36px",height:"36px",background:"linear-gradient(135deg,#D4AF37,#FF6B35)",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"}}>⚽</div>
                <div>
                  <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:"1.5rem",color:"#D4AF37",letterSpacing:"0.06em",lineHeight:1}}>Join The Fan World</div>
                  <div style={{fontSize:"0.58rem",color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em"}}>GOLAZO · FIFA 2026</div>
                </div>
              </div>
              <p style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",lineHeight:1.6}}>
                Match alerts · Daily updates · Debate drops — all straight to your inbox from Jun 11.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input required placeholder="e.g. Alejandro Cruz" value={name} onChange={e=>setName(e.target.value)} style={inputStyle}
                  onFocus={e=>e.target.style.borderColor="rgba(212,175,55,0.5)"}
                  onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <input required type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle}
                  onFocus={e=>e.target.style.borderColor="rgba(212,175,55,0.5)"}
                  onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
              </div>

              <div>
                <label style={labelStyle}>Favourite Team <span style={{color:"rgba(255,255,255,0.2)"}}>(optional)</span></label>
                <div style={{position:"relative"}}>
                  {team && <span style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"1.1rem",pointerEvents:"none",zIndex:1}}>{selectedTeam?.flag}</span>}
                  <select value={team} onChange={e=>setTeam(e.target.value)} style={{...inputStyle,paddingLeft:team?"40px":"14px",color:team?"#EEE9DF":"rgba(255,255,255,0.35)",appearance:"none",cursor:"pointer"}}
                    onFocus={e=>e.target.style.borderColor="rgba(212,175,55,0.5)"}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}>
                    <option value="">Pick your team...</option>
                    {GROUPS.map(g=>(
                      <optgroup key={g.id} label={`Group ${g.id}${g.danger?" 🔥":""}`}>
                        {g.teams.map(t=><option key={t.name} value={t.name}>{t.flag} {t.name}</option>)}
                      </optgroup>
                    ))}
                  </select>
                  <div style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"rgba(255,255,255,0.3)",fontSize:"0.75rem"}}>▾</div>
                </div>
              </div>

              <button type="submit" disabled={status==="submitting"} onMouseEnter={()=>setHovBtn(true)} onMouseLeave={()=>setHovBtn(false)} style={{
                marginTop:"4px",
                background:status==="submitting"?"rgba(212,175,55,0.5)":hovBtn?"#E8C44A":"#D4AF37",
                color:"#060A10",border:"none",borderRadius:"10px",
                padding:"13px 24px",fontWeight:700,fontSize:"0.92rem",
                cursor:status==="submitting"?"not-allowed":"pointer",
                fontFamily:"'DM Sans',sans-serif",transition:"all 0.2s",
                transform:hovBtn&&status!=="submitting"?"translateY(-1px)":"none",
                boxShadow:hovBtn?"0 8px 24px rgba(212,175,55,0.3)":"none",
              }}>
                {status==="submitting" ? "🔄 Joining..." : "🔥 Join The Fan World →"}
              </button>

              {status==="error" && (
                <div style={{fontSize:"0.75rem",color:"#FF6B35",textAlign:"center",background:"rgba(255,107,53,0.08)",border:"1px solid rgba(255,107,53,0.2)",borderRadius:"8px",padding:"8px"}}>
                  Something went wrong — check your connection and try again.
                </div>
              )}

              <p style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.18)",textAlign:"center",lineHeight:1.5}}>
                No spam. Unsubscribe anytime. Fan-made · Not affiliated with FIFA.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── UTILS ───────────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const r=parseInt(hex.slice(1,3),16);
  const g=parseInt(hex.slice(3,5),16);
  const b=parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function Golazo() {
  const [activeNav,setActiveNav]=useState("Home");
  const [scrolled,setScrolled]=useState(false);
  const [showEmail,setShowEmail]=useState(false);

  useEffect(()=>{
    const el=document.getElementById("gz-root");
    const fn=()=>setScrolled(el?.scrollTop>50);
    el?.addEventListener("scroll",fn);
    return ()=>el?.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{
    document.getElementById("gz-root")?.scrollTo({top:0,behavior:"smooth"});
  },[activeNav]);

  const renderPage=()=>{
    switch(activeNav){
      case "Home":        return <HomePage setActiveNav={setActiveNav}/>;
      case "Groups":      return <GroupsPage/>;
      case "Fixtures":    return <FixturesPage/>;
      case "Buzz":        return <BuzzPage/>;
      case "Predictions": return <PredictionsPage/>;
      case "Kits":        return <KitsPage/>;
      case "Debate":      return <DebatePage/>;
      default:            return <HomePage setActiveNav={setActiveNav}/>;
    }
  };

  return (
    <div id="gz-root" style={{fontFamily:"'DM Sans', sans-serif",background:"#060A10",color:"#EEE9DF",minHeight:"100vh",overflowY:"auto",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@1&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:#D4AF37;border-radius:2px;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(212,175,55,0.15)}50%{box-shadow:0 0 60px rgba(212,175,55,0.4)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes float-trophy{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-12px) rotate(1deg)}}
        @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes unblur{from{filter:blur(12px);opacity:0.4}to{filter:blur(0px);opacity:1}}
        .img-reveal{animation:unblur 0.8s ease forwards;}
        @keyframes slideUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideLeft{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.94)}to{opacity:1;transform:scale(1)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes barGrow{from{width:0}to{width:var(--bar-w)}}
        @keyframes pulseDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:0.6}}
        @keyframes glitch{0%,100%{clip-path:inset(0 0 100% 0)}10%{clip-path:inset(10% 0 60% 0)}20%{clip-path:inset(40% 0 30% 0)}30%{clip-path:inset(0 0 100% 0)}}
        .buzz-card{transition:transform 0.25s ease,box-shadow 0.25s ease,border-color 0.25s ease;}
        .buzz-card:hover{transform:translateY(-3px) rotate(0.2deg);box-shadow:0 12px 40px rgba(0,0,0,0.35);}
        .tag-btn{transition:all 0.2s ease;}
        .tag-btn:hover{transform:translateY(-1px);}
        .hype-bar-fill{transition:width 1.2s cubic-bezier(0.4,0,0.2,1);}
        .stat-row{transition:background 0.2s ease;}
        .stat-row:hover{background:rgba(255,255,255,0.03)!important;}
        .nav-btn:hover{color:#D4AF37!important;}
        .group-card:hover{border-color:rgba(212,175,55,0.45)!important;transform:translateY(-3px);}
        .fix-row:hover{background:rgba(212,175,55,0.05)!important;border-color:rgba(212,175,55,0.2)!important;}
        .fav-card:hover{transform:translateY(-5px);box-shadow:0 12px 40px rgba(0,0,0,0.4)!important;}
        .predict-btn:hover{filter:brightness(1.15);transform:translateY(-1px);}
        .join-btn:hover{background:#E8C44A!important;transform:translateY(-2px);}
        @media(max-width:768px){
          .nav-links{display:none!important;}
          .desktop-only{display:none!important;}
          .hamburger-btn{display:flex!important;}
          .mobile-join-btn{display:flex!important;}
          .logo-sub{display:none!important;}
          .logo-name{font-size:1.15rem!important;}
          .hero-grid{grid-template-columns:1fr!important;min-height:auto!important;padding:32px 20px 24px!important;gap:20px!important;}
          .hero-trophy-col{display:none!important;}
          .mobile-trophy-show{display:block!important;}
          .hero-text{text-align:center;}
          .hero-text h1{font-size:clamp(3.2rem,16vw,5.5rem)!important;}
          .hero-text p{margin:0 auto 24px!important;}
          .hero-countdown{justify-content:center!important;}
          .hero-btns{justify-content:center!important;flex-direction:column!important;}
          .hero-btns button{width:100%!important;justify-content:center!important;}
          .hero-badge{justify-content:center!important;}
        }

      `}</style>
      <EmailModal open={showEmail} onClose={()=>setShowEmail(false)}/>
      <NavBar activeNav={activeNav} setActiveNav={setActiveNav} scrolled={scrolled} onJoin={()=>setShowEmail(true)}/>
      {renderPage()}
      <Footer/>
    </div>
  );
}
