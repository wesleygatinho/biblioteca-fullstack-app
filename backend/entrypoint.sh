#!/bin/sh

# Garante que o script pare se algum comando falhar
set -e

echo "A inicializar a base de dados (se necessário)..."
# Executa o nosso script Python para criar as tabelas e povoar os dados
python init_db.py
echo "Inicialização da base de dados concluída."

echo "A iniciar a aplicação Flask..."
# Executa o comando principal da aplicação (o que o Docker faria normalmente)
# Este comando inicia o servidor Gunicorn, que é mais robusto para produção/desenvolvimento
exec gunicorn --bind 0.0.0.0:5000 app:app