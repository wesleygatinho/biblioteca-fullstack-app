# Use uma imagem base oficial e leve do Python
FROM python:3.9-slim

# Define variáveis de ambiente para otimizar a execução em contentores
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Define o diretório de trabalho dentro do contentor
WORKDIR /app

# Copia e instala as dependências primeiro.
# Isto aproveita o cache do Docker, para que as dependências não sejam
# reinstaladas sempre que alterar o código da aplicação.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o resto do código da sua aplicação para o diretório de trabalho
COPY . .

# Dá permissão de execução ao nosso novo script de ponto de entrada
RUN chmod +x ./entrypoint.sh

# Define o ponto de entrada. Este comando será executado sempre que o contentor iniciar.
ENTRYPOINT ["./entrypoint.sh"]