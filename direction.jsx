const GS_PAGES = ['Home', 'Projects', 'Background', 'Leadership & Memberships', 'Awards'];

function GSSlideshow() {
  const shots = window.HEADSHOTS || [];
  const [idx, setIdx] = React.useState(0);
  const len = shots.length;
  React.useEffect(() => {
    if (!len) return;
    const t = setInterval(() => setIdx(i => (i + 1) % len), 5000);
    return () => clearInterval(t);
  }, [len]);
  if (!len) return null;
  const go = (n) => setIdx(((n % len) + len) % len);
  const getImageSrc = (id) => `uploads/featured_homepage_images/${id}.jpg`;

  return (
    <div className="gs-slideshow">
      <div className="gs-ss-head">
        <span>field_notes.jpg</span>
        <span><span className="gs-ss-count">{String(idx+1).padStart(2,'0')}</span> / {String(len).padStart(2,'0')}</span>
      </div>
      <div className="gs-ss-stage">
        {shots.map((s, i) => (
          <div key={s.id} className={`gs-ss-slide ${i===idx?'active':''}`}>
            <div className="gs-ss-placeholder">
              <img
                src={getImageSrc(s.id)}
                alt={s.caption}
                className="gs-ss-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="gs-ss-placeholder-text">[ photo {String(i+1).padStart(2,'0')} ]</span>
            </div>
            <div className="gs-ss-caption">
              <div className="gs-ss-caption-label">{s.caption}</div>
              <div className="gs-ss-caption-date">{s.date}</div>
            </div>
          </div>
        ))}
        <button className="gs-ss-nav prev" onClick={() => go(idx-1)} aria-label="Previous">‹</button>
        <button className="gs-ss-nav next" onClick={() => go(idx+1)} aria-label="Next">›</button>
      </div>
      <div className="gs-ss-foot">
        {shots.map((s, i) => (
          <button key={s.id} className={`gs-ss-dot ${i===idx?'active':''}`} onClick={() => go(i)} aria-label={`Slide ${i+1}`} />
        ))}
      </div>
    </div>
  );
}

function GSFlag({ prize, style }) {
  if (!prize) return null;
  if (style === 'badge') return <div className="gs-flag">★ {prize}</div>;
  if (style === 'dot')   return <div className="gs-flag dot">{prize}</div>;
  if (style === 'line')  return <div className="gs-flag line">{prize}</div>;
  return <div className="gs-flag corner">★ {prize}</div>;
}

function GSTile({ p, expanded, onClick, flagStyle, idx }) {
  const num = String(idx + 1).padStart(3, '0');
  return (
    <article className={`gs-tile ${expanded ? 'open' : ''}`} onClick={onClick}>
      <div className="gs-tile-num">PRJ-{num}</div>
      <GSFlag prize={p.prize} style={flagStyle} />
      <div className="gs-tile-img">
        {p.image && <img src={p.image} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />}
      </div>
      <div className="gs-tile-body">
        <div className="gs-tile-year">{p.year}</div>
        <h3 className="gs-tile-title">{p.title}</h3>
        <div className="gs-tile-role">{p.role}</div>
        {expanded ? (
          <>
            <p className="gs-tile-blurb">{p.blurb}</p>
            <div className="gs-tile-tags">
              {p.tags.map(t => <span key={t} className="gs-chip">{t}</span>)}
            </div>
          </>
        ) : (
          <div className="gs-tile-tags">
            {p.tags.slice(0,3).map(t => <span key={t} className="gs-chip">{t}</span>)}
          </div>
        )}
        <div className="gs-tile-foot">
          <span>{expanded ? 'Open · click to close' : `${p.tags.length} tags`}</span>
          <span className="gs-tile-foot-cta">{expanded ? 'Close' : 'Detail'} →</span>
        </div>
      </div>
    </article>
  );
}

function DirectionGridSystem({ flagStyle, showGrid }) {
  const [page, setPage] = React.useState('Home');
  const [openId, setOpenId] = React.useState(null);
  const [resumeOpen, setResumeOpen] = React.useState(false);
  const featured = window.PROJECTS.filter(p => p.featured);
  const all = window.PROJECTS;
  const resumeUrl = 'uploads/LatestResume.pdf';
  const toggle = (id) => setOpenId(prev => prev === id ? null : id);
  const openResume = () => setResumeOpen(true);
  const closeResume = () => setResumeOpen(false);

  React.useEffect(() => {
    const els = document.querySelectorAll('.gs-wrap .reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [page]);

  return (
    <div className="gs-wrap">
      <div className={`gs-grid-underlay ${showGrid ? 'show' : ''}`}>
        {Array.from({length: 12}, (_, i) => <span key={i} />)}
      </div>

      <nav className="gs-nav">
        <div className="gs-brand">
          <div className="gs-brand-mark">JC</div>
          <div>
            <div className="gs-brand-name">Jason Cabrejos</div>
            <div className="gs-brand-sub">Robotics · Embedded · ML</div>
          </div>
        </div>
        <div className="gs-nav-links">
          {GS_PAGES.map(pg => (
            <button key={pg} className={`gs-nav-btn ${page===pg?'active':''}`} onClick={() => { setPage(pg); setOpenId(null); }}>{pg}</button>
          ))}
        </div>
        <div className="gs-nav-right">
          <span className="gs-nav-status">Available · 2026</span>
          <button className="gs-nav-cta">Contact</button>
        </div>
      </nav>

      <div className="gs-page v2-page-fade" key={page}>
        {page === 'Home' && (
          <>
            <section className="gs-hero">
              <div className="gs-hero-num reveal in">01</div>
              <div className="gs-hero-text">
                <div className="gs-eyebrow reveal in"><span className="gs-dash draw-line" /> Robotic Embedded Engineer</div>
                <h1 className="gs-h1 reveal in d1">
                  I design and ship<br/>industrial robotics<br/>that <span className="acc">survive production.</span>
                </h1>
                <p className="gs-lead reveal in d2">
                  Currently at BNSF Railway, where my edge-computing inventory tracking system
                  operates at 92% accuracy and an estimated $5M in annual savings — scaled
                  nationwide through Docker and Azure IoT Hub.
                </p>
                <div className="gs-cta-row reveal in d3">
                  <button className="gs-btn solid" onClick={() => setPage('Projects')}>View featured work →</button>
                  <button className="gs-btn" onClick={openResume}>Résumé (PDF)</button>
                  <a className="gs-btn" href="https://www.linkedin.com/in/jasoncabrejos/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                </div>
              </div>
              <div className="gs-hero-side reveal in d2" style={{padding:0, background:'transparent', border:'none'}}>
                <GSSlideshow />
              </div>
            </section>

            <section className="gs-section">
              <div className="gs-section-head reveal">
                <div className="gs-section-num">02</div>
                <h2 className="gs-h2">Selected work</h2>
                <div className="gs-section-right">
                  <button className="gs-section-link" onClick={() => setPage('Projects')}>All projects ({all.length}) →</button>
                </div>
              </div>
              <div className="gs-tiles reveal d1">
                {featured.map((p, i) => (
                  <GSTile key={p.id} p={p} idx={i} expanded={openId===p.id} onClick={() => toggle(p.id)} flagStyle={flagStyle} />
                ))}
              </div>
            </section>
          </>
        )}

        {resumeOpen && (
          <div className="gs-resume-modal" onClick={closeResume}>
            <div className="gs-resume-dialog" onClick={(e) => e.stopPropagation()}>
              <button className="gs-resume-close" onClick={closeResume} aria-label="Close résumé">×</button>
              <div className="gs-resume-frame">
                <iframe src={resumeUrl} title="Résumé PDF" frameBorder="0" />
              </div>
            </div>
          </div>
        )}

        {page === 'Projects' && (
          <section className="gs-section" style={{paddingTop:'4rem'}}>
            <div className="gs-section-head reveal in">
              <div className="gs-section-num">∞</div>
              <h2 className="gs-h2">Project index</h2>
              <div className="gs-section-right">
                <span className="gs-section-link">{all.length} entries</span>
              </div>
            </div>
            <div className="gs-filter-bar reveal in d1">
              <button className="gs-filter active">All</button>
              <button className="gs-filter">★ Awards</button>
              <button className="gs-filter">Industry</button>
              <button className="gs-filter">Research</button>
              <button className="gs-filter">Student org</button>
              <button className="gs-filter">Hackathon</button>
            </div>
            <div className="gs-tiles reveal in d2">
              {all.map((p, i) => (
                <GSTile key={p.id} p={p} idx={i} expanded={openId===p.id} onClick={() => toggle(p.id)} flagStyle={flagStyle} />
              ))}
            </div>
          </section>
        )}

        {page === 'Background' && (
          <section className="gs-section" style={{paddingTop:'4rem'}}>
            <div className="gs-section-head reveal in">
              <div className="gs-section-num">03</div>
              <h2 className="gs-h2">Background</h2>
              <div className="gs-section-right"><span className="gs-section-link">UTA · 2017—2025</span></div>
            </div>
            <div className="gs-bg-grid">
              <div className="gs-bg-col-1 reveal in d1">
                <h3 className="gs-h3">Education</h3>
                {window.BACKGROUND.education.map(e => (
                  <div key={e.school} className="gs-line-row">
                    <div className="gs-line-date">{e.date}</div>
                    <div>
                      <div className="gs-line-title">{e.school}</div>
                      {e.items.map(i => <div key={i} className="gs-line-sub">— {i}</div>)}
                    </div>
                  </div>
                ))}
                <h3 className="gs-h3" style={{marginTop:'2.5rem'}}>Experience</h3>
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
                    <div style={{fontSize:'0.85rem', lineHeight:1.6, color:'#333'}}>{v.join(' · ')}</div>
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
            <section className="gs-section" style={{paddingTop:'4rem'}}>
              <div className="gs-section-head reveal in">
                <div className="gs-section-num">04</div>
                <h2 className="gs-h2">Leadership &amp; memberships</h2>
                <div className="gs-section-right"><span className="gs-section-link">{window.MEMBERSHIPS.length} entries</span></div>
              </div>
              {grouped.map((g, gi) => (
                <div key={g.kind} className={`gs-mem-group reveal in d${(gi%4)+1}`}>
                  <div className="gs-mem-group-head">
                    <div className="gs-mem-group-num">{String(gi+1).padStart(2,'0')}</div>
                    <div className="gs-mem-group-title">{g.kind}</div>
                    <div className="gs-mem-group-count">{String(g.items.length).padStart(2,'0')}</div>
                  </div>
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
          <section className="gs-section" style={{paddingTop:'4rem'}}>
            <div className="gs-section-head reveal in">
              <div className="gs-section-num">05</div>
              <h2 className="gs-h2">Awards & certifications</h2>
            </div>
            <div className="gs-award-grid reveal in d1">
              {window.AWARDS.map((a, i) => (
                <div key={a.title} className="gs-award">
                  <div className="gs-award-num">{String(i+1).padStart(2,'0')}</div>
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
      </div>
    </div>
  );
}

window.Direction = DirectionGridSystem;
