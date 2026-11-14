// Giro das placas split-flap, usado pelo painel de partidas e pelo menu.
const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function girar(alvo: ParentNode) {
  if (semMovimento) return;
  const placas = alvo.querySelectorAll<HTMLElement>('.placa:not([data-vazia])');
  placas.forEach((placa, i) => {
    // Uma placa que já está girando termina o próprio giro; a letra real fica guardada na primeira vez.
    if (placa.dataset.emGiro) return;
    placa.dataset.emGiro = '1';
    placa.dataset.final ??= placa.textContent ?? '';
    const final = placa.dataset.final;
    let passos = 3 + ((i * 7) % 5);
    const inicio = 40 + i * 18;
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

