const CACHE_NAME = "parqueo-app-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/manifest.json",
    "/logo.png"
];

// Instalación del Service Worker y almacenamiento en caché
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Intercepción de solicitudes para servir desde caché
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
            .then((reg) => console.log("Service Worker registrado con éxito:", reg.scope))
            .catch((err) => console.log("Error al registrar el Service Worker:", err));
    });
}

// Actualización del caché cuando hay cambios
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});


// Menú responsive
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("qrForm");
    const qrCodeDiv = document.getElementById("qrCode");
    const parqueaderoSelect = document.getElementById("parqueadero");

    // Filtrar parqueaderos según el tipo de carro
    document.getElementById("carro").addEventListener("change", function () {
        let tipoCarro = this.value;
        parqueaderoSelect.innerHTML = ""; // Limpiar opciones

        if (tipoCarro === "Grande") {
            parqueaderoSelect.innerHTML = '<option value="C1">C1</option>';
        } else if (tipoCarro === "Pequeño") {
            parqueaderoSelect.innerHTML = '<option value="A1">A1</option><option value="B1">B1</option>';
        }
    });

    // Generar QR con los datos del formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        let torreCasa = document.getElementById("torreCasa").value;
        let numApto = document.getElementById("numApto").value;
        let placa = document.getElementById("placa").value;
        let parqueadero = parqueaderoSelect.value;

        let qrData = `Torre/Casa: ${torreCasa}, Apto: ${numApto}, Placa: ${placa}, Parqueadero: ${parqueadero}`;

        // Limpiar QR anterior
        qrCodeDiv.innerHTML = "";

        // Generar nuevo QR
        new QRCode(qrCodeDiv, {
            text: qrData,
            width: 128,
            height: 128
        });
    });
});

document.getElementById("compartir").addEventListener("click", function () {
    if (navigator.share) {
        navigator.share({
            title: "PARQUEO - APARTAMENTO",
            text: "¡Accede a la app de Parqueo - Apartamento!",
            url: "https://viviraplicaciones.github.io/castillo.github.io/"
        })
        .then(() => console.log("Contenido compartido con éxito"))
        .catch((error) => console.log("Error al compartir:", error));
    } else {
        alert("Tu navegador no soporta la función de compartir.");
    }
});


