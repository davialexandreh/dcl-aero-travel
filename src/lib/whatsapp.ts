import { site } from '../config/site';

// O código ref: vai no fim da mensagem para quem atende marcar a origem no Volly.
// A origem (site, ig, grupo) é trocada no navegador a partir da UTM da visita.
export function linkWhatsApp(mensagem: string, ref: string): string {
  const texto = `${mensagem} (ref: site-${ref})`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
}
