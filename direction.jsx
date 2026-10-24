const GS_PAGES = ['Home', 'Projects', 'Labs', 'Background', 'Leadership & Memberships', 'Awards'];

const GS_FILTERS = [
  { id: 'all',          label: 'All',           test: () => true },
  { id: 'awards',       label: 'Awards',        test: p => !!p.prize },
  { id: 'industry',     label: 'Industry',      test: p => p.category === 'industry' },
  { id: 'research',     label: 'Research',      test: p => p.category === 'research' },
  { id: 'orgs',         label: 'Organizations', test: p => p.category === 'orgs' },
  { id: 'competitions', label: 'Competitions',  test: p => p.category === 'competitions' },
];

// One stroke icon set (24px grid, 1.75 stroke) instead of unicode glyphs.
const GS_ICON_PATHS = {
  'arrow-right':    <path d="M5 12h14M13 6l6 6-6 6"/>,
  'arrow-up-right': <path d="M7 17 17 7M8 7h9v9"/>,
  'chevron-left':   <path d="m15 18-6-6 6-6"/>,
  'chevron-right':  <path d="m9 18 6-6-6-6"/>,
  'close':          <path d="M6 6l12 12M18 6 6 18"/>,
  'menu':           <path d="M4 7h16M4 12h16M4 17h16"/>,
  'play':           <path d="M8 5v14l11-7z"/>,
  'deck':           <><rect x="3" y="4" width="18" height="13" rx="1"/><path d="M12 17v3M8 20h8"/></>,
};

function GSIcon({ name, size = 16 }) {
  return (
    <svg className="gs-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {GS_ICON_PATHS[name]}
    </svg>
  );
}

// Blurbs are stored as "• line\n• line"; split them into list items.
function blurbItems(blurb) {
  return (blurb || '').split('\n').map(l => l.replace(/^\s*•\s*/, '').trim()).filter(Boolean);
}

function GSContactIcon({ id }) {
  if (id === 'email') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m2 7 10 7 10-7"/>
    </svg>
  );
  if (id === 'linkedin') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
  return null;
}

function GSContactModal({ onClose }) {
  const items = window.CONTACT_ITEMS || [];
  return (
    <div className="gs-contact-modal" onClick={onClose}>
      <div className="gs-contact-dialog" role="dialog" aria-modal="true" aria-labelledby="gs-contact-title" onClick={e => e.stopPropagation()}>
        <div className="gs-contact-head">
          <div>
            <div className="gs-contact-title" id="gs-contact-title">Get in touch</div>
            <div className="gs-contact-sub">Jason Cabrejos</div>
          </div>
          <button className="gs-contact-close" onClick={onClose} aria-label="Close"><GSIcon name="close" size={18} /></button>
        </div>
        <div className="gs-contact-list">
          {items.map(item => (
            <a
              key={item.id}
              className="gs-contact-item"
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
            >
              <span className="gs-contact-icon"><GSContactIcon id={item.id} /></span>
              <span className="gs-contact-info">
                <span className="gs-contact-item-label">{item.label}</span>
                <span className="gs-contact-item-value">{item.value}</span>
              </span>
              <span className="gs-contact-arrow"><GSIcon name="arrow-up-right" /></span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function GSSlideshow() {
  const shots = window.HEADSHOTS || [];
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const len = shots.length;
  React.useEffect(() => {
    if (!len || paused) return;
    const t = setInterval(() => { if (!document.hidden) setIdx(i => (i + 1) % len); }, 5000);
    return () => clearInterval(t);
  }, [len, paused]);
  if (!len) return null;
  const go = (n) => setIdx(((n % len) + len) % len);
  const getImageSrc = (id) => `uploads/featured_homepage_images/${id}.jpg`;

  return (
    <div className="gs-slideshow" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="gs-ss-stage">
        {shots.map((s, i) => (
          <div key={s.id} className={`gs-ss-slide ${i===idx?'active':''}`} aria-hidden={i!==idx}>
            <img
              src={getImageSrc(s.id)}
              alt={s.caption}
              className="gs-ss-image"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        ))}
        <button className="gs-ss-nav prev" onClick={() => go(idx-1)} aria-label="Previous photo"><GSIcon name="chevron-left" /></button>
        <button className="gs-ss-nav next" onClick={() => go(idx+1)} aria-label="Next photo"><GSIcon name="chevron-right" /></button>
      </div>
      <div className="gs-ss-foot">
        <div className="gs-ss-caption" aria-live="polite">
          <span className="gs-ss-caption-label">{shots[idx].caption}</span>
          <span className="gs-ss-caption-date">{shots[idx].date}</span>
        </div>
        <span className="gs-ss-counter"><span className="gs-ss-count">{String(idx+1).padStart(2,'0')}</span> of {len}</span>
      </div>
      <div className="gs-ss-dots">
        {shots.map((s, i) => (
          <button key={s.id} className={`gs-ss-dot ${i===idx?'active':''}`} onClick={() => go(i)} aria-label={`Photo ${i+1}: ${s.caption}`} />
        ))}
      </div>
    </div>
  );
}

function GSFlag({ prize, style }) {
  if (!prize) return null;
  const variant = ['dot', 'line', 'corner'].includes(style) ? ` ${style}` : '';
  return <div className={`gs-flag${variant}`}>{prize}</div>;
}

function ytId(url) {
  const m = url.match(/[?&]v=([^&]+)/);
  return m ? m[1] : url;
}

function GSLightbox({ projectTitle, media, startIdx, onClose }) {
  const [idx, setIdx] = React.useState(startIdx);
  const len = media.length;
  const item = media[idx];

  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIdx(i => ((i - 1 + len) % len));
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % len);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [len, onClose]);

  const imgCount = media.filter(m => m.type === 'image').length;
  const vidCount = media.filter(m => m.type === 'video' || m.type === 'youtube').length;
  const slidesCount = media.filter(m => m.type === 'slides').length;
  const summary = [
    imgCount ? `${imgCount} photo${imgCount > 1 ? 's' : ''}` : '',
    vidCount ? `${vidCount} video${vidCount > 1 ? 's' : ''}` : '',
    slidesCount ? `${slidesCount} deck${slidesCount > 1 ? 's' : ''}` : '',
  ].filter(Boolean).join(' · ');

  return (
    <div className="gs-lb" onClick={onClose}>
      <div className="gs-lb-dialog" role="dialog" aria-modal="true" aria-label={`${projectTitle} gallery`} onClick={e => e.stopPropagation()}>
        <div className="gs-lb-head">
          <div className="gs-lb-head-left">
            <span className="gs-lb-proj">{projectTitle}</span>
            <span className="gs-lb-summary">{summary}</span>
          </div>
          <div className="gs-lb-head-right">
            <span className="gs-lb-count">{idx + 1} of {len}</span>
            <button className="gs-lb-close" onClick={onClose} aria-label="Close gallery"><GSIcon name="close" size={18} /></button>
          </div>
        </div>
        <div className="gs-lb-stage">
          {item.type === 'youtube' ? (
            <iframe key={idx} className="gs-lb-yt" src={`https://www.youtube.com/embed/${ytId(item.src)}?autoplay=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen frameBorder="0" title={item.caption || 'Video'} />
          ) : item.type === 'slides' ? (
            <iframe key={idx} className="gs-lb-yt" src={item.src} allowFullScreen frameBorder="0" title={item.caption || 'Slides'} />
          ) : item.type === 'video' ? (
            <video key={idx} className="gs-lb-media" controls autoPlay src={item.src} />
          ) : (
            <img className="gs-lb-media" src={item.src} alt={item.caption || ''} />
          )}
          {len > 1 && (
            <>
              <button className="gs-lb-nav prev" onClick={() => setIdx(i => ((i - 1 + len) % len))} aria-label="Previous"><GSIcon name="chevron-left" size={20} /></button>
              <button className="gs-lb-nav next" onClick={() => setIdx(i => (i + 1) % len)} aria-label="Next"><GSIcon name="chevron-right" size={20} /></button>
            </>
          )}
        </div>
        {item.caption && <div className="gs-lb-caption">{item.caption}</div>}
        {len > 1 && (
          <div className="gs-lb-strip">
            {media.map((m, i) => (
              <button key={i} className={`gs-lb-thumb ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} aria-label={m.caption || `Item ${i + 1}`}>
                {m.type === 'youtube'
                  ? <img src={`https://img.youtube.com/vi/${ytId(m.src)}/hqdefault.jpg`} alt="" />
                  : m.type === 'video'
                  ? <span className="gs-lb-thumb-vid"><GSIcon name="play" /></span>
                  : m.type === 'slides'
                  ? <span className="gs-lb-thumb-vid"><GSIcon name="deck" /></span>
                  : <img src={m.src} alt="" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GSTile({ p, expanded, onClick, onGallery, flagStyle, lead }) {
  const onKeyDown = (e) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
  };
  const items = blurbItems(p.blurb);
  return (
    <article
      className={`gs-tile ${expanded ? 'open' : ''} ${lead ? 'lead' : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${p.title}. ${expanded ? 'Hide' : 'Show'} details`}
    >
      <GSFlag prize={p.prize} style={flagStyle} />
      <div className="gs-tile-img">
        {p.image && (
          <img
            src={p.image}
            alt=""
            loading="lazy"
            style={{
              width: '100%', height: '100%', display: 'block',
              objectFit: p.imageFit || 'cover',
              ...(p.imageFit === 'contain' ? { padding: '2rem', boxSizing: 'border-box' } : {}),
            }}
          />
        )}
      </div>
      <div className="gs-tile-body">
        <div className="gs-tile-year">{p.role} · {p.year}</div>
        <h3 className="gs-tile-title">{p.title}</h3>
        {p.summary && <p className="gs-tile-summary">{p.summary}</p>}

        {lead && p.results && (
          <dl className="gs-results">
            {p.results.map(r => (
              <div key={r.label} className="gs-result">
                <dt className="gs-result-v">{r.value}</dt>
                <dd className="gs-result-k">{r.label}</dd>
              </div>
            ))}
          </dl>
        )}

        {expanded ? (
          <div className="gs-tile-detail">
            {items.length > 1
              ? <ul className="gs-tile-blurb">{items.map(t => <li key={t}>{t}</li>)}</ul>
              : <p className="gs-tile-blurb">{items[0]}</p>}
            <div className="gs-tile-tags-label">Tools</div>
            <div className="gs-tile-tags">
              {p.tags.map(t => <span key={t} className="gs-chip">{t}</span>)}
            </div>
            {p.media && p.media.length > 0 && (
              <div className="gs-tile-media-strip" onClick={e => e.stopPropagation()}>
                {p.media.map((m, i) => (
                  <button
                    key={i}
                    className="gs-tile-media-thumb"
                    onClick={e => { e.stopPropagation(); onGallery(p, i); }}
                    aria-label={m.caption || `Media ${i + 1}`}
                    title={m.caption || ''}
                  >
                    {m.type === 'youtube'
                      ? <img src={`https://img.youtube.com/vi/${ytId(m.src)}/mqdefault.jpg`} alt="" />
                      : m.type === 'video'
                      ? <span className="gs-tile-media-thumb-vid"><GSIcon name="play" /></span>
                      : m.type === 'slides'
                      ? <span className="gs-tile-media-thumb-vid"><GSIcon name="deck" /></span>
                      : <img src={m.src} alt="" />}
                  </button>
                ))}
                <button
                  className="gs-tile-media-strip-cta"
                  onClick={e => { e.stopPropagation(); onGallery(p, 0); }}
                >
                  View gallery <GSIcon name="arrow-right" size={14} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="gs-tile-tags">
            {p.tags.slice(0, lead ? 6 : 3).map(t => <span key={t} className="gs-chip">{t}</span>)}
          </div>
        )}
        <div className="gs-tile-foot">
          <span className="gs-tile-foot-cta">{expanded ? 'Close' : 'Details'} <GSIcon name="arrow-right" size={14} /></span>
        </div>
      </div>
    </article>
  );
}

function DirectionGridSystem({ flagStyle, showGrid }) {
  const [page, setPage] = React.useState('Home');
  const [openId, setOpenId] = React.useState(null);
  const [filter, setFilter] = React.useState('all');
  const [resumeOpen, setResumeOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [lightbox, setLightbox] = React.useState(null);
  const openGallery = (p, idx) => setLightbox({ project: p, idx });
  const closeLightbox = () => setLightbox(null);
  const featured = window.PROJECTS.filter(p => p.featured);
  const all = window.PROJECTS;
  const activeFilter = GS_FILTERS.find(f => f.id === filter) || GS_FILTERS[0];
  const shown = all.filter(activeFilter.test);
  const labs = window.LABS || [];
  const resumeUrl = 'uploads/LatestResume.pdf';
  const toggle = (id) => setOpenId(prev => prev === id ? null : id);
  const openResume = () => setResumeOpen(true);
  const closeResume = () => setResumeOpen(false);
  const goPage = (pg) => { setPage(pg); setOpenId(null); setFilter('all'); setMenuOpen(false); };

  React.useEffect(() => {
    const els = document.querySelectorAll('.gs-wrap .reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [page]);

  // Escape closes the résumé and contact dialogs (the lightbox handles its own keys).
  React.useEffect(() => {
    if (!resumeOpen && !contactOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') { setResumeOpen(false); setContactOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [resumeOpen, contactOpen]);

  const sectionHead = (title, right, cls = 'reveal in') => (
    <div className={`gs-section-head ${cls}`}>
      <h2 className="gs-h2">{title}</h2>
      {right && <div className="gs-section-right">{right}</div>}
    </div>
  );

  const tiles = (list, leadFirst = false) => list.map((p, i) => (
    <GSTile key={p.id} p={p} lead={leadFirst && i === 0} expanded={openId===p.id} onClick={() => toggle(p.id)} onGallery={openGallery} flagStyle={flagStyle} />
  ));

  return (
    <div className="gs-wrap">
      <div className="gs-aura" aria-hidden="true" />
      <div className={`gs-grid-underlay ${showGrid ? 'show' : ''}`}>
        {Array.from({length: 12}, (_, i) => <span key={i} />)}
      </div>

      <nav className="gs-nav">
        <button className="gs-brand" onClick={() => goPage('Home')} aria-label="Jason Cabrejos, home">
          <span className="gs-brand-mark" aria-hidden="true">JC</span>
          <span className="gs-brand-text">
            <span className="gs-brand-name">Jason Cabrejos</span>
            <span className="gs-brand-sub">Robotics · Embedded · Machine vision</span>
          </span>
        </button>
        <div className="gs-nav-links">
          {GS_PAGES.map(pg => (
            <button key={pg} className={`gs-nav-btn ${page===pg?'active':''}`} aria-current={page===pg ? 'page' : undefined} onClick={() => goPage(pg)}>{pg}</button>
          ))}
        </div>
        <div className="gs-nav-right">
          <span className="gs-nav-status">Open to full-time roles · 2026</span>
          <button className="gs-nav-cta" onClick={() => setContactOpen(true)}>Contact</button>
        </div>
        <button className="gs-nav-hamburger" onClick={() => setMenuOpen(m => !m)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          <GSIcon name={menuOpen ? 'close' : 'menu'} size={22} />
        </button>
      </nav>

      {menuOpen && (
        <div className="gs-mobile-menu">
          {GS_PAGES.map(pg => (
            <button key={pg} className={`gs-mobile-btn ${page===pg?'active':''}`} onClick={() => goPage(pg)}>{pg}</button>
          ))}
          <a className="gs-mobile-btn" href="/links/">Links</a>
          <button className="gs-mobile-contact" onClick={() => { setContactOpen(true); setMenuOpen(false); }}>Contact</button>
        </div>
      )}

      <main className="gs-page v2-page-fade" key={page}>
        {page === 'Home' && (
          <>
            <section className="gs-hero">
              <h1 className="gs-h1 reveal in">
                I design and ship industrial robotics that survive production.
              </h1>
              <div className="gs-hero-text">
                <p className="gs-lead reveal in d1">
                  At BNSF Railway I took a real-time inventory tracking system from prototype
                  to production on Nvidia Jetson. It combines GPS, RTK and machine vision for 92%
                  container detection accuracy at production scale, saves $5M a year, and runs on
                  a fleet of 50 Jetson units nationwide. I also built the Gazebo/Nav2 yard simulator
                  and benchmarking harness that measures detection accuracy offline.
                </p>
                <div className="gs-cta-row reveal in d2">
                  <button className="gs-btn solid" onClick={() => goPage('Projects')}>View featured work <GSIcon name="arrow-right" /></button>
                  <button className="gs-btn" onClick={openResume}>Résumé (PDF)</button>
                  <a className="gs-btn" href="https://www.linkedin.com/in/jasoncabrejos/" target="_blank" rel="noopener noreferrer">LinkedIn <GSIcon name="arrow-up-right" /></a>
                </div>
                <p className="gs-hero-facts reveal in d3">Robotics and embedded engineer · MS CS, BS ME</p>
              </div>
              <div className="gs-hero-side reveal in d2">
                <GSSlideshow />
              </div>
            </section>

            <section className="gs-section">
              {sectionHead('Selected work',
                <button className="gs-section-link" onClick={() => goPage('Projects')}>All {all.length} projects <GSIcon name="arrow-right" size={14} /></button>,
                'reveal')}
              <div className="gs-tiles reveal d1">{tiles(featured, true)}</div>
            </section>
          </>
        )}

        {page === 'Projects' && (
          <section className="gs-section gs-section-first">
            {sectionHead('Project index', <span className="gs-section-link">{shown.length} of {all.length} projects</span>)}
            <div className="gs-filter-bar reveal in d1" role="group" aria-label="Filter projects">
              {GS_FILTERS.map(f => (
                <button
                  key={f.id}
                  className={`gs-filter ${filter === f.id ? 'active' : ''}`}
                  aria-pressed={filter === f.id}
                  onClick={() => { setFilter(f.id); setOpenId(null); }}
                >{f.label}</button>
              ))}
            </div>
            <div className="gs-tiles reveal in d2">{tiles(shown)}</div>
          </section>
        )}

        {page === 'Labs' && (
          <section className="gs-section gs-section-first">
            {sectionHead('Labs', <span className="gs-section-link">{labs.length} builds</span>)}
            <p className="gs-lead gs-section-intro reveal in d1">
              Nobody assigned these. Self-hosted infrastructure, a trading bot, and LLM-integration
              projects I build and keep running on my own time.
            </p>
            <div className="gs-tiles reveal in d2">{tiles(labs)}</div>
          </section>
        )}

        {page === 'Background' && (
          <section className="gs-section gs-section-first">
            {sectionHead('Background', <span className="gs-section-link">UTA · 2017 - 2025</span>)}
            <div className="gs-bg-grid">
              <div className="gs-bg-col-1 reveal in d1">
                <h3 className="gs-h3">Education</h3>
                {window.BACKGROUND.education.map(e => (
                  <div key={e.school} className="gs-line-row">
                    <div className="gs-line-date">{e.date}</div>
                    <div>
                      <div className="gs-line-title">{e.school}</div>
                      {e.items.map(i => <div key={i} className="gs-line-sub">{i}</div>)}
                    </div>
                  </div>
                ))}
                <h3 className="gs-h3 gs-h3-spaced">Experience</h3>
                {window.BACKGROUND.experience.map(e => (
                  <div key={e.org} className="gs-line-row">
                    <div className="gs-line-date">{e.date}</div>
                    <div>
                      <div className="gs-line-title">{e.org}</div>
                      <div className="gs-line-sub">{e.role}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="gs-bg-col-2 reveal in d2">
                <h3 className="gs-h3">Stack</h3>
                {Object.entries(window.BACKGROUND.skills).map(([k, v]) => (
                  <div key={k} className="gs-skill-row">
                    <div className="gs-skill-k">{k}</div>
                    <div className="gs-skill-v">{v.join(' · ')}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {page === 'Leadership & Memberships' && (() => {
          const groups = ['Leadership', 'Mentorship', 'Committee', 'Membership'];
          const grouped = groups
            .map(g => ({ kind: g, items: window.MEMBERSHIPS.filter(m => m.kind === g) }))
            .filter(g => g.items.length);
          return (
            <section className="gs-section gs-section-first">
              {sectionHead(<>Leadership &amp; memberships</>, <span className="gs-section-link">{window.MEMBERSHIPS.length} entries</span>)}
              {grouped.map((g, gi) => (
                <div key={g.kind} className={`gs-mem-group reveal in d${(gi%4)+1}`}>
                  <h3 className="gs-mem-group-title">{g.kind}</h3>
                  <div className="gs-cards">
                    {g.items.map(m => (
                      <div key={m.name} className="gs-card">
                        <div className="gs-card-date">{m.date}</div>
                        <div className="gs-card-title">{m.name}</div>
                        <div className="gs-card-body">{m.notes}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          );
        })()}

        {page === 'Awards' && (
          <section className="gs-section gs-section-first">
            {sectionHead('Awards & certifications')}
            <div className="gs-award-grid reveal in d1">
              {window.AWARDS.map(a => (
                <div key={a.title} className="gs-award">
                  <div>
                    <div className="gs-award-title">{a.title}</div>
                    {a.note && <div className="gs-award-note">{a.note}</div>}
                  </div>
                  <div className="gs-award-year">{a.year}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {lightbox && (
        <GSLightbox
          projectTitle={lightbox.project.title}
          media={lightbox.project.media}
          startIdx={lightbox.idx}
          onClose={closeLightbox}
        />
      )}

      {contactOpen && <GSContactModal onClose={() => setContactOpen(false)} />}

      {resumeOpen && (
        <div className="gs-resume-modal" onClick={closeResume}>
          <div className="gs-resume-dialog" role="dialog" aria-modal="true" aria-label="Résumé" onClick={(e) => e.stopPropagation()}>
            <div className="gs-resume-bar">
              <a className="gs-resume-newtab" href={resumeUrl} target="_blank" rel="noopener noreferrer">
                Open in new tab <GSIcon name="arrow-up-right" size={14} />
              </a>
              <button className="gs-resume-close" onClick={closeResume} aria-label="Close résumé"><GSIcon name="close" size={18} /></button>
            </div>
            <div className="gs-resume-frame">
              <iframe src={resumeUrl} title="Résumé PDF" frameBorder="0" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.Direction = DirectionGridSystem;
