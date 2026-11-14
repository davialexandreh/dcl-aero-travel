// Todas as datas são comparadas como dia civil em America/Sao_Paulo.
const FUSO = 'America/Sao_Paulo';
const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

/** Dia de hoje em São Paulo, no formato AAAA-MM-DD. */
export function hojeSP(agora = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: FUSO }).format(agora);
}

function paraDia(iso: string): number {
  const [a, m, d] = iso.split('-').map(Number);
  return Date.UTC(a, m - 1, d) / 86_400_000;
}

/** A promoção sai do ar 5 dias antes da ida. */
export function diaLimite(ida: string): string {
  const dia = paraDia(ida) - 5;
  return new Date(dia * 86_400_000).toISOString().slice(0, 10);
}

export function diasAte(iso: string, hoje = hojeSP()): number {
  return paraDia(iso) - paraDia(hoje);
}

export function estaNoAr(ida: string, hoje = hojeSP()): boolean {
  return diasAte(diaLimite(ida), hoje) >= 0;
}

/** Status de painel, calculado só pelas datas: nada de escassez inventada. */
export function statusPartida(ida: string, hoje = hojeSP()): 'ULTIMOS_DIAS' | 'PROGRAMADO' {
  return diasAte(diaLimite(ida), hoje) <= 3 ? 'ULTIMOS_DIAS' : 'PROGRAMADO';
}

export function diaCurto(iso: string): string {
  const [, m, d] = iso.split('-').map(Number);
  return `${String(d).padStart(2, '0')} ${MESES[m - 1]}`;
}

export function reais(valor: number): string {
  return `R$ ${valor.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;
}
