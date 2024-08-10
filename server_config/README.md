# Configurando o servidor

## O que vamos configurar

### Nginx / Apache2 (Servidor HTTP)

Muitas vezes ele ja vem instalado por padrão

[Nginx - Link](nginx/README.md)

### Git

Atualize o índice de pacotes:
```
sudo apt update
```

Instale o Git:
```
sudo apt install git
```

Configurando Git

```
git config --global user.name "Maicon Gouveia"
git config --global user.email "gouveia.maicon@gmail.com"
```

### Copiando projeto
```
git clone git@github.com:maicongouveia/bolao.git
```


### Node

```
sudo apt install nodejs
```

### Dependências do Projeto

Dentro da pasta do projeto execute o comando

```
npm i
```
### Forever (Rodando o Projeto)

[Link](forever/README.md)

### Configurando deploy

[Link](deploy/README.md)