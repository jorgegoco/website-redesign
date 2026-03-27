(() => {
  // Headings hierarchy
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({
    level: parseInt(h.tagName[1]),
    text: h.textContent.trim().slice(0, 200)
  }));

  // Main content blocks
  const main = document.querySelector('main, [role="main"], .main-content, #content, article');
  const mainText = main ? main.innerText.trim().slice(0, 10000) : document.body.innerText.trim().slice(0, 10000);

  // Images with alt text
  const images = [...document.querySelectorAll('img')].map(img => ({
    src: img.src,
    alt: img.alt,
    width: img.naturalWidth,
    height: img.naturalHeight,
    isDecorative: !img.alt || img.alt === '' || img.getAttribute('role') === 'presentation'
  })).slice(0, 30);

  // CTAs and buttons
  const ctas = [...document.querySelectorAll('button, a.btn, a.button, [role="button"], .cta, input[type="submit"]')]
    .map(el => ({
      text: el.textContent.trim().slice(0, 80),
      tag: el.tagName,
      href: el.href || null,
      classes: el.className
    })).slice(0, 20);

  // Forms
  const forms = [...document.querySelectorAll('form')].map(f => ({
    action: f.action,
    method: f.method,
    fields: [...f.querySelectorAll('input,select,textarea')].map(inp => ({
      type: inp.type || inp.tagName.toLowerCase(),
      name: inp.name,
      placeholder: inp.placeholder,
      label: inp.labels?.[0]?.textContent?.trim() || inp.getAttribute('aria-label') || ''
    }))
  }));

  // Meta information
  const meta = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || '',
    ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
    canonical: document.querySelector('link[rel="canonical"]')?.href || '',
    lang: document.documentElement.lang
  };

  return JSON.stringify({ meta, headings, mainText, images, ctas, forms }, null, 2);
})()
