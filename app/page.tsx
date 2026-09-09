"use client"

import { useMemo, useState } from "react"
import { Activity, Bell, CalendarDays, ChevronDown, ChevronRight, CircleUserRound, Cpu, Gauge, Home, Leaf, List, Menu, Plus, Radio, Search, Settings, Sprout, Thermometer, Droplets, Wind, X } from "lucide-react"

type Plant = { id: string; name: string; stage: string; kind: string; color: string; image: string }
type Crop = Plant & { zone: string; temp: string; humidity: string; light: string; status: "Óptimo" | "Atención" }

const plantImages = {
  lettuce: "/lettuce.png",
  tomato: "/lettuce.png",
  basil: "/lettuce.png",
  strawberry: "/lettuce.png",
  pepper: "/lettuce.png",
}

const plants: Plant[] = [
  { id: "PLT-2024-001", name: "Lechuga Romana", stage: "Crecimiento", kind: "Hortícola", color: "green", image: plantImages.lettuce },
  { id: "PLT-2024-002", name: "Tomate Cherry", stage: "Floración", kind: "Hortícola", color: "green", image: plantImages.tomato },
  { id: "PLT-2024-003", name: "Albahaca", stage: "Crecimiento", kind: "Aromática", color: "purple", image: plantImages.basil },
  { id: "PLT-2024-004", name: "Fresa", stage: "Fructificación", kind: "Frutal", color: "orange", image: plantImages.strawberry },
  { id: "PLT-2024-005", name: "Pimiento", stage: "Floración", kind: "Hortícola", color: "green", image: plantImages.pepper },
]

const crops: Crop[] = Array.from({ length: 12 }, (_, index) => ({
  ...plants[0], id: `PLT-2024-${String(index + 1).padStart(3, "0")}`, name: "Lechuga Crespa", zone: `Sector A-Cama3-Nivel${(index % 3) + 1}`,
  temp: index === 3 ? "40.1C" : "26.1C", humidity: "73%", light: "990 ppm", status: index === 3 ? "Atención" : "Óptimo",
}))

const nav = [{ label: "Dashboard", icon: Home }, { label: "Plantas", icon: Sprout, active: true }, { label: "Monitoreo", icon: Activity }, { label: "Sensores", icon: Cpu }, { label: "Punto de Acceso", icon: Radio }, { label: "Alertas", icon: Bell }, { label: "Configuración", icon: Settings }]

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
    <div className="brand"><div className="brand-mark"><Leaf size={28} strokeWidth={2.5} /></div><div><strong>GreenHouse</strong><span>Sistema de Monitoreo</span></div><button className="close-mobile" onClick={onClose} aria-label="Cerrar menú"><X size={20} /></button></div>
    <nav>{nav.map(({ label, icon: Icon, active }) => <button className={`nav-item ${active ? "active" : ""}`} key={label}><Icon size={19} /><span>{label}</span></button>)}</nav>
    <div className="system-status"><span className="online-dot" /><div><strong>Sistema en línea</strong><span>Última actualización:<br />26/05/2024 10:30a.m.</span></div></div>
  </aside>
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  return <header className="topbar"><button className="menu-button" onClick={onMenu} aria-label="Abrir menú"><Menu size={22} /></button><div className="page-heading"><h1>Plantas</h1><span>Resumen general del invernadero</span></div><div className="top-actions"><button className="greenhouse-select"><Home size={22} /><span>Invernadero 1</span><ChevronDown size={14} /></button><div className="date"><CalendarDays size={20} /><span>26/05/2024<br /><b>10:30a.m.</b></span></div><div className="avatar"><CircleUserRound size={25} /></div></div></header>
}

function PlantSelector({ selected, onSelect }: { selected: Plant; onSelect: (plant: Plant) => void }) {
  const [query, setQuery] = useState("")
  const filtered = plants.filter((plant) => plant.name.toLowerCase().includes(query.toLowerCase()))
  return <section className="plant-selector"><h2>Seleccionar Planta</h2><label className="search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar planta" aria-label="Buscar planta" /></label><div className="plant-list">{filtered.map((plant) => <button key={plant.id} onClick={() => onSelect(plant)} className={`plant-row ${selected.id === plant.id ? "selected" : ""}`}><img src={plant.image} alt="" /><span className="plant-copy"><strong>{plant.name}</strong><small>Etapa: {plant.stage}</small><small className="plant-id">ID: {plant.id}</small></span><em className={`tag ${plant.color}`}>{plant.kind}</em></button>)}</div><button className="new-plant"><Plus size={18} /> Nueva Planta</button></section>
}

function CropCard({ crop }: { crop: Crop }) {
  return <article className="crop-card"><div className="crop-main"><img src={crop.image} alt={crop.name} /><div className="crop-details"><div className="crop-title"><strong>{crop.name}</strong><span>Hortícola</span></div><small>{crop.zone}</small><b>{crop.id}</b></div></div><div className="metrics"><span><Thermometer size={14} />{crop.temp}</span><span><Droplets size={14} />{crop.humidity}</span><span><Gauge size={14} />{crop.light}</span></div><div className={`crop-status ${crop.status === "Atención" ? "attention" : ""}`}><span><i />{crop.status}</span><ChevronRight size={19} /></div></article>
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState(plants[0])
  const [showAll, setShowAll] = useState(false)
  const visibleCrops = useMemo(() => showAll ? crops : crops.slice(0, 12), [showAll])
  return <div className="app-shell"><Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} /><div className="main-shell"><Topbar onMenu={() => setMenuOpen(true)} /><main><div className="content-heading"><h2>Cultivos Activos <span>(10)</span></h2><button onClick={() => setShowAll((value) => !value)}><List size={17} /> {showAll ? "Ver menos" : "Ver todas las plantas"}</button></div><div className="dashboard-grid"><PlantSelector selected={selected} onSelect={setSelected} /><section className="cultivation-area"><article className="featured-crop"><img src={selected.image} alt={selected.name} /><div className="featured-copy"><div className="title-row"><div><h3>{selected.name}</h3><span className="tag green">Hortícola</span></div><button className="edit-button">Editar Planta</button></div><div className="featured-meta"><span><b>ID Planta</b>{selected.id}</span><span><b>Etapa Actual</b>{selected.stage}</span><span><b>Fecha de Siembra</b>10/05/2024</span><span><b>Días en Etapa</b>16 días</span><span><b>Próxima Etapa</b>Desarrollo</span></div><div className="description"><b>Descripción</b><p>Variedad de lechuga de hoja larga y crujiente. Requiere temperaturas moderadas y humedad constante para un crecimiento óptimo.</p></div></div></article><div className="crop-grid">{visibleCrops.map((crop) => <CropCard crop={crop} key={crop.id} />)}</div></section></div></main></div></div>
}
