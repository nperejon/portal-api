# API de Portal de Notícias
![GitHub](https://img.shields.io/github/license/Nick3n/portal-api)
![GitHub package.json version](https://img.shields.io/github/package-json/v/Nick3n/portal-api)
![GitHub repo file count](https://img.shields.io/github/directory-file-count/Nick3n/portal-api)

## Tecnologias
- Node Js
- TypeScript
- Express
- TypeORM

---

## Funcionalidades

- [x] Listagem de usuários
- [x] Listagem de usuário único
- [x] Criação de usuário
- [x] Alteração de usuário
- [x] Remoção de usuário
- [x] Login de usuário
- [ ] Alteração de senha de usuário
- [x] Listagem de avatar de usuário
- [x] Alteração de avatar de usuário
- [ ] Remoção de avatar de usuário
- [x] Listagem de notícias
- [x] Criação de notícia
- [x] Encontrar notícia de usuário
- [ ] Alteração de notícia
- [ ] Remoção de notícia
- [ ] Criação de comentário para notícia
- [ ] Remoção de comentário de notícia

## Alterações Futuras
- [ ] Remover regras de negócio das classes de controladores
- [ ] Criação de classes para entidades do negócio
- [ ] Injeção de dependência em classes de roteadores
- [ ] Acrescentar ferramente de testes

---

## Routes
### Users
| Type | Route |
|---|---|
| GET | /users |
| GET | /users/:id |
| POST | /users/ |
| PUT | /users/:id |
| DELETE | /users/:id |

### Authentication
| Type | Route |
|---|---|
| POST | /auth/login |
| POST | /auth/change-password |

### Avatar
| Type | Route |
|---|---|
| GET | /avatar/:id |
| POST | /avatar |

### Posts
| Type | Route |
|---|---|
| GET | /users/:id/posts |
| GET | /post |
| POST | /post |