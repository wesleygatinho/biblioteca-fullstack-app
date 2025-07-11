# Desafio Full-Stack: Aplicação de Gerenciamento de Livros

Aplicação web Full-Stack desenvolvida como parte do teste para Desenvolvedor Jr. na Murabei Data Science. O sistema permite o gerenciamento completo de uma coleção de livros (operações CRUD) e foi construído utilizando Python (Flask) para o backend, Next.js para o frontend, e Docker para a conteinerização de todo o ambiente.

## ✨ Funcionalidades

- **Listagem de Livros:** Visualização da coleção de livros com sistema de paginação.
- **Criação de Novos Livros:** Adição de novos livros à coleção através de um formulário em modal.
- **Busca Inteligente:** Filtragem e busca em tempo real por título e por autor.
- **Exclusão de Livros:** Remoção de livros da base de dados com diálogo de confirmação para segurança.
- **API RESTful:** Backend robusto com endpoints bem definidos para todas as operações.
- **Ambiente Conteinerizado:** Aplicação 100% funcional dentro de contentores Docker, garantindo consistência e facilidade de configuração.
- **Persistência de Dados:** Utilização de volumes Docker para garantir que os dados da base SQLite sejam mantidos entre as sessões.
- **Inicialização Automática:** A base de dados é verificada e inicializada automaticamente sempre que o contentor do backend é iniciado.

## 🚀 Tech Stack

- **Backend:**
  - **Linguagem:** Python 3.9
  - **Framework:** Flask & Gunicorn
  - **Base de Dados:** SQLite
- **Frontend:**
  - **Framework:** Next.js 14+ (App Router)
  - **Linguagem:** TypeScript
  - **UI:** React
  - **Estilização:** Tailwind CSS
  - **Componentes:** shadcn/ui
- **Ambiente & Orquestração:**
  - **Conteinerização:** Docker
  - **Orquestração:** Docker Compose

## 📂 Estrutura do Projeto

```
.
├── _docker-compose/
│   ├── data/                 # Pasta para a base de dados persistente
│   ├── docker-compose.yml    # Orquestra os serviços de backend e frontend
│   └── docker-up.bash        # Script para iniciar os serviços
├── backend/
│   ├── app.py                # Lógica principal da API Flask
│   ├── init_db.py            # Script de inicialização da base de dados
│   ├── entrypoint.sh         # Script de arranque do contentor
│   ├── Dockerfile            # Define a imagem Docker do backend
│   ├── requirements.txt      # Dependências Python
│   └── books.json            # Dados iniciais para a base de dados
└── frontend/
    ├── src/                  # Código fonte do Next.js
    ├── Dockerfile            # (Opcional, mas recomendado) Define a imagem do frontend
    ├── package.json          # Dependências e scripts do Node.js
    └── ...
```

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de que tem as seguintes ferramentas instaladas na sua máquina:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem incluído com o Docker Desktop)

## ⚙️ Instalação e Execução

Siga estes passos para configurar e executar o projeto localmente.

**1. Clonar o Repositório**
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DA_PASTA_DO_PROJETO>
```

**2. Construir a Imagem Docker do Backend**

Navegue até à pasta do backend e execute o script de construção.
```bash
cd backend
./build.bash
```

**3. Instalar Dependências do Frontend**

Para o frontend poder ser executado em modo de desenvolvimento local, instale as suas dependências.
```bash
cd ../frontend
npm install
```

**4. Iniciar os Serviços**

Com o backend "buildado" e as dependências do frontend instaladas, podemos iniciar todos os serviços.

- **Para iniciar o backend via Docker e o frontend localmente (Modo de Desenvolvimento):**

  a. Inicie o backend com Docker Compose.
     ```bash
     # A partir da raiz do projeto
     cd _docker-compose
     ./docker-up.bash
     ```
  b. Num **novo terminal**, inicie o servidor de desenvolvimento do frontend.
     ```bash
     # A partir da pasta 'frontend'
     npm run dev
     ```

**5. Aceder à Aplicação**

- **Frontend:** Abra o seu navegador e aceda a [http://localhost:3000](http://localhost:3000)
- **Backend API:** A API está disponível em [http://localhost:5000](http://localhost:5000)

## <caption> API Endpoints

A API do backend fornece os seguintes endpoints:

| Método | Rota                          | Descrição                                                                      |
|--------|-------------------------------|----------------------------------------------------------------------------------|
| `GET`  | `/api/v1/books`               | Lista os livros de forma paginada. Aceita `?page` e `?page_size`.                  |
| `POST` | `/api/v1/books`               | Cria um novo livro. Requer um corpo JSON com os dados do livro.                    |
| `DELETE`| `/api/v1/books/<id>`          | Apaga um livro específico com base no seu `id`.                                    |
| `GET`  | `/api/v1/books/author/<slug>` | Retorna uma lista de livros de um autor específico.                              |
| `GET`  | `/api/v1/books/title/<slug>`  | Retorna uma lista de livros que correspondem a um título (busca parcial).        |
| `GET`  | `/api/v1/authors`             | Retorna uma lista de todos os autores.                                           |


---
*Este projeto foi desenvolvido por WESLEY DOS SANTOS GATINHO como parte do processo seletivo da Murabei Data Science.*