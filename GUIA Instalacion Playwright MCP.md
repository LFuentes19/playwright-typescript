# Guía de instalación y configuración de Playwright + MCP

Esta guía explica cómo dejar funcionando el proyecto de Playwright en VS Code y cómo configurar el servidor MCP de Playwright para usarlo desde el editor.

## 1. Requisitos

Antes de comenzar, tenés que tener instalados:

- Node.js LTS
- npm
- Git
- Visual Studio Code

Verificá la instalación desde la terminal:

```bash
node -v
npm -v
git --version
```

Si todo responde correctamente, continuá.

## 2. Abrir el proyecto en VS Code

1. Abrí VS Code.
2. Seleccioná la carpeta del proyecto.
3. Asegurate de que el proyecto tenga estos archivos principales:
   - package.json
   - playwright.config.ts
   - tests/
   - pages/

## 3. Instalar dependencias del proyecto

Abrí la terminal integrada de VS Code y ejecutá:

```bash
npm install
```

Esto descarga todas las dependencias necesarias para Playwright y TypeScript.

## 4. Instalar los navegadores de Playwright

Ejecutá:

```bash
npx playwright install
```

Esto instala Chromium, Firefox y WebKit. Si querés instalar sólo Chromium, podés usar:

```bash
npx playwright install chromium
```

## 5. Ejecutar tests

Para correr la suite completa:

```bash
npx playwright test
```

Para correr un test específico:

```bash
npx playwright test tests/booking.spec.ts --project=chromium
```

Para ver el reporte HTML:

```bash
npx playwright show-report
```

## 6. Instalar extensiones necesarias en VS Code

Instalá estas extensiones desde el Marketplace de VS Code:

- Playwright Test for VS Code
- Playwright MCP

Estas extensiones permiten ejecutar pruebas, ver resultados y conectar el servidor MCP de Playwright con el editor.

## 7. Configurar el servidor MCP de Playwright

En la carpeta del proyecto, verificar que exista la carpeta .vscode y dentro un archivo llamado mcp.json.

El contenido debe ser este:

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

Ruta del archivo:

```text
.vscode/mcp.json
```

Este JSON configura el servidor MCP de Playwright para que VS Code pueda levantarlo correctamente con npx.

## 8. Reiniciar VS Code

Luego de instalar las extensiones y guardar el archivo .vscode/mcp.json:

1. Cerrá y volvé a abrir VS Code.
2. Esperá a que el servidor MCP se conecte.
3. Si aparece disponible en el editor, la configuración quedó correcta.

## 9. Probar que todo funcione

Desde la terminal:

```bash
npx playwright test
```

Desde VS Code, podés:

- ejecutar tests desde la extensión Playwright Test
- abrir el reporte HTML
- usar el navegador a través del servidor MCP

### Prueba práctica del MCP

Una forma sencilla de comprobar que el servidor MCP funciona es pedirle al asistente que use el navegador para navegar a una URL y realizar una acción real.

Ejemplo:

```text
Ingresá a https://www.booking.com y buscá el campo de destino. Escribí "Buenos Aires". Luego hacé una captura de pantalla de la pantalla inicial con los resultados.
```

También podés probar una URL más simple:

```text
Abrí https://example.com y dime cuál es el título de la página.
```

Si el MCP está bien conectado, el asistente podrá abrir el navegador, navegar a la URL, leer la página y responder con el resultado real.

Otro ejemplo útil:

```text
Ingresá a https://www.wikipedia.org, buscá la barra de búsqueda y escribí "Playwright". Luego dime cuántos resultados aparecen en la página.
```

Esto valida que el servidor MCP tiene acceso al navegador y puede interactuar con elementos reales de la interfaz.

## 10. Flujo recomendado para trabajar normalmente

1. Abrir el proyecto en VS Code.
2. Verificar que node_modules haya sido instalado.
3. Ejecutar `npm install` si es necesario.
4. Ejecutar `npx playwright install` si faltan navegadores.
5. Ejecutar `npx playwright test` para validar.
6. Si usás MCP, verificar que la configuración en .vscode/mcp.json esté activa.

## 11. Comandos útiles

```bash
npm install
npx playwright install
npx playwright test
npx playwright test tests/booking.spec.ts --project=chromium
npx playwright show-report
```

## 12. Estructura principal del proyecto

- package.json: dependencias y scripts
- playwright.config.ts: configuración general de Playwright
- tests/: archivos de tests
- pages/: page objects
- .vscode/mcp.json: configuración del servidor MCP

## 13. Resultado esperado

Con esta configuración, el proyecto queda listo para:

- correr pruebas de Playwright
- ejecutarlas desde VS Code
- usar el MCP de Playwright en el editor
- trabajar con pruebas automatizadas de Booking o cualquier otra web
