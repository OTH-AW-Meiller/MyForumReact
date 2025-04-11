# MyForum mit React und PHP-Backend

Um eine React-Anwendung mit einem PHP-Backend zu erstellen, kannst du folgenden Schritten folgen. Dies ist ein einfaches Minimal-Beispiel, das einen grundlegenden Überblick über die Integration von React (Frontend) und PHP (Backend) bietet.

### Voraussetzungen

- Node.js und npm installiert
- PHP installiert und konfiguriert
- Ein Webserver wie Apache oder Nginx (optional, wenn du lokal entwickelst, kann der eingebaute PHP-Webserver verwendet werden)

### Schritt 1: Erstelle das PHP-Backend

1. **Projektverzeichnis Erstellen**

   Erstelle ein Verzeichnis für dein Projekt:

   ```bash
   mkdir my-app
   cd my-app
   ```

2. **Backend-Ordner Struktur**

   Erstelle die folgenden Verzeichnisse:

   ```bash
   mkdir backend
   cd backend
   mkdir api
   ```

3. **PHP-Endpunkt Erstellen**

   Erstelle eine PHP-Datei, die JSON-Daten zurückgibt:

   ```php
   // backend/api/data.php
   <?php
   header("Access-Control-Allow-Origin: *");
   header("Content-Type: application/json; charset=UTF-8");
   $data = [
       "message" => "Hello from PHP Backend!"
   ];
   echo json_encode($data);
   ```

4. **Starte den PHP-Server**

   Starte einen PHP-Entwicklungsserver im Projekt-Root-Ordner:

- Konfiguriere MAMP oder XAMPP entsprechend,
um einen lokalen Server auf `http://localhost:80` zu starten.

### Schritt 2: Erstelle die React-Anwendung

1. **Neues React-Projekt Erstellen**

   Verwende `create`, um ein neues React-Projekt zu erstellen:

   ```bash
   npm create vite@latest frontend --template react
   cd frontend
   ```

2. **React-Komponente anpassen**

   Öffne die `src/App.jsx` Datei und passe sie wie folgt an:

   ```jsx
   import React, { useEffect, useState } from 'react';

   function App() {
     const [data, setData] = useState(null);

     useEffect(() => {
       // Fetch data from the PHP backend
       fetch('http://localhost:80/api/data.php')
         .then((response) => response.json())
         .then((data) => setData(data));
     }, []);

     return (
       <div className="App">
         <h1>React + PHP Backend Example</h1>
         {data ? (
           <p>{data.message}</p>
         ) : (
           <p>Loading...</p>
         )}
       </div>
     );
   }

   export default App;
   ```

3. **React-Anwendung starten**

   Stelle sicher, dass du im `frontend` Verzeichnis bist und starte die Entwicklungsumgebung:

   ```bash
     npm install
     npm run dev
   ```

   Deine React-Anwendung sollte nun laufen.

### Schritt 3: Teste die Anwendung

- Besuche die in der Konsole angegebene Seite in deinem Browser. Du solltest die Nachricht "Hello from PHP Backend!" auf der Seite sehen, was bedeutet, dass die React-Anwendung erfolgreich Daten vom PHP-Backend abruft.

## React-Build auf einem Apache-Webserver

- Apache Webserver installiert und konfiguriert
- PHP-Unterstützung in Apache aktiviert

### Schritt 1: React-Anwendung für die Produktion bauen

1. **Bauen der React-Anwendung**

   Erstelle ein Produktionsbuild deiner React-Anwendung:

   ```bash
   cd frontend
   npm run build
   ```

   Dies erzeugt einen `build`-Ordner, der alle für die Bereitstellung erforderlichen Dateien enthält.


### Apache konfigurieren

1. **HTACCESS anpassen**

   Eine Anpassung von Apache ist notwendig, um sicherzustellen,
   dass die Pfade für die Entwicklung sowie für die Auslieferung im Apache-Server richtig laufen.

```bash
RewriteEngine on
RewriteCond %{REQUEST_URI} !^/backend/
RewriteCond %{REQUEST_URI} !^/frontend/dist/

RewriteRule (.*) frontend/dist/$1 [NC,L]
```

Dies leitet alle Anfragen in den Ordner `frontend/dist/` um, außer die Anfragen an den Ordner `backend`.

