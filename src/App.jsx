import { useState, useMemo } from "react";
import "./App.css";
import * as d3 from "d3";
import PokemonCards, { samplePokemons } from './PokemonCards'

function TypeFilters({ pokemons, favorites, selectedType, onChange }) {
  const types = useMemo(() => {
    const set = new Set(pokemons.map(p => p.type));
    return ["All", ...Array.from(set).sort()];
  }, [pokemons]);

  const favCount = favorites ? favorites.size ?? 0 : 0;

  // Build final pills: put Favorites after All, keep types after that
  const pills = ["All", `Favorites (${favCount})`, ...types.filter(t => t !== "All")];

  return (
    <div className="filter-pills">
      {pills.map(t => {
        // We want the selectedType to be "Favorites" when user clicks the favorites pill.
        const pillValue = t.startsWith("Favorites") ? "Favorites" : t;
        const isActive = selectedType === pillValue;
        return (
          <button
            key={t}
            className={`pill ${isActive ? 'active' : ''}`}
            onClick={() => onChange(pillValue)}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [selectedType, setSelectedType] = useState('All')
  const [favorites, setFavorites] = useState(new Set())

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = useMemo(() => {
    if (selectedType === 'All') return samplePokemons
    if (selectedType === 'Favorites') return samplePokemons.filter(p => favorites.has(p.id))
    return samplePokemons.filter(p => p.type === selectedType)
  }, [selectedType, favorites])

  return (
    <>
      <div></div>
      <h1>Pokemon Explorer</h1>

 <TypeFilters
  pokemons={samplePokemons}
  favorites={favorites}
  onChange={(type) => setSelectedType(type)}
  selectedType={selectedType}
/>

      <PokemonCards pokemons={filtered} favorites={favorites} onToggleFavorite={toggleFavorite} />

      
    </>
  );
}

export default App;