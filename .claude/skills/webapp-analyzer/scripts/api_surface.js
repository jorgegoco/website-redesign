(() => {
  const state = {};
  // Redux
  if (window.__REDUX_DEVTOOLS_EXTENSION__) state.redux = 'Redux store detected';
  if (window.__NEXT_DATA__) state.nextData = { page: window.__NEXT_DATA__.page, props: Object.keys(window.__NEXT_DATA__.props || {}) };
  if (window.__NUXT__) state.nuxt = 'Nuxt state detected';

  // External resources
  const scripts = [...document.querySelectorAll('script[src]')].map(s => s.src).slice(0, 20);
  const stylesheets = [...document.querySelectorAll('link[rel="stylesheet"]')].map(l => l.href).slice(0, 10);

  // Third-party services (analytics, CDNs, etc.)
  const thirdParty = scripts.filter(s => !s.includes(window.location.hostname))
    .map(s => { try { return new URL(s).hostname } catch { return s } });

  return JSON.stringify({ state, scripts, stylesheets, thirdPartyDomains: [...new Set(thirdParty)] }, null, 2);
})()
