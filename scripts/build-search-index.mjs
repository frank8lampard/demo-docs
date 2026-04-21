import { readFileSync, readdirSync, writeFileSync, statSync, mkdirSync } from 'fs'
import { join, relative, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DOCS_DIR = join(ROOT, 'src/content/docs')
const OUTPUT = join(ROOT, 'public/search-index.json')

const SECTIONS = {
  'getting-started': '\u041d\u0430\u0447\u0430\u043b\u043e \u0440\u0430\u0431\u043e\u0442\u044b',
  'agents/apm':      'APM',
  'agents/infra':    '\u0418\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430',
  'agents/rum':      '\u0411\u0440\u0430\u0443\u0437\u0435\u0440\u043d\u044b\u0439 \u043c\u043e\u043d\u0438\u0442\u043e\u0440\u0438\u043d\u0433',
  'agents/mobile':   '\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0439 \u043c\u043e\u043d\u0438\u0442\u043e\u0440\u0438\u043d\u0433',
  'modules':         '\u041c\u043e\u0434\u0443\u043b\u0438',
  'use-cases':       '\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0438',
  'reference':       '\u0421\u043f\u0440\u0430\u0432\u043e\u0447\u043d\u0438\u043a',
}

function getSection(relPath) {
  const parts = relPath.replace(/\\/g, '/').split('/')
  const twoKey = parts[0] + '/' + parts[1]
  return SECTIONS[twoKey] || SECTIONS[parts[0]] || parts[0]
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/m)
  if (match === null) return { frontmatter: {}, body: raw }
  const fm = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx < 0) continue
    fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '')
  }
  return { frontmatter: fm, body: match[2] }
}

function stripMarkdown(text) {
  return text
    .replace(/#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`{3}[\s\S]*?`{3}/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function walkDir(dir, files) {
  if (!files) files = []
  for (const item of readdirSync(dir)) {
    const full = join(dir, item)
    if (statSync(full).isDirectory()) walkDir(full, files)
    else if (item.endsWith('.md') || item.endsWith('.mdx')) files.push(full)
  }
  return files
}

function main() {
  const files = walkDir(DOCS_DIR)
  const documents = []

  for (const file of files) {
    const raw = readFileSync(file, 'utf-8')
    const { frontmatter, body } = parseFrontmatter(raw)
    const relPath = relative(DOCS_DIR, file).replace(/\\/g, '/')
    const slug = relPath.replace(/\.mdx?$/, '').replace(/\/index$/, '')
    const url = '/demo-docs/' + slug + '/'

    documents.push({
      title:   frontmatter.title || slug,
      content: stripMarkdown(body).slice(0, 2000),
      url,
      section: getSection(relPath),
    })
  }

  mkdirSync(join(ROOT, 'public'), { recursive: true })
  writeFileSync(OUTPUT, JSON.stringify({ documents }), 'utf-8')
  console.log('Orama: indexed ' + documents.length + ' pages -> public/search-index.json')
}

main()
