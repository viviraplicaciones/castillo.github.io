// Menú responsive
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});

// Generador de código QR y filtrado de parqueadero
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("qrForm");
    const qrCodeDiv = document.getElementById("qrCode");
    const parqueaderoSelect = document.getElementById("parqueadero");

    // 🔹 Filtrar parqueaderos según el tipo de carro
    document.getElementById("carro").addEventListener("change", function () {
        let tipoCarro = this.value;
        parqueaderoSelect.innerHTML = ""; // Limpiar opciones

        if (tipoCarro === "Grande") {
            parqueaderoSelect.innerHTML = '<option value="C1">C1</option>';
        } else if (tipoCarro === "Pequeño") {
            parqueaderoSelect.innerHTML = '<option value="A1">A1</option><option value="B1">B1</option>';
        }
    });

    // 🔹 Generar QR al enviar el formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let torreCasa = document.getElementById("torreCasa").value.trim();
        let numApto = document.getElementById("numApto").value.trim();
        let placa = document.getElementById("placa").value.trim();
        let parqueadero = parqueaderoSelect.value;

        if (!torreCasa || !numApto || !placa || !parqueadero) {
            alert("⚠️ Todos los campos son obligatorios");
            return;
        }

        let qrData = `Torre/Casa: ${torreCasa}, Apto: ${numApto}, Placa: ${placa}, Parqueadero: ${parqueadero}`;

        // 🔹 Limpiar QR anterior antes de generar uno nuevo
        qrCodeDiv.innerHTML = "";

        // 🔹 Generar nuevo QR
        let qr = new QRCode(qrCodeDiv, {
            text: qrData,
            width: 150,
            height: 150
        });

        console.log("✅ QR generado con datos:", qrData);
    });
});


// Botón de compartir
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
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("adminLogin").addEventListener("click", function () {
        let password = document.getElementById("adminPassword").value;
        
        if (password === "vivirapp2018") {
            window.location.href = "base-de-datos.html"; // Redirige a la página de base de datos
        } else {
            alert("Contraseña incorrecta.");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("qrVideo");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const scanButton = document.getElementById("scanQR");

    async function startQRScanner() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // Evita pantalla completa en móviles
            video.play();
            requestAnimationFrame(scanQR);
        } catch (err) {
            console.error("Error al acceder a la cámara:", err);
            alert("No se pudo acceder a la cámara.");
        }
    }

    function scanQR() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);
            
            if (code) {
                alert("Código QR detectado: " + code.data);
                video.srcObject.getTracks().forEach(track => track.stop()); // Detener la cámara
            } else {
                requestAnimationFrame(scanQR);
            }
        } else {
            requestAnimationFrame(scanQR);
        }
    }

    scanButton.addEventListener("click", startQRScanner);
});
