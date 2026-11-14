// Abre e fecha <details data-sanfona> deslizando, em vez de aparecer de uma vez.
// Sem JavaScript ou com menos movimento pedido, o <details> segue o comportamento nativo.
const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const CHEGADA = 'cubic-bezier(0.16, 1, 0.3, 1)';

export function deslizar(corpo: HTMLElement, de: number, para: number, duracao: number, fim?: () => void, esmaecer = true) {
  corpo.style.overflow = 'hidden';
  const brilho = (abrindo: boolean) => (esmaecer ? { opacity: abrindo ? 1 : 0.2 } : {});
  // Com border-box, altura 0 ainda deixaria o padding à mostra: no ponto fechado o padding também vai a 0.
  const { paddingTop, paddingBottom } = getComputedStyle(corpo);
  const caixa = (altura: number) => (altura === 0 ? { paddingTop: '0px', paddingBottom: '0px' } : { paddingTop, paddingBottom });
  const anim = corpo.animate(
    [
      { height: `${de}px`, ...caixa(de), ...brilho(de > para) },
      { height: `${para}px`, ...caixa(para), ...brilho(de < para) },
    ],
    { duration: duracao, easing: de < para ? CHEGADA : 'cubic-bezier(0.4, 0, 1, 1)' },
  );
  anim.onfinish = anim.oncancel = () => {
    corpo.style.removeProperty('overflow');
    fim?.();
  };
  return anim;
}

document.addEventListener('click', (e) => {
  if (semMovimento) return;
  const resumo = (e.target as HTMLElement).closest('summary');
  const caixa = resumo?.parentElement;
  if (!(caixa instanceof HTMLDetailsElement) || !caixa.hasAttribute('data-sanfona') || resumo !== caixa.querySelector(':scope > summary')) return;
  const corpo = caixa.querySelector<HTMLElement>(':scope > :not(summary)');
  if (!corpo) return;
  e.preventDefault();
  if (caixa.dataset.deslizando) return;
  caixa.dataset.deslizando = '1';
  const terminar = () => delete caixa.dataset.deslizando;
  if (!caixa.open) {
    caixa.open = true;
    deslizar(corpo, 0, corpo.offsetHeight, 280, terminar);
  } else {
    // Fecha mais rápido do que abre; o atributo sai só no fim, para o conteúdo não sumir antes.
    caixa.dataset.fechando = '';
    deslizar(corpo, corpo.offsetHeight, 0, 180, () => {
      caixa.open = false;
      delete caixa.dataset.fechando;
      terminar();
    });
  }
});
