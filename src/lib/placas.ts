// Giro das placas split-flap: painel de partidas, menu e painéis que acendem ao aparecer na tela.
const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function girar(alvo: ParentNode, atraso = 0) {
  if (semMovimento) return;
  const placas = alvo.querySelectorAll<HTMLElement>('.placa:not([data-vazia])');
  placas.forEach((placa, i) => {
    // Uma placa que já está girando termina o próprio giro; a letra real fica guardada na primeira vez.
    if (placa.dataset.emGiro) return;
    placa.dataset.emGiro = '1';
    placa.dataset.final ??= placa.textContent ?? '';
    const final = placa.dataset.final;
    let passos = 3 + ((i * 7) % 5);
    const inicio = atraso + 40 + i * 18;
    // A aba leva a metade de cima da letra que sai; cada aba termina de cair antes da próxima.
    const trocar = (letra: string) => {
      placa.dataset.de = placa.textContent ?? '';
      placa.textContent = letra;
      placa.classList.remove('girando');
      void placa.offsetWidth;
      placa.classList.add('girando');
    };
    const tique = () => {
      if (passos-- <= 0) {
        trocar(final);
        delete placa.dataset.emGiro;
        return;
      }
      trocar(ALFABETO[Math.floor(Math.random() * ALFABETO.length)]);
      setTimeout(tique, 120);
    };
    setTimeout(tique, inicio);
  });
}


// Painéis que "acendem" uma vez quando chegam a 3/4 da tela, como um painel que acabou de atualizar.
//   data-acende            → as placas do bloco giram juntas
//   data-acende="sequencia" → cada grupo de placas gira depois do anterior (portões A1, A2…)
//   data-acende="chamada"  → só ganha data-aceso; o CSS faz o aviso piscar
//   data-acende="pouso"    → linha de Chegadas: destino gira e o status vai de EM VOO a DESEMBARCOU
export function acender() {
  const alvos = document.querySelectorAll<HTMLElement>('[data-acende]:not([data-aceso])');
  if (!alvos.length) return () => {};
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      const alvo = target as HTMLElement;
      observador.unobserve(alvo);
      alvo.setAttribute('data-aceso', '');
      if (alvo.dataset.acende === 'chamada') return;
      if (alvo.dataset.acende === 'pouso') return pousar(alvo);
      if (alvo.dataset.acende === 'sequencia') {
        alvo.querySelectorAll<HTMLElement>('.placas').forEach((grupo, i) => girar(grupo, i * 260));
      } else {
        girar(alvo);
      }
    });
  }, { rootMargin: '0px 0px -25% 0px' });
  alvos.forEach((alvo) => observador.observe(alvo));
  return () => observador.disconnect();
}

// Troca o texto de um grupo de placas girando até as letras novas (placas que sobram ficam vazias).
export function mudar(grupo: HTMLElement, texto: string, atraso = 0) {
  const letras = Array.from(texto.toUpperCase());
  grupo.querySelectorAll<HTMLElement>('.placa').forEach((placa, i) => {
    const letra = letras[i] ?? ' ';
    const vazia = letra === ' ';
    placa.dataset.final = vazia ? '·' : letra;
    if (vazia) {
      setTimeout(() => { placa.toggleAttribute('data-vazia', true); placa.textContent = '·'; }, atraso);
    } else {
      placa.removeAttribute('data-vazia');
    }
  });
  if (semMovimento) {
    grupo.querySelectorAll<HTMLElement>('.placa').forEach((p) => { p.textContent = p.dataset.final ?? ''; });
    return;
  }
  girar(grupo, atraso);
}

// Uma chegada pousando: o destino gira e o status passa por EM VOO e POUSOU até DESEMBARCOU.
function pousar(linha: HTMLElement) {
  linha.querySelectorAll<HTMLElement>('.placas').forEach((grupo) => {
    if (!grupo.closest('[data-pouso]')) girar(grupo);
  });
  const status = linha.querySelector<HTMLElement>('[data-pouso] .placas');
  if (!status || semMovimento) return;
  mudar(status, 'Em voo');
  setTimeout(() => mudar(status, 'Pousou'), 1300);
  setTimeout(() => mudar(status, 'Desembarcou'), 2600);
}
