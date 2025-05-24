document.addEventListener("DOMContentLoaded", () => {
    // identificadores pantalla bienvenida
    const btnIniciar = document.getElementById("btn-iniciar");
    const inicioSection = document.getElementById("inicio");
    // _____________fin____________________

    // pantalla principal de la aplicación
    const appSection = document.getElementById("app");
    const btnAgregarElemento = document.getElementById("btn-agregar-elemento");
    const listaElementos = document.getElementById("lista-elementos");
    const formulario = document.getElementById("formulario");
    const resultadoSection = document.getElementById("resultado");
    const resultadoContenido = document.getElementById("resultado-contenido");

    let contadorElementos = 0;

    // Mostrar pantalla principal al iniciar
    btnIniciar.addEventListener("click", () => {
        inicioSection.style.display = "none";
        appSection.style.display = "block";
    });

    // Función para crear un elemento con inputs y botón borrar
    const crearElemento = (id) => {
        const contenedor = document.createElement("div");
        contenedor.className = "form__lista-item";

        // Input peso
        const labelPeso = document.createElement("label");
        labelPeso.className = "form__lista-item-label";
        labelPeso.setAttribute("for", `peso-${id}`);
        labelPeso.textContent = "Peso (kg):";

        const inputPeso = document.createElement("input");
        inputPeso.type = "number";
        inputPeso.min = "0";
        inputPeso.required = true;
        inputPeso.className = "form__lista-item-input";
        inputPeso.id = `peso-${id}`;
        inputPeso.name = `peso-${id}`;

        // Input calorías
        const labelCalorias = document.createElement("label");
        labelCalorias.className = "form__lista-item-label";
        labelCalorias.setAttribute("for", `calorias-${id}`);
        labelCalorias.textContent = "Calorías:";

        const inputCalorias = document.createElement("input");
        inputCalorias.type = "number";
        inputCalorias.min = "0";
        inputCalorias.required = true;
        inputCalorias.className = "form__lista-item-input";
        inputCalorias.id = `calorias-${id}`;
        inputCalorias.name = `calorias-${id}`;

        // Botón eliminar
        const btnBorrar = document.createElement("button");
        btnBorrar.type = "button";
        btnBorrar.className = "form__lista-item-borrar";
        btnBorrar.textContent = "×";
        btnBorrar.setAttribute("aria-label", "Eliminar elemento");

        btnBorrar.addEventListener("click", () => {
            contenedor.remove();
        });

        // Agregar elementos al contenedor
        contenedor.appendChild(labelPeso);
        contenedor.appendChild(inputPeso);
        contenedor.appendChild(labelCalorias);
        contenedor.appendChild(inputCalorias);
        contenedor.appendChild(btnBorrar);

        return contenedor;
    };

    // Agregar primer elemento al iniciar app
    const agregarElemento = () => {
        const nuevoElemento = crearElemento(contadorElementos);
        listaElementos.appendChild(nuevoElemento);
        contadorElementos++;
    };

    btnAgregarElemento.addEventListener("click", () => {
        agregarElemento();
    });

    // Agregar un elemento inicial para que el usuario no parta vacío
    agregarElemento();

    // Función simple para mostrar mensaje de error
    const mostrarError = (mensaje) => {
        resultadoContenido.textContent = mensaje;
        resultadoSection.style.display = "block";
    };

    // Función para calcular combinación óptima (placeholder, luego la mejoramos)
    const calcularCombinacionOptima = (minCalorias, maxPeso, elementos) => {
        // Por ahora solo retornamos todos si cumplen
        let pesoTotal = elementos.reduce((acc, el) => acc + el.peso, 0);
        let caloriasTotal = elementos.reduce((acc, el) => acc + el.calorias, 0);

        if (caloriasTotal >= minCalorias && pesoTotal <= maxPeso) {
            return elementos;
        } else {
            return null;
        }
    };

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        resultadoSection.style.display = "none";
        resultadoContenido.textContent = "";

        const minCalorias = Number(document.getElementById("calorias-min").value);
        const maxPeso = Number(document.getElementById("peso-max").value);

        if (minCalorias <= 0 || maxPeso <= 0) {
            mostrarError("Por favor ingresa valores positivos para calorías y peso.");
            return;
        }

        const elementos = [];

        // Recolectar datos de cada elemento
        const listaItems = listaElementos.querySelectorAll(".form__lista-item");
        for (let item of listaItems) {
            const pesoInput = item.querySelector('input[id^="peso-"]');
            const caloriasInput = item.querySelector('input[id^="calorias-"]');

            const peso = Number(pesoInput.value);
            const calorias = Number(caloriasInput.value);

            if (isNaN(peso) || isNaN(calorias) || peso < 0 || calorias < 0) {
                mostrarError(
                    "Por favor, completa todos los campos de peso y calorías correctamente."
                );
                return;
            }

            elementos.push({ peso, calorias });
        }

        if (elementos.length === 0) {
            mostrarError("Debes agregar al menos un elemento.");
            return;
        }

        const resultado = calcularCombinacionOptima(
            minCalorias,
            maxPeso,
            elementos
        );

        if (!resultado) {
            mostrarError(
                "No se encontró una combinación válida con los datos ingresados."
            );
            return;
        }

        // Mostrar resultado
        resultadoSection.style.display = "block";
        let html = `<ul>`;
        resultado.forEach((el, i) => {
            html += `<li>Elemento ${i + 1}: Peso ${el.peso} kg, Calorías ${el.calorias}</li>`;
        });
        html += `</ul>`;

        resultadoContenido.innerHTML = html;
    });
});
