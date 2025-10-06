# Projekt 2 Virtual Board Next Level
# WebSocket Pastebin
Del-1 - WebSocket-server
    - Node.js skapa WebSocket-server (Node ws eller Socket.IO)
    - Auktorisering med JWT, när uppkoppling skapas
    - Ingen databas behövs
    - Meddelanden skickas till alla uppkopplade klienter
    - Driftsättning i lämplig molntjänst

Del-2 - Enkel browserklient
    - HTML, JS, CSS frontend till servern
    - WebSocket kan skrivas i nativ JS eller med Socket.IO klientmodul
    - Lagra api_key i LocalStorage
    - Klienten ska kunna anvämndas på flera olika datorer, pastebin ska funka i båda riktningar
    - Visa status för WevSocket-uppkoppling, "reconnect"-knapp
    - Om JWT:ns giltighetstid har tagit slut, för det enkelt för användaren att logga in pånytt

Del-3 Användarhantering med Refresh Token
* Man vill inte behöva logga in pånytt helatiden, utan ha lång sessionstid, detta löser man med Refresh Token

    - Använd inloggnings-API:n från projekt 1 för inloggning
        - Tabell med refresh_tokens i användar DB
        - kolumn för id, user_id, token, issued_at och expires_at
        - endpoint /refresh

    - Inloggning skicka både vanlig access token och refresh token åt klienten
    - Access token kan ha kort giltighetstid och refresh token längre
    - I ws-servern se till att rätt error returneras till client när session expires
    - Klienten be om en ny access token med hjälp av tidigare lagrad refresh token från refresh-endpoint
    - /logout endpoint för att DELETE refresh token, radera den rad i db som har samma token, radera också från LocalStorage

Del-4 Mobile och desktop klient
    - Porta koden från browserklienten till Capacitor och eller Electron
    - Skild repo för detta!
        - Electron.js för desktop-app
        - Capacitor framework för mobile-app
        - Annat duger också (Flutter, React-Native, Cordova...)
        - java/kotlin ok

    - Skapa videosnutt som demostrerar funktionaliteten (lämna också in källkoden som vanligt)

Del-5 Stil, logik och UX
    - Följ regler och guidlines för ws
    - snygg och modern JS
    - satsa på UX/UI
    - Vettiga felmeddelanden

## Projekt notes
