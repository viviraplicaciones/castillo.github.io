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

