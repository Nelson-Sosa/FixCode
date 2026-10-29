import type { Category, Article } from '../types';

export const CATEGORIES: Record<string, Category> = {
  devops: {
    id: 'devops',
    label: 'DevOps',
    description: 'Docker, CI/CD, Kubernetes, Firebase, Vercel y despliegues en la nube.',
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-100',
    darkColor: 'dark:text-cyan-300',
    darkBgColor: 'dark:bg-cyan-900/30',
    icon: 'devops',
  },
  frontend: {
    id: 'frontend',
    label: 'Frontend',
    description: 'React, Vue, TypeScript, Tailwind CSS, rendimiento y accesibilidad web.',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    darkColor: 'dark:text-purple-300',
    darkBgColor: 'dark:bg-purple-900/30',
    icon: 'frontend',
  },
  backend: {
    id: 'backend',
    label: 'Backend',
    description: 'Node.js, Python, APIs REST, bases de datos, autenticación y seguridad.',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    darkColor: 'dark:text-emerald-300',
    darkBgColor: 'dark:bg-emerald-900/30',
    icon: 'backend',
  },
  terminal: {
    id: 'terminal',
    label: 'Terminal / Linux',
    description: 'Bash, comandos esenciales, scripts de automatización y administración de servidores.',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    darkColor: 'dark:text-amber-300',
    darkBgColor: 'dark:bg-amber-900/30',
    icon: 'terminal',
  },
};

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'docker-compose-nodejs-postgres',
    title: 'Docker Compose: Node.js + PostgreSQL desde cero',
    excerpt: 'Aprende a levantar un entorno de desarrollo completo con Node.js y PostgreSQL usando Docker Compose. Configura volúmenes, redes y variables de entorno correctamente.',
    content: `
## Introducción

Docker Compose es la herramienta perfecta para orquestar múltiples contenedores en desarrollo. En esta guía montaremos un stack completo de Node.js con PostgreSQL.

## Prerrequisitos

- Docker Desktop instalado y corriendo
- Node.js 18+ (para desarrollo local)
- Conocimientos básicos de Docker

## Estructura del proyecto

\`\`\`
my-app/
├── docker-compose.yml
├── Dockerfile
├── src/
│   └── index.js
├── package.json
└── .env
\`\`\`

## Archivo docker-compose.yml

\`\`\`yaml
version: '3.9'

services:
  app:
    build: .
    container_name: node_app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/mydb
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    container_name: postgres_db
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
\`\`\`

## Dockerfile para Node.js

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "src/index.js"]
\`\`\`

## Levantar el stack

\`\`\`bash
# Construir e iniciar todos los servicios
docker compose up -d --build

# Ver los logs en tiempo real
docker compose logs -f app

# Verificar el estado de los contenedores
docker compose ps

# Detener todos los servicios
docker compose down
\`\`\`

## Errores comunes

### Error: \`connection refused\`

Ocurre cuando la app intenta conectarse antes de que PostgreSQL esté listo. La solución es usar \`depends_on\` con \`condition: service_healthy\` como en el ejemplo.

### Error: \`port is already allocated\`

\`\`\`bash
# Encontrar qué proceso usa el puerto 5432
lsof -i :5432
# Matar el proceso
kill -9 <PID>
\`\`\`

## Conclusión

Con esta configuración tienes un entorno de desarrollo reproducible y aislado. Puedes compartirlo con tu equipo y garantizar que todos trabajen con las mismas versiones de software.
    `,
    category: CATEGORIES.devops,
    tags: ['docker', 'docker-compose', 'nodejs', 'postgresql', 'devops'],
    author: 'FixCode',
    publishedAt: '2024-10-15',
    readingTime: 8,
    featured: true,
  },
  {
    id: '2',
    slug: 'deploy-react-firebase-hosting',
    title: 'Desplegar una app React en Firebase Hosting paso a paso',
    excerpt: 'Guía completa para desplegar tu aplicación React (Vite) en Firebase Hosting con CDN global, HTTPS automático y URLs limpias configuradas.',
    content: `
## ¿Por qué Firebase Hosting?

Firebase Hosting ofrece CDN global, HTTPS gratuito, previews por cada pull request y un CLI poderoso. Es ideal para SPAs (Single Page Applications).

## Instalación del Firebase CLI

\`\`\`bash
# Instalar Firebase CLI globalmente
npm install -g firebase-tools

# Iniciar sesión con tu cuenta de Google
firebase login

# Verificar la instalación
firebase --version
\`\`\`

## Inicializar Firebase en tu proyecto

\`\`\`bash
# Dentro de la carpeta de tu proyecto React
firebase init hosting
\`\`\`

Responde a las preguntas:
- **Project**: Selecciona tu proyecto de Firebase
- **Public directory**: \`dist\` (carpeta de build de Vite)
- **Single-page app**: \`Yes\`
- **GitHub Actions**: Opcional

## Archivo firebase.json

\`\`\`json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          }
        ]
      }
    ]
  }
}
\`\`\`

## Build y deploy

\`\`\`bash
# Generar el build de producción
npm run build

# Previsualizar localmente antes de subir
firebase serve

# Desplegar a producción
firebase deploy --only hosting
\`\`\`

## Dominio personalizado

Desde la consola de Firebase → Hosting → "Añadir dominio personalizado". Firebase genera los certificados SSL automáticamente.

## CI/CD con GitHub Actions

\`\`\`yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: \${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: \${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
\`\`\`
    `,
    category: CATEGORIES.devops,
    tags: ['firebase', 'hosting', 'react', 'deploy', 'vite'],
    author: 'FixCode',
    publishedAt: '2024-10-20',
    readingTime: 10,
    featured: true,
  },
  {
    id: '3',
    slug: 'react-performance-lazy-loading',
    title: 'Optimizar rendimiento en React: Lazy Loading y Code Splitting',
    excerpt: 'Reduce el bundle size de tu app React con React.lazy, Suspense y code splitting. Mejora tus métricas de Lighthouse y Core Web Vitals de forma práctica.',
    content: `
## El problema del bundle grande

Cuando tu aplicación crece, el bundle JavaScript se vuelve enorme. Esto afecta directamente el **First Contentful Paint (FCP)** y el **Largest Contentful Paint (LCP)**.

## React.lazy + Suspense

\`\`\`tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Sin lazy loading (Evitar: todo se carga al inicio)
// import Dashboard from './pages/Dashboard';

// Con lazy loading (Recomendado: carga solo cuando se navega)
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

// Componente de fallback mientras carga
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

## Análisis del bundle con vite-bundle-visualizer

\`\`\`bash
npm install -D rollup-plugin-visualizer

# En vite.config.ts:
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true })
  ],
});

# Al hacer build, se abre el visualizador automáticamente
npm run build
\`\`\`

## Preloading de rutas críticas

\`\`\`tsx
// Precargar componentes en hover (mejor UX)
const handleMouseEnter = () => {
  import('./pages/Dashboard'); // precarga sin renderizar
};

<Link to="/dashboard" onMouseEnter={handleMouseEnter}>
  Dashboard
</Link>
\`\`\`

## useMemo y useCallback correctamente

\`\`\`tsx
// Evitar: Re-crea el array en cada render
function ProductList({ products, category }) {
  const filtered = products.filter(p => p.category === category);
  return <List items={filtered} />;
}

// Recomendado: Solo re-calcula si cambian las dependencias
function ProductList({ products, category }) {
  const filtered = useMemo(
    () => products.filter(p => p.category === category),
    [products, category]
  );
  return <List items={filtered} />;
}
\`\`\`
    `,
    category: CATEGORIES.frontend,
    tags: ['react', 'performance', 'lazy-loading', 'lighthouse', 'optimization'],
    author: 'FixCode',
    publishedAt: '2024-10-18',
    readingTime: 12,
    featured: true,
  },
  {
    id: '4',
    slug: 'git-comandos-esenciales',
    title: 'Git: Comandos esenciales que todo desarrollador debe conocer',
    excerpt: 'Referencia rápida de los comandos Git más importantes: rebase, cherry-pick, stash, bisect y cómo deshacer errores comunes sin perder trabajo.',
    content: `
## Comandos del día a día

\`\`\`bash
# Estado del repositorio
git status -s

# Ver historial compacto y visual
git log --oneline --graph --all

# Agregar cambios de forma interactiva (seleccionar hunks)
git add -p

# Commit con verificación
git commit -m "feat: añadir autenticación JWT" --no-verify

# Ver diferencias staged vs HEAD
git diff --staged
\`\`\`

## Stash: guardar trabajo temporal

\`\`\`bash
# Guardar cambios actuales con nombre
git stash push -m "WIP: refactoring auth module"

# Ver lista de stashes
git stash list

# Aplicar el último stash (y eliminarlo)
git stash pop

# Aplicar un stash específico sin eliminarlo
git stash apply stash@{2}

# Eliminar todos los stashes
git stash clear
\`\`\`

## Rebase interactivo

\`\`\`bash
# Editar los últimos 5 commits
git rebase -i HEAD~5

# Comandos disponibles en el editor:
# pick   = mantener el commit
# reword = cambiar el mensaje
# squash = combinar con el commit anterior
# drop   = eliminar el commit
# fixup  = como squash pero descarta el mensaje
\`\`\`

## Cherry-pick

\`\`\`bash
# Aplicar un commit específico en la rama actual
git cherry-pick abc1234

# Aplicar un rango de commits
git cherry-pick abc1234..def5678

# Cherry-pick sin crear commit automáticamente
git cherry-pick --no-commit abc1234
\`\`\`

## Deshacer errores

\`\`\`bash
# Deshacer el último commit (mantiene los cambios)
git reset --soft HEAD~1

# Deshacer el último commit (descarta los cambios)
git reset --hard HEAD~1

# Revertir un commit ya publicado (crea un nuevo commit)
git revert abc1234

# Recuperar un archivo eliminado
git checkout HEAD -- path/to/file.txt

# Ver quién modificó cada línea
git blame -L 10,20 src/auth.js
\`\`\`

## Git bisect para encontrar bugs

\`\`\`bash
# Iniciar búsqueda binaria
git bisect start

# Marcar el estado actual como malo
git bisect bad

# Marcar un commit conocido como bueno
git bisect good v2.0.0

# Git hace checkout automático al commit intermedio
# Prueba tu app y marca:
git bisect good  # o
git bisect bad

# Al terminar, Git indica el commit que introdujo el bug
git bisect reset
\`\`\`
    `,
    category: CATEGORIES.terminal,
    tags: ['git', 'terminal', 'comandos', 'vcs', 'desarrollo'],
    author: 'FixCode',
    publishedAt: '2024-10-22',
    readingTime: 7,
  },
  {
    id: '5',
    slug: 'nodejs-express-api-rest-completa',
    title: 'API REST con Node.js y Express: Guía completa con autenticación JWT',
    excerpt: 'Construye una API REST robusta con Express, validación de datos con Zod, autenticación JWT con refresh tokens y manejo de errores centralizado.',
    content: `
## Estructura del proyecto

\`\`\`
api/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.ts
├── package.json
└── tsconfig.json
\`\`\`

## Setup inicial con TypeScript

\`\`\`bash
npm init -y
npm install express jsonwebtoken bcryptjs zod
npm install -D typescript @types/express @types/node ts-node-dev

npx tsc --init
\`\`\`

## app.ts — configuración base

\`\`\`typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { authRouter } from './routes/auth';
import { usersRouter } from './routes/users';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Seguridad y parsing
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));
app.use(express.json({ limit: '10kb' }));

// Rutas
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

// Health check
app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Manejo centralizado de errores
app.use(errorHandler);

export default app;
\`\`\`

## Middleware de autenticación JWT

\`\`\`typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}
\`\`\`

## Validación con Zod

\`\`\`typescript
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/,
    'Debe contener mayúsculas, minúsculas y números'
  ),
  name: z.string().min(2).max(100),
});

// Middleware de validación
export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Datos inválidos',
        details: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data;
    next();
  };
}
\`\`\`
    `,
    category: CATEGORIES.backend,
    tags: ['nodejs', 'express', 'api', 'jwt', 'typescript', 'backend'],
    author: 'FixCode',
    publishedAt: '2024-10-25',
    readingTime: 15,
    featured: true,
  },
  {
    id: '6',
    slug: 'linux-comandos-productividad',
    title: '20 comandos Linux que multiplicarán tu productividad',
    excerpt: 'Descubre herramientas como tmux, fzf, ripgrep, bat y htop que transformarán tu flujo de trabajo en la terminal. Con ejemplos prácticos y aliases útiles.',
    content: `
## Herramientas modernas que debes instalar

\`\`\`bash
# Ubuntu/Debian
sudo apt install tmux fzf ripgrep bat htop jq tree

# macOS con Homebrew
brew install tmux fzf ripgrep bat htop jq tree
\`\`\`

## fzf — búsqueda fuzzy en todo

\`\`\`bash
# Buscar y abrir archivos interactivamente
vim $(fzf --preview 'bat --color=always {}')

# Buscar en el historial de comandos
history | fzf

# Moverse entre directorios rápidamente
cd $(find . -type d | fzf)

# Buscar y matar procesos
kill -9 $(ps aux | fzf | awk '{print $2}')
\`\`\`

## ripgrep — búsqueda de texto ultra rápida

\`\`\`bash
# Buscar texto en todos los archivos (ignora .gitignore)
rg "TODO" 

# Buscar solo en archivos TypeScript
rg "useState" --type ts

# Con contexto de líneas
rg "error" -C 3

# Mostrar solo los nombres de archivo
rg -l "console.log"
\`\`\`

## tmux — multiplexor de terminal

\`\`\`bash
# Iniciar nueva sesión con nombre
tmux new-session -s desarrollo

# Dividir panel horizontalmente
# Ctrl+b → %

# Dividir panel verticalmente  
# Ctrl+b → "

# Moverse entre paneles
# Ctrl+b → teclas de dirección

# Desconectarse (sesión sigue corriendo)
# Ctrl+b → d

# Reconectarse
tmux attach -t desarrollo

# Listar sesiones
tmux ls
\`\`\`

## jq — procesar JSON en terminal

\`\`\`bash
# Formatear JSON
curl -s api.example.com/users | jq .

# Extraer campos específicos
cat data.json | jq '.users[] | {id, name, email}'

# Filtrar por condición
cat data.json | jq '.users[] | select(.age > 18)'

# Contar elementos
cat data.json | jq '.users | length'
\`\`\`

## Aliases útiles para tu ~/.bashrc

\`\`\`bash
# Navegación
alias ..='cd ..'
alias ...='cd ../..'
alias ll='ls -lah --color=auto'

# Git shortcuts
alias gs='git status -s'
alias gl='git log --oneline --graph -15'
alias gp='git push'
alias gpl='git pull --rebase'

# Docker
alias dps='docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"'
alias dlog='docker compose logs -f'
alias ddown='docker compose down'

# Utilidades
alias myip='curl -s ifconfig.me'
alias ports='ss -tuln'
alias path='echo $PATH | tr : "\\n"'
\`\`\`
    `,
    category: CATEGORIES.terminal,
    tags: ['linux', 'terminal', 'bash', 'productividad', 'herramientas'],
    author: 'FixCode',
    publishedAt: '2024-10-28',
    readingTime: 9,
  },
  {
    id: '7',
    slug: 'vercel-deploy-nextjs',
    title: 'Desplegar Next.js en Vercel: Configuración avanzada y optimización',
    excerpt: 'Aprende a configurar Vercel para producción: variables de entorno, edge functions, análisis de rendimiento, dominios personalizados y preview deployments.',
    content: `
## ¿Por qué Vercel para Next.js?

Vercel es la plataforma creada por el equipo de Next.js. Ofrece zero-config deploys, Edge Network global y optimizaciones automáticas para tus aplicaciones.

## Instalación del CLI

\`\`\`bash
npm install -g vercel

# Login con tu cuenta
vercel login

# Deploy desde la carpeta del proyecto
vercel

# Deploy a producción directamente
vercel --prod
\`\`\`

## vercel.json — configuración avanzada

\`\`\`json
{
  "framework": "nextjs",
  "regions": ["gru1", "iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/blog/:slug",
      "destination": "/posts/:slug"
    }
  ]
}
\`\`\`

## Variables de entorno

\`\`\`bash
# Agregar variable al entorno de producción
vercel env add DATABASE_URL production

# Agregar a todos los entornos
vercel env add NEXT_PUBLIC_API_URL

# Descargar variables a .env.local
vercel env pull .env.local
\`\`\`

## Edge Functions para mejor rendimiento

\`\`\`typescript
// app/api/geo/route.ts
import { NextRequest } from 'next/server';

export const runtime = 'edge'; // 🔥 Ejecuta en el edge, cerca del usuario

export async function GET(request: NextRequest) {
  const country = request.geo?.country || 'Unknown';
  const city = request.geo?.city || 'Unknown';

  return Response.json({
    country,
    city,
    latency: 'ultra-low (edge)',
  });
}
\`\`\`
    `,
    category: CATEGORIES.devops,
    tags: ['vercel', 'nextjs', 'deploy', 'edge', 'performance'],
    author: 'FixCode',
    publishedAt: '2024-10-26',
    readingTime: 11,
  },
  {
    id: '8',
    slug: 'typescript-tipos-avanzados',
    title: 'TypeScript: Tipos avanzados que debes dominar en 2024',
    excerpt: 'Guía práctica de utility types, conditional types, mapped types e infer. Con casos de uso reales para escribir código más seguro y expresivo.',
    content: `
## Utility Types esenciales

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Partial — todos los campos opcionales
type UserUpdate = Partial<User>;

// Required — todos los campos requeridos
type StrictUser = Required<User>;

// Pick — seleccionar campos específicos
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

// Omit — excluir campos
type CreateUserDto = Omit<User, 'id' | 'createdAt'>;

// Readonly — inmutable
const user: Readonly<User> = { ... };

// Record — objeto con claves y valores tipados
type UserMap = Record<number, PublicUser>;
\`\`\`

## Conditional Types

\`\`\`typescript
// Tipo que extrae el tipo de retorno de una función async
type Awaited<T> = T extends Promise<infer U> ? U : T;

// Ejemplo personalizado
type NonNullable<T> = T extends null | undefined ? never : T;

// Distribuir sobre unions
type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>; // string[] | number[]
\`\`\`

## Template Literal Types

\`\`\`typescript
type EventName = 'click' | 'hover' | 'focus';
type Handler = \`on\${Capitalize<EventName>}\`;
// type Handler = "onClick" | "onHover" | "onFocus"

// Rutas de API tipadas
type APIRoute = \`/api/v\${number}/\${string}\`;
const route: APIRoute = '/api/v1/users'; // ✅
\`\`\`

## Inferencia con infer

\`\`\`typescript
// Extraer el tipo del primer parámetro
type FirstParam<T extends (...args: any) => any> =
  T extends (first: infer F, ...rest: any) => any ? F : never;

type Result = FirstParam<(id: number, name: string) => void>;
// type Result = number

// Extraer tipo de array
type ElementType<T extends any[]> =
  T extends (infer E)[] ? E : never;

type Nums = ElementType<number[]>; // number
\`\`\`

## Satisfies operator (TS 4.9+)

\`\`\`typescript
type Config = {
  port: number;
  host: string;
  debug?: boolean;
};

// ✅ Valida el tipo PERO mantiene el tipo inferido más específico
const config = {
  port: 3000,
  host: 'localhost',
  debug: true,
} satisfies Config;

config.port; // type: number (no 3000)
\`\`\`
    `,
    category: CATEGORIES.frontend,
    tags: ['typescript', 'tipos', 'avanzado', 'javascript', 'frontend'],
    author: 'FixCode',
    publishedAt: '2024-10-24',
    readingTime: 13,
  },
];

export const FEATURED_ARTICLES = ARTICLES.filter(a => a.featured);

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug);
}

export function getArticlesByCategory(categoryId: string): Article[] {
  return ARTICLES.filter(a => a.category.id === categoryId);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return ARTICLES.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q) ||
    a.tags.some(t => t.includes(q)) ||
    a.category.label.toLowerCase().includes(q)
  );
}
