() => {
  // --- CSS Custom Properties (design tokens) ---
  const rootStyles = getComputedStyle(document.documentElement);
  const cssVars = {};
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText === ':root' || rule.selectorText === ':host') {
          for (const prop of rule.style) {
            if (prop.startsWith('--')) cssVars[prop] = rule.style.getPropertyValue(prop).trim();
          }
        }
      }
    } catch(e) { /* cross-origin sheets */ }
  }

  // --- Colors in use ---
  const colorSet = new Set();
  const sampleElements = document.querySelectorAll('*');
  const subset = [...sampleElements].slice(0, 300);
  subset.forEach(el => {
    const s = getComputedStyle(el);
    [s.color, s.backgroundColor, s.borderColor].forEach(c => {
      if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') colorSet.add(c);
    });
  });

  // --- Typography ---
  const fontSet = new Set();
  const fontSizes = new Set();
  const fontWeights = new Set();
  const lineHeights = new Set();
  subset.forEach(el => {
    const s = getComputedStyle(el);
    fontSet.add(s.fontFamily.split(',')[0].trim().replace(/["']/g, ''));
    fontSizes.add(s.fontSize);
    fontWeights.add(s.fontWeight);
    lineHeights.add(s.lineHeight);
  });

  // --- Spacing patterns ---
  const spacingValues = new Set();
  subset.slice(0, 100).forEach(el => {
    const s = getComputedStyle(el);
    [s.padding, s.margin, s.gap].forEach(v => { if (v && v !== '0px') spacingValues.add(v); });
  });

  // --- Border radii ---
  const radii = new Set();
  subset.slice(0, 100).forEach(el => {
    const r = getComputedStyle(el).borderRadius;
    if (r && r !== '0px') radii.add(r);
  });

  // --- Layout patterns ---
  const layouts = { flexCount: 0, gridCount: 0 };
  subset.forEach(el => {
    const d = getComputedStyle(el).display;
    if (d === 'flex' || d === 'inline-flex') layouts.flexCount++;
    if (d === 'grid' || d === 'inline-grid') layouts.gridCount++;
  });

  return JSON.stringify({
    cssVariables: cssVars,
    colors: [...colorSet].slice(0, 30),
    fonts: [...fontSet],
    fontSizes: [...fontSizes].sort(),
    fontWeights: [...fontWeights],
    lineHeights: [...lineHeights],
    spacing: [...spacingValues].slice(0, 20),
    borderRadii: [...radii],
    layouts
  }, null, 2);
}
