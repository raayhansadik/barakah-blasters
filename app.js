/**
 * Barakah Blasters - Main Application Logic
 * 10 Elite Cricket Warriors dataset, Interactive Grid, Tactical Pitch, Match Center, Countdown
 */

// Generate stylized SVG portrait for each player in official navy & gold kit
function getPlayerAvatarSVG(id, number, archetype) {
  const helmetColor = '#0d1e47';
  const visorColor = '#f59e0b';
  const skinTones = ['#e0ac69', '#dfa15a', '#c68642', '#d2996e', '#e8b88a', '#c58349'];
  const skin = skinTones[(id - 1) % skinTones.length];

  // Headwear variation based on role
  let headwearSvg = '';
  if (archetype === 'keeper') {
    headwearSvg = `
      <!-- Keeper Helmet with Grille -->
      <path d="M70,75 C70,40 130,40 130,75 L130,95 L70,95 Z" fill="${helmetColor}" stroke="#f59e0b" stroke-width="2"/>
      <path d="M68,78 C90,82 110,82 132,78" stroke="#f59e0b" stroke-width="3" fill="none"/>
      <!-- Grille -->
      <line x1="75" y1="90" x2="125" y2="90" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="80" y1="98" x2="120" y2="98" stroke="#cbd5e1" stroke-width="2"/>
      <line x1="88" y1="88" x2="88" y2="105" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="100" y1="88" x2="100" y2="105" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="112" y1="88" x2="112" y2="105" stroke="#cbd5e1" stroke-width="1.5"/>
    `;
  } else if (archetype === 'opener' || archetype === 'power') {
    headwearSvg = `
      <!-- Batting Helmet -->
      <path d="M68,72 C68,36 132,36 132,72 L132,92 L68,92 Z" fill="${helmetColor}" stroke="#f59e0b" stroke-width="2"/>
      <path d="M64,74 Q100,68 136,74" fill="none" stroke="${visorColor}" stroke-width="4"/>
      <!-- Grille bars -->
      <path d="M74,90 Q100,98 126,90" fill="none" stroke="#cbd5e1" stroke-width="2.5"/>
      <line x1="100" y1="86" x2="100" y2="102" stroke="#cbd5e1" stroke-width="2"/>
    `;
  } else if (archetype === 'pacer') {
    headwearSvg = `
      <!-- Dynamic Fast Bowler Flowing Hair -->
      <path d="M66,75 C60,45 85,32 100,32 C120,32 140,45 134,75 C132,60 120,48 100,48 C80,48 68,60 66,75 Z" fill="#1e1b18"/>
      <!-- Athletic Headband -->
      <rect x="70" y="66" width="60" height="9" rx="3" fill="#f59e0b" stroke="#040d09" stroke-width="1"/>
    `;
  } else if (archetype === 'spinner') {
    headwearSvg = `
      <!-- Team Cricket Cap -->
      <path d="M72,70 C72,45 128,45 128,70 Z" fill="${helmetColor}"/>
      <!-- Cap Peak -->
      <path d="M64,70 Q100,62 136,70 L140,75 Q100,68 60,75 Z" fill="#081432" stroke="#f59e0b" stroke-width="1.5"/>
      <!-- Cap Crest -->
      <circle cx="100" cy="58" r="4" fill="#fbbf24"/>
    `;
  } else {
    // Stylized Athletic Haircut
    headwearSvg = `
      <path d="M68,70 C65,42 90,34 100,34 C120,34 135,45 132,70 C128,52 115,44 100,44 C82,44 72,55 68,70 Z" fill="#1e293b"/>
      <path d="M70,68 C80,64 120,64 130,68" stroke="#f59e0b" stroke-width="2" fill="none" opacity="0.6"/>
    `;
  }

  return `
    <svg viewBox="0 0 200 220" class="player-svg-avatar" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jerseyGrad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0d1e47"/>
          <stop offset="60%" stop-color="#091638"/>
          <stop offset="100%" stop-color="#040b1c"/>
        </linearGradient>
        <linearGradient id="goldAcc_${id}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#fbbf24"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
        <radialGradient id="glowBack_${id}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0d1e47" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#0d1e47" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Atmospheric aura -->
      <circle cx="100" cy="110" r="85" fill="url(#glowBack_${id})"/>

      <!-- Shoulders & Jersey Torso -->
      <path d="M35,215 C40,165 65,145 90,140 L110,140 C135,145 160,165 165,215 Z" fill="url(#jerseyGrad_${id})" stroke="rgba(245, 158, 11, 0.4)" stroke-width="1.5"/>

      <!-- Jersey Gold Chevron Stripes -->
      <path d="M50,195 L100,165 L150,195" fill="none" stroke="url(#goldAcc_${id})" stroke-width="4" stroke-linecap="round"/>
      <path d="M60,210 L100,180 L140,210" fill="none" stroke="#10b981" stroke-width="2.5" opacity="0.8"/>

      <!-- Team Chest Crest -->
      <circle cx="78" cy="165" r="7" fill="#f59e0b"/>
      <path d="M75,165 L81,165 M78,162 L78,168" stroke="#040d09" stroke-width="1.5"/>

      <!-- Jersey Number Watermark on Chest -->
      <text x="122" y="172" fill="rgba(255, 255, 255, 0.25)" font-family="Outfit, sans-serif" font-size="14" font-weight="900" text-anchor="middle">#${number}</text>

      <!-- Jersey Athletic Collar -->
      <path d="M82,140 L100,160 L118,140 Z" fill="#03160e" stroke="url(#goldAcc_${id})" stroke-width="2"/>

      <!-- Muscular Neck -->
      <rect x="88" y="112" width="24" height="32" rx="4" fill="${skin}"/>

      <!-- Chin & Jaw -->
      <path d="M78,85 C78,125 122,125 122,85 Z" fill="${skin}"/>

      <!-- Ears -->
      <ellipse cx="74" cy="90" rx="4" ry="7" fill="${skin}"/>
      <ellipse cx="126" cy="90" rx="4" ry="7" fill="${skin}"/>

      <!-- Eyes & Focused Eyebrows -->
      <path d="M84,86 L94,87 M106,87 L116,86" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/>
      <circle cx="89" cy="92" r="2.5" fill="#0f172a"/>
      <circle cx="111" cy="92" r="2.5" fill="#0f172a"/>
      <!-- Catchlight -->
      <circle cx="90" cy="91" r="0.8" fill="#ffffff"/>
      <circle cx="112" cy="91" r="0.8" fill="#ffffff"/>

      <!-- Athletic nose & determined mouth -->
      <path d="M100,92 L98,99 L102,99" fill="none" stroke="#a06030" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M94,106 Q100,108 106,106" fill="none" stroke="#683412" stroke-width="2" stroke-linecap="round"/>

      <!-- Headwear / Haircut -->
      ${headwearSvg}
    </svg>
  `;
}

// 10 Elite Players of Barakah Blasters (Photo Card Formation)
const BLASTERS_SQUAD = [
  {
    id: 1,
    number: 1,
    name: 'Muhammad',
    nickname: 'Thunderbolt',
    role: 'batsman',
    roleDisplay: 'Top-Order Batsman',
    archetype: 'opener',
    image: 'assets/player-2.jpg',
    batting: 'Left Hand Bat',
    bowling: 'Right-Arm Off Break',
    subrole: 'Explosive Opening Striker',
    matches: 42,
    runs: 1680,
    wickets: 4,
    strikeRate: 168.5,
    economy: 8.4,
    topScore: '112* (48b)',
    bestBowling: '2/15',
    pitchPos: { x: 20, y: 34, label: 'Deep Extra Cover' },
    quote: 'The first six balls set the law of the match. I strike first.',
    bio: 'Renowned for dismantling opening attacks within the powerplay. Muhammad unleashes blazing bat speeds and effortless lofted cover drives.',
    skills: {
      power: 98,
      technique: 85,
      bowling: 45,
      speed: 92,
      clutch: 90
    },
    signature: 'Powerplay Lofted Inside-Out Six'
  },
  {
    id: 2,
    number: 2,
    name: 'G.Navid',
    nickname: 'The Anchor',
    role: 'allrounder',
    roleDisplay: 'All-Rounder',
    archetype: 'anchor',
    viceCaptain: true,
    image: 'assets/player-3.jpg',
    batting: 'Right Hand Bat',
    bowling: 'Right-Arm Off Break',
    subrole: 'Vice Captain & Classical All-Rounder',
    matches: 45,
    runs: 1510,
    wickets: 8,
    strikeRate: 138.4,
    economy: 7.8,
    topScore: '96* (61b)',
    bestBowling: '2/22',
    pitchPos: { x: 30, y: 52, label: 'Extra Cover' },
    quote: 'Patience pierces any field. When they bowl good, we play great.',
    bio: 'The textbook cricket technician. G.Navid anchors the innings, rotates strike masterfully, and chips in with crucial off-break breakthroughs.',
    skills: {
      power: 82,
      technique: 98,
      bowling: 78,
      speed: 82,
      clutch: 94
    },
    signature: 'Velvet Cover Drive & Piercing Slices'
  },
  {
    id: 3,
    number: 3,
    name: 'Yusha',
    nickname: 'The Magician',
    role: 'bowler',
    roleDisplay: 'Bowler',
    archetype: 'spinner',
    image: 'assets/player-7.jpg',
    batting: 'Left Hand Bat',
    bowling: 'Slow Left-Arm Orthodox',
    subrole: 'Left-Arm Spin Specialist',
    matches: 34,
    runs: 220,
    wickets: 54,
    strikeRate: 122.0,
    economy: 6.35,
    topScore: '32 (18b)',
    bestBowling: '4/19',
    pitchPos: { x: 24, y: 60, label: 'Backward Point' },
    quote: 'Control the ball’s rotation, and you control the pace of the game.',
    bio: 'Mathematical precision personified. Yusha chokes run-rates through impeccable line and length while striking regularly with arm-ball variations.',
    skills: {
      power: 65,
      technique: 88,
      bowling: 96,
      speed: 80,
      clutch: 92
    },
    signature: 'Arm Ball Drifting into the Right-Hander'
  },
  {
    id: 4,
    number: 4,
    name: 'Anupom',
    nickname: 'The Missile',
    role: 'bowler',
    roleDisplay: 'Bowler',
    archetype: 'pacer',
    image: 'assets/player-6.jpg',
    batting: 'Right Hand Bat',
    bowling: 'Right-Arm Express Fast (148+ km/h)',
    subrole: 'Express Pace Bowler',
    matches: 40,
    runs: 130,
    wickets: 58,
    strikeRate: 105.0,
    economy: 7.42,
    topScore: '22* (9b)',
    bestBowling: '4/12',
    pitchPos: { x: 50, y: 32, label: 'Bowling Crease' },
    quote: 'Speed is not just physics. Speed is psychological domination.',
    bio: 'Raw ferocity with a rhythm run-up. Clocking upwards of 148 km/h, Anupom targets the stumps and helmets with unyielding aggression.',
    skills: {
      power: 88,
      technique: 74,
      bowling: 97,
      speed: 98,
      clutch: 90
    },
    signature: '148 km/h Searing Inswinging Toe-Crusher'
  },
  {
    id: 5,
    number: 5,
    name: 'Shoeb',
    nickname: 'The Maestro',
    role: 'batsman',
    roleDisplay: 'Middle-Order Batsman',
    archetype: 'anchor',
    image: 'assets/player-5.jpg',
    batting: 'Right Hand Bat',
    bowling: 'Right-Arm Leg-Break',
    subrole: 'Middle-Order Batsman & Stroke Maker',
    matches: 36,
    runs: 1120,
    wickets: 14,
    strikeRate: 146.0,
    economy: 7.12,
    topScore: '78* (42b)',
    bestBowling: '3/18',
    pitchPos: { x: 68, y: 52, label: 'Middle-Order' },
    quote: 'Form is temporary, but the patience to build an innings is forever.',
    bio: 'Composed middle-order batsman with a full range of orthodox strokes. Shoeb paces the innings seamlessly and shifts gears during pressure overs.',
    skills: {
      power: 86,
      technique: 94,
      bowling: 68,
      speed: 84,
      clutch: 92
    },
    signature: 'Classic Inside-Out Lofted Drive'
  },
  {
    id: 6,
    number: 6,
    name: 'Imran',
    nickname: 'Ice Man',
    role: 'allrounder',
    roleDisplay: 'All-Rounder',
    archetype: 'power',
    image: 'assets/player-10.jpg',
    batting: 'Left Hand Bat',
    bowling: 'Left-Arm Fast Medium',
    subrole: 'Pace All-Rounder & Death Specialist',
    matches: 38,
    runs: 495,
    wickets: 51,
    strikeRate: 148.0,
    economy: 7.20,
    topScore: '48* (20b)',
    bestBowling: '4/21',
    pitchPos: { x: 78, y: 68, label: 'Deep Square Leg' },
    quote: 'When you have 6 runs to defend in the 20th over, you don’t think. You execute.',
    bio: 'Ice in his veins. Imran balances pin-point wide yorkers and slower deliveries with explosive left-handed power hitting down the order.',
    skills: {
      power: 86,
      technique: 84,
      bowling: 94,
      speed: 86,
      clutch: 98
    },
    signature: 'Back-of-Hand Knuckle Ball & Wide Line Yorker'
  },
  {
    id: 7,
    number: 7,
    name: 'Mohsin',
    nickname: 'The Falcon',
    role: 'allrounder',
    roleDisplay: 'All-Rounder',
    archetype: 'power',
    image: 'assets/player-1.jpg',
    batting: 'Right Hand Bat',
    bowling: 'Right-Arm Fast Medium',
    subrole: 'Dynamic All-Rounder & Strike Seamer',
    matches: 48,
    runs: 1420,
    wickets: 52,
    strikeRate: 154.2,
    economy: 7.15,
    topScore: '84* (38b)',
    bestBowling: '5/18',
    pitchPos: { x: 38, y: 46, label: 'Mid-Off' },
    quote: 'Barakah is in our discipline; the blast comes with our fearless heart.',
    bio: 'Dynamic powerhouse on the pitch. Mohsin pairs lethal yorkers with explosive death-over striking and game-changing discipline.',
    skills: {
      power: 92,
      technique: 90,
      bowling: 88,
      speed: 86,
      clutch: 98
    },
    signature: 'Helicopter Blast & Reverse-Swing Yorker'
  },
  {
    id: 8,
    number: 8,
    name: 'Bayajid',
    nickname: 'The Wall',
    role: 'allrounder',
    roleDisplay: 'All-Rounder',
    archetype: 'fielder',
    image: 'assets/player-9.jpg',
    batting: 'Right Hand Bat',
    bowling: 'Right-Arm Medium',
    subrole: 'Dynamic All-Rounder & Crisis Specialist',
    matches: 35,
    runs: 840,
    wickets: 32,
    strikeRate: 144.8,
    economy: 7.5,
    topScore: '64* (36b)',
    bestBowling: '3/16',
    pitchPos: { x: 22, y: 75, label: 'Cover Point' },
    quote: 'A run saved by a dive is as golden as a run scored by the willow.',
    bio: 'The all-round heartbeat of Barakah Blasters. Bayajid delivers valuable middle-order partnerships, clever medium pace, and acrobatic fielding.',
    skills: {
      power: 84,
      technique: 88,
      bowling: 82,
      speed: 94,
      clutch: 92
    },
    signature: 'Backward Diving Catch & Direct-Hit Stumps'
  },
  {
    id: 9,
    number: 9,
    name: 'Muhib',
    nickname: 'Lightning',
    role: 'batsman',
    roleDisplay: 'Top-Order Batsman',
    archetype: 'keeper',
    image: 'assets/player-4.jpg',
    batting: 'Right Hand Bat',
    bowling: 'Right-Arm Medium',
    subrole: 'Top-Order Batsman & 360° Innovator',
    matches: 39,
    runs: 1240,
    wickets: 6,
    strikeRate: 168.4,
    economy: 8.0,
    topScore: '88* (42b)',
    bestBowling: '2/14',
    pitchPos: { x: 50, y: 68, label: 'Mid-Wicket' },
    quote: 'Fractions of a second at the crease change the fate of championships.',
    bio: 'A dynamic top-order batsman who invents boundary angles that leave fielding captains helpless. Muhib blends orthodox drives with audacious ramps.',
    skills: {
      power: 92,
      technique: 90,
      bowling: 60,
      speed: 95,
      clutch: 96
    },
    signature: 'Ramp Shot over Third Man & Inside-Out Drive'
  },
  {
    id: 10,
    number: 10,
    name: 'Rayhan',
    nickname: 'The Destroyer',
    role: 'batsman',
    roleDisplay: 'Middle-Order Batsman',
    archetype: 'captain',
    captain: true,
    image: 'assets/player-8.jpg',
    batting: 'Right Hand Bat',
    bowling: 'Right-Arm Medium Fast',
    subrole: 'Captain & Middle-Order Power Finisher',
    matches: 30,
    runs: 960,
    wickets: 18,
    strikeRate: 186.4,
    economy: 8.1,
    topScore: '74* (24b)',
    bestBowling: '3/24',
    pitchPos: { x: 65, y: 24, label: 'Long-On' },
    quote: 'When the required run rate climbs, that is when I wake up and lead.',
    bio: 'The charismatic skipper leading Barakah Blasters from the front. Rayhan commands the field with tactical brilliance while possessing the highest strike rate on the team.',
    skills: {
      power: 99,
      technique: 86,
      bowling: 78,
      speed: 88,
      clutch: 98
    },
    signature: '105-Meter Straight Stand-and-Deliver Six'
  }
];

// App State
let currentFilter = 'all';
let currentView = 'grid'; // 'grid' | 'pitch'
let activePlayerId = BLASTERS_SQUAD[0].id;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initHeroPlayerSlider();
  renderBannerPlayersStage(BLASTERS_SQUAD);
  renderSquadGrid(BLASTERS_SQUAD);
  renderTacticalPitch(BLASTERS_SQUAD);
  initSpotlightCard(BLASTERS_SQUAD[0]);
  setupFilterHandlers();
  setupViewToggle();
  setupCountdownTimer();
  setupMatchCenter();
  setupSoundToggle();
  setupBatStrikeButtons();
  setupMobileMenu();
  setupBackToTop();

  // Support ?strike=1 or #strike for instant preview/testing
  if (window.location.search.includes('strike=1') || window.location.hash === '#strike') {
    setTimeout(() => triggerCricketSixAnimation(), 250);
  }
});

// Render the 10 Players on the Championship Panorama Banner
function renderBannerPlayersStage(players) {
  const stage = document.getElementById('bannerPlayersStage');
  if (!stage) return;

  stage.innerHTML = players.map(p => {
    const isCap = !!p.captain;
    const isVc = !!p.viceCaptain;
    const cleanWeapon = p.signature ? p.signature.replace(/"/g, '&quot;') : p.subrole;

    return `
      <div class="banner-player-pillar ${isCap ? 'is-captain' : ''} ${isVc ? 'is-vc' : ''}" 
           data-id="${p.id}" 
           onclick="scrollToSquadPlayer(${p.id})"
           onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); scrollToSquadPlayer(${p.id});}"
           tabindex="0"
           role="button"
           aria-label="View ${p.name} #${p.number} ${p.roleDisplay}">
        <div class="pillar-spotlight-ray" aria-hidden="true"></div>
        <div class="pillar-card">
          <div class="pillar-badges">
            <span class="pillar-num-badge">#${p.number}</span>
            ${isCap ? '<span class="pillar-cap-badge">★ CAPTAIN</span>' : ''}
            ${isVc ? '<span class="pillar-cap-badge vc-cap-badge">★ VC</span>' : ''}
          </div>
          <div class="pillar-photo-wrap">
            <img src="${p.image}" alt="${p.name}" class="pillar-photo" loading="lazy" />
            <div class="pillar-scrim" aria-hidden="true"></div>
          </div>
          <div class="pillar-info">
            <div class="pillar-name">${p.name}</div>
            <span class="pillar-role">${p.roleDisplay}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Interactive Smooth-Scroll & Spotlight Flash to Squad Player Card
function scrollToSquadPlayer(id) {
  const gridBtn = document.getElementById('viewGridBtn');
  if (gridBtn && currentView !== 'grid') {
    gridBtn.click();
  }

  const card = document.querySelector(`.player-card[data-id="${id}"]`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.remove('highlight-pulse');
    void card.offsetWidth; // Trigger reflow to restart CSS animation
    card.classList.add('highlight-pulse');
    setTimeout(() => card.classList.remove('highlight-pulse'), 1800);
  }

  if (window.soundEngine) {
    window.soundEngine.playClick();
  }
}

// Render the 10 Player Cards in Grid (Photo-Centric, Minimalist & Clean)
function renderSquadGrid(players) {
  const grid = document.getElementById('squadGrid');
  if (!grid) return;

  grid.innerHTML = players.map(player => {
    const roleClass = `role-${player.role}`;

    return `
      <article class="player-card" data-id="${player.id}">
        <!-- Photo Container: Large, Unobstructed Hero View -->
        <div class="player-card-media ${player.image ? 'has-real-photo' : ''}">
          <!-- Floating Glass Badges -->
          <div class="card-floating-badges">
            <span class="jersey-pill">#${player.number}</span>
            <div class="badge-status-group">
              ${player.captain ? '<span class="captain-badge">★ CAPTAIN</span>' : ''}
              ${player.viceCaptain ? '<span class="captain-badge vc-badge">★ VC</span>' : ''}
            </div>
          </div>

          ${player.image 
            ? `<img src="${player.image}" alt="${player.name}" class="player-real-img" loading="lazy" />`
            : `<div class="svg-avatar-wrap">${getPlayerAvatarSVG(player.id, player.number, player.archetype)}</div>`
          }

          <div class="photo-gradient-scrim"></div>
        </div>

        <!-- Clean Minimal Footer: Player Name & Role Only -->
        <div class="player-card-footer">
          <h3 class="player-name">${player.name}</h3>
          <span class="player-role-label ${roleClass}">${player.roleDisplay}</span>
        </div>
      </article>
    `;
  }).join('');
}

// Render Tactical Pitch Pins
function renderTacticalPitch(players) {
  const pitchBoard = document.getElementById('cricketPitchBoard');
  if (!pitchBoard) return;

  // Preserve ground markings
  const markingsHtml = `
    <div class="inner-circle"></div>
    <div class="central-pitch-strip">
      <div class="stumps-end"></div>
      <div class="stumps-end"></div>
    </div>
  `;

  const pinsHtml = players.map(p => `
    <div class="pitch-player-pin ${p.id === activePlayerId ? 'selected' : ''}" 
         style="left: ${p.pitchPos.x}%; top: ${p.pitchPos.y}%;"
         data-id="${p.id}"
         onclick="selectPitchPlayer(${p.id})">
      <div class="pin-jersey-circle">#${p.number}</div>
      <span class="pin-name-label">${p.name.split(' ')[0]} (${p.pitchPos.label})</span>
    </div>
  `).join('');

  pitchBoard.innerHTML = markingsHtml + pinsHtml;
}

// Select player on pitch view and update spotlight
function selectPitchPlayer(id) {
  activePlayerId = id;
  const player = BLASTERS_SQUAD.find(p => p.id === id);
  if (!player) return;

  // Update pin selection
  document.querySelectorAll('.pitch-player-pin').forEach(pin => {
    pin.classList.toggle('selected', parseInt(pin.dataset.id) === id);
  });

  initSpotlightCard(player);
  if (window.soundEngine) window.soundEngine.playClick();
}

function initSpotlightCard(player) {
  const spotlight = document.getElementById('pitchSpotlight');
  if (!spotlight) return;

  const isBowler = player.role === 'bowler';

  spotlight.innerHTML = `
    <div class="spotlight-header">
      <div class="spotlight-pos-tag">${player.pitchPos.label} • #${player.number}</div>
      <h3 class="spotlight-name">${player.name}</h3>
      <div class="spotlight-role">${player.roleDisplay} - "${player.nickname}"</div>
    </div>

    <div style="text-align: center; margin-bottom: 16px;">
      <div style="height: 140px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        ${player.image 
          ? `<img src="${player.image}" alt="${player.name}" style="width: 110px; height: 140px; object-fit: cover; object-position: center 15%; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.18);" />`
          : getPlayerAvatarSVG(player.id, player.number, player.archetype)
        }
      </div>
    </div>

    <div class="spotlight-stats">
      <div class="spotlight-stat-box">
        <div class="val">${isBowler ? player.wickets : player.runs}</div>
        <div class="lbl">${isBowler ? 'Wickets' : 'Career Runs'}</div>
      </div>
      <div class="spotlight-stat-box">
        <div class="val">${isBowler ? player.economy : player.strikeRate}</div>
        <div class="lbl">${isBowler ? 'Econ' : 'Strike Rate'}</div>
      </div>
    </div>

    <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin: 0;">
      ${player.bio}
    </p>
  `;
}

// Role Filters Handler
function setupFilterHandlers() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const role = btn.dataset.role;
      currentFilter = role;

      const filtered = role === 'all' 
        ? BLASTERS_SQUAD 
        : BLASTERS_SQUAD.filter(p => p.role === role);

      renderSquadGrid(filtered);
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });
}

// Creative 10-Player Hero Slider (Dynamic slide-by-slide showcase)
function initHeroPlayerSlider() {
  const track = document.getElementById('heroSliderTrack');
  const pipsContainer = document.getElementById('heroSliderPips');
  const counterEl = document.getElementById('sliderCounterBadge');
  const prevBtn = document.getElementById('heroSlidePrev');
  const nextBtn = document.getElementById('heroSlideNext');
  const container = document.getElementById('heroSliderContainer');

  if (!track || !pipsContainer) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const total = BLASTERS_SQUAD.length; // 10

  // 1. Render all 10 player slides
  track.innerHTML = BLASTERS_SQUAD.map((player, idx) => `
    <div class="hero-slide-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      <div class="slide-media-wrap">
        <img src="${player.image}" alt="${player.name}" class="slide-player-photo" loading="eager" />
        <div class="slide-media-gradient"></div>

        <!-- Floating Badges -->
        <div class="slide-floating-badges">
          <span class="slide-num-badge">#${player.number}</span>
          ${player.captain ? '<span class="slide-cap-badge">★ CAPTAIN</span>' : ''}
          ${player.viceCaptain ? '<span class="slide-cap-badge vc-cap-badge">★ VC</span>' : ''}
        </div>

        <!-- Bottom Card Details -->
        <div class="slide-content-block">
          <span class="slide-role-pill role-${player.role}">${player.roleDisplay}</span>
          <h3 class="slide-name-title">${player.name}</h3>
          <div class="slide-weapon-chip">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            <span>${player.signature}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // 2. Render 10 progress indicator pips
  pipsContainer.innerHTML = BLASTERS_SQUAD.map((p, idx) => `
    <button class="slider-pip ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Go to Player ${idx + 1}: ${p.name}">
      <span class="pip-label">#${p.number}</span>
    </button>
  `).join('');

  const slides = track.querySelectorAll('.hero-slide-item');
  const pips = pipsContainer.querySelectorAll('.slider-pip');

  function goToSlide(newIndex, direction = 'next') {
    if (newIndex === currentIndex) return;

    const oldIndex = currentIndex;
    currentIndex = (newIndex + total) % total;

    slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
      if (idx === currentIndex) {
        slide.classList.add('active');
        slide.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
      } else if (idx === oldIndex) {
        slide.classList.add(direction === 'next' ? 'slide-out-left' : 'slide-out-right');
      }
    });

    pips.forEach((pip, idx) => {
      pip.classList.toggle('active', idx === currentIndex);
    });

    if (counterEl) {
      const curEl = counterEl.querySelector('.counter-cur');
      if (curEl) curEl.innerText = String(currentIndex + 1).padStart(2, '0');
    }
  }

  function nextSlide() {
    goToSlide(currentIndex + 1, 'next');
  }

  function prevSlide() {
    goToSlide(currentIndex - 1, 'prev');
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }

  pips.forEach(pip => {
    pip.addEventListener('click', () => {
      const targetIdx = parseInt(pip.dataset.index, 10);
      goToSlide(targetIdx, targetIdx > currentIndex ? 'next' : 'prev');
      resetAutoplay();
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });

  // Touch Swipe for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 45) {
      nextSlide();
      resetAutoplay();
    } else if (touchEndX - touchStartX > 45) {
      prevSlide();
      resetAutoplay();
    }
  }, { passive: true });

  // Autoplay (slides every 3.2s)
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 3200);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    startAutoplay();
  }

  if (container) {
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
}

// View Toggle (Card Grid)
function setupViewToggle() {
  const gridBtn = document.getElementById('viewGridBtn');
  const carouselBtn = document.getElementById('viewCarouselBtn');
  const pitchBtn = document.getElementById('viewPitchBtn');
  const gridEl = document.getElementById('squadGrid');
  const pitchEl = document.getElementById('tacticalPitchView');

  if (!gridBtn || !gridEl) return;

  gridBtn.addEventListener('click', () => {
    gridBtn.classList.add('active');
    if (carouselBtn) carouselBtn.classList.remove('active');
    if (pitchBtn) pitchBtn.classList.remove('active');
    gridEl.style.display = 'grid';
    gridEl.classList.remove('carousel-mode');
    if (pitchEl) pitchEl.classList.remove('active');
    currentView = 'grid';
    if (window.soundEngine) window.soundEngine.playClick();
  });

  if (carouselBtn) {
    carouselBtn.addEventListener('click', () => {
      carouselBtn.classList.add('active');
      gridBtn.classList.remove('active');
      if (pitchBtn) pitchBtn.classList.remove('active');
      gridEl.style.display = 'flex';
      gridEl.classList.add('carousel-mode');
      if (pitchEl) pitchEl.classList.remove('active');
      currentView = 'carousel';
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }

  if (pitchBtn && pitchEl) {
    pitchBtn.addEventListener('click', () => {
      pitchBtn.classList.add('active');
      gridBtn.classList.remove('active');
      if (carouselBtn) carouselBtn.classList.remove('active');
      gridEl.style.display = 'none';
      pitchEl.classList.add('active');
      currentView = 'pitch';
      renderTacticalPitch(BLASTERS_SQUAD);
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }
}



// ==========================================================================
// H.P.L - 7 Match Center: Official Tournament Results & Scorecards
// ==========================================================================
const HPL7_MATCHES = [
  {
    id: "match-01",
    matchLabel: "1st Match • League",
    stageLabel: "Match 02",
    dateVenue: "Wed, 21 Oct • 10 Ov. • Trimohoni Ground",
    statusText: "1st Match • League",
    statusBadgeClass: "fixture-status-badge",
    bannerClass: "featured-result-banner",
    team1: {
      name: "Barakah Blasters",
      crest: "assets/logo.png",
      badgeClass: "team-crest-badge team-barakah",
      role: "Our Team",
      roleClass: "team-block-role team-home-tag",
      score: "58/7",
      scoreClass: "team-big-score",
      overs: "(9.3 Ov)",
      oversClass: "team-overs-label"
    },
    team2: {
      name: "Mujahid Smashers",
      crest: "assets/mujahid-smashers-logo.png",
      badgeClass: "team-crest-badge team-mujahid",
      role: "✓ Winner",
      roleClass: "winner-tag-pill",
      score: "59/0",
      scoreClass: "team-big-score winner-score",
      overs: "(4.0 Ov)",
      oversClass: "team-overs-label winner-overs"
    },
    resultText: "Mujahid Smashers won by 7 wickets"
  },
  {
    id: "match-02",
    matchLabel: "2nd Match • League",
    stageLabel: "Match 03",
    dateVenue: "Wed, 21 Oct • 10 Ov. • Trimohoni Ground",
    statusText: "2nd Match • League",
    statusBadgeClass: "fixture-status-badge",
    bannerClass: "featured-result-banner",
    team1: {
      name: "Taqwa Thunders",
      crest: "assets/taqwa-thunders-logo.png",
      badgeClass: "team-crest-badge team-taqwa",
      role: "✓ Winner",
      roleClass: "winner-tag-pill",
      score: "105/2",
      scoreClass: "team-big-score winner-score",
      overs: "(10.0 Ov)",
      oversClass: "team-overs-label winner-overs"
    },
    team2: {
      name: "Barakah Blasters",
      crest: "assets/logo.png",
      badgeClass: "team-crest-badge team-barakah",
      role: "Our Team",
      roleClass: "team-block-role team-home-tag",
      score: "99/7",
      scoreClass: "team-big-score",
      overs: "(10.0 Ov)",
      oversClass: "team-overs-label"
    },
    resultText: "Taqwa Thunders won by 6 runs"
  },
  {
    id: "match-03",
    matchLabel: "3rd Match • League",
    stageLabel: "Match 05",
    dateVenue: "Fri, 23 Oct • 10 Ov. • Trimohoni Ground",
    statusText: "3rd Match • League",
    statusBadgeClass: "fixture-status-badge",
    bannerClass: "featured-result-banner",
    team1: {
      name: "Mujahid Smashers",
      crest: "assets/mujahid-smashers-logo.png",
      badgeClass: "team-crest-badge team-mujahid",
      role: "✓ Winner",
      roleClass: "winner-tag-pill",
      score: "128/3",
      scoreClass: "team-big-score winner-score",
      overs: "(10.0 Ov)",
      oversClass: "team-overs-label winner-overs"
    },
    team2: {
      name: "Barakah Blasters",
      crest: "assets/logo.png",
      badgeClass: "team-crest-badge team-barakah",
      role: "Our Team",
      roleClass: "team-block-role team-home-tag",
      score: "97/7",
      scoreClass: "team-big-score",
      overs: "(9.2 Ov)",
      oversClass: "team-overs-label"
    },
    resultText: "Mujahid Smashers won by 31 runs"
  },
  {
    id: "match-04",
    matchLabel: "4th Match • League",
    stageLabel: "Match 06",
    dateVenue: "Fri, 23 Oct • 10 Ov. • Trimohoni Ground",
    statusText: "4th Match • Walkover",
    statusBadgeClass: "fixture-status-badge walkover-badge",
    bannerClass: "featured-result-banner walkover-banner",
    team1: {
      name: "Barakah Blasters",
      crest: "assets/logo.png",
      badgeClass: "team-crest-badge team-barakah",
      role: "Our Team",
      roleClass: "team-block-role team-home-tag",
      score: "Walk Over",
      scoreClass: "team-big-score walkover-score",
      overs: "Conceded",
      oversClass: "team-overs-label"
    },
    team2: {
      name: "Taqwa Thunders",
      crest: "assets/taqwa-thunders-logo.png",
      badgeClass: "team-crest-badge team-taqwa",
      role: "✓ Awarded Win",
      roleClass: "winner-tag-pill",
      score: "Walk Over",
      scoreClass: "team-big-score winner-score",
      overs: "Awarded",
      oversClass: "team-overs-label winner-overs"
    },
    resultText: "Walk over conceded • Taqwa Thunders awarded win"
  },
  {
    id: "match-05",
    matchLabel: "Grand Final 🏆",
    stageLabel: "Final",
    dateVenue: "Fri, 23 Oct • 10 Ov. • Trimohoni Ground",
    statusText: "Grand Final 🏆 • Champions",
    statusBadgeClass: "fixture-status-badge final-badge-pill",
    bannerClass: "featured-result-banner final-banner",
    team1: {
      name: "Mujahid Smashers",
      crest: "assets/mujahid-smashers-logo.png",
      badgeClass: "team-crest-badge team-mujahid",
      role: "Runner-Up",
      roleClass: "team-block-role",
      score: "89/5",
      scoreClass: "team-big-score",
      overs: "(10.0 Ov)",
      oversClass: "team-overs-label"
    },
    team2: {
      name: "Taqwa Thunders",
      crest: "assets/taqwa-thunders-logo.png",
      badgeClass: "team-crest-badge team-taqwa",
      role: "🏆 Champions",
      roleClass: "winner-tag-pill champion-tag-pill",
      score: "92/1",
      scoreClass: "team-big-score gold-score",
      overs: "(7.1 Ov)",
      oversClass: "team-overs-label winner-overs"
    },
    resultText: "Taqwa Thunders won by 6 wickets (H.P.L - 7 Champions 🏆)"
  }
];

function setupCountdownTimer() {
  // Retained for backward-compatibility
}

function setupMatchCenter() {
  const tabBtns = document.querySelectorAll('.match-tab-btn');
  const resultCards = document.querySelectorAll('.result-match-card');

  function renderMatch(idx) {
    const m = HPL7_MATCHES[idx];
    if (!m) return;

    // Update active state on tab buttons
    tabBtns.forEach((btn, i) => {
      const isActive = i === idx;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update active state on right column cards
    resultCards.forEach((card, i) => {
      card.classList.toggle('active-match', i === idx);
    });

    // Update left card elements
    const statusBadge = document.getElementById('featStatusBadge');
    if (statusBadge) {
      statusBadge.className = m.statusBadgeClass;
      statusBadge.innerHTML = `<span class="dot"></span> ${m.statusText}`;
    }

    const venueHeader = document.getElementById('featVenueHeader');
    if (venueHeader) venueHeader.innerText = m.dateVenue;

    // Team 1
    const t1Name = document.getElementById('featTeam1Name');
    if (t1Name) t1Name.innerText = m.team1.name;

    const t1Crest = document.getElementById('featTeam1Crest');
    if (t1Crest) {
      t1Crest.src = m.team1.crest;
      t1Crest.alt = m.team1.name;
    }

    const t1Badge = document.getElementById('featTeam1Badge');
    if (t1Badge) t1Badge.className = m.team1.badgeClass;

    const t1Role = document.getElementById('featTeam1Role');
    if (t1Role) {
      t1Role.className = m.team1.roleClass;
      t1Role.innerText = m.team1.role;
    }

    const t1Score = document.getElementById('featTeam1Score');
    if (t1Score) {
      t1Score.className = m.team1.scoreClass;
      t1Score.innerText = m.team1.score;
    }

    const t1Overs = document.getElementById('featTeam1Overs');
    if (t1Overs) {
      t1Overs.className = m.team1.oversClass;
      t1Overs.innerText = m.team1.overs;
    }

    // Stage
    const stageLabel = document.getElementById('featStageLabel');
    if (stageLabel) stageLabel.innerText = m.stageLabel;

    // Team 2
    const t2Name = document.getElementById('featTeam2Name');
    if (t2Name) t2Name.innerText = m.team2.name;

    const t2Crest = document.getElementById('featTeam2Crest');
    if (t2Crest) {
      t2Crest.src = m.team2.crest;
      t2Crest.alt = m.team2.name;
    }

    const t2Badge = document.getElementById('featTeam2Badge');
    if (t2Badge) t2Badge.className = m.team2.badgeClass;

    const t2Role = document.getElementById('featTeam2Role');
    if (t2Role) {
      t2Role.className = m.team2.roleClass;
      t2Role.innerText = m.team2.role;
    }

    const t2Score = document.getElementById('featTeam2Score');
    if (t2Score) {
      t2Score.className = m.team2.scoreClass;
      t2Score.innerText = m.team2.score;
    }

    const t2Overs = document.getElementById('featTeam2Overs');
    if (t2Overs) {
      t2Overs.className = m.team2.oversClass;
      t2Overs.innerText = m.team2.overs;
    }

    // Result Banner
    const resBanner = document.getElementById('featResultBanner');
    const resText = document.getElementById('featResultText');
    if (resBanner && resText) {
      resBanner.className = m.bannerClass;
      resText.innerText = m.resultText;
    }
  }

  // Attach event listeners to tab buttons
  tabBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => renderMatch(idx));
  });

  // Attach event listeners to right column cards
  resultCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      renderMatch(idx);
      if (window.innerWidth <= 992) {
        const featCard = document.getElementById('featuredMatchCard');
        if (featCard) {
          featCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  });
}

// Mobile navigation menu toggle, backdrop overlay, and outside-click dismiss
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');
  const backdrop = document.getElementById('mobileNavBackdrop');
  if (!toggleBtn || !navLinks) return;

  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !navLinks.classList.contains('mobile-active');
    navLinks.classList.toggle('mobile-active', shouldOpen);
    toggleBtn.classList.toggle('open', shouldOpen);
    toggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    if (backdrop) {
      backdrop.classList.toggle('active', shouldOpen);
    }
    // Prevent background scrolling on mobile when menu is open
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
    if (window.soundEngine) window.soundEngine.playClick();
  });

  if (backdrop) {
    backdrop.addEventListener('click', () => toggleMenu(false));
  }

  // Close when clicking any nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('mobile-active')) {
      toggleMenu(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('mobile-active')) {
      toggleMenu(false);
    }
  });
}

// Floating Back to Top Button
function setupBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  function updateVisibility() {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (window.soundEngine) window.soundEngine.playClick();
  });
}

// Sound Button & Audio toggle
function setupSoundToggle() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (!soundBtn) return;

  function updateIcon() {
    const isMuted = window.soundEngine ? window.soundEngine.isMuted : false;
    soundBtn.innerHTML = isMuted 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
    soundBtn.title = isMuted ? 'Sound Muted (Click to Unmute)' : 'Sound Enabled (Click to Mute)';
  }

  updateIcon();

  soundBtn.addEventListener('click', () => {
    if (window.soundEngine) {
      window.soundEngine.toggleMute();
      updateIcon();
      if (!window.soundEngine.isMuted) {
        window.soundEngine.playBatStrike();
      }
    }
  });
}

// Interactive Bat Strike Button triggers with Cinematic Cricket Six Animation
function setupBatStrikeButtons() {
  const strikeBtns = document.querySelectorAll('.bat-strike-btn');
  strikeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerCricketSixAnimation();
    });
  });
}

// Cinematic Bat-Hit-Ball Flying Over Boundary & Six Animation
function triggerCricketSixAnimation() {
  // If overlay already exists, remove it first
  const existing = document.getElementById('cricketSixOverlay');
  if (existing) {
    existing.remove();
  }

  // Create overlay container
  const overlay = document.createElement('div');
  overlay.id = 'cricketSixOverlay';
  overlay.className = 'cricket-six-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Cricket Six Strike Animation');

  // SVG bat, ball, stumps, trajectory, boundary, celebration markup
  overlay.innerHTML = `
    <div class="six-stadium-arena">
      <!-- Floodlights and Stadium Night Sky -->
      <div class="six-floodlight floodlight-left"></div>
      <div class="six-floodlight floodlight-right"></div>
      <div class="six-crowd-stands"></div>
      
      <!-- Outfield and Turf Pitch -->
      <div class="six-pitch-outfield">
        <div class="six-pitch-strip">
          <div class="six-crease-line bowling-crease"></div>
          <div class="six-crease-line popping-crease"></div>
        </div>
      </div>

      <!-- Distant Boundary Line / Advertising Cushions -->
      <div class="six-boundary-line-wrap" id="sixBoundaryLine">
        <div class="six-boundary-cushion">
          <div class="six-boundary-text">
            <span>BOUNDARY ROPE • 75 METERS</span>
          </div>
          <div class="six-boundary-alert">
            <span class="six-wing-text">★ BOUNDARY CLEARED! ★</span>
            <span class="six-wing-text">⚡ MAXIMUM 6 ⚡</span>
          </div>
        </div>
      </div>

      <!-- Trajectory flight path arc -->
      <svg class="six-trajectory-svg" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trajGrad" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="#fbbf24" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.2"/>
          </linearGradient>
        </defs>
        <path id="sixFlightPath" d="M 500 380 Q 360 80 160 200" fill="none" stroke="url(#trajGrad)" stroke-width="4" stroke-dasharray="10 6" stroke-linecap="round"/>
      </svg>

      <!-- Cricket Stumps at the batting crease -->
      <div class="six-stumps-actor">
        <svg viewBox="0 0 80 110" fill="none">
          <rect x="16" y="22" width="7" height="85" rx="3" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
          <rect x="36" y="22" width="7" height="85" rx="3" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
          <rect x="56" y="22" width="7" height="85" rx="3" fill="#d97706" stroke="#78350f" stroke-width="1.5"/>
          <rect x="13" y="17" width="26" height="5" rx="2" fill="#fde68a" stroke="#78350f" stroke-width="1"/>
          <rect x="40" y="17" width="26" height="5" rx="2" fill="#fde68a" stroke="#78350f" stroke-width="1"/>
        </svg>
      </div>

      <!-- Cricket Bat Actor -->
      <div class="six-bat-actor" id="sixBatActor">
        <svg viewBox="0 0 120 400" fill="none">
          <defs>
            <linearGradient id="willowGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#d4a366"/>
              <stop offset="30%" stop-color="#f5d6a7"/>
              <stop offset="70%" stop-color="#fef3c7"/>
              <stop offset="100%" stop-color="#b45309"/>
            </linearGradient>
          </defs>
          <!-- Cane Handle -->
          <rect x="52" y="8" width="16" height="115" rx="8" fill="#0f172a"/>
          <!-- Rubber grips -->
          <line x1="52" y1="22" x2="68" y2="22" stroke="#f59e0b" stroke-width="2.5"/>
          <line x1="52" y1="36" x2="68" y2="36" stroke="#f59e0b" stroke-width="2.5"/>
          <line x1="52" y1="50" x2="68" y2="50" stroke="#f59e0b" stroke-width="2.5"/>
          <line x1="52" y1="64" x2="68" y2="64" stroke="#f59e0b" stroke-width="2.5"/>
          <line x1="52" y1="78" x2="68" y2="78" stroke="#f59e0b" stroke-width="2.5"/>
          <line x1="52" y1="92" x2="68" y2="92" stroke="#f59e0b" stroke-width="2.5"/>
          <line x1="52" y1="106" x2="68" y2="106" stroke="#f59e0b" stroke-width="2.5"/>
          <!-- Blade -->
          <path d="M52 118 C44 128 35 148 35 175 L35 372 C35 388 45 394 60 394 C75 394 85 388 85 372 L85 175 C85 148 76 128 68 118 Z" fill="url(#willowGrad)" stroke="#92400e" stroke-width="2"/>
          <path d="M60 128 L60 388" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
          <!-- Brand Sticker on bat face -->
          <rect x="43" y="195" width="34" height="110" rx="5" fill="#040d09" stroke="#f59e0b" stroke-width="1.5"/>
          <path d="M60 210 L54 228 H61 L57 246 L66 226 H59 Z" fill="#fbbf24"/>
          <text x="60" y="268" font-family="'Russo One', sans-serif" font-size="7.5" fill="#f59e0b" font-weight="900" text-anchor="middle" letter-spacing="0.5">BLASTERS</text>
          <text x="60" y="286" font-family="'Outfit', sans-serif" font-size="6" fill="#10b981" font-weight="800" text-anchor="middle" letter-spacing="0.5">POWER 7</text>
        </svg>
      </div>

      <!-- Cricket Ball Actor -->
      <div class="six-ball-actor" id="sixBallActor">
        <svg viewBox="0 0 60 60" fill="none">
          <defs>
            <radialGradient id="sixBallShine" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stop-color="#ff4d6d"/>
              <stop offset="45%" stop-color="#b91c1c"/>
              <stop offset="85%" stop-color="#7f1d1d"/>
              <stop offset="100%" stop-color="#450a0a"/>
            </radialGradient>
          </defs>
          <circle cx="30" cy="30" r="26" fill="url(#sixBallShine)" stroke="#991b1b" stroke-width="1.5"/>
          <path d="M12 44 Q 30 28 48 16" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M10 42 L14 46 M15 38 L19 42 M20 34 L24 38 M25 30 L29 34 M30 26 L34 30 M35 22 L39 26 M40 18 L44 22 M45 14 L49 18" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.9"/>
          <ellipse cx="22" cy="18" rx="6" ry="3.5" transform="rotate(-30 22 18)" fill="#ffffff" opacity="0.45"/>
        </svg>
      </div>

      <!-- Sweet-spot Impact Burst Effect -->
      <div class="six-impact-burst" id="sixImpactBurst">
        <div class="six-impact-ring"></div>
        <div class="six-impact-flash"></div>
        <div class="six-impact-label">THWACK! ⚡</div>
        <div class="six-impact-sparks">
          <span style="--angle: 0deg"></span>
          <span style="--angle: 45deg"></span>
          <span style="--angle: 90deg"></span>
          <span style="--angle: 135deg"></span>
          <span style="--angle: 180deg"></span>
          <span style="--angle: 225deg"></span>
          <span style="--angle: 270deg"></span>
          <span style="--angle: 315deg"></span>
        </div>
      </div>

      <!-- Broadcast 6 Celebration Popup -->
      <div class="six-celebration-popup" id="sixCelebrationPopup">
        <div class="six-celebration-glow"></div>
        <div class="six-celebration-card">
          <div class="six-header-pill">
            <span class="six-bolt-icon">⚡</span>
            <span>MAXIMUM</span>
            <span class="six-bolt-icon">⚡</span>
          </div>
          <div class="six-huge-digit">6</div>
          <div class="six-subtext-main">CLEARS THE BOUNDARY!</div>
          <div class="six-subtext-meta">
            <span>🚀 102 METERS</span>
            <span>•</span>
            <span>💥 OUT OF THE GROUND</span>
          </div>
          <div class="six-team-creed">BARAKAH BLASTERS POWER HIT</div>
        </div>
      </div>

      <!-- Confetti Particles Container -->
      <div class="six-confetti-container" id="sixConfetti"></div>

      <!-- Dismiss close pill -->
      <button class="six-dismiss-btn" aria-label="Close animation">
        <span>Click anywhere to dismiss</span>
        <kbd>✕</kbd>
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  // Trigger sound & visual sequence in synchronized timing
  // 1. Initial entry
  requestAnimationFrame(() => {
    overlay.classList.add('active');
  });

  // 2. Sweet-spot Impact at 340ms: Willow crack sound + impact burst shockwave
  setTimeout(() => {
    if (window.soundEngine) {
      window.soundEngine.playBatStrike();
    }
    const impact = overlay.querySelector('#sixImpactBurst');
    if (impact) impact.classList.add('hit');
    const traj = overlay.querySelector('.six-trajectory-svg');
    if (traj) traj.classList.add('visible');
  }, 340);

  // 3. Ball crosses boundary at 880ms: Crowd roar cheer + boundary board flashes + 6 celebration popup
  setTimeout(() => {
    if (window.soundEngine) {
      window.soundEngine.playCheer();
    }
    overlay.classList.add('celebrating');
    const boundaryCushion = overlay.querySelector('.six-boundary-cushion');
    if (boundaryCushion) boundaryCushion.classList.add('cleared');

    const popup = overlay.querySelector('#sixCelebrationPopup');
    if (popup) popup.classList.add('visible');
  }, 880);

  // Generate dynamic confetti
  const confettiContainer = overlay.querySelector('#sixConfetti');
  if (confettiContainer) {
    const colors = ['#f59e0b', '#10b981', '#fbbf24', '#ffffff', '#38bdf8', '#ef4444'];
    for (let i = 0; i < 48; i++) {
      const piece = document.createElement('div');
      piece.className = 'six-confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.top = `${-10 - Math.random() * 20}%`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = `${6 + Math.random() * 8}px`;
      piece.style.height = `${10 + Math.random() * 12}px`;
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      piece.style.animationDelay = `${0.85 + Math.random() * 0.7}s`;
      piece.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
      confettiContainer.appendChild(piece);
    }
  }

  // Safe dismiss handler
  let isClosed = false;
  function closeOverlay() {
    if (isClosed) return;
    isClosed = true;
    overlay.classList.remove('active');
    overlay.classList.add('closing');
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 400);
  }

  overlay.addEventListener('click', closeOverlay);

  // Auto close after 4.2s (leaves ample time to see the shot and celebrate)
  setTimeout(() => {
    closeOverlay();
  }, 4200);
}
