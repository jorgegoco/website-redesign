(() => {
  const origin = window.location.origin;
  const TRACKING_PARAMS = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','fbclid','gclid','ref','mc_cid','mc_eid'];

  // --- Stage 1: Collect ---

  // All anchor links
  const rawLinks = [...document.querySelectorAll('a[href]')].map(a => {
    let href;
    try { href = new URL(a.href, origin).href; } catch { return null; }
    return { href, label: a.textContent.trim().slice(0, 80) || null };
  }).filter(Boolean);

  // SPA scroll sections: <section>, elements with [id] that are block-level/semantic
  const sectionTags = new Set(['SECTION','DIV','ARTICLE','HEADER','FOOTER','MAIN','ASIDE','NAV']);

  function mapSection(el) {
    const heading = el.querySelector('h1,h2,h3,h4,h5,h6');
    const rect = el.getBoundingClientRect();
    const docHeight = document.documentElement.scrollHeight;
    const relPos = (rect.top + window.scrollY) / docHeight;
    return {
      elementId: el.id || null,
      tag: el.tagName.toLowerCase(),
      heading: heading ? heading.textContent.trim().slice(0, 120) : null,
      position: relPos < 0.2 ? 'top' : relPos > 0.8 ? 'bottom' : 'middle'
    };
  }

  // Primary detection: semantic <section> tags and elements with meaningful IDs
  let scrollSections = [...document.querySelectorAll('section, [id]')]
    .filter(el => el.id || el.tagName === 'SECTION')
    .filter(el => sectionTags.has(el.tagName) || el.getAttribute('role'))
    // Exclude tiny utility elements (must be at least 200px tall)
    .filter(el => el.getBoundingClientRect().height >= 200)
    // Exclude generic wrapper IDs
    .filter(el => !['root', 'app', '__next', '__nuxt', 'gatsby-focus-wrapper'].includes(el.id))
    .map(mapSection);

  // Fallback: if fewer than 3 sections found, detect visual sections from DOM structure
  if (scrollSections.length < 3) {
    const mainEl = document.querySelector('main, [role="main"], #content, .main-content');
    const container = mainEl || document.querySelector('#root > div, #app > div, body > div');

    if (container) {
      const MIN_HEIGHT = 150;
      const containerHeight = container.getBoundingClientRect().height;

      function isContentBlock(el) {
        if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'LINK') return false;
        const rect = el.getBoundingClientRect();
        if (rect.height < MIN_HEIGHT) return false;
        const hasHeading = el.querySelector('h1,h2,h3,h4,h5,h6');
        const hasText = el.innerText && el.innerText.trim().length > 30;
        const hasImage = el.querySelector('img, video, canvas, svg');
        return hasHeading || hasText || hasImage;
      }

      // Collect direct children that are content blocks
      let candidates = [...container.children].filter(isContentBlock);

      // If a child takes up >70% of the container height, it's a wrapper — look inside it
      const expanded = [];
      for (const el of candidates) {
        const elHeight = el.getBoundingClientRect().height;
        if (elHeight > containerHeight * 0.7 && el.children.length >= 2) {
          const inner = [...el.children].filter(isContentBlock);
          if (inner.length >= 2) {
            expanded.push(...inner);
            continue;
          }
        }
        expanded.push(el);
      }
      candidates = expanded;

      const mapped = candidates
        .map(mapSection)
        .filter(candidate => {
          return !scrollSections.some(existing =>
            existing.elementId && existing.elementId === candidate.elementId
          );
        });

      if (mapped.length >= 2) {
        scrollSections = mapped;
      }
    }
  }

  // Framework route hints
  const frameworkRoutes = [];
  if (window.__NEXT_DATA__) {
    try {
      const page = window.__NEXT_DATA__.page;
      if (page) frameworkRoutes.push({ source: 'nextjs', route: page });
    } catch {}
  }
  if (window.__remixManifest) {
    try {
      const routes = Object.keys(window.__remixManifest.routes || {});
      routes.forEach(r => frameworkRoutes.push({ source: 'remix', route: r }));
    } catch {}
  }
  if (window.__NUXT__) {
    frameworkRoutes.push({ source: 'nuxt', route: 'detected' });
  }

  // --- Stage 2: Normalize ---

  function cleanUrl(href) {
    try {
      const u = new URL(href, origin);
      TRACKING_PARAMS.forEach(p => u.searchParams.delete(p));
      let path = u.pathname.replace(/\/+$/, '') || '/';
      return { cleaned: u.origin + path + (u.search || '') + (u.hash || ''), pathname: path, hash: u.hash, search: u.search, hostname: u.hostname };
    } catch { return null; }
  }

  const normalized = [];
  const seen = new Set();

  for (const link of rawLinks) {
    const parsed = cleanUrl(link.href);
    if (!parsed) continue;
    if (seen.has(parsed.cleaned)) continue;
    seen.add(parsed.cleaned);

    let type;
    if (parsed.hostname !== new URL(origin).hostname) {
      type = 'external';
    } else if (parsed.pathname === '/' && parsed.hash && !parsed.search) {
      type = 'anchor-only';
    } else if (parsed.pathname === window.location.pathname && parsed.hash) {
      type = 'anchor-only';
    } else {
      type = 'internal';
    }

    normalized.push({
      href: parsed.cleaned,
      type,
      hostname: parsed.hostname,
      pathname: parsed.pathname,
      hash: parsed.hash || null,
      search: parsed.search || null,
      segments: parsed.pathname === '/' ? [] : parsed.pathname.replace(/^\//, '').split('/'),
      label: link.label
    });
  }

  // --- Stage 3: Group ---

  // 3a. Internal links — path-prefix trie
  const internals = normalized.filter(n => n.type === 'internal');

  // Build trie
  const trie = { children: {}, urls: [], segment: '' };

  for (const link of internals) {
    let node = trie;
    if (link.segments.length === 0) {
      node.urls.push(link);
      continue;
    }
    for (const seg of link.segments) {
      if (!node.children[seg]) node.children[seg] = { children: {}, urls: [], segment: seg };
      node = node.children[seg];
    }
    node.urls.push(link);
  }

  // Detect dynamic segments: 3+ siblings with numeric/UUID/unique names
  function isDynamic(name) {
    return /^\d+$/.test(name) || /^[0-9a-f]{8}-/.test(name) || /^[0-9a-f]{24,}$/.test(name);
  }

  function collapseDynamic(node) {
    const childKeys = Object.keys(node.children);
    if (childKeys.length >= 3) {
      const dynamicCount = childKeys.filter(isDynamic).length;
      // If most children look dynamic, or there are many unique siblings
      if (dynamicCount >= 3 || (childKeys.length >= 8 && new Set(childKeys).size === childKeys.length)) {
        const merged = { children: {}, urls: [], segment: '{dynamic}' };
        for (const key of childKeys) {
          const child = node.children[key];
          merged.urls.push(...child.urls);
          for (const [k, v] of Object.entries(child.children)) {
            if (!merged.children[k]) merged.children[k] = v;
          }
        }
        node.children = { '{dynamic}': merged };
      }
    }
    for (const child of Object.values(node.children)) {
      collapseDynamic(child);
    }
  }
  collapseDynamic(trie);

  // Extract groups from trie
  const groups = [];

  function extractGroups(node, pathParts) {
    const currentPath = '/' + pathParts.join('/');
    const childKeys = Object.keys(node.children);

    // Leaf node or node with URLs
    const totalUrls = countUrls(node);

    if (childKeys.length === 0 && node.urls.length > 0) {
      addInternalGroup(currentPath, node.urls, totalUrls);
    } else if (childKeys.length > 0) {
      // If this node has URLs AND children, the node's own URLs are a group
      if (node.urls.length > 0 && pathParts.length > 0) {
        addInternalGroup(currentPath, node.urls, node.urls.length);
      }
      for (const [seg, child] of Object.entries(node.children)) {
        extractGroups(child, [...pathParts, seg]);
      }
    }
  }

  function countUrls(node) {
    let count = node.urls.length;
    for (const child of Object.values(node.children)) {
      count += countUrls(child);
    }
    return count;
  }

  function addInternalGroup(path, urls, totalUrls) {
    // Detect pagination
    const isPaginated = urls.some(u =>
      (u.search && /[?&]p(age)?=\d/i.test(u.search)) ||
      u.segments.some(s => /^page$/i.test(s))
    );

    // Detect filter variants (same path, different query params)
    const pathsOnly = urls.map(u => u.pathname);
    const uniquePaths = new Set(pathsOnly);
    const hasFilterVariants = uniquePaths.size < urls.length && urls.some(u => u.search);

    // Pick representatives
    const representative = [];
    if (isPaginated) {
      const first = urls.find(u => !u.search || /[?&]p(age)?=1\b/.test(u.search)) || urls[0];
      representative.push({ href: first.href, label: first.label });
    } else if (hasFilterVariants) {
      const canonical = urls.find(u => !u.search) || urls[0];
      representative.push({ href: canonical.href, label: canonical.label });
    } else if (totalUrls <= 5) {
      urls.forEach(u => representative.push({ href: u.href, label: u.label }));
    } else {
      // Listing page (shortest path) + one detail
      const sorted = [...urls].sort((a, b) => a.segments.length - b.segments.length);
      representative.push({ href: sorted[0].href, label: sorted[0].label });
      if (sorted.length > 1) representative.push({ href: sorted[1].href, label: sorted[1].label });
    }

    groups.push({
      name: path || '/',
      type: 'internal',
      pattern: path.includes('{dynamic}') ? path.replace('{dynamic}', '*') : null,
      totalUrls,
      isPaginated,
      hasFilterVariants,
      filterVariantCount: hasFilterVariants ? urls.length - uniquePaths.size : 0,
      representative,
      sampleUrls: urls.slice(0, 3).map(u => u.href)
    });
  }

  // Root-level URLs (no segments) get special treatment
  const rootUrls = trie.urls;
  if (rootUrls.length > 0) {
    groups.push({
      name: '/',
      type: 'internal',
      pattern: null,
      totalUrls: rootUrls.length,
      isPaginated: false,
      hasFilterVariants: false,
      filterVariantCount: 0,
      representative: rootUrls.map(u => ({ href: u.href, label: u.label })),
      sampleUrls: []
    });
  }

  extractGroups(trie, []);

  // Merge single-segment top-level pages into one group
  const topLevel = groups.filter(g => g.type === 'internal' && g.name !== '/' && !g.name.slice(1).includes('/') && g.totalUrls === 1);
  if (topLevel.length > 1) {
    const merged = {
      name: 'Top-level pages',
      type: 'internal',
      pattern: null,
      totalUrls: topLevel.length,
      isPaginated: false,
      hasFilterVariants: false,
      filterVariantCount: 0,
      representative: topLevel.flatMap(g => g.representative),
      sampleUrls: []
    };
    // Remove individual top-level groups and add merged
    const topNames = new Set(topLevel.map(g => g.name));
    const filtered = groups.filter(g => !topNames.has(g.name));
    filtered.push(merged);
    groups.length = 0;
    groups.push(...filtered);
  }

  // 3b. External links — group by domain
  const externals = normalized.filter(n => n.type === 'external');
  const extByDomain = {};
  for (const link of externals) {
    if (!extByDomain[link.hostname]) extByDomain[link.hostname] = [];
    extByDomain[link.hostname].push(link);
  }
  for (const [domain, links] of Object.entries(extByDomain)) {
    groups.push({
      name: 'External: ' + domain,
      type: 'external',
      pattern: null,
      totalUrls: links.length,
      representative: [],
      sampleUrls: links.slice(0, 3).map(l => l.href)
    });
  }

  // 3c. Anchor-only links
  const anchors = normalized.filter(n => n.type === 'anchor-only');
  if (anchors.length > 0) {
    groups.push({
      name: 'In-page anchors',
      type: 'anchor',
      pattern: null,
      totalUrls: anchors.length,
      representative: anchors.map(a => ({ href: a.href, label: a.label, hash: a.hash })),
      sampleUrls: []
    });
  }

  // 3d. Scroll sections
  if (scrollSections.length > 0) {
    groups.push({
      name: 'SPA scroll sections',
      type: 'scroll-section',
      pattern: null,
      totalUrls: scrollSections.length,
      representative: scrollSections,
      sampleUrls: []
    });
  }

  // --- Stage 4: Summarize ---

  const internalCount = internals.length;
  const externalCount = externals.length;
  const uniquePathnames = new Set(internals.map(i => i.pathname));

  let siteType;
  if (uniquePathnames.size <= 1 && scrollSections.length > 0) {
    siteType = 'spa';
  } else if (uniquePathnames.size >= 5 && scrollSections.length === 0) {
    siteType = 'multi-page';
  } else {
    siteType = 'hybrid';
  }

  return JSON.stringify({
    url: window.location.href,
    title: document.title,
    siteType,
    stats: {
      totalLinksFound: rawLinks.length,
      totalScrollSections: scrollSections.length,
      internalLinks: internalCount,
      externalLinks: externalCount,
      groups: groups.length
    },
    frameworkRoutes: frameworkRoutes.length > 0 ? frameworkRoutes : undefined,
    groups
  }, null, 2);
})()
