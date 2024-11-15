# GenerateArticle

## Opis
`GenerateArticle` to aplikacja w JavaScript, która pobiera artykuł z lokalnego pliku, przetwarza go za pomocą OpenAI API i generuje kod HTML, który może być użyty do wyświetlenia artykułu w ładnej, responsywnej formie. Program automatycznie formatuje artykuł, dodaje odpowiednie tagi HTML, a także pozwala na dodanie obrazków w odpowiednich miejscach na podstawie treści.

Aplikacja korzysta z OpenAI API do generowania kodu HTML z artykułu, co może być szczególnie przydatne w automatyzacji procesu konwersji tekstów na format przyjazny dla stron internetowych.

## Funkcje
- Pobieranie artykułów z pliku lokalnego.
- Wykorzystanie OpenAI API do generowania HTML.
- Automatyczne dodawanie obrazków (zastępczych) w odpowiednich miejscach w artykule.
- Możliwość zapisu wygenerowanego HTML do pliku.

## Wymagania
1. Node.js w wersji 16.0.0 lub nowszej.
2. Klucz API OpenAI.

## Instrukcja uruchomienia

### 1. Klonowanie repozytorium
Aby rozpocząć, sklonuj repozytorium na swoje urządzenie:

```bash
git clone https://github.com/molszewskii/GenerateArticle.git
cd GenerateArticle
```

### 2. Instalacja zależności
Zainstaluj wszystkie wymagane zależności za pomocą npm:
```
npm install
```

### 3. Konfiguracja OpenAI API
Aby aplikacja mogła komunikować się z OpenAI, potrzebujesz własnego klucza API.

Zarejestruj się w OpenAI, jeśli jeszcze tego nie zrobiłeś: https://platform.openai.com/.

Po zalogowaniu, wejdź na stronę API keys i wygeneruj swój klucz API.

Utwórz plik ```.env``` w głównym katalogu projektu, a następnie dodaj do niego swój klucz API w następujący sposób:
```
OPENAI_API_KEY=your-api-key-here
```

### 4. Uruchomienie aplikacji
Po zainstalowaniu zależności i skonfigurowaniu klucza API możesz uruchomić aplikację za pomocą poniższej komendy:
```
node generate_article.js
```
Aplikacja odczyta artykuł z pliku ```article.txt``` (musisz mieć ten plik w katalogu projektu), przetworzy go na HTML i zapisze wynik do pliku artykul.html.

### 5. Podgląd wygenerowanego artykułu
Po wygenerowaniu artykułu w formacie HTML, możesz podejrzeć jego wygląd otwierając plik ```podglad.html``` w przeglądarce. Warto zauważyć, że w tym pliku znajduje się na sztywno zapisany przykładowy artykuł. Aby wczytać wygenerowany artykuł, należy wykonać kilka kroków:

Aby wyświetlić własny artykuł:
Otwórz plik ```podglad.html```.

Znajdź w pliku zakomentowany fragment skryptu JavaScript (część odpowiedzialną za dynamiczne wczytywanie artykułu):
```
<!-- <script>
     document.addEventListener("DOMContentLoaded", function() {
         fetch("artykul.html")
             .then(response => {
                 if (!response.ok) throw new Error("Nie udało się wczytać artykułu");
                 return response.text();
             })
             .then(htmlContent => {
                 document.body.innerHTML = htmlContent;
             })
             .catch(error => {
                 console.error("Błąd:", error);
                 document.body.innerHTML = "<p>Nie udało się załadować artykułu.</p>";
             });
     });
</script> -->
```
Odkomentuj powyższy skrypt, usuwając ```<!-- i -->``` wokół kodu.

Zakomentuj lub usuń sekcję HTML artykułu (która obecnie znajduje się w podglad.html), aby skrypt mógł dynamicznie wczytać wygenerowany plik HTML (np. artykul.html).

Po dokonaniu tych zmian, uruchom lokalny serwer, aby plik HTML mógł zostać poprawnie załadowany. Najłatwiejszym sposobem jest zainstalowanie rozszerzenia ```Live Server w Visual Studio Code```:

Zainstaluj rozszerzenie ```Live Server w VS Code```.
Kliknij prawym przyciskiem myszy na plik podglad.html i wybierz opcję ```Open with Live Server```.
Po kilku sekundach artykuł zostanie załadowany i wyświetlony w przeglądarce.

Uwaga: Aplikacja wymaga, aby plik artykul.html był dostępny w tym samym katalogu, w którym znajduje się podglad.html, ponieważ skrypt wczytuje artykuł z tego pliku.