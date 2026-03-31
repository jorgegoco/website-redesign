/**
 * clickable_discovery.js
 *
 * Discovers all interactive elements that lack ARIA roles — plain div/span elements
 * with onclick handlers or cursor:pointer styles. These are invisible to the a11y
 * snapshot but fully clickable by users (common in Tailwind/Bootstrap SPAs).
 *
 * Returns up to 60 deduplicated elements sorted by vertical position (top to bottom).
 * Use the returned `text` field to build element signatures and to click via JS.
 */
() => {
  // Semantic HTML elements are already captured by the a11y snapshot — skip them.
  const ARIA_COVERED = new Set(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL']);

  const results = [];
  const seen = new Set(); // deduplicate by text + position

  for (const el of document.querySelectorAll('*')) {
    if (ARIA_COVERED.has(el.tagName)) continue;

    // Must be visible and interactive
    if (!el.offsetWidth || !el.offsetHeight) continue;
    const style = getComputedStyle(el);
    if (style.visibility === 'hidden') continue;
    if (style.pointerEvents === 'none') continue;

    // cursor:pointer is the primary signal — works for all frameworks (React, Vue, Angular,
    // Svelte) because they all set this via CSS. el.onclick only catches old-school inline
    // onclick="..." attributes and misses addEventListener-based handlers used by modern SPAs.
    const isCursorPointer = style.cursor === 'pointer';
    const hasOnClick = typeof el.onclick === 'function'; // supplementary: catches legacy HTML
    if (!isCursorPointer && !hasOnClick) continue;

    const rect = el.getBoundingClientRect();
    const top = Math.round(rect.top + window.scrollY);
    const left = Math.round(rect.left);
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    // Skip tiny elements (likely decorative icons < 20px)
    if (width < 20 || height < 20) continue;

    const text = (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 80);
    const sig = `${text}|${top}|${left}`;

    // Skip child duplicates: if a parent with the same text and overlapping position
    // was already added, skip this smaller child.
    if (seen.has(sig)) continue;
    seen.add(sig);

    results.push({
      tag: el.tagName,
      text,
      classes: el.className.toString().slice(0, 80),
      top,
      left,
      width,
      height,
    });
  }

  // Sort top-to-bottom (document order)
  results.sort((a, b) => a.top - b.top || a.left - b.left);

  return results.slice(0, 60);
}
