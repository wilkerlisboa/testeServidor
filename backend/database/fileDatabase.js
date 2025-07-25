const Database = require("better-sqlite3");
const fileDatabase = new Database("banco.db");

// CRIAR TABELA DE USUARIO NO BANCO DE DADOS
fileDatabase.prepare(`
  CREATE TABLE IF NOT EXISTS USUARIOS(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME TEXT NOT NULL,
    CPF TEXT NOT NULL,
    RG TEXT NOT NULL ,
    ENDERECO TEXT NOT NULL ,
    FUNCAO TEXT NOT NULL ,
    EMAIL TEXT NOT NULL UNIQUE,
    SENHA TEXT NOT NULL 
  )
`).run();

// CRIAR TABELA DE MATERIAS NO BANCO DE DADOS
fileDatabase.prepare(`
  CREATE TABLE IF NOT EXISTS MATERIAS(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME TEXT NOT NULL,
    CATEGORIA TEXT NOT NULL,
    QUANTIDADE INTEGER NOT NULL,
    PRECO REAL NOT NULL,
    MARCA TEXT NOT NULL,
    DESCRICAO TEXT NOT NULL,
    LOCALIZACAO TEXT NOT NULL
  )
`).run();

// CRIAR TABELA DE VENDAS NO BANCO DE DADOS
fileDatabase.prepare(`
  CREATE TABLE IF NOT EXISTS VENDAS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    USUARIO_ID INTEGER NOT NULL,
    MATERIA_ID INTEGER NOT NULL,
    DATA TEXT NOT NULL,
    QUANTIDADE INTEGER NOT NULL,
    TOTAL REAL NOT NULL,
    FOREIGN KEY (USUARIO_ID) REFERENCES USUARIOS(ID),
    FOREIGN KEY (MATERIA_ID) REFERENCES MATERIAS(ID) 
  )
`).run();

module.exports = fileDatabase;
