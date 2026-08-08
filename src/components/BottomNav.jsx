const items=[['home','🏠','Home'],['subjects','📘','Subjects'],['timetable','🗓️','Timetable'],['settings','⚙️','Settings']];
export default function BottomNav({ page, setPage }) { return <nav className="bottomNav">{items.map(([id,icon,label])=><button key={id} className={page===id?'active':''} onClick={()=>setPage(id)}><span>{icon}</span>{label}</button>)}</nav>; }
