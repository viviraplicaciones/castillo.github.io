document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("qrForm");
    const qrCanvas = document.getElementById("qrCanvas");
    const qr = new QRCode(qrCanvas);

    // Filtrar parqueaderos según el tipo de carro
    document.getElementById("carro").addEventListener("change", function () {
        let parqueadero = document.getElementById("parqueadero");
        parqueadero.innerHTML = ""; // Limpiar opciones

        if (this.value === "Grande") {
            parqueadero.innerHTML = '<option value="C1">C1</option>';
        } else if (this.value === "Pequeño") {
            parqueadero.innerHTML = '<option value="A1">A1</option><option value="B1">B1</option>';
        }
    });

    // Generar QR con los datos del formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        let torreCasa = document.getElementById("torreCasa").value;
        let numApto = document.getElementById("numApto").value;
        let placa = document.getElementById("placa").value;
        let parqueadero = document.getElementById("parqueadero").value;

        let qrData = `Torre/Casa: ${torreCasa}, Apto: ${numApto}, Placa: ${placa}, Parqueadero: ${parqueadero}`;
        qr.makeCode(qrData);
    });
});
