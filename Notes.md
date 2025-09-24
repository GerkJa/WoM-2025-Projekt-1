# Virituell Whiteboard

## Del 1 - API för inloggning och användaruppgifter
Node + Express install
Databas (Neon)
Prisma

Endpoint för att skapa nya användare(Post)
- Tar emot användarnamn och lösenord
- saltar+hashar lösenordet (bcrypt) sparar i db

Endpoint för inloggning (POST)
- Tar emot användarnamn och lösnord
- Returnerar JWT(jsonwebtoken)
- JWT ska innehålla allt som behövs för att fortsätta använda appen

Endpoint "/boards" som returnerar boards en användare har tillgång till

JWT ska skickas i en authorization-header enligt regler

## Del 2 - REST-API för uppdatering och kollaborativt arbete
* Skild repo så att kan driftsättas skillt från inloggningstjänsten
- välj tech flr API. REST etc
- Använd JWT för auktorisering
- Valfri DB
- Förutom GET ska de gås att skapa nya (POST) och ändra (PUT/PATCH), och (DELETE)
- Felmeddelanden ska ge rätt status

## Del 3 Frontend-applikation
* Använd client side HTML, CSS, JS fö denna del
- Inloggningsformulär linkat med Del 1
- Registrering
- Skapa nya lappar och flytta omkring dem på skärmen (PUT/PATCH)
- Vettigt system flr att GET:a alla ändringar som andra kan ha gjort tex setInterval()
- Frontend kan vara i gene repo eller som en statisk underkatalog

## Del 4 - Stil, logik och UX
- följ regler och guidlines
- koda snygg och modern JS
- Satsa på UX, Flytta lapparna med musen
- Ge vettiga felmeddelanden

## Del 5 driftsättning
- Driftsätt API-delarna på en molntjänst tex Render, Rahti etc
- Frontend behöver ingen server side tech, tex people.arcada.fi
- 3 skilda driftsättningar: inloggning, Virtualboard API och frontend

# Projekt layout
Frontend i denna katalog
API I render?

## App-frontend
Board: [name] - selectdropdown