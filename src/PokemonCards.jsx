import React from 'react'
import './pokemon.css'

export const samplePokemons = [
  { id: 1, name: "Bulbasaur", type: "Grass", hp: 45, attack: 49 },
  { id: 4, name: "Charmander", type: "Fire", hp: 39, attack: 52 },
  { id: 7, name: "Squirtle", type: "Water", hp: 44, attack: 48 },
  { id: 25, name: "Pikachu", type: "Electric", hp: 35, attack: 55 },
  { id: 6, name: "Charizard", type: "Fire", hp: 78, attack: 84 },
  { id: 9, name: "Blastoise", type: "Water", hp: 79, attack: 83 },
  { id: 3, name: "Venusaur", type: "Grass", hp: 80, attack: 82 },
  { id: 150, name: "Mewtwo", type: "Psychic", hp: 106, attack: 110 },
  { id: 39, name: "Jigglypuff", type: "Normal", hp: 115, attack: 45 },
  { id: 143, name: "Snorlax", type: "Normal", hp: 160, attack: 110 },
  { id: 94, name: "Gengar", type: "Ghost", hp: 60, attack: 65 },
  { id: 131, name: "Lapras", type: "Water", hp: 130, attack: 85 },
  { id: 133, name: "Eevee", type: "Normal", hp: 55, attack: 55 },
  { id: 149, name: "Dragonite", type: "Dragon", hp: 91, attack: 134 },
  { id: 59, name: "Arcanine", type: "Fire", hp: 90, attack: 110 },
  { id: 65, name: "Alakazam", type: "Psychic", hp: 55, attack: 50 },
  { id: 68, name: "Machamp", type: "Fighting", hp: 90, attack: 130 },
  { id: 76, name: "Golem", type: "Rock", hp: 80, attack: 120 },
  { id: 130, name: "Gyarados", type: "Water", hp: 95, attack: 125 },
  { id: 148, name: "Dragonair", type: "Dragon", hp: 61, attack: 84 },
];

export default function PokemonCards({ pokemons = samplePokemons, favorites = new Set(), onToggleFavorite = () => {} }) {
  const maxHP = Math.max(...pokemons.map(p => p.hp), 100)
  const maxAttack = Math.max(...pokemons.map(p => p.attack), 100)

  return (
    <div className="pokemon-grid">
      {pokemons.map(p => {
        const hpPct = Math.round((p.hp / maxHP) * 100)
        const attackPct = Math.round((p.attack / maxAttack) * 100)
        const imgUrl = p.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`
        const isFav = favorites.has && favorites.has(p.id)
        return (
          <div key={p.id} className="pokemon-card">
            <button
              className={`fav-toggle ${isFav ? 'fav' : ''}`}
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); onToggleFavorite(p.id) }}
              aria-label={isFav ? 'Unfavorite' : 'Favorite'}
            >
              {isFav ? '♥' : '♡'}
            </button>

            <a href={imgUrl} target="_blank" rel="noopener noreferrer">
              <img src={imgUrl} alt={p.name} />
            </a>
            <h3 className="pokemon-name">{p.name} <span className="pokemon-id">#{p.id}</span></h3>
            <p className="pokemon-type">{p.type}</p>

            <div className="stat-bars">
              <div className="stat">
                <div className="stat-label">HP</div>
                <div className="bar">
                  <div className="bar-fill hp" style={{ width: `${hpPct}%` }}></div>
                </div>
                <div className="stat-value">{p.hp}</div>
              </div>

              <div className="stat">
                <div className="stat-label">ATK</div>
                <div className="bar">
                  <div className="bar-fill attack" style={{ width: `${attackPct}%` }}></div>
                </div>
                <div className="stat-value">{p.attack}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}