import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const data = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a data no formato AAAA-MM-DD');

const viagem = {
  destino: z.string().min(2).max(24),
  saida: z.string().min(2).max(32),
  ida: data,
  volta: data,
  hotel: z.string().max(60).optional(),
  precoPorPessoa: z.number().positive(),
  parcelas: z.number().int().min(1).max(24).optional(),
  foto: z.string().optional(),
  // Conteúdo de demonstração enquanto as promoções reais não chegam.
  exemplo: z.boolean().default(false),
};

const promocoes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/promocoes' }),
  schema: z.object(viagem),
});

const pacotes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pacotes' }),
  schema: z.object({ ...viagem, inclui: z.array(z.string()).default([]) }),
});

const depoimentos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/depoimentos' }),
  schema: z.object({
    nome: z.string(),
    destino: z.string().optional(),
    texto: z.string(),
    ordem: z.number().default(0),
  }),
});

const duvidas = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/duvidas' }),
  schema: z.object({
    pergunta: z.string(),
    resposta: z.string(),
    // Em quais páginas de serviço a pergunta aparece (slug da página).
    servicos: z.array(z.string()).default([]),
    ordem: z.number().default(0),
    // Resposta que depende de política ainda não confirmada por escrito pelo cliente.
    revisar: z.boolean().default(false),
  }),
});

export const collections = { promocoes, pacotes, depoimentos, duvidas };
