# Mapeando de funcionalidades

## Recuperação de senha

### **RF** // Requisitos Funcionais

- [] O usuário deve poder recuperar sua senha informando o seu e-mail
- [] O usuário deve receber um e-mail com instruções de recuperção de senha;
- [] O usuário deve poder resetar a senha;

### **RNF** // Requisitos não funcionais

- [] Utilizar o MailTrap para testar envios em ambiente de desenvolvimento;
- [] Utlizar Amazon SES para envios em produção;
- [] O envio de e-mails deve acontecer em segundo plano (background job)

### ### **RN** // Regras de negocios

- [] O link enviado por email para resetar senha , deve expirar em 2h
- [] O usuário precisa confirmar uma nova senha para resetar sua senha

## Atualização do perfil

### **RF** // Requisitos Funcionais

- [ ] O usuário deve poder atualizar o seu nome, email e senha

### **RNF**// Requisitos Não Funcionais

//....

### **RN** // Regras de Negócio

- [] O usuário não pode alterar seu email para um email já utilizado

- [] Para atualizar sua senha o usuário deve informar a senha antiga

- [] Para atualizar sua senha o usuário precisa confirmar a nova senha

## Painel do prestador

### **RF** // Requisitos Funcionais

- [] O usuário deve poder listar os agendamentos de uma dia espécifico;

- [] O prestador deve receber uma notificação sempre que houver um novo agendamento;

### **RNF** // Requisitos não funcionais

- [] Os agendamentos do prestador no dia devem ser armazenadas em cache;

- [] As notificações do prestador devem ser armazenadas no Mongodb;

- [] As notificações do prestador devem ser enviadas tem tempo real utilizando Sockt.io;

### **RN** // Regras de négocio

- [] A notificação deve ter um status de lida ou não lida para que o prestador porssa controlar;

## Agendamento de serviços

**RF** // Requisitos Funcionais

- [] O usuário deve poder listar todos os prestadores de serviço;

- [] O usuário deve poder listar todos os dias de uma mês com pelo menos um horário disponível de um prestador;

- [] O usuário deve poder listar horarios disponiveis em um dia específico de um prestador;

- [] O usuário deve poder reaalizar um novo agendamento com um prestador;

**RNF** // Requisitos não funcionais

- [] A listagem de prestadores deve ser armazenada em cache;

**RN** // Regras de négocio

- [] Cada agendamento deve durar 1h extamente;

- [] Os Agendamentos devem estar disponíveis entre 8h ás 18 h (Primeiro ás 8h , último as 17h);

- [] O usuário não pode agendar em um horário já ocupado;

- [] O usuário não pode agendar em horario que já passou;

- [] O usuário não pode agendar um horário com ele mesmo;
