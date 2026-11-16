# EZ Techlabs (@ez.techlabs) — Plataforma Web & Panel de Control

> **Ingeniería de Software & Diseño UI/UX Senior**  
> *Sitio web oficial, catálogo interactivo con pedidos por WhatsApp y centro de administración para estudio de desarrollo de software en el estado Zulia, Venezuela.*

---

## 📌 Identidad de la Marca

- **Eslogan:** *«Páginas web y software que hacen que tu negocio venda»*
- **Paleta de Color:**
  - Fondo Base: `#0C1214`
  - Superficies / Paneles: `#162126`
  - Bordes Estructurales: `#2B3A3F`
  - Acento Verde Neón: `#A6F20F`
  - Texto Principal: `#F4F7F5`
  - Texto Secundario: `#B8C4BF`
- **Tipografías Autoalojadas:** *Syne* (Display condensada para títulos) y *Space Grotesk* (Sans geométrica para cuerpo).
- **Logotipos Oficiales:** Ubicados en `frontend/public/assets/logo/` (Isotipo, Horizontal Fondo Oscuro y Horizontal Fondo Claro).
- **Contacto Oficial:** WhatsApp `+58 414 604 0010` • Instagram `@ez.techlabs`.

---

## 🛠️ Stack Tecnológico

- **Backend:** Python 3.12 + Django 5 + Django REST Framework + WhiteNoise + django-axes (protección anti-fuerza bruta).
- **Base de Datos:** SQLite para desarrollo local ágil; PostgreSQL 16 para producción bajo Docker.
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Canvas 2D interactivo.
- **Despliegue & Contenedores:** Docker multi-stage + Docker Compose + Nginx como reverse proxy.

---

## 🚀 Inicio Rápido en Desarrollo Local

### 1. Prerrequisitos
- Python 3.12+
- Node.js 20+ y npm

### 2. Configurar el Backend (Django)
```bash
cd backend

# Crear entorno virtual e instalar dependencias
python -m venv .venv
# En Windows:
.venv\Scripts\activate
# En Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt

# Ejecutar migraciones e inicializar base de datos
python manage.py migrate

# Sembrar datos reales de EZ Techlabs (Servicios, Pack Pro 15$, FAQs, Proyectos Demo, SEO)
python manage.py seed_ez_data

# Crear superusuario administrador
python manage.py create_admin_user

# Recolectar archivos estáticos para el panel
python manage.py collectstatic --noinput

# Iniciar servidor de desarrollo (Puerto 8000)
python manage.py runserver 127.0.0.1:8000
```

### 3. Configurar el Frontend (React + Vite)
En una nueva terminal:
```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo de Vite (Puerto 5173)
npm run dev
```

Abre tu navegador en:
- **Sitio Web Público:** [http://127.0.0.1:5173/](http://127.0.0.1:5173/)
- **Panel de Control Administrativo:** [http://127.0.0.1:8000/gestor-ez/](http://127.0.0.1:8000/gestor-ez/)
  - **Usuario:** `admin`
  - **Contraseña:** `Ingeniero01*`

---

## 🌐 Despliegue en Netlify (Frontend Inmediato)

El frontend está optimizado y pre-configurado para desplegarse en **Netlify** con cero fricción:

### Opción A: Arrastrar y Soltar (Netlify Drop - Más rápido)
1. Inicia sesión en [app.netlify.com](https://app.netlify.com/).
2. Ve a la sección **Sites** y arrastra la carpeta ya compilada:
   👉 `F:\ez.techlabs\frontend\dist`
3. ¡Listo! Tu sitio estará en línea en segundos con soporte de rutas limpias (`_redirects`), compresión e imágenes oficiales.

### Opción B: Conectar repositorio Git a Netlify
Si conectas tu repositorio de GitHub / GitLab, el archivo `netlify.toml` en la raíz ya tiene todo configurado automáticamente:
- **Base directory:** `frontend`
- **Build command:** `npm run build`
- **Publish directory:** `frontend/dist`
- **Variables de entorno:** `NODE_VERSION = 20`
- **Regla SPA:** `/* -> /index.html 200`

---

## 🐳 Despliegue con Docker en Producción

Toda la infraestructura está lista para ser levantada en un VPS o servidor en la nube con un solo comando:

```bash
# 1. Clonar el repositorio y entrar al directorio
git clone <tu-repositorio> ez.techlabs
cd ez.techlabs

# 2. Configurar tus variables de producción
cp .env.example .env
nano .env

# 3. Construir y desplegar contenedores (Backend, Frontend Nginx y PostgreSQL)
docker compose up --build -d

# 4. Sembrar datos iniciales en la base de datos de producción
docker compose exec backend python manage.py seed_ez_data
docker compose exec backend python manage.py create_admin_user
```

---

## 🔒 Centro de Control (Panel Administrativo)

El panel propio se encuentra en la ruta ofuscada **/gestor-ez/** (configurable vía `ADMIN_URL_PATH` en el `.env`):

1. **Edición sin tocar código:**
   - Textos de portada, Hero y mensaje de bienvenida a WhatsApp.
   - Catálogo de servicios y precios (incluyendo el **Pack Perfil Pro a 15\$**).
   - Proyectos del portafolio (título, descripción, imagen, enlaces a demostración y selector de proyecto demo o real).
   - Preguntas frecuentes y garantías.
   - Metadatos SEO y Schema.org por página.
2. **Gestión de Prospectos (Leads):**
   - Todos los mensajes enviados desde el formulario web se guardan en la base de datos con detección de spam y registro de IP.
   - Los prospectos se pueden clasificar en: `NUEVO`, `EN_PROCESO`, `CONTACTADO`, `CERRADO`.
   - **Botón de Exportación a CSV:** En la lista de mensajes, selecciona los registros deseados y elige en el menú de acciones *«Exportar mensajes seleccionados a CSV»*.
3. **Ciberseguridad:**
   - La librería `django-axes` bloquea automáticamente cualquier dirección IP que falle 5 intentos de contraseña consecutivos durante 60 minutos.

---

## 📋 Lista Corta: Qué debes configurar tú en Producción

| Parámetro | Dónde se configura | Qué valor debes colocar |
| :--- | :--- | :--- |
| **Dominio Propio** | Proveedor DNS (Cloudflare / Namecheap) | Apuntar los registros `A` de `eztechlabs.com` y `www` a la IP de tu servidor VPS. |
| **Certificado SSL (HTTPS)** | Nginx o Cloudflare | Activar SSL / HTTPS gratuito en Cloudflare (modo *Full / Strict*) o con Certbot. |
| **Clave Secreta Django** | Archivo `.env` (`DJANGO_SECRET_KEY`) | Generar una cadena larga y aleatoria de caracteres alfanuméricos. |
| **Contraseña del Panel** | Panel `/gestor-ez/` o `.env` | Cambiar la contraseña inicial `EzTechlabs2026!` por tu propia contraseña maestra. |
| **Contraseña PostgreSQL** | Archivo `.env` (`DB_PASSWORD`) | Contraseña segura para el contenedor de la base de datos de producción. |

---

## 🧪 Verificación de Calidad y Pruebas

Para ejecutar la suite de pruebas unitarias automatizadas del backend:
```bash
cd backend
python manage.py test apps.content.test_content apps.leads.test_leads apps.portfolio.test_portfolio
```

Para validar la compilación estricta de TypeScript del frontend:
```bash
cd frontend
npm run build
```
*Peso final verificado:* **93.47 KB gzip** (Presupuesto exigido: < 180 KB).

