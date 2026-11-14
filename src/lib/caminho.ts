// Prefixa caminhos internos com a base do site (ex.: /dcl-aero-travel no GitHub Pages; vazio no domínio próprio).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const caminho = (p: string) => (p.startsWith('/') ? base + p : p);
export const semBase = (p: string) => (base && p.startsWith(base) ? p.slice(base.length) || '/' : p);
