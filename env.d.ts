// Oxlint's type-aware path (`vp check` / `vp lint --type-aware`) resolves SFC
// imports through this shim. Without it every `./Foo.vue` import reports
// TS2307 in .vue files. Nuxt/vue-tsc resolve the real SFC types separately.
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, unknown>
  export default component
}
