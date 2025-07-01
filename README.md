# 🏋️‍♂️ Cute Workout

**Cute Workout** é um sistema completo de treino personalizado que ajuda usuários a planejar, acompanhar e gerenciar suas rotinas de exercícios. Ideal para quem busca organização, motivação e controle detalhado dos treinos.

## ✨ Funcionalidades

- ✅ Criação e edição de planos de treino personalizados
- ✅ Acompanhamento de séries, repetições e cargas
- ✅ Visualização do histórico e progresso
- ✅ Sincronização de dados em tempo real via Firebase
- ✅ Interface intuitiva, responsiva e amigável

## 🧪 Tecnologias utilizadas

- **React** – Interface rápida e interativa
- **TypeScript** – Tipagem estática para segurança e escalabilidade
- **Firebase** – Autenticação e banco de dados em tempo real
- **Radix UI** – para componentes acessíveis e design de temas
- **Styled-Components** – Estilos modularizados e tema escuro
- **Vite** – Build e servidor de desenvolvimento ultrarrápido

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/cute-workout.git
cd cute-workout
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure suas variáveis de ambiente

Crie um arquivo .env na raiz do projeto com as variáveis:

# Define o ambiente (dev ou production)

```env
WEB_ENV=dev
```

# Firebase

```env
API_KEY=XXXXXXXXXXXXXXXXXXXXXXXX
AUTH_DOMAIN=seu-projeto.firebaseapp.com
PROJECT_ID=seu-projeto
STORAGE_BUCKET=seu-projeto.appspot.com
MESSAGING_SENDER_ID=XXXXXXXXXXXX
API_ID=1:XXXXXXXXXXXX:web:XXXXXXXXXXXXXXXX
MEASUREMENT_ID=G-XXXXXXXXXX
```

# URLs do Firebase Realtime Database

```env
DATABASE_URL_DEVELOPMENT=https://seu-projeto.firebaseio.com
DATABASE_URL_PRODUCTION=https://seu-projeto.firebaseio.com
```

# N8N URL

```env
N8N_URL=https://seu-projeto/webhook
```

### 4. Inicie o servidor local

```bash
npm run dev
```

Acesse http://localhost:5173/ no navegador para ver o projeto em ação.

## 📦 Estrutura do projeto

```bash
src/
├── assets/          # Imagens, ícones e mídias
├── components/      # Componentes reutilizáveis
├── contexts/        # Contextos React para estado global
├── dtos/            # Data Transfer Objects e tipos
├── env/             # Configurações e variáveis de ambiente
├── hooks/           # Hooks personalizados
├── libs/            # Configuração de libs genéricas
├── pages/           # Páginas principais
├── routes/          # Configuração das rotas
├── styles/          # Estilos globais
├── themes/          # Configurações de tema (Radix UI cores)
├── utils/           # Funções auxiliares
└── @types/          # Declarações de tipos TypeScript
```

## 📌 Observações

- O projeto usa Radix UI para componentes acessíveis e controle avançado de temas e cores, configurados na pasta themes/.

- Todos os dados são salvos na nuvem com Firebase.
