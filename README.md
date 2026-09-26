# MOVEIT — Smart Public Bus Transport Coordination & Capacity Management System

> **Smart Public Bus Transport Platform**  
> *"Better Information. Better Decisions. Better Bus Coordination."*

---

## 📌 Project Overview

**MOVEIT** is a modern, responsive public transportation coordination and capacity management web application. It is specifically designed to eliminate the information gap between commuters waiting at bus stops and public transport operators managing fleet capacity.

### The 4 Core Problems MOVEIT Solves:
1. **When the next bus will arrive**: Accurate live arrival ETAs for every approaching bus.
2. **How much capacity is occupied**: Exact occupancy percentages (**42%, 68%, 75%, 94%, 100%**) rather than ambiguous "Low/Medium/High" labels.
3. **Whether the approaching bus has available capacity**: Exact seat availability count (e.g., *"3 seats left"*, *"29 seats left"*).
4. **When the next less-crowded bus will arrive**: Side-by-side comparison tables and smart recommendations that suggest waiting a few extra minutes for a significantly emptier bus.

For transport operators, MOVEIT provides real-time visibility into **passenger demand at bus stops**, **crowded buses requiring relief**, and **available fleet capacity**.

---

## 🚀 Key Pages & Features

| # | Page / Screen | Path | Description |
|---|---|---|---|
| 1 | **Landing Page** | `/` | Hero section, problem statement, role selector (Passenger / Authority), 3-step coordination loop visualization. |
| 2 | **Login Page** | `/login` | Modern login with quick one-click prototype role bypass (No auth barrier for demo). |
| 3 | **Passenger Dashboard** | `/passenger/dashboard` | **The Core Screen**: *"Where are you now?"* stop selector, *"I'm at this bus stop"* demand check-in, live waiting count, upcoming bus cards, smart less-crowded recommendation, and bus comparison area. |
| 4 | **Select Bus Stop** | `/passenger/stops` | Search and choose boarding bus stops (Virar, Vasai, Nalasopara, etc.), inspect waiting demand, and confirm presence. |
| 5 | **Bus Details** | `/passenger/bus/:busId` | In-depth bus information, ASCII/segment visual occupancy grid (`94% Occupied [██████████████████░░] Available: 3 seats`), and step-by-step route progression. |
| 6 | **Transport Authority Dashboard** | `/authority/dashboard` | 4 top summary metric cards (Active Buses: 42, Waiting Passengers: 318, Crowded Buses: 7, Available Capacity: 624) and live bus monitoring table with backup dispatch action. |
| 7 | **Bus Monitoring** | `/authority/monitoring` | Fleet search, route & occupancy filters, table/grid view toggle, and interactive schematic corridor map with live bus pins. |
| 8 | **Passenger Demand** | `/authority/demand` | Demand breakdown by station, queue analysis, and visual passenger demand distribution chart. |

---

## 🎨 Design System

Designed according to SaaS principles with a clean, pastel, transit-friendly aesthetic:
- **Background**: Soft off-white (`#f8fafc`)
- **Pastel Blue**: Primary actions, info alerts (`#eff6ff`, `#2563eb`)
- **Pastel Lavender**: Control center & authority elements (`#f5f3ff`, `#6d28d9`)
- **Pastel Mint Green**: Available seats & healthy capacity (`#ecfdf5`, `#10b981`)
- **Pastel Peach / Soft Orange**: Moderate load & warnings (`#fff7ed`, `#f97316`)
- **Soft Rose**: Critical overcrowding indicator (`#fff1f2`, `#be123c`)
- **Rounded Cards**: 12–16px border-radius with subtle shadows
- **Clean Typography**: Plus Jakarta Sans & Inter
- **Fully Responsive**: Adapts seamlessly to Desktop, Tablet, and Mobile screens.

---

## 🛠️ Technology Stack

- **React 18** (Functional components, Hooks, Context API)
- **Vite** (Next-generation fast bundler)
- **React Router v6** (Client-side routing)
- **Lucide React** (Clean, modern icon set)
- **Modern CSS** (Design tokens, CSS variables, flexbox/grid layout)

---

## 📂 Project Structure

```
moveit/
├── index.html                 # HTML shell with Google Fonts & transit favicon
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── src/
│   ├── main.jsx               # React entry point with BrowserRouter & Provider
│   ├── App.jsx                # Route definitions & layout wrappers
│   ├── index.css              # Modern SaaS pastel design system & responsive rules
│   ├── context/
│   │   └── TransportContext.jsx # Global state (active stop, check-ins, buses, roles)
│   ├── data/
│   │   └── mockData.js        # Decoupled mock database (ready for Supabase migration)
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky header with role switch & notifications
│   │   ├── Sidebar.jsx        # Transport Authority sidebar navigation
│   │   ├── BusCard.jsx        # Individual bus card with ETA, occupancy %, seats
│   │   ├── BusTable.jsx       # Tabular fleet monitoring for operators
│   │   ├── BusStopSelector.jsx# Interactive "Where are you now?" component
│   │   ├── OccupancyIndicator.jsx # Percentage bar and segment capacity grid
│   │   ├── StatCard.jsx       # Pastel KPI metric card
│   │   ├── StatusBadge.jsx    # Status pill with icons (Available, Moderate, Crowded)
│   │   ├── RouteProgress.jsx  # 4-stage progression indicator
│   │   ├── ComparisonTable.jsx# Side-by-side bus comparison area
│   │   ├── DemandChart.jsx    # Visual passenger demand bar chart
│   │   ├── TransitMap.jsx     # Interactive schematic corridor & bus markers
│   │   ├── SearchBar.jsx      # Reusable search input
│   │   ├── FilterBar.jsx      # Route & occupancy filter controls
│   │   └── EmptyState.jsx     # Graceful empty search placeholder
│   └── pages/
│       ├── LandingPage.jsx         # Page 1
│       ├── LoginPage.jsx           # Page 2
│       ├── PassengerDashboard.jsx  # Page 3 (Core screen)
│       ├── BusStopSelectionPage.jsx# Page 4
│       ├── BusDetailsPage.jsx      # Page 5
│       ├── AuthorityDashboard.jsx  # Page 6
│       ├── BusMonitoringPage.jsx   # Page 7
│       └── PassengerDemandPage.jsx # Page 8
```

---

## 🔌 Future Supabase Integration Roadmap

All mock data is cleanly isolated inside `src/data/mockData.js` and `src/context/TransportContext.jsx`. When your college Idea Lab is ready to add a real backend:

1. **Authentication**:
   Replace `setUserRole` with Supabase Auth:
   ```js
   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
   ```
2. **Real Database**:
   Replace mock arrays with Supabase table queries:
   ```js
   const { data: buses } = await supabase.from('buses').select('*');
   const { data: stops } = await supabase.from('bus_stops').select('*');
   ```
3. **Real-time Coordination**:
   Use Supabase Realtime Channels to listen for passenger check-in updates and GPS bus coordinates:
   ```js
   supabase.channel('public:buses').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'buses' }, handleUpdate).subscribe();
   ```

---

## 💻 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
http://localhost:5173
```
