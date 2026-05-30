import { c as createComponent } from './astro-component_Ctp5UCQ_.mjs';
import 'piccolore';
import { b4 as renderHead, b8 as renderTemplate } from './params-and-props_BxzUSTsX.mjs';
import 'clsx';

const $$Password = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Password;
  let error = false;
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const submitted = data.get("password");
    if (submitted === "") {
      Astro2.cookies.set("asu_preview_auth", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
        // 7 days
      });
      return Astro2.redirect("/");
    }
    error = true;
  }
  return renderTemplate`<html lang="en" data-astro-cid-mrwaqy26> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preview — Asian Student Union</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico">${renderHead()}</head> <body data-astro-cid-mrwaqy26> <div class="card" data-astro-cid-mrwaqy26> <div class="logo" data-astro-cid-mrwaqy26>🌸</div> <h1 data-astro-cid-mrwaqy26>ASU Preview</h1> <p data-astro-cid-mrwaqy26>This site is under construction. Enter the officer password to continue.</p> <form method="POST" data-astro-cid-mrwaqy26> <input type="password" name="password" placeholder="Enter password" autofocus required data-astro-cid-mrwaqy26> <button type="submit" data-astro-cid-mrwaqy26>Enter</button> ${error && renderTemplate`<p class="error" data-astro-cid-mrwaqy26>Incorrect password — try again.</p>`} </form> </div> </body></html>`;
}, "C:/Bench/ASUWebsite/src/pages/password.astro", void 0);
const $$file = "C:/Bench/ASUWebsite/src/pages/password.astro";
const $$url = "/password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Password,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
