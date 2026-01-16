# 🍒 Cherihub HOME

Portal central de serviços e APIs do Cherihub.

![Cherihub](https://img.shields.io/badge/Cherihub-Home-green)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## ✨ Funcionalidades

- 📊 Dashboard com cards para cada serviço
- 🔄 Health check visual em tempo real
- 🌙 Tema escuro/claro com toggle
- 📱 Design responsivo
- ⚙️ Configuração via JSON
- 🐳 Pronto para Docker

## 🚀 Quick Start

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acessar em http://localhost:3001
```

### Build de Produção

```bash
# Gerar build
npm run build

# Preview do build
npm run preview
```

## 🐳 Deploy com Docker

### Build e Run Local

```bash
# Build da imagem
docker build -t cherihub-home .

# Executar container
docker run -d -p 3001:80 --name cherihub-home cherihub-home
```

### Deploy com Docker Compose

```bash
# Subir serviço
docker-compose up -d

# Ver logs
docker-compose logs -f cherihub-home

# Parar serviço
docker-compose down
```

## 📁 Estrutura do Projeto

```
cherihub-home/
├── public/
│   ├── favicon.svg          # Ícone do site
│   └── services.json         # Configuração dos serviços
├── src/
│   ├── components/           # Componentes React
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── HealthIndicator.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/                # Custom hooks
│   │   ├── useHealthCheck.ts
│   │   └── useTheme.ts
│   ├── services/             # Serviços e utilitários
│   │   └── config.ts
│   ├── types/                # Tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx               # Componente principal
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globais
├── nginx/
│   └── cherihub.cloud.conf   # Config Nginx para VPS
├── Dockerfile                # Build Docker
├── docker-compose.yml        # Orquestração local
├── nginx.conf                # Config Nginx do container
└── package.json
```

## ⚙️ Configuração de Serviços

Edite o arquivo `public/services.json` para adicionar/remover serviços:

```json
{
  "meta": {
    "title": "Cherihub",
    "description": "Central de Serviços e APIs",
    "version": "1.0.0"
  },
  "services": [
    {
      "id": "sicar",
      "name": "SICAR API",
      "description": "API para consulta de dados do CAR",
      "icon": "🌿",
      "frontend_url": "/sicar",
      "api_url": "/sicar/api",
      "docs_url": "/sicar/docs",
      "health_endpoint": "/sicar/api/health",
      "status": "active",
      "version": "1.0.0",
      "tags": ["Ambiental", "CAR"]
    }
  ]
}
```

### Campos do Serviço

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Identificador único |
| `name` | string | Nome exibido |
| `description` | string | Descrição breve |
| `icon` | string | Emoji ou ícone |
| `frontend_url` | string? | URL do frontend |
| `api_url` | string? | URL da API |
| `docs_url` | string? | URL da documentação |
| `health_endpoint` | string? | Endpoint de health check |
| `status` | enum | `active`, `coming_soon`, `maintenance` |
| `version` | string? | Versão do serviço |
| `tags` | string[]? | Tags/categorias |

## 🖥️ Deploy na VPS

### 1. Enviar arquivos para VPS

```bash
# Via SCP
scp -r ./cherihub-home root@76.13.68.64:/opt/

# Ou via Git
ssh root@76.13.68.64
cd /opt
git clone <repo-url> cherihub-home
```

### 2. Build e iniciar container

```bash
ssh root@76.13.68.64
cd /opt/cherihub-home

# Build
docker build -t cherihub-home .

# Iniciar
docker-compose up -d
```

### 3. Configurar Nginx na VPS

```bash
# Copiar configuração
cp /opt/cherihub-home/nginx/cherihub.cloud.conf /etc/nginx/sites-available/

# Criar link simbólico
ln -sf /etc/nginx/sites-available/cherihub.cloud.conf /etc/nginx/sites-enabled/

# Testar configuração
nginx -t

# Recarregar Nginx
systemctl reload nginx
```

### 4. Verificar status

```bash
# Ver containers
docker ps

# Ver logs do HOME
docker logs -f cherihub-home

# Testar health
curl http://localhost:3001/health
```

## 🔧 Variáveis de Ambiente

| Variável | Descrição | Default |
|----------|-----------|---------|
| `VITE_SERVICES_CONFIG` | JSON de configuração inline | - |

## 🎨 Personalização

### Cores

Edite `tailwind.config.js` para alterar o esquema de cores:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Cores principais (verde por padrão)
        500: '#22c55e',
        600: '#16a34a',
        // ...
      }
    }
  }
}
```

### Logo

Substitua `public/favicon.svg` pelo seu logo.

## 📝 Rotas

| URL | Destino |
|-----|---------|
| `cherihub.cloud` | HOME |
| `cherihub.cloud/sicar` | Frontend SICAR |
| `cherihub.cloud/sicar/api` | API SICAR |
| `cherihub.cloud/sicar/docs` | Swagger SICAR |
| `api.cherihub.cloud` | API SICAR (subdomínio) |
| `sicar.cherihub.cloud` | Frontend SICAR (subdomínio) |

## 🔐 Segurança

- Headers de segurança configurados no Nginx
- HTTPS forçado com HSTS
- CORS configurado para health checks
- Proteção contra XSS e clickjacking

## 📄 Licença

MIT © Cherihub

---

Desenvolvido com ❤️ para cherihub.cloud
