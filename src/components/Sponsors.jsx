import { freedomIconGold } from '../assets/freedom250'

const SPONSORS = [
  { key: 'coca-cola',   name: 'Coca-Cola',     tier: 'Presenting'    },
  { key: 'pepsi',       name: 'Pepsi',         tier: 'Beverage'      },
  { key: 'papa-johns',  name: "Papa John's",   tier: 'Pizza'         },
  { key: 'dominos',     name: "Domino's",      tier: 'Pizza'         },
  { key: 'wendys',      name: "Wendy's",       tier: 'Quick Service' },
  { key: 'burger-king', name: 'Burger King',   tier: 'Quick Service' },
]

function SponsorTile({ sponsor }) {
  return (
    <div className="sponsor-chip" aria-label={sponsor.name}>
      <span className="sponsor-chip-tier">{sponsor.tier}</span>
      <span className="sponsor-chip-name">{sponsor.name}</span>
    </div>
  )
}

export default function Sponsors() {
  const loop = [...SPONSORS, ...SPONSORS]

  return (
    <section className="sponsors enter d2" aria-labelledby="sponsors-heading">
      <header className="sponsors-head">
        <span className="sponsors-eyebrow">
          <img src={freedomIconGold} alt="" aria-hidden="true" />
          Powered by our partners
        </span>
        <h2 id="sponsors-heading" className="sponsors-title">
          Official sponsors of <em>Freedom 250</em>
        </h2>
      </header>

      <div className="sponsor-rail" role="region" aria-label="Sponsor names">
        <div className="sponsor-rail-track">
          {loop.map((sponsor, index) => (
            <SponsorTile sponsor={sponsor} key={`${sponsor.key}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
