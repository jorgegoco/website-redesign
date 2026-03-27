(() => {
  // Detect repeated class-based patterns (likely components)
  const allElements = document.querySelectorAll('[class]');
  const classCounts = {};
  allElements.forEach(el => {
    const classes = el.className.split?.(/\s+/) || [];
    classes.forEach(c => {
      if (c && c.length > 2) classCounts[c] = (classCounts[c] || 0) + 1;
    });
  });

  // Find classes used 3+ times (likely component patterns)
  const repeatedComponents = Object.entries(classCounts)
    .filter(([_, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40)
    .map(([cls, count]) => {
      const sample = document.querySelector('.' + CSS.escape(cls));
      return { class: cls, count, sampleTag: sample?.tagName, sampleChildren: sample?.children?.length };
    });

  // Detect framework hints
  const frameworks = [];
  if (document.querySelector('[data-reactroot], [data-reactid], #__next')) frameworks.push('React/Next.js');
  if (document.querySelector('[ng-app], [data-ng-app], .ng-scope')) frameworks.push('Angular');
  if (document.querySelector('[data-v-], #__nuxt')) frameworks.push('Vue/Nuxt');
  if (document.querySelector('[data-svelte-h]')) frameworks.push('Svelte');
  if (document.querySelector('script[src*="jquery"]')) frameworks.push('jQuery');
  if (document.querySelector('link[href*="bootstrap"], .container-fluid')) frameworks.push('Bootstrap');
  if (document.querySelector('[class*="tw-"], [class*="flex "], [class*="grid "]')) frameworks.push('Tailwind (possible)');

  // Semantic structure
  const landmarks = [...document.querySelectorAll('header,nav,main,aside,footer,section,article')]
    .map(el => ({ tag: el.tagName.toLowerCase(), role: el.getAttribute('role'), id: el.id, classes: el.className.toString().slice(0,80) }));

  return JSON.stringify({ repeatedComponents, frameworks, landmarks }, null, 2);
})()
