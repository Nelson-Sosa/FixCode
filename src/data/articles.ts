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
    widgetId: 'docker-compose-generator',
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
    widgetId: 'px-to-rem',
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
  {
    id: 'devops-docker-react-vite-nginx',
    slug: 'docker-react-vite-nginx-produccion',
    title: 'Cómo dockerizar una aplicación de React + Vite con Nginx para producción',
    excerpt: 'Aprende a construir una imagen Docker ligera y segura para aplicaciones React + Vite usando Multi-stage build y Nginx con soporte para rutas SPA y compresión gzip.',
    category: CATEGORIES.devops,
    tags: ['docker', 'nginx', 'react', 'vite', 'devops'],
    author: 'Equipo Técnico FixCode',
    publishedAt: '2026-10-29',
    readingTime: 6,
    featured: true,
    content: `
## Introducción

El servidor de desarrollo de Vite está optimizado exclusivamente para agilidad local mediante ES Modules nativos. En entornos de producción, ejecutar Vite o un servidor Node.js para servir archivos estáticos consume recursos innecesarios y expone la aplicación a vulnerabilidades de runtime.

En esta guía configuraremos un contenedor Docker de producción utilizando una arquitectura **Multi-stage build**: compilaremos la aplicación en un contenedor Node.js temporal y transferiremos únicamente los artefactos estáticos optimizados (\`dist/\`) a una imagen ultraliviana de Nginx basada en Alpine Linux, configurando compresión gzip y soporte para enrutamiento del lado del cliente (SPA).

## Requisitos Previos

- Docker Engine 24.0+ o Docker Desktop instalado y en ejecución.
- Proyecto React 18+ inicializado con Vite y TypeScript.
- Conocimientos básicos de la terminal y comandos de Docker.

## Paso a Paso con Código Real

### Paso 1: Crear el archivo de exclusión .dockerignore

Para reducir el contexto de construcción y evitar transferir archivos locales o dependencias pesadas al demonio de Docker, crea el archivo \`.dockerignore\` en la raíz de tu proyecto:

\`\`\`dockerignore
node_modules
dist
.git
.gitignore
.env.local
.env.*.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
README.md
.vscode
\`\`\`

Este archivo garantiza que la compilación utilice exclusivamente el código fuente limpio y que \`node_modules\` se reinstale dentro del contenedor con la versión exacta definida en el lockfile.

### Paso 2: Configurar Nginx para Single Page Applications (SPA)

React Router requiere que todas las solicitudes a rutas virtuales (ej. \`/sobre-nosotros\`, \`/articulo/mi-slug\`) sean redirigidas al archivo raíz \`index.html\`.

Crea el archivo \`nginx.conf\` en la raíz del proyecto:

\`\`\`nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Compresión gzip para optimizar tiempo de carga
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json image/svg+xml;
    gzip_disable "MSIE [1-6]\.";

    # Caché agresivo para assets inmutables de Vite
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, no-transform, immutable";
        access_log off;
    }

    # Redirección de todas las rutas al index.html para React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Desactivar logs para favicon y robots
    location = /favicon.svg {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        log_not_found off;
        access_log off;
    }

    # Cabeceras de seguridad HTTP básicas
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
\`\`\`

La directiva \`try_files $uri $uri/ /index.html;\` es fundamental: si el archivo físico solicitado no existe en disco, Nginx devuelve el \`index.html\` con código 200, permitiendo que \`react-router-dom\` maneje la navegación del cliente sin errores 404.

### Paso 3: Crear el Dockerfile Multi-stage

Crea el archivo \`Dockerfile\` en la raíz del proyecto:

\`\`\`dockerfile
# Etapa 1: Compilación de la aplicación (Builder)
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar manifiestos primero para aprovechar el caché de capas
COPY package*.json ./

# Instalación estricta y limpia de dependencias
RUN npm ci

# Copiar el código fuente completo
COPY . .

# Generar el bundle de producción
RUN npm run build

# Etapa 2: Servidor Web de Producción (Runner)
FROM nginx:1.27-alpine-slim

# Eliminar la configuración por defecto de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copiar nuestra configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar artefactos estáticos generados en el builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
\`\`\`

Al separar la construcción en dos etapas, la imagen final descarta Node.js, npm y el árbol de dependencias de desarrollo, logrando un artefacto de producción ultraliviano de menos de 25 MB.

## Verificación

1. Construir la imagen localmente:
\`\`\`bash
docker build -t fixcode-frontend:latest .
\`\`\`

2. Validar el tamaño optimizado de la imagen:
\`\`\`bash
docker images fixcode-frontend:latest
\`\`\`

3. Ejecutar el contenedor mapeando el puerto local:
\`\`\`bash
docker run -d --name fixcode-app -p 8080:80 fixcode-frontend:latest
\`\`\`

4. Probar en el navegador accediendo a \`http://localhost:8080/sobre-nosotros\` y recargando con F5 para verificar que las rutas SPA responden correctamente.
    `,
  },
  {
    id: 'devops-github-actions-firebase-hosting',
    slug: 'github-actions-despliegue-automatico-firebase-hosting',
    title: 'Configuración de GitHub Actions para despliegue automático en Firebase Hosting',
    excerpt: 'Implementa un pipeline completo de Integración y Despliegue Continuo (CI/CD) con canales de vista previa para Pull Requests y despliegue a producción en Firebase Hosting.',
    category: CATEGORIES.devops,
    tags: ['github-actions', 'firebase', 'cicd', 'automation', 'devops'],
    author: 'Equipo Técnico FixCode',
    publishedAt: '2026-10-29',
    readingTime: 7,
    featured: false,
    content: `
## Introducción

Desplegar manualmente desde la máquina local mediante el comando \`firebase deploy\` es una práctica propensa a inconsistencias de entorno, errores humanos y compilaciones desincronizadas con la rama principal.

En esta guía implementaremos un pipeline automatizado de CI/CD utilizando **GitHub Actions** conectado a **Firebase Hosting**. Configuraremos dos flujos de trabajo profesionales:
1. **Preview Channel:** Cada Pull Request generará una URL de vista previa efímera para pruebas de control de calidad.
2. **Live Channel:** Cada fusión (*merge*) en la rama \`main\` compilará y desplegará la versión final a producción automáticamente.

## Requisitos Previos

- Repositorio del proyecto alojado en GitHub.
- Cuenta de Google con un proyecto activo en Firebase.
- Firebase CLI instalado localmente (\`npm install -g firebase-tools\`).

## Paso a Paso con Código Real

### Paso 1: Generar la Cuenta de Servicio de Google Cloud

El método moderno y seguro de autenticación no utiliza tokens personales obsoletos de CLI, sino una cuenta de servicio (*Service Account*) con permisos mínimos requeridos.

Ejecuta el asistente de inicialización de Hosting en la raíz de tu proyecto:

\`\`\`bash
firebase init hosting:github
\`\`\`

Durante el asistente interactivo:
1. Inicia sesión en la cuenta asociada a GitHub.
2. Especifica el repositorio con formato: \`tu-usuario/tu-repositorio\`.
3. Indica el comando de compilación: \`npm ci && npm run build\`.
4. El asistente creará automáticamente el secreto \`FIREBASE_SERVICE_ACCOUNT_<TU_PROYECTO>\` en los secretos de tu repositorio de GitHub.

### Paso 2: Workflow para Pull Requests (Canal de Vista Previa)

Crea el archivo \`.github/workflows/firebase-hosting-pull-request.yml\`:

\`\`\`yaml
name: Deploy Preview en Pull Request

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  checks: write
  contents: read
  pull-requests: write

jobs:
  build_and_preview:
    runs-on: ubuntu-latest
    steps:
      - name: Clonar repositorio
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Instalar dependencias
        run: npm ci

      - name: Verificar tipado TypeScript
        run: npx tsc -b

      - name: Compilar aplicación
        run: npm run build

      - name: Desplegar a Canal de Vista Previa
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: \${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: \${{ secrets.FIREBASE_SERVICE_ACCOUNT_FIXCODE_78C04 }}
          projectId: fixcode-78c04
          expires: 7d
\`\`\`

Este workflow compila la app y publica un comentario automático en el Pull Request con una URL temporal válida por 7 días.

### Paso 3: Workflow para Producción (Rama Principal)

Crea el archivo \`.github/workflows/firebase-hosting-merge.yml\`:

\`\`\`yaml
name: Despliegue a Producción Firebase

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy_live:
    runs-on: ubuntu-latest
    steps:
      - name: Clonar repositorio
        uses: actions/checkout@v4

      - name: Configurar entorno Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Instalar dependencias limpias
        run: npm ci

      - name: Compilación estricta
        run: npm run build

      - name: Desplegar a Canal Live (Producción)
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: \${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: \${{ secrets.FIREBASE_SERVICE_ACCOUNT_FIXCODE_78C04 }}
          projectId: fixcode-78c04
          channelId: live
\`\`\`

La directiva \`channelId: live\` actualiza el sitio en producción global bajo el CDN de Firebase sin tiempo de inactividad.

## Verificación

1. Crear una rama de prueba y enviarla a GitHub:
\`\`\`bash
git checkout -b test-ci-preview
git commit -am "test: validar pipeline de CI/CD"
git push origin test-ci-preview
\`\`\`

2. Abrir un Pull Request en GitHub hacia \`main\` y verificar que la acción ejecute y publique el enlace de vista previa en los comentarios.
3. Fusionar el PR a \`main\` y revisar en la pestaña **Actions** que el despliegue al canal en vivo finalice con código de salida 0.
    `,
  },
  {
    id: 'devops-vincular-dominio-firebase-namecom',
    slug: 'vincular-dominio-personalizado-firebase-hosting-namecom',
    title: 'Guía paso a paso: Cómo vincular un dominio personalizado en Firebase Hosting usando Name.com',
    excerpt: 'Aprende a configurar los registros DNS de Name.com para asociar tu dominio propio a Firebase Hosting con verificación de propiedad, redirección www y certificados SSL automáticos.',
    category: CATEGORIES.devops,
    tags: ['dns', 'firebase', 'namecom', 'ssl', 'devops'],
    author: 'Equipo Técnico FixCode',
    publishedAt: '2026-10-29',
    readingTime: 6,
    featured: false,
    content: `
## Introducción

Las URLs predeterminadas de Firebase (\`*.web.app\` y \`*.firebaseapp.com\`) son funcionales para desarrollo y pruebas, pero no son aceptables para proyectos en producción, posicionamiento SEO o para la aprobación de programas publicitarios como Google AdSense, los cuales exigen un dominio de nivel superior propio (TLD).

En esta guía aprenderás cómo configurar los registros DNS en el registrador **Name.com** para vincular tanto el dominio raíz (*apex domain*, ej. \`tudominio.com\`) como el subdominio \`www\`, validando la propiedad y habilitando la emisión de certificados SSL gestionados por Google.

## Requisitos Previos

- Un proyecto desplegado en Firebase Hosting.
- Un dominio registrado y accesible en el panel de control de Name.com.
- Acceso a una consola con utilidades de red (\`nslookup\` o \`dig\`).

## Paso a Paso con Código Real

### Paso 1: Iniciar el asistente en Firebase Hosting

1. Dirígete a la [Consola de Firebase](https://console.firebase.google.com/) y selecciona tu proyecto.
2. En el menú lateral, ve a **Compilación** > **Hosting**.
3. Haz clic en el botón **Agregar dominio personalizado**.
4. Escribe tu dominio raíz (ejemplo: \`fixcode.me\`).
5. Puedes configurar la redirección automática entre la versión raíz y \`www\`.

### Paso 2: Verificar la propiedad del dominio (Registro TXT)

Firebase requiere verificar que eres el propietario legítimo del dominio antes de emitir certificados SSL.

1. La consola de Firebase te presentará un registro de tipo **TXT**:
   - **Host / Nombre:** \`@\`
   - **Tipo:** \`TXT\`
   - **Valor:** \`google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\`

2. Entra en tu cuenta de **Name.com**:
   - Ve a **My Domains** y selecciona tu dominio.
   - En el menú lateral, selecciona **DNS Records**.
   - Completa el formulario de nuevo registro:
     - **Type:** \`TXT\`
     - **Host:** déjalo en blanco o introduce \`@\`
     - **Answer:** pega la cadena \`google-site-verification=...\`
     - **TTL:** \`300\` (5 minutos para propagación rápida)
   - Haz clic en **Add Record**.

### Paso 3: Configurar los Registros A en Name.com

Una vez que Firebase confirme la verificación (puede demorar entre 2 y 15 minutos), te proporcionará dos direcciones IPv4 estáticas del Anycast CDN de Google:

\`\`\`text
199.36.158.100
(Segunda IP provista por la consola)
\`\`\`

En el panel de DNS Records de **Name.com**:
1. Elimina registros A anteriores que apunten a parkings o servidores obsoletos.
2. Agrega el primer Registro A con Host \`@\` y la IP principal.
3. Agrega el segundo Registro A con Host \`@\` y la IP secundaria.

### Paso 4: Configurar el subdominio www

Para garantizar que los usuarios que escriban \`www.tudominio.com\` lleguen a tu sitio sin errores de certificado:
1. En Firebase Hosting, agrega el dominio personalizado \`www.fixcode.me\` configurando la redirección hacia el dominio raíz.
2. En Name.com, agrega un registro **CNAME**:
   - **Type:** \`CNAME\`
   - **Host:** \`www\`
   - **Answer:** \`fixcode-78c04.web.app.\`
   - **TTL:** \`300\`

## Verificación

1. Consultar la propagación del registro TXT en la terminal:
\`\`\`bash
nslookup -type=TXT tudominio.com
\`\`\`

2. Comprobar la resolución de los Registros A:
\`\`\`bash
nslookup tudominio.com
\`\`\`

3. Validar la respuesta HTTP y el certificado SSL:
\`\`\`bash
curl -I https://tudominio.com
\`\`\`
El encabezado debe retornar \`HTTP/2 200\` o redirección 301 con \`Server: Google Frontend\`.
    `,
  },
  {
    id: 'frontend-zustand-typescript-estado-global',
    slug: 'manejo-estados-globales-react-zustand-typescript',
    title: 'Manejo eficiente de estados globales en React usando Zustand y TypeScript',
    excerpt: 'Aprende a estructurar un gestor de estado global predecible, escalable y sin boilerplate innecesario en React con Zustand, TypeScript y persistencia en localStorage.',
    category: CATEGORIES.frontend,
    tags: ['react', 'zustand', 'typescript', 'state-management', 'frontend'],
    author: 'Equipo Técnico FixCode',
    publishedAt: '2026-10-29',
    readingTime: 7,
    featured: true,
    content: `
## Introducción

Redux Toolkit, aunque potente, introduce una sobrecarga considerable de acciones, reducers y configuración de providers para aplicaciones medianas. Por otro lado, la Context API de React sufre de problemas de rendimiento por re-renderizados masivos involuntarios cuando el objeto del contexto cambia.

Zustand resuelve estos problemas mediante un modelo basado en hooks simplificados fuera del árbol de React, selectores atómicos de estado y cero necesidad de Providers envolventes. En esta guía implementaremos un almacén de autenticación y preferencias tipado con TypeScript, middlewares de persistencia y selectores de renderizado optimizados.

## Requisitos Previos

- React 18+ o React 19 configurado con TypeScript.
- Paquete \`zustand\` versión 5.0+ instalado (\`npm install zustand\`).
- Conocimientos sobre hooks personalizados (\`useCallback\`, \`useMemo\`).

## Paso a Paso con Código Real

### Paso 1: Definir los tipos de la Store

Crea el archivo \`src/types/authStore.ts\` para separar las interfaces del modelo de estado de la lógica del almacén:

\`\`\`typescript
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Acciones (Actions)
  setAuth: (user: UserProfile, token: string) => void;
  logout: () => void;
  updateUser: (fields: Partial<UserProfile>) => void;
}
\`\`\`

Tipar las acciones junto con el estado garantiza autocompletado en el editor y previene mutaciones erróneas al invocar \`set\`.

### Paso 2: Crear el almacén con Middleware de Persistencia

Crea el archivo \`src/stores/useAuthStore.ts\`:

\`\`\`typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthState, UserProfile } from '../types/authStore';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user: UserProfile, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('app_auth_session');
      },

      updateUser: (fields: Partial<UserProfile>) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({
          user: { ...currentUser, ...fields },
        });
      },
    }),
    {
      name: 'app_auth_session',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
\`\`\`

La función \`partialize\` previene guardar estados volátiles (como spinners de carga) en el \`localStorage\`, reteniendo únicamente la sesión activa.

### Paso 3: Consumir el estado con Selectores Atómicos

En componentes de React, evita desestructurar la store completa para prevenir re-renders innecesarios.

Crea el componente \`src/components/UserNavMenu.tsx\`:

\`\`\`tsx
import { useAuthStore } from '../stores/useAuthStore';

export default function UserNavMenu() {
  // Selector atómico: este componente SOLO se re-renderiza si 'user' cambia
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex gap-2">
        <a href="/login" className="text-sm font-medium text-brand-600 hover:underline">
          Iniciar sesión
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
        {user.name} ({user.role})
      </span>
      <button
        onClick={logout}
        className="px-3 py-1 text-xs font-medium rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
\`\`\`

## Verificación

1. Prueba de reactividad en consola del navegador:
\`\`\`typescript
useAuthStore.getState().setAuth(
  { id: '1', name: 'Nelson Sosa', email: 'nelson@fixcode.me', role: 'admin' },
  'token-jwt-simulado-xyz'
);
\`\`\`

2. Validar persistencia:
- Abre DevTools > **Application** > **Local Storage**.
- Confirma la clave \`app_auth_session\` con el JSON de sesión estructurado.
- Recarga la página: el componente mantiene los datos del usuario sin volver a solicitar credenciales.

3. Comprobar la acción de Logout:
- Haz clic en "Cerrar sesión": la interfaz cambia inmediatamente a "Iniciar sesión" y el localStorage se vacía de manera síncrona.
    `,
  },
  {
    id: 'frontend-dark-mode-tailwind-localstorage',
    slug: 'como-implementar-dark-mode-react-tailwind-localstorage',
    title: 'Cómo implementar un Dark Mode persistente en React con Tailwind CSS y LocalStorage',
    excerpt: 'Aprende a construir un sistema de cambio de tema claro/oscuro sin parpadeos visuales (FOUC) en React, utilizando clases de Tailwind CSS y detección de preferencias del sistema operativo.',
    category: CATEGORIES.frontend,
    tags: ['react', 'tailwind', 'dark-mode', 'css', 'ux'],
    author: 'Equipo Técnico FixCode',
    publishedAt: '2026-10-29',
    readingTime: 6,
    featured: false,
    content: `
## Introducción

Uno de los problemas visuales más molestos en aplicaciones modernas es el efecto **FOUC** (*Flash of Unstyled Content* o destello blanco al recargar), el cual ocurre cuando el tema del usuario se evalúa después de que el DOM ha comenzado a pintarse.

En esta guía crearemos un gestor de tema claro/oscuro completo que:
1. Respeta la preferencia configurada en el sistema operativo mediante la media query \`prefers-color-scheme\`.
2. Permite anular manualmente la preferencia con un botón en la interfaz.
3. Persiste la selección en \`localStorage\`.
4. Evita por completo el parpadeo blanco aplicando la clase \`dark\` en el elemento raíz \`<html>\` antes de la hidratación de React.

## Requisitos Previos

- Tailwind CSS 3.4+ configurado en el proyecto.
- React 18+ o 19 con TypeScript.

## Paso a Paso con Código Real

### Paso 1: Configurar Tailwind CSS para modo manual por clase

Asegúrate de que en \`tailwind.config.js\` esté declarada la propiedad \`darkMode: 'class'\`:

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Habilita la variante "dark:" controlada por clase CSS
  theme: {
    extend: {},
  },
  plugins: [],
};
\`\`\`

### Paso 2: Prevenir el parpadeo blanco (FOUC) en index.html

Coloca este script síncrono liviano en el \`<head>\` de tu \`index.html\` antes de cualquier hoja de estilos o script de React:

\`\`\`html
<head>
  <meta charset="UTF-8" />
  <title>FixCode</title>
  
  <!-- Script anti-FOUC de ejecución inmediata -->
  <script>
    (function() {
      const storedTheme = localStorage.getItem('theme');
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (storedTheme === 'dark' || (!storedTheme && systemDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  </script>
</head>
\`\`\`

Al ejecutarse de manera bloqueante antes de que el navegador pinte el primer frame, el fondo oscuro ya estará activo si corresponde, eliminando cualquier destello blanco.

### Paso 3: Crear el Contexto y Hook useTheme

Crea el archivo \`src/context/ThemeContext.tsx\`:

\`\`\`tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
\`\`\`

### Paso 4: Componente botón con íconos vectoriales

Crea \`src/components/ThemeToggle.tsx\` utilizando \`lucide-react\`:

\`\`\`tsx
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={\`Cambiar a modo \${theme === 'dark' ? 'claro' : 'oscuro'}\`}
      className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400 animate-fade-in" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 animate-fade-in" />
      )}
    </button>
  );
}
\`\`\`

## Verificación

1. Inspeccionar el DOM en tiempo real en Chrome DevTools y verificar que la clase \`dark\` se alterne en la etiqueta \`<html>\`.
2. Recargar con <kbd>Ctrl</kbd> + <kbd>F5</kbd> y confirmar que la pantalla no emita ningún destello blanco antes de cargar.
3. Probar la adaptación automática borrando el localStorage y emulando \`prefers-color-scheme\` en el panel de renderizado de DevTools.
    `,
  },
  {
    id: 'frontend-react-router-spa-firebase-rewrites',
    slug: 'configuracion-react-router-v6-spa-errores-404-firebase',
    title: 'Configuración de React Router v6 para aplicaciones SPA y manejo de errores 404 en Firebase Hosting',
    excerpt: 'Aprende a resolver el clásico error 404 de Firebase Hosting al recargar rutas en Single Page Applications mediante reescrituras de URL limpias y páginas Not Found personalizadas.',
    category: CATEGORIES.frontend,
    tags: ['react-router', 'firebase', 'spa', 'routing', 'frontend'],
    author: 'Equipo Técnico FixCode',
    publishedAt: '2026-10-29',
    readingTime: 6,
    featured: false,
    content: `
## Introducción

Al desarrollar localmente con Vite y React Router, el servidor de desarrollo atiende automáticamente cualquier ruta sirviendo el archivo \`index.html\`. Sin embargo, al desplegar la aplicación compilada a un servicio de hosting estático como **Firebase Hosting**, acceder directamente a una URL como \`https://tudominio.com/categoria/devops\` o recargar la página arroja el error:

\`\`\`text
404 Not Found - There isn't a GitHub Pages or Firebase site here.
\`\`\`

Este comportamiento ocurre porque Firebase busca un archivo físico llamado \`/categoria/devops/index.html\` que no existe en el disco. En esta guía configuraremos las reglas de reescritura (*rewrites*) en \`firebase.json\` y estructuraremos una ruta comodín \`*\` en React Router para capturar rutas inexistentes reales con una página 404 personalizada con código semántico.

## Requisitos Previos

- Aplicación React con \`react-router-dom\` v6 o v7 instalada.
- CLI de Firebase (\`firebase-tools\`) configurada en el proyecto.
- Archivo \`firebase.json\` en la raíz del repositorio.

## Paso a Paso con Código Real

### Paso 1: Configurar las reescrituras en firebase.json

Abre el archivo \`firebase.json\` en la raíz del proyecto y agrega la regla \`rewrites\` dentro de la clave \`hosting\`:

\`\`\`json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
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
            "value": "max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(html|json)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      }
    ]
  }
}
\`\`\`

La directiva \`"source": "**", "destination": "/index.html"\` le ordena a la red CDN de Firebase que cualquier ruta solicitada que no coincida con un archivo estático físico sea redirigida internamente al \`index.html\`, cediendo el control a React Router.

### Paso 2: Crear la ruta comodín (Catch-All) en React Router

Configura la tabla de rutas en \`src/routes/AppRoutes.tsx\` asegurando que la última ruta capture cualquier ruta no declarada:

\`\`\`tsx
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import ArticleDetail from '../pages/ArticleDetail';
import CategoryPage from '../pages/CategoryPage';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rutas definidas */}
        <Route path="/" element={<Home />} />
        <Route path="/articulo/:slug" element={<ArticleDetail />} />
        <Route path="/categoria/:categoryId" element={<CategoryPage />} />

        {/* Ruta comodín para manejar errores 404 reales dentro de la SPA */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
\`\`\`

### Paso 3: Componente NotFound con SEO y etiqueta noindex

Cuando un usuario ingresa una ruta no existente, los motores de búsqueda no deben indexar dicha URL fantasma.

Crea el componente \`src/pages/NotFound.tsx\`:

\`\`\`tsx
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="404 — Página no encontrada | FixCode"
        description="La página que estás buscando no existe o ha sido movida."
        noindex={true}
      />

      <div className="flex flex-col items-center justify-center min-h-[65vh] px-4 text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6 shadow-lg shadow-amber-500/5">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="text-sm font-semibold tracking-wider uppercase text-brand-600 dark:text-brand-400 mb-2">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          Página no encontrada
        </h1>

        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 text-base leading-relaxed">
          La ruta ingresada no existe en nuestros tutoriales o ha sido actualizada. Utiliza el buscador o regresa a la página principal.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all"
          >
            <Home className="w-4 h-4" />
            Volver al Inicio
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Regresar
          </button>
        </div>
      </div>
    </>
  );
}
\`\`\`

## Verificación

1. Compilar el proyecto con \`npm run build\` y probar con el emulador local de Firebase:
\`\`\`bash
firebase emulators:start --only hosting
\`\`\`
2. Probar la recarga en subrutas SPA accediendo a \`http://localhost:5000/categoria/devops\` y comprobando que no devuelva 404 de Firebase.
3. Probar una ruta inexistente como \`http://localhost:5000/ruta-inexistente-123\` y verificar que se muestre la página 404 personalizada con etiqueta \`noindex\`.
    `,
  },
  {
    id: 'backend-jwt-express-typescript-auth',
    slug: 'autenticacion-jwt-express-typescript',
    title: 'Autenticación segura basada en JSON Web Tokens (JWT) con Express y TypeScript',
    excerpt: 'Aprende a implementar un flujo de autenticación robusto con JWT, almacenamiento en cookies httpOnly, rotación de refresh tokens y middlewares de protección en Express.',
    category: CATEGORIES.backend,
    tags: ['nodejs', 'express', 'jwt', 'typescript', 'seguridad', 'backend'],
    author: 'Equipo Técnico FixCode',
    publishedAt: '2026-10-29',
    readingTime: 8,
    featured: true,
    content: `
## Introducción

Almacenar JSON Web Tokens en \`localStorage\` o \`sessionStorage\` en el cliente expone a los usuarios a vulnerabilidades de Cross-Site Scripting (XSS): cualquier script de terceros malicioso puede leer el token y secuestrar la sesión.

En esta guía implementaremos un patrón de autenticación industrial utilizando una arquitectura de doble token:
1. **Access Token** de vida corta (15 minutos) transportado en el cuerpo JSON o cabecera Authorization para peticiones en memoria.
2. **Refresh Token** de vida larga (7 días) almacenado exclusivamente en una cookie segura con flags \`httpOnly\`, \`Secure\` y \`SameSite=Strict\`.

## Requisitos Previos

- Node.js LTS (v20+) y TypeScript configurados.
- Paquetes necesarios: \`npm install express jsonwebtoken bcrypt cookie-parser dotenv\`.
- Tipos de desarrollo: \`npm install -D @types/express @types/jsonwebtoken @types/bcrypt @types/cookie-parser\`.

## Paso a Paso con Código Real

### Paso 1: Configurar la generación y verificación de tokens

Crea el archivo \`src/utils/token.ts\`:

\`\`\`typescript
import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev_access_secret_key_123';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_key_456';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
}
\`\`\`

Separar los secretos criptográficos del access token y del refresh token previene que la exposición accidental de uno comprometa el ciclo de rotación completo.

### Paso 2: Crear el Middleware de Autenticación

Crea el archivo \`src/middlewares/authMiddleware.ts\`. Extendemos la interfaz \`Request\` de Express para adjuntar el usuario decodificado de forma tipada:

\`\`\`typescript
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, type TokenPayload } from '../utils/token';

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Acceso denegado: Token no proporcionado' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
}
\`\`\`

### Paso 3: Endpoints de Login, Refresh y Rutas Protegidas

Crea el archivo \`src/routes/authRoutes.ts\`:

\`\`\`typescript
import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  type TokenPayload,
} from '../utils/token';
import { requireAuth, type AuthenticatedRequest } from '../middlewares/authMiddleware';

const router = Router();

// Endpoint de inicio de sesión
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validación de credenciales simulada
  if (email !== 'admin@fixcode.me' || password !== 'PasswordSeguro123!') {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return;
  }

  const payload: TokenPayload = {
    userId: 'usr_98765',
    email,
    role: 'admin',
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Inyectar el Refresh Token en cookie segura httpOnly
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, // Inaccesible desde JavaScript (mitiga XSS)
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  });

  res.json({
    message: 'Inicio de sesión exitoso',
    accessToken,
    user: payload,
  });
});

// Endpoint para renovar el Access Token usando el Refresh Token
router.post('/refresh', (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ error: 'Sesión expirada o refresh token no encontrado' });
    return;
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ error: 'Refresh token revocado o inválido' });
  }
});

// Endpoint protegido de ejemplo
router.get('/perfil', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    mensaje: 'Acceso a recurso confidencial autorizado',
    usuario: req.user,
  });
});

export default router;
\`\`\`

## Verificación

1. Iniciar sesión mediante curl para validar el encabezado Set-Cookie:
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fixcode.me","password":"PasswordSeguro123!"}' \
  -i
\`\`\`

2. Probar el acceso a la ruta protegida con el Access Token:
\`\`\`bash
curl -X GET http://localhost:3000/api/auth/perfil \
  -H "Authorization: Bearer <TU_ACCESS_TOKEN>"
\`\`\`

3. Verificar que las peticiones sin cabecera Authorization retornen 401 Unauthorized inmediatamente.
    `,
  },
  {
    id: 'backend-mongodb-mongoose-typescript-modelado',
    slug: 'conexion-modelado-datos-mongodb-mongoose-typescript',
    title: 'Conexión y modelado de datos con MongoDB, Mongoose y TypeScript',
    excerpt: 'Aprende a conectar MongoDB mediante un patrón Singleton resiliente en Node.js, definiendo esquemas fuertemente tipados con Mongoose e índices compuestos para consultas de alto rendimiento.',
    category: CATEGORIES.backend,
    tags: ['mongodb', 'mongoose', 'typescript', 'database', 'backend'],
    author: 'Equipo Técnico FixCode',
    publishedAt: '2026-10-29',
    readingTime: 7,
    featured: false,
    content: `
## Introducción

Al utilizar Mongoose con TypeScript en aplicaciones medianas o grandes, es común caer en duplicación de tipos o crear conexiones múltiples accidentales que agotan el pool de sockets en entornos de funciones serverless o recargas en desarrollo.

En esta guía resolveremos ambos problemas implementando:
1. Una conexión singleton resiliente con reintentos automáticos y opciones de pool optimizadas.
2. Modelado de datos con inferencia estricta de tipos mediante \`InferSchemaType\` y \`HydratedDocument\`.
3. Índices compuestos para acelerar búsquedas y filtros comunes.

## Requisitos Previos

- Instancia activa de MongoDB local o cluster en MongoDB Atlas.
- Node.js LTS y TypeScript configurados.
- Paquetes: \`npm install mongoose dotenv\` y tipos: \`npm install -D @types/node\`.

## Paso a Paso con Código Real

### Paso 1: Conexión Singleton Resiliente a MongoDB

Crea el archivo \`src/database/connection.ts\`:

\`\`\`typescript
import mongoose from 'mongoose';

interface ConnectionOptions {
  uri: string;
}

class Database {
  private static instance: Database;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(options: ConnectionOptions): Promise<void> {
    if (this.isConnected) {
      console.log('MongoDB: Reutilizando conexión activa existente.');
      return;
    }

    try {
      const db = await mongoose.connect(options.uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      this.isConnected = db.connections[0].readyState === 1;
      console.log('MongoDB: Conexión establecida exitosamente.');

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB: Error en tiempo de ejecución:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB: Conexión perdida. Intentando reconectar...');
        this.isConnected = false;
      });
    } catch (error) {
      console.error('MongoDB: Falló la conexión inicial:', error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) return;
    await mongoose.disconnect();
    this.isConnected = false;
    console.log('MongoDB: Desconectado.');
  }
}

export const dbConnection = Database.getInstance();
\`\`\`

### Paso 2: Esquema tipado con Mongoose y TypeScript

Crea el modelo en \`src/models/Article.ts\`:

\`\`\`typescript
import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'El título del artículo es obligatorio'],
      trim: true,
      maxlength: [150, 'El título no puede exceder 150 caracteres'],
    },
    slug: {
      type: String,
      required: [true, 'El slug es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, 'El contenido es obligatorio'],
    },
    category: {
      type: String,
      required: true,
      enum: ['devops', 'frontend', 'backend', 'terminal'],
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: false,
      index: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Índice compuesto para acelerar consultas de categoría y fecha
ArticleSchema.index({ category: 1, published: 1, createdAt: -1 });

// Inferencia automática de tipos
export type IArticle = InferSchemaType<typeof ArticleSchema>;
export type ArticleDocument = HydratedDocument<IArticle>;

export const ArticleModel = model<IArticle>('Article', ArticleSchema);
\`\`\`

Usar \`InferSchemaType<typeof ArticleSchema>\` asegura que cualquier cambio en las propiedades o validaciones del esquema se sincronice de forma inmediata y automática con los tipos de TypeScript.

### Paso 3: Servicio de Consultas con Tipado Estricto

Crea el archivo \`src/services/articleService.ts\`:

\`\`\`typescript
import { ArticleModel, type ArticleDocument } from '../models/Article';

export async function getPublishedArticlesByCategory(
  category: string,
  limit = 10
): Promise<ArticleDocument[]> {
  return ArticleModel.find({
    category,
    published: true,
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<ArticleDocument[]>()
    .exec();
}
\`\`\`

## Verificación

1. Validar la conexión en \`index.ts\`:
\`\`\`typescript
import dotenv from 'dotenv';
import { dbConnection } from './database/connection';
dotenv.config();

async function bootstrap() {
  await dbConnection.connect({
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fixcode_db',
  });
}
bootstrap();
\`\`\`

2. Comprobar los índices creados en la shell de MongoDB (\`mongosh\`):
\`\`\`javascript
use fixcode_db
db.articles.getIndexes()
\`\`\`
    `,
  },
  {
    id: 'backend-manejo-centralizado-errores-nodejs',
    slug: 'manejo-centralizado-errores-controladores-async-nodejs',
    title: 'Manejo centralizado de errores y controladores asíncronos en API REST con Node.js',
    excerpt: 'Elimina los bloques try/catch repetitivos en Express. Diseña una clase personalizada AppError y un middleware global de captura de excepciones para APIs REST robustas.',
    category: CATEGORIES.backend,
    tags: ['nodejs', 'express', 'error-handling', 'clean-code', 'backend'],
    author: 'Equipo Técnico FixCode',
    publishedAt: '2026-10-29',
    readingTime: 6,
    featured: false,
    content: `
## Introducción

Envolver cada controlador asíncrono en un bloque \`try { ... } catch (error) { next(error) }\` produce cientos de líneas de código duplicado (*boilerplate*), dificulta la legibilidad y aumenta el riesgo de dejar promesas rechazadas sin captura (*Unhandled Promise Rejections*).

En esta guía implementaremos una arquitectura limpia de manejo de errores en 3 capas:
1. Una clase personalizada \`AppError\` que distingue errores operacionales esperados de fallos de infraestructura.
2. Un envoltorio asíncrono de orden superior (\`catchAsync\`) que elimina todos los \`try/catch\` de los controladores.
3. Un middleware global de captura que formatea respuestas consistentes y oculta trazas de depuración (*stack traces*) en producción.

## Requisitos Previos

- Node.js 18+ con Express y TypeScript.
- Configuración básica de una API REST.

## Paso a Paso con Código Real

### Paso 1: Crear la clase de error operacional AppError

Crea el archivo \`src/errors/AppError.ts\`:

\`\`\`typescript
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: 'fail' | 'error';
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
\`\`\`

### Paso 2: Crear el wrapper asíncrono catchAsync

Crea el archivo \`src/utils/catchAsync.ts\`:

\`\`\`typescript
import { Request, Response, NextFunction } from 'express';

type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export function catchAsync(fn: AsyncController) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
\`\`\`

Al capturar la promesa con \`.catch(next)\`, cualquier error no controlado dentro del controlador es derivado automáticamente al middleware global de Express.

### Paso 3: Middleware Global de Manejo de Errores

Crea el archivo \`src/middlewares/errorHandler.ts\`:

\`\`\`typescript
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error('ERROR NO OPERACIONAL 💥:', err);
      res.status(500).json({
        status: 'error',
        message: 'Ocurrió un error interno en el servidor.',
      });
    }
  }
}
\`\`\`

### Paso 4: Implementación en un Controlador Real

Observa cómo un controlador queda 100% libre de bloques try/catch en \`src/controllers/userController.ts\`:

\`\`\`typescript
import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../errors/AppError';

export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = id === '10' ? { id: '10', name: 'Nelson Sosa' } : null;

  if (!user) {
    throw new AppError(\`No se encontró ningún usuario con el ID: \${id}\`, 404);
  }

  res.json({
    status: 'success',
    data: { user },
  });
});
\`\`\`

## Verificación

1. Probar solicitud exitosa:
\`\`\`bash
curl -X GET http://localhost:3000/api/users/10
\`\`\`
Retorna código 200 con el objeto de usuario.

2. Probar solicitud a recurso inexistente para validar captura centralizada:
\`\`\`bash
curl -X GET http://localhost:3000/api/users/999
\`\`\`
Retorna formato estructurado con código HTTP 404:
\`\`\`json
{ "status": "fail", "message": "No se encontró ningún usuario con el ID: 999" }
\`\`\`
    `,
  },
  {
    id: 'terminal-git-resolver-conflictos-merge-rebase',
    slug: 'comandos-git-resolver-conflictos-merge-rebase',
    title: 'Los 10 comandos esenciales de Git para resolver conflictos de merge y rebase',
    excerpt: 'Aprende a diagnosticar, aislar y resolver colisiones de código en Git con herramientas nativas: checkout condicional, abortos seguros, rerere y rescate con reflog.',
    category: CATEGORIES.terminal,
    tags: ['git', 'terminal', 'devops', 'version-control', 'cli'],
    author: 'Equipo Técnico FixCode',
    publishedAt: '2026-10-29',
    readingTime: 7,
    featured: true,
    content: `
## Introducción

Los conflictos de integración en Git son inevitables en equipos de desarrollo activos. El pánico ante un rebase en estado detached o marcadores de conflicto no resueltos (\`<<<<<<< HEAD\`) suele llevar a desarrolladores a realizar copias manuales de carpetas o forzar commits destructivos con \`git push --force\`.

En esta guía abordaremos los 10 comandos fundamentales que todo ingeniero de software debe dominar para abortar integraciones fallidas sin perder trabajo, elegir automáticamente versiones con \`--ours\` o \`--theirs\`, activar la memoria de resolución automática con \`rerere\` y recuperar commits extraviados mediante \`reflog\`.

## Requisitos Previos

- Git 2.30+ instalado en tu sistema.
- Terminal interactiva (Bash, Zsh o PowerShell).

## Paso a Paso con Código Real

### 1. Visualizar los archivos en colisión activa

Durante un merge o rebase detenido por conflictos, identifica rápidamente qué archivos requieren intervención manual:

\`\`\`bash
git status -s
\`\`\`

Los archivos con el prefijo \`UU\` (both modified) o \`UD\` / \`DU\` son aquellos donde ambas ramas modificaron las mismas líneas.

### 2. Inspeccionar únicamente las secciones en conflicto

En lugar de revisar archivos gigantescos completos, lista exclusivamente los bloques con delimitadores:

\`\`\`bash
git diff --check
\`\`\`

Este comando analiza el árbol de trabajo e imprime el número de línea exacto donde persisten marcadores \`<<<<<<<\` o \`>>>>>>>\` no resueltos.

### 3. Abortar una fusión de emergencia de forma segura

Si iniciaste un merge accidentalmente y quieres regresar el repositorio al estado exacto previo:

\`\`\`bash
git merge --abort
\`\`\`

Restaura el puntero \`HEAD\` y descarta los archivos temporales de fusión sin alterar tus commits locales.

### 4. Abortar un Rebase interactivo atascado

Si el rebase se detiene en un paso intermedio confuso:

\`\`\`bash
git rebase --abort
\`\`\`

Devuelve la rama a su commit original antes de iniciar la reescritura de historial.

### 5. Resolver conflictos eligiendo la versión entrante (--theirs)

Ideal para resolver colisiones en archivos generados (como \`package-lock.json\` o carpetas de build):

\`\`\`bash
git checkout --theirs ruta/al/archivo.json
git add ruta/al/archivo.json
\`\`\`

### 6. Resolver conflictos reteniendo la versión actual (--ours)

Si deseas descartar por completo los cambios entrantes para un archivo específico:

\`\`\`bash
git checkout --ours ruta/al/archivo.json
git add ruta/al/archivo.json
\`\`\`

### 7. Continuar el flujo de Rebase tras resolver colisiones

Una vez resueltos y añadidos los archivos con \`git add\`, nunca hagas \`git commit\`:

\`\`\`bash
git rebase --continue
\`\`\`

Git aplicará el commit actual y avanzará al siguiente paso del rebase.

### 8. Habilitar la resolución automática recordada (rerere)

\`rerere\` (*Reuse Recorded Resolution*) memoriza cómo resolviste un conflicto para que, si vuelves a rebasar o fusionar la misma rama, Git lo resuelva automáticamente:

\`\`\`bash
git config --global rerere.enabled true
git config --global rerere.autoupdate true
\`\`\`

### 9. Comparar el diff trilateral antes de confirmar

Examina las diferencias entre la base común de las ramas y las dos cabezas en conflicto:

\`\`\`bash
git diff --cc ruta/al/archivo.ts
\`\`\`

### 10. Rescatar commits perdidos con reflog

Si abortaste por error o reseteaste la rama (\`git reset --hard\`) perdiendo tus cambios:

\`\`\`bash
git reflog
\`\`\`

Identifica el hash del estado anterior (ej. \`HEAD@{2}\`) y recupéralo al instante:

\`\`\`bash
git reset --hard HEAD@{2}
\`\`\`

## Verificación

1. Crear un conflicto deliberado en una rama temporal:
\`\`\`bash
git checkout -b prueba-conflicto
echo "cambio rama A" > test.txt && git commit -am "rama A"
git checkout main
echo "cambio rama main" > test.txt && git commit -am "rama main"
git merge prueba-conflicto
\`\`\`
2. Ejecutar \`git status -s\` y comprobar el estado \`UU test.txt\`.
3. Ejecutar \`git merge --abort\` y validar con \`git log -1\` que el repositorio volvió a su estado limpio.
    `,
  },
  {
    id: 'terminal-linux-administracion-permisos-servidor-web',
    slug: 'comandos-administracion-permisos-servidores-linux-web',
    title: 'Comandos fundamentales de administración y permisos en servidores Linux para web',
    excerpt: 'Aprende a asegurar tu servidor web Linux: configuración estricta de permisos chmod/chown, cortafuegos UFW, gestión de procesos con systemd y monitoreo de memoria y disco.',
    category: CATEGORIES.terminal,
    tags: ['linux', 'ubuntu', 'sysadmin', 'seguridad', 'bash', 'terminal'],
    author: 'Equipo Técnico FixCode',
    publishedAt: '2026-10-29',
    readingTime: 7,
    featured: false,
    content: `
## Introducción

Desplegar una aplicación en un servidor Linux (Ubuntu/Debian) sin configurar adecuadamente los privilegios de usuario y los permisos del sistema de archivos es una de las principales causas de brechas de seguridad. Otorgar permisos \`777\` a un directorio web para "solucionar" un error de escritura permite que cualquier usuario o proceso vulnerable sobreescriba scripts ejecutables.

En esta guía abordaremos la configuración profesional de permisos estándar de producción (644/755), la administración del cortafuegos \`ufw\`, la gestión de servicios Node.js con \`systemd\` y comandos de monitoreo en tiempo real.

## Requisitos Previos

- Acceso SSH a un servidor Linux (Ubuntu 22.04 / 24.04 LTS).
- Usuario con privilegios de \`sudo\`.

## Paso a Paso con Código Real

### Paso 1: Configuración estricta de permisos para directorios web

El usuario del servidor web (típicamente \`www-data\` en Nginx/Apache) debe tener permisos de lectura sobre el código, pero los archivos no deben pertenecer a él para evitar modificaciones maliciosas:

\`\`\`bash
# Asignar la propiedad de los archivos a tu usuario deployer y el grupo a www-data
sudo chown -R $USER:www-data /var/www/fixcode

# Establecer permisos estándar: 755 para directorios
sudo find /var/www/fixcode -type d -exec chmod 755 {} \;

# Establecer permisos estándar: 644 para archivos
sudo find /var/www/fixcode -type f -exec chmod 644 {} \;
\`\`\`

Esta combinación previene que exploits en el servidor web alteren los archivos del proyecto.

### Paso 2: Asegurar el servidor con el cortafuegos UFW

Antes de habilitar el firewall, garantiza que el puerto SSH permanezca abierto para no perder la conexión:

\`\`\`bash
# Permitir SSH
sudo ufw allow OpenSSH

# Permitir tráfico web HTTP y HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Activar el cortafuegos
sudo ufw enable

# Verificar reglas activas
sudo ufw status verbose
\`\`\`

### Paso 3: Crear un servicio systemd para tu API en Node.js

Evita ejecutar servidores con \`nohup\` o comandos sueltos en terminales interactivas. Crea un daemon administrado por el sistema operativo en \`/etc/systemd/system/fixcode-api.service\`:

\`\`\`ini
[Unit]
Description=FixCode Node.js Backend Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/fixcode/backend
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production PORT=3000

LimitNOFILE=65535
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=fixcode-api

[Install]
WantedBy=multi-user.target
\`\`\`

Activar y controlar el servicio:
\`\`\`bash
sudo systemctl daemon-reload
sudo systemctl enable fixcode-api
sudo systemctl start fixcode-api
sudo systemctl status fixcode-api
\`\`\`

### Paso 4: Monitoreo de recursos y lectura de logs en tiempo real

Para diagnosticar caídas o saturación de memoria en el servidor:

\`\`\`bash
# Ver logs del servicio en tiempo real
sudo journalctl -u fixcode-api -f -n 100

# Inspeccionar uso de espacio en disco en formato legible (GB/MB)
df -h /

# Inspeccionar memoria RAM disponible y swap
free -h

# Monitorear puertos escuchando en el servidor
sudo ss -tulpn
\`\`\`

## Verificación

1. Comprobar permisos efectivos en el directorio web:
\`\`\`bash
ls -la /var/www/fixcode
\`\`\`
Verifica que las carpetas tengan \`drwxr-xr-x\` y los archivos \`-rw-r--r--\`.

2. Probar la recuperación automática del servicio systemd:
\`\`\`bash
sudo pkill -f "node dist/index.js"
sleep 6
sudo systemctl status fixcode-api
\`\`\`
El servicio debe mostrar \`Active: active (running)\` tras haber reiniciado automáticamente.
    `,
  },
  {
    id: 'terminal-powershell-error-ampersand-scripts-npm',
    slug: 'solucionar-error-sintaxis-ampersand-powershell-scripts-npm',
    title: 'Cómo solucionar el error de sintaxis "&&" en PowerShell al ejecutar scripts de npm',
    excerpt: 'Aprende por qué falla el operador "&&" en Windows PowerShell 5.1 y cómo resolverlo en tus scripts de package.json mediante cross-var, npm-run-all o migración a PowerShell 7.',
    category: CATEGORIES.terminal,
    tags: ['powershell', 'npm', 'windows', 'terminal', 'cli', 'troubleshooting'],
    author: 'Equipo Técnico FixCode',
    publishedAt: '2026-10-29',
    readingTime: 5,
    featured: false,
    content: `
## Introducción

Al trabajar en entornos de desarrollo en Windows, uno de los errores más frecuentes al ejecutar scripts encadenados en \`package.json\` (como \`npm run build && npm run preview\` o \`tsc && vite build\`) es:

\`\`\`text
El token '&&' no es un separador de instrucciones válido en esta versión.
+ CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException
+ FullyQualifiedErrorId : InvalidEndOfLine
\`\`\`

Este error ocurre porque **Windows PowerShell 5.1** (la versión predeterminada instalada en Windows 10 y Windows 11) no soporta el operador de encadenamiento condicional \`&&\`, el cual fue introducido recién en PowerShell 7+. En esta guía aprenderás las 3 soluciones profesionales para asegurar que tus scripts de npm funcionen de manera agnóstica en Windows, macOS y Linux.

## Requisitos Previos

- Windows 10 u 11 con Node.js y npm instalados.
- Consola de Windows PowerShell o Terminal de Windows.

## Paso a Paso con Código Real

### Solución 1: Usar npm-run-all para scripts multiplataforma (Recomendada)

Para proyectos colaborativos donde los desarrolladores utilizan diferentes sistemas operativos, la mejor práctica es delegar el encadenamiento a la librería agnóstica \`npm-run-all\`.

Instala la dependencia de desarrollo:
\`\`\`bash
npm install -D npm-run-all
\`\`\`

Edita tu archivo \`package.json\`:
\`\`\`json
{
  "scripts": {
    "type-check": "tsc -b",
    "build:vite": "vite build",
    "build": "run-s type-check build:vite",
    "dev:all": "run-p dev:client dev:server"
  }
}
\`\`\`

- \`run-s\` ejecuta comandos de forma secuencial deteniendo la ejecución si el primero falla (idéntico a \`&&\`).
- \`run-p\` ejecuta múltiples tareas en paralelo (útil para frontend + backend simultáneos).

### Solución 2: Usar ';' o try/catch en terminal manual de PowerShell 5.1

Si estás ejecutando comandos manuales directamente en la consola de Windows PowerShell 5.1:

Reemplaza:
\`\`\`powershell
# Invalido en PowerShell 5.1
npm run build && firebase deploy --only hosting
\`\`\`

Por encadenamiento con verificación de salida (\`$LASTEXITCODE\`):
\`\`\`powershell
# Valido en PowerShell 5.1
npm run build; if ($LASTEXITCODE -eq 0) { firebase deploy --only hosting }
\`\`\`

O en una sola línea simple si no requieres validación condicional estricta:
\`\`\`powershell
npm run build; firebase deploy --only hosting
\`\`\`

### Solución 3: Actualizar a PowerShell 7+ (Soporte nativo para '&&' y '||')

PowerShell Core (v7+) soporta de forma nativa los operadores \`&&\` y \`||\` exactamente igual que Bash o Zsh en Unix.

Instala la versión moderna mediante el gestor oficial \`winget\`:
\`\`\`powershell
winget install --id Microsoft.Powershell --source winget
\`\`\`

Una vez instalado, abre tu terminal ejecutando:
\`\`\`bash
pwsh
\`\`\`

Ahora puedes ejecutar comandos encadenados directamente:
\`\`\`powershell
npm run build && git status
\`\`\`

## Verificación

1. Comprobar la versión activa de PowerShell:
\`\`\`powershell
$PSVersionTable.PSVersion
\`\`\`
Si la versión principal (\`Major\`) es 5, debes usar la Solución 1 o 2. Si es 7 o superior, el operador \`&&\` funcionará de forma nativa.

2. Probar el script en \`package.json\`:
\`\`\`bash
npm run build
\`\`\`
Confirma que el proceso compile TypeScript y ejecute el empaquetador Vite en secuencia sin arrojar \`ParserError\`.
    `,
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
