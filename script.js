document.addEventListener("DOMContentLoaded", () => {
    // identificadores pantalla bienvenida
    const btnIniciar = document.getElementById("btn-iniciar");
    const inicioSection = document.getElementById("inicio");
    
    // pantalla principal de la aplicación
    const appSection = document.getElementById("app");
    const btnAgregarElemento = document.getElementById("btn-agregar-elemento");
    const listaElementos = document.getElementById("lista-elementos");
    const formulario = document.getElementById("formulario");
    const resultadoSection = document.getElementById("resultado");
    const resultadoContenido = document.getElementById("resultado-contenido");

    let contadorElementos = 0;

    /**
     * Muestra la pantalla principal ocultando la de bienvenida.
     */
    btnIniciar.addEventListener("click", () => {
        inicioSection.style.display = "none";
        appSection.style.display = "block";
    });

    /**
     * Crea un contenedor HTML con inputs para nombre, peso, calorías y un botón para eliminar.
     * @param {number} id - Identificador único para los inputs.
     * @returns {HTMLDivElement} - Contenedor con los elementos del formulario.
     */
    const crearElemento = (id) => {
        const contenedor = document.createElement("div");
        contenedor.className = "form__lista-item";

        // Label e input para nombre
        const labelNombre = document.createElement("label");
        labelNombre.className = "form__lista-item-label";
        labelNombre.setAttribute("for", `nombre-${id}`);
        labelNombre.textContent = "Nombre:";

        const inputNombre = document.createElement("input");
        inputNombre.type = "text";
        inputNombre.required = true;
        inputNombre.className = "form__lista-item-input";
        inputNombre.id = `nombre-${id}`;
        inputNombre.name = `nombre-${id}`;

        // Label e input para peso
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

        // Label e input para calorías
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

        // Botón para eliminar elemento
        const btnBorrar = document.createElement("button");
        btnBorrar.type = "button";
        btnBorrar.className = "form__lista-item-borrar";
        btnBorrar.textContent = "×";
        btnBorrar.setAttribute("aria-label", "Eliminar elemento");

        btnBorrar.addEventListener("click", () => {
            contenedor.remove();
        });

        // Añadir todos los elementos al contenedor
        contenedor.appendChild(labelNombre);
        contenedor.appendChild(inputNombre);
        contenedor.appendChild(labelPeso);
        contenedor.appendChild(inputPeso);
        contenedor.appendChild(labelCalorias);
        contenedor.appendChild(inputCalorias);
        contenedor.appendChild(btnBorrar);

        return contenedor;
    };

    /**
     * Agrega un nuevo elemento a la lista con un id incremental.
     */
    const agregarElemento = () => {
        const nuevoElemento = crearElemento(contadorElementos);
        listaElementos.appendChild(nuevoElemento);
        contadorElementos++;
    };

    btnAgregarElemento.addEventListener("click", () => {
        agregarElemento();
    });

    // Agrega un elemento inicial para evitar lista vacía
    agregarElemento();

    /**
     * Muestra un mensaje de error en la sección de resultados.
     * @param {string} mensaje - Mensaje que se mostrará al usuario.
     */
    const mostrarError = (mensaje) => {
        resultadoContenido.textContent = mensaje;
        resultadoSection.style.display = "block";
    };

    /**
     * Calcula la mejor combinación de elementos que cumpla con las calorías mínimas
     * y peso máximo, intentando minimizar el peso total.
     * @param {number} minCalorias - Calorías mínimas requeridas.
     * @param {number} maxPeso - Peso máximo permitido.
     * @param {Array<{nombre: string, peso: number, calorias: number}>} elementos - Lista de elementos disponibles.
     * @returns {Array<{nombre: string, peso: number, calorias: number}>|null} - Mejor combinación encontrada o null si no existe.
     */
    const calcularCombinacionOptima = (minCalorias, maxPeso, elementos) => {
        /**
         * Genera todas las combinaciones posibles de los elementos.
         * @param {Array} arr - Array de elementos.
         * @returns {Array<Array>} - Array con todas las combinaciones.
         */
        const obtenerCombinaciones = (arr) => {
            const resultados = [];

            const generar = (actual, resto) => {
                if (resto.length === 0) {
                    if (actual.length > 0) {
                        resultados.push(actual);
                    }
                    return;
                }

                // Incluye el primer elemento del resto
                generar([...actual, resto[0]], resto.slice(1));
                // No lo incluye
                generar(actual, resto.slice(1));
            };

            generar([], arr);
            return resultados;
        };

        const todasCombinaciones = obtenerCombinaciones(elementos);
        let mejorCombinacion = null;
        let mejorPeso = Infinity;

        for (const combinacion of todasCombinaciones) {
            const pesoTotal = combinacion.reduce((sum, el) => sum + el.peso, 0);
            const caloriasTotal = combinacion.reduce((sum, el) => sum + el.calorias, 0);

            if (
                caloriasTotal >= minCalorias &&
                pesoTotal <= maxPeso &&
                pesoTotal < mejorPeso
            ) {
                mejorCombinacion = combinacion;
                mejorPeso = pesoTotal;
            }
        }

        return mejorCombinacion;
    };

    /**
     * Maneja el evento submit del formulario, valida los datos, calcula la combinación
     * óptima y muestra el resultado o error.
     * @param {Event} e - Evento submit del formulario.
     */
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

        // Recopila los datos de cada elemento ingresado
        const listaItems = listaElementos.querySelectorAll(".form__lista-item");
        for (let item of listaItems) {
            const nombreInput = item.querySelector('input[id^="nombre-"]');
            const nombre = nombreInput.value.trim();

            const pesoInput = item.querySelector('input[id^="peso-"]');
            const caloriasInput = item.querySelector('input[id^="calorias-"]');

            const peso = Number(pesoInput.value);
            const calorias = Number(caloriasInput.value);

            if (!nombre || isNaN(peso) || isNaN(calorias) || peso < 0 || calorias < 0) {
                mostrarError("Por favor, completa todos los campos correctamente.");
                return;
            }

            elementos.push({ nombre, peso, calorias });
        }

        if (elementos.length === 0) {
            mostrarError("Debes agregar al menos un elemento.");
            return;
        }

        const resultado = calcularCombinacionOptima(minCalorias, maxPeso, elementos);

        if (!resultado) {
            mostrarError("No se encontró una combinación válida con los datos ingresados.");
            return;
        }

        // Mostrar resultado en pantalla
        resultadoSection.style.display = "block";
        let html = `<ul>`;
        resultado.forEach((el) => {
            html += `<li>${el.nombre}: ${el.peso} kg, ${el.calorias} cal</li>`;
        });
        html += `</ul>`;

        resultadoContenido.innerHTML = html;
    });
});
