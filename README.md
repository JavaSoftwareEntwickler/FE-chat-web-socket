# Chat Pubblica Angular Frontend

## Descrizione

Frontend di una semplice applicazione di chat pubblica in tempo reale, sviluppata con Angular 20 e WebSocket tramite STOMP over SockJS.  
Supporta l'invio e la ricezione immediata di messaggi tra utenti con autoscroll automatico.

---

## Caratteristiche principali

- Architettura standalone Angular (Angular 20)  
- Comunicazione WebSocket tramite STOMP e SockJS  
- Gestione messaggi in tempo reale con RxJS BehaviorSubject  
- Autoscroll intelligente per mostrare sempre l’ultimo messaggio  
- Input utente con binding bidirezionale (ngModel)  
- Debug WebSocket con log in console  
- Componente `AutoScrollComponent` standalone riutilizzabile  

---

## Requisiti

- Node.js >= 18  
- Angular CLI >= 16  
- Backend Spring Boot con endpoint WebSocket configurato su `/ws-chat`  

---

## Installazione

1. Clona il repository frontend:

```bash
git clone https://github.com/JavaSoftwareEntwickler/FE-chat-web-socket.git
cd FE-chat-web-socket
````

2. Installa le dipendenze:

```bash
npm install
```

---

## Avvio sviluppo

Per avviare l’app in modalità sviluppo con live reload:

```bash
ng serve
```

L’app sarà accessibile su `http://localhost:4200`.

---

## Configurazione

* Endpoint WebSocket è configurato su `http://localhost:8080/ws-chat` nel servizio `ChatService`.
* Se necessario, modifica l’URL in `chat-service.ts` per adattarlo al tuo backend.

---

## Struttura del progetto

```
src/
│   index.html
│   main.ts
│   polyfills.ts
│   styles.css
│
└───app
    │   app.config.ts
    │   app.css
    │   app.html
    │   app.routes.ts
    │   app.spec.ts
    │   app.ts
    │
    ├───auto-scroll-component
    │       auto-scroll-component.css
    │       auto-scroll-component.html
    │       auto-scroll-component.ts
    │
    ├───chat-component
    │       chat-component.css
    │       chat-component.html
    │       chat-component.ts
    │
    └───service
            chat-service.ts
```

---

## Come usare il componente di chat

* Inserisci il nome nel campo `Nome`
* Scrivi il messaggio e premi Invio o clicca `Invia`
* La chat si aggiornerà in tempo reale con i messaggi degli altri utenti
* Il contenitore messaggi scrollerà automaticamente verso il basso

---

## Note

* Lato backend deve essere attivo il server WebSocket conforme alla configurazione Spring Boot.
* La sicurezza, autenticazione e persistenza messaggi non sono implementate in questa versione demo.
* Per il Back End vedi il repo : [Spring boot](https://github.com/JavaSoftwareEntwickler/chat-web-socket)  

---

## Miglioramenti futuri

* Autenticazione utenti con JWT/OAuth2
* Persistenza messaggi su database
* Supporto chat privata e gruppi
* Miglioramento UX/UI (notifiche, emoji, typing indicator)
* Gestione errori e riconnessione automatica WebSocket

---

## Contatti

Max Marchesini – [Sito internet](https://maxmarchesini.it)  
[LinkedIn](https://www.linkedin.com/in/mmjava/) | [GitHub](https://github.com/JavaSoftwareEntwickler)


