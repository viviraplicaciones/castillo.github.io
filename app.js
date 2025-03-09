document.addEventListener("DOMContentLoaded", function () {

    // **1️⃣ Manejo del formulario**
    const form = document.getElementById("contactForm");
    const torreCasaInput = document.getElementById("torreCasa");
    const apartamentoInput = document.getElementById("apartamento");
    const placaInput = document.getElementById("placa");
    const carroSelect = document.getElementById("carro");
    const parqueaderoSelect = document.getElementById("parqueadero");
    const qrCanvas = document.getElementById("qrCanvas");

    // **Manejo del campo Parqueadero según el tipo de carro**
    carroSelect.addEventListener("change", function () {
        parqueaderoSelect.innerHTML = "";
        
        if (carroSelect.value === "grande") {
            parqueaderoSelect.innerHTML = '<option value="C1">C1</option>';
        } else if (carroSelect.value === "pequeño") {
            parqueaderoSelect.innerHTML = `
                <option value="A1">A1</option>
                <option value="B1">B1</option>
            `;
        }
    });

    // **Guardar en Firebase y generar QR**
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const datos = {
            torreCasa: torreCasaInput.value,
            apartamento: apartamentoInput.value,
            placa: placaInput.value,
            parqueadero: parqueaderoSelect.value
        };

        // Generar código QR
        generarQR(datos);

        // Guardar en base de datos (Aquí deberías agregar la lógica para Firebase si es necesario)
        console.log("Datos guardados:", datos);

        // Limpiar el formulario
        form.reset();
    });

    // **Generador de código QR**
    function generarQR(datos) {
        const qr = qrcode(0, "L");
        qr.addData(`Torre/Casa: ${datos.torreCasa}\nApartamento: ${datos.apartamento}\nPlaca: ${datos.placa}\nParqueadero: ${datos.parqueadero}`);
        qr.make();

        qrCanvas.innerHTML = qr.createImgTag(5);
    }

    // **2️⃣ Modal de Administrador**
    const adminBtn = document.getElementById("adminBtn");
    const adminModal = document.getElementById("adminModal");
    const adminPassword = document.getElementById("adminPassword");
    const adminLogin = document.getElementById("adminLogin");
    const closeModal = document.getElementById("closeModal");

    adminBtn.addEventListener("click", function () {
        adminModal.style.display = "flex";
    });

    closeModal.addEventListener("click", function () {
        adminModal.style.display = "none";
    });

    adminLogin.addEventListener("click", function () {
        if (adminPassword.value === "vivirapp2018") {
            window.location.href = "admin.html";
        } else {
            alert("Contraseña incorrecta.");
        }
    });
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