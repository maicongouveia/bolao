# Deploy - Github Actions

- É necessário colocar o novo endereço de ip e usuário no arquivo *.github\workflows\deploy.yml*
- Criar novas chaves SSH (de preferencia em uma maquina local)
- Copiar a chave publica para o arquivo *~/.ssh/authorized_keys*
- Copiar a chave privada para a variavel *SSH_PRIVATE_KEY* do GitHub
