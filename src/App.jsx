// App.jsx
import { useState, useMemo, useEffect } from "react";
import "./App.css";
import PokemonCards, { samplePokemons } from './PokemonCards'
import './pokemon.css'

function TypeFilters({ pokemons, favorites, selectedType, onChange }) {
  const types = useMemo(() => {
    const set = new Set(pokemons.map(p => p.type));
    return ["All", ...Array.from(set).sort()];
  }, [pokemons]);

  const favCount = favorites ? favorites.size ?? 0 : 0;

  // Optionally hide Favorites pill when zero
  const pills = favCount > 0
    ? ["All", `Favorites (${favCount})`, ...types.filter(t => t !== "All")]
    : ["All", ...types.filter(t => t !== "All")];

  return (
    <div className="filter-pills" role="tablist" aria-label="Type filters">
      {pills.map(label => {
        const value = label.startsWith("Favorites") ? "Favorites" : label;
        const isActive = selectedType === value;
        return (
          <button
            key={label}
            className={`pill ${isActive ? 'active' : ''}`}
            onClick={() => onChange(value)}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function Controls({ search, setSearch, sortBy, setSortBy, sortDir, setSortDir }) {
  return (
    <div className="controls">
      <input
        type="search"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
        aria-label="Search pokemons"
      />

      <div className="sort-group" role="group" aria-label="Sort options">
        <label>
          Sort:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="hp">HP</option>
            <option value="attack">Attack</option>
          </select>
        </label>

        <label>
          <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
            <option value="asc">↑ Asc</option>
            <option value="desc">↓ Desc</option>
          </select>
        </label>
      </div>
    </div>
  );
}

function App() {
  const [selectedType, setSelectedType] = useState('All');
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch (e) {
      return new Set();
    }
  });

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify([...favorites]));
    } catch (e) {
      // ignore localStorage errors
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Derived filtered + searched + sorted list
  const filtered = useMemo(() => {
    let list = samplePokemons;

    // filter by type / favorites
    if (selectedType === 'Favorites') {
      list = list.filter(p => favorites.has(p.id));
    } else if (selectedType !== 'All') {
      list = list.filter(p => p.type === selectedType);
    }

    // search
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      list = list.filter(p => `${p.name} ${p.type}`.toLowerCase().includes(q));
    }

    // sort
    const s = [...list];
    s.sort((a, b) => {
      let av = a[sortBy], bv = b[sortBy];
      if (sortBy === 'name') {
        av = av.toLowerCase(); bv = bv.toLowerCase();
        if (av < bv) return sortDir === 'asc' ? -1 : 1;
        if (av > bv) return sortDir === 'asc' ? 1 : -1;
        return 0;
      } else {
        // numeric
        return sortDir === 'asc' ? av - bv : bv - av;
      }
    });

    return s;
  }, [selectedType, favorites, search, sortBy, sortDir]);

  return (
    <div className="app-container">
      <header>
        <h1>Pokémon Explorer</h1>
      </header>

      <Controls
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDir={sortDir}
        setSortDir={setSortDir}
      />

      <TypeFilters
        pokemons={samplePokemons}
        favorites={favorites}
        selectedType={selectedType}
        onChange={(type) => setSelectedType(type)}
      />

      <main>
        <PokemonCards
          pokemons={filtered}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </main>
    </div>
  );
}

export default App;