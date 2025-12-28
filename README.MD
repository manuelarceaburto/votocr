# VotoCR 🇨🇷

Plataforma de información electoral para las elecciones presidenciales de Costa Rica 2026.

## 📋 Descripción

VotoCR es una aplicación web completa que proporciona información sobre los candidatos presidenciales de Costa Rica y permite a los ciudadanos participar en encuestas anónimas de intención de voto con verificación por email. Los resultados se visualizan en tiempo real en un mapa interactivo del país.

## ✨ Características

- **Información de Candidatos**: Perfiles detallados con biografías, partidos políticos y propuestas de gobierno
- **Encuesta Anónima**: Sistema de votación con verificación por email que garantiza el anonimato
- **Verificación por Email**: Códigos de 6 dígitos enviados por correo electrónico
- **Anti-fraude**: Un voto por email (usando hash SHA-256, el email real no se almacena)
- **Mapa Interactivo**: Visualización de resultados por provincia en tiempo real
- **Contador de Cuenta Regresiva**: Cuenta regresiva hasta el día de las elecciones (1 de febrero de 2026)
- **Diseño Responsivo**: Optimizado para móviles, tablets y escritorio
- **Colores Patrios**: Diseño inspirado en la bandera de Costa Rica (azul, blanco, rojo)

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Email**: Resend
- **Almacenamiento**: JSON files (demo) - Fácil migración a base de datos

## 📁 Estructura del Proyecto

```
votocr/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página de inicio
│   ├── globals.css          # Estilos globales
│   ├── candidatos/          # Páginas de candidatos
│   │   ├── page.tsx         # Lista de candidatos
│   │   └── [slug]/          
│   │       └── page.tsx     # Detalles de candidato
│   ├── encuesta/            
│   │   └── page.tsx         # Página de encuesta
│   ├── mapa/                
│   │   └── page.tsx         # Mapa de resultados
│   └── api/                 # API Routes
│       ├── verificar/       # Enviar código de verificación
│       ├── confirmar/       # Confirmar código
│       ├── votar/           # Registrar voto
│       └── resultados/      # Obtener resultados
├── components/              # Componentes React
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Countdown.tsx
│   ├── CandidatoCard.tsx
│   ├── MapaCostaRica.tsx
│   └── VerificacionEmail.tsx
├── data/
│   └── candidatos.ts        # Datos de candidatos
├── lib/                     # Utilidades
│   ├── email.ts             # Envío de emails
│   ├── hash.ts              # Funciones de hash
│   ├── storage.ts           # Almacenamiento (JSON)
│   └── utils.ts             # Utilidades generales
├── types/
│   └── index.ts             # Definiciones de TypeScript
├── public/                  # Archivos estáticos
├── .env.example             # Variables de entorno de ejemplo
└── README.md
```

## 🛠️ Instalación y Configuración

### Requisitos Previos

- Node.js 18+ 
- npm, yarn o pnpm

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/manuelarceaburto/votocr.git
   cd votocr
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Configurar variables de entorno**
   
   Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` con tus configuraciones:
   ```env
   # Email Service (Resend)
   RESEND_API_KEY=tu_clave_api_de_resend
   
   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Configurar Resend para emails**
   
   - Crea una cuenta en [Resend](https://resend.com)
   - Obtén tu API key desde el dashboard
   - Actualiza `RESEND_API_KEY` en `.env`
   - Verifica tu dominio (o usa `onboarding@resend.dev` para testing)

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Cómo Agregar/Actualizar Candidatos

Los datos de los candidatos están en `data/candidatos.ts`. Para agregar o modificar candidatos:

1. Abre el archivo `data/candidatos.ts`
2. Agrega un nuevo objeto al array `candidatos`:

```typescript
{
  id: '7',                                    // ID único
  slug: 'nombre-apellido',                    // URL amigable
  nombre: 'Nombre Completo',
  partido: 'Nombre del Partido',
  partidoAbreviatura: 'ABC',
  colorPartido: '#HEXCODE',                   // Color del partido
  foto: 'https://url-de-la-foto.jpg',         // URL de la foto
  biografia: 'Biografía del candidato...',
  propuestas: [
    'Propuesta 1',
    'Propuesta 2',
    'Propuesta 3',
    // ...
  ],
}
```

3. Las imágenes pueden ser:
   - URLs externas
   - Archivos en `/public/candidatos/`
   - Placeholders (como los actuales)

## 🗄️ Migración a Base de Datos

Actualmente, el proyecto usa archivos JSON para almacenamiento (demo). Para producción, se recomienda usar una base de datos real.

### Opción 1: Prisma + PostgreSQL

1. **Instalar Prisma**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. **Definir schema** (`prisma/schema.prisma`)
   ```prisma
   model Voto {
     id          String   @id @default(cuid())
     emailHash   String   @unique
     candidatoId String
     provincia   String
     timestamp   DateTime @default(now())
   }

   model Verificacion {
     id        String   @id @default(cuid())
     email     String
     code      String
     token     String?
     verified  Boolean  @default(false)
     timestamp DateTime @default(now())
   }
   ```

3. **Migrar**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Actualizar `lib/storage.ts`** para usar Prisma en lugar de JSON

### Opción 2: Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Crea las tablas necesarias
3. Instala el cliente: `npm install @supabase/supabase-js`
4. Actualiza las funciones de almacenamiento

## 🚀 Despliegue

### Desplegar en Vercel (Recomendado)

Vercel es la plataforma recomendada para Next.js:

1. **Push a GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Conectar con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub
   - Configura las variables de entorno:
     - `RESEND_API_KEY`
     - `NEXT_PUBLIC_APP_URL` (será tu dominio de Vercel)

3. **Deploy**
   - Vercel detectará automáticamente Next.js
   - El despliegue toma ~2 minutos
   - Cada push a `main` despliega automáticamente

### Variables de Entorno en Producción

Asegúrate de configurar estas variables en Vercel:

- `RESEND_API_KEY`: Tu API key de Resend
- `NEXT_PUBLIC_APP_URL`: Tu dominio de producción
- `DATABASE_URL` (opcional): Si usas base de datos

## 🔒 Seguridad y Privacidad

- **Emails no almacenados**: Solo se guarda el hash SHA-256, no el email real
- **Verificación**: Códigos de 6 dígitos con expiración de 10 minutos
- **Rate limiting**: Máximo 3 intentos por minuto por email
- **Un voto por persona**: El hash del email previene votos duplicados
- **Sin tracking**: No se almacena información personal identificable

## 🧪 Testing

Para probar el flujo de verificación sin configurar Resend:

1. Deja `RESEND_API_KEY` como `your_resend_api_key` en `.env`
2. El sistema entrará en "modo mock"
3. El código de verificación se imprimirá en la consola del servidor
4. Usa ese código para completar la verificación

## 📊 Datos y Resultados

- Los votos se almacenan en `data/votes.json`
- Las verificaciones en `data/verificaciones.json`
- Estos archivos se crean automáticamente
- Están en `.gitignore` para no commitearlos
- En producción, usa una base de datos real

## 🎨 Personalización

### Colores

Los colores de Costa Rica están definidos en `tailwind.config.ts`:

```typescript
colors: {
  'cr-blue': '#002b7f',    // Azul de la bandera
  'cr-red': '#ce1126',     // Rojo de la bandera
  'cr-white': '#ffffff',   // Blanco
}
```

### Fecha de Elecciones

Para cambiar la fecha del countdown, edita `components/Countdown.tsx`:

```typescript
const targetDate = new Date('2026-02-01T00:00:00');
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autor

**Manuel Arce Aburto**
- GitHub: [@manuelarceaburto](https://github.com/manuelarceaburto)

## 🙏 Agradecimientos

- Datos de candidatos son ficticios para demostración
- Las fotos son placeholders que deben reemplazarse con fotos reales
- Esta plataforma es educativa y no oficial

## 📞 Soporte

Si tienes preguntas o problemas:
1. Revisa la documentación
2. Abre un issue en GitHub
3. Contacta al autor

---

**Nota**: Esta es una plataforma de encuestas no oficial. Los resultados no representan datos oficiales del Tribunal Supremo de Elecciones (TSE) de Costa Rica.
