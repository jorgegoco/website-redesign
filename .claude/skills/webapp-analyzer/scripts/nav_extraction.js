(() => {
  const navs = [...document.querySelectorAll('nav, [role="navigation"], header, .navbar, .sidebar')];
  return JSON.stringify(navs.map(n => ({
    tag: n.tagName,
    role: n.getAttribute('role'),
    classes: n.className,
    links: [...n.querySelectorAll('a')].map(a => ({ text: a.textContent.trim().slice(0,60), href: a.href }))
  })), null, 2);
})()
