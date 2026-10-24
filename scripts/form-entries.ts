/**
 * Ayuda opcional (solo local): lee un Google Form público e imprime las variables de entorno
 * con el `entry.XXXX` de cada pregunta, listas para pegar en `.env` o en Netlify.
 * No escribe archivos. También puedes sacar los IDs a mano del "enlace prellenado".
 *
 * Uso: npm run form:entries -- "https://docs.google.com/forms/d/e/<ID>/viewform"
 */
import { FORM_FIELDS, FORM_ID_ENV } from '../src/features/chatbot/googleForm/formFields.ts';

interface FormQuestion {
  title: string;
  entryId: number;
}

function parseFormId(url: string): string {
  const match = /\/forms\/d\/e\/([\w-]+)\//.exec(url);
  if (!match?.[1]) {
    throw new Error(
      'Usa el enlace público del Form (…/forms/d/e/<ID>/viewform), no el de edición.',
    );
  }
  return match[1];
}

function parseQuestions(html: string): FormQuestion[] {
  const match = /FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);\s*<\/script>/s.exec(html);
  if (!match?.[1]) throw new Error('No se encontró la definición del Form. ¿Es público?');

  const data: unknown = JSON.parse(match[1]);
  const items = (data as unknown[][])[1]?.[1];
  if (!Array.isArray(items)) throw new Error('Formato del Form no reconocido.');

  const questions: FormQuestion[] = [];
  for (const item of items as unknown[][]) {
    const title = item[1];
    const answers = item[4];
    const entryId = Array.isArray(answers) ? (answers[0] as unknown[] | undefined)?.[0] : undefined;
    if (typeof title === 'string' && typeof entryId === 'number') {
      questions.push({ title: title.trim(), entryId });
    }
  }
  return questions;
}

async function main(): Promise<void> {
  const url = process.argv[2];
  if (!url) throw new Error('Falta la URL del Form.');

  const formId = parseFormId(url);
  const response = await fetch(`https://docs.google.com/forms/d/e/${formId}/viewform`);
  if (!response.ok) throw new Error(`Google respondió ${response.status}.`);

  const questions = parseQuestions(await response.text());
  const lines = [`${FORM_ID_ENV}=${formId}`];
  const missing: string[] = [];

  for (const { title, env } of Object.values(FORM_FIELDS)) {
    const question = questions.find((q) => q.title.toLowerCase() === title.toLowerCase());
    if (question) lines.push(`${env}=entry.${question.entryId}`);
    else missing.push(title);
  }

  console.log('# Pega estas líneas en .env o en Netlify (Environment variables):');
  console.log(lines.join('\n'));
  if (missing.length > 0) {
    console.warn(`\nFaltan en el Form (revisa el título exacto):\n  - ${missing.join('\n  - ')}`);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
