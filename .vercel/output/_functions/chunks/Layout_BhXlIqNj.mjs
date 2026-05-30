import { c as createComponent } from './astro-component_Ctp5UCQ_.mjs';
import 'piccolore';
import { aV as maybeRenderHead, a5 as addAttribute, b8 as renderTemplate, b4 as renderHead, b5 as renderSlot } from './params-and-props_BxzUSTsX.mjs';
import { r as renderComponent } from './entrypoint_FkoWJ4US.mjs';
import 'clsx';

const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Nav;
  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "About",
      dropdown: [
        { label: "About Us", href: "/about" },
        { label: "Executive Board", href: "/board" },
        { label: "Club History", href: "/history" }
      ]
    },
    {
      label: "Join",
      dropdown: [
        { label: "Student Organization", href: "/join/stuorg" },
        { label: "Newsletter", href: "/join/newsletter" }
      ]
    },
    {
      label: "Connect",
      dropdown: [
        { label: "Socials", href: "/connect/socials" },
        { label: "Discord Server", href: "/connect/discord" }
      ]
    },
    { label: "Feedback", href: "/feedback" }
  ];
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 bg-asu-ivory border-b border-asu-beige"> <div class="max-w-[1280px] mx-auto px-8 md:px-16 flex items-center justify-between h-16"> <!-- Logo --> <a href="/" class="flex items-center shrink-0 opacity-100 hover:opacity-80 transition-opacity duration-200" aria-label="Asian Student Union — home"> <img src="/images/asu-logo.webp" alt="Asian Student Union logo" class="h-10 w-auto"> </a> <!-- Desktop nav --> <nav aria-label="Main navigation"> <ul class="hidden md:flex items-center gap-1 list-none m-0 p-0"> ${navItems.map((item) => item.dropdown ? (
    /* ── Dropdown item ── */
    renderTemplate`<li class="group relative"> <button class="flex items-center gap-1 px-3 py-2 font-ui text-sm font-medium text-asu-dark hover:text-asu-red transition-colors duration-200 cursor-default select-none rounded" aria-haspopup="true" aria-expanded="false"> ${item.label} <!-- Chevron down --> <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" class="transition-transform duration-200 group-hover:rotate-180"> <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </button> <!-- Dropdown panel --> <div class="absolute top-full left-1/2 -translate-x-1/2 pt-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 pointer-events-none group-hover:pointer-events-auto"> <div class="bg-asu-cream rounded py-1 min-w-[176px]" style="box-shadow: 0px 4px 20px rgba(30, 28, 18, 0.08); border: 0.5px solid rgba(30, 28, 18, 0.08);"> ${item.dropdown.map((child) => renderTemplate`<a${addAttribute(child.href, "href")} class="block px-4 py-2.5 font-ui text-sm font-medium text-asu-dark hover:text-asu-red hover:bg-[rgba(229,41,30,0.05)] transition-colors duration-150"> ${child.label} </a>`)} </div> </div> </li>`
  ) : (
    /* ── Direct link ── */
    renderTemplate`<li class="relative"> <a${addAttribute(item.href, "href")}${addAttribute([
      "block px-3 py-2 font-ui text-sm font-medium transition-colors duration-200 rounded",
      currentPath === item.href ? "text-asu-red" : "text-asu-dark hover:text-asu-red"
    ], "class:list")}> ${item.label} <!-- Active indicator dot --> ${currentPath === item.href && renderTemplate`<span class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-asu-red" aria-hidden="true"></span>`} </a> </li>`
  ))} </ul> </nav> <!-- Mobile menu placeholder (Phase 7) --> <button class="md:hidden p-2 text-asu-dark hover:text-asu-red transition-colors" aria-label="Open menu" aria-expanded="false" id="mobile-menu-btn"> <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"> <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </svg> </button> </div> </header>`;
}, "C:/Bench/ASUWebsite/src/components/layout/Nav.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const links = [
    {
      heading: "About",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Executive Board", href: "/board" },
        { label: "Club History", href: "/history" }
      ]
    },
    {
      heading: "Join",
      items: [
        { label: "Student Organization", href: "/join/stuorg" },
        { label: "Newsletter", href: "/join/newsletter" }
      ]
    },
    {
      heading: "Connect",
      items: [
        { label: "Socials", href: "/connect/socials" },
        { label: "Discord Server", href: "/connect/discord" }
      ]
    },
    {
      heading: "More",
      items: [
        { label: "Feedback", href: "/feedback" }
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="bg-asu-espresso text-asu-cream"> <div class="max-w-[1280px] mx-auto px-8 md:px-16 py-16"> <div class="flex flex-col md:flex-row gap-12 md:gap-16"> <!-- Logo + tagline --> <div class="shrink-0 md:w-56"> <a href="/" aria-label="Asian Student Union — home" class="inline-block mb-4 opacity-90 hover:opacity-100 transition-opacity duration-200"> <img src="/images/asu-logo.webp" alt="Asian Student Union logo" class="h-14 w-auto" style="filter: brightness(0) invert(1);"> </a> <p class="font-body text-sm leading-relaxed" style="color: rgba(252,238,201,0.55);">
A community rooted in<br>heritage, growing together.
</p> </div> <!-- Nav link columns --> <div class="flex flex-wrap gap-10 md:gap-16 flex-1"> ${links.map((group) => renderTemplate`<div class="min-w-[120px]"> <p class="font-ui text-[11px] font-bold tracking-[0.1em] uppercase mb-4" style="color: rgba(252,238,201,0.40);"> ${group.heading} </p> <ul class="space-y-2.5 list-none m-0 p-0"> ${group.items.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")} class="font-ui text-sm font-medium text-asu-cream/70 hover:text-asu-cream transition-colors duration-150"> ${item.label} </a> </li>`)} </ul> </div>`)} </div> </div> <!-- Divider + disclaimer + copyright --> <div class="mt-14 pt-6 flex flex-col gap-3" style="border-top: 1px solid rgba(252,238,201,0.10);"> <p class="font-ui text-xs leading-relaxed max-w-3xl" style="color: rgba(252,238,201,0.38);">
The views and opinions expressed on this website are strictly those of the Asian Student
        Union at Iowa State University and its members. The contents of these pages have not been
        reviewed or approved by Iowa State University. This is not an official Iowa State University
        website.
</p> <p class="font-ui text-xs" style="color: rgba(252,238,201,0.28);">
© ${year} Asian Student Union at Iowa State University. All rights reserved.
</p> </div> </div> </footer>`;
}, "C:/Bench/ASUWebsite/src/components/layout/Footer.astro", void 0);

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Asian Student Union @ Iowa State University",
    description = "Asian Student Union at Iowa State University — a community rooted in heritage, growing together."
  } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(description, "content")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><title>${title}</title>${renderHead()}</head> <body class="flex flex-col min-h-screen"> ${renderComponent($$result, "Nav", $$Nav, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Bench/ASUWebsite/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
