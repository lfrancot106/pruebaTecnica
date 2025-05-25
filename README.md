# 🧗‍♂️ Reto Técnico - Combinación Óptima para Escalar un Risco

Este proyecto es una aplicación web que permite agregar elementos (como comida o equipo), y luego seleccionar cuál sería la mejor combinación para escalar un risco, cumpliendo con un mínimo de calorías y un máximo de peso. La idea es lograr que el escalador cargue lo menos posible, pero tenga suficiente energía.

## 🚀 ¿Qué hace?

- Permite agregar elementos con nombre, peso y calorías.
- Calcula la mejor combinación de esos elementos que cumpla con las condiciones.
- Muestra el resultado de forma visual y fácil de entender.

---

## 👨‍💻 Tecnologías usadas

- HTML
- CSS (utilicé la metodología BEM para organizar mejor las clases y que sea más fácil de mantener)
- JavaScript

---

## 🧩 Estructura del CSS con BEM

Para mantener todo ordenado, usé BEM (Block Element Modifier). Es una forma de nombrar las clases que me ayudó a tener más claro qué hace cada parte del estilo.  
Por ejemplo:

```html
<div class="form__lista-item">
  <label class="form__lista-item-label">Nombre:</label>
  <input class="form__lista-item-input" />
</div>
```

Esto me ayudó mucho a separar los estilos de cada componente de forma limpia.

---

## 🧠 Observaciones técnicas

> quise asegurarme de que el algoritmo fuera correcto, así que lo hice de forma que pruebe **todas las combinaciones posibles** y escoja la mejor.  
Eso significa que:
- El resultado puede ser diferente al que alguien espera si están usando una lógica distinta (por ejemplo, si se espera un orden específico).
- Pero el resultado **sí cumple siempre** con el mínimo de calorías y no pasa del máximo de peso.
- Además, si hay varias combinaciones posibles, elige la de **menor peso total**, como pedía el ejercicio.

---

## 📦 Cómo usarlo

1. Clona o descarga el repositorio localmente.
2. Abre el archivo `index.html` en cualquier navegador moderno compatible con JavaScript ES6+.
3. En la pantalla de bienvenida, haz clic en el botón **"Iniciar"** para acceder a la interfaz principal de la aplicación.
4. Utiliza el botón **"Agregar elemento"** para insertar nuevos campos dinámicos donde puedas ingresar nombre, peso (kg) y calorías de cada ítem.
5. Completa el formulario con al menos un elemento válido. Asegúrate de que los valores de peso y calorías sean positivos.
6. Define los parámetros globales del problema ingresando:
   - El mínimo de calorías necesarias (`calorías mínimas`).
   - El máximo de peso permitido (`peso máximo`).
7. Haz clic en **"Calcular combinación óptima"** para ejecutar el algoritmo de búsqueda de subconjuntos válidos.
8. El resultado mostrará la combinación óptima de elementos que cumplen las condiciones ingresadas, minimizando el peso total.


---

## 🧪 Próximos pasos / mejoras

- Mejorar los estilos visuales.
- Agregar validaciones más amigables.
- Permitir guardar combinaciones anteriores.
- Tal vez usar un algoritmo más eficiente como programación dinámica para grandes cantidades de datos.

---

Gracias por ver mi proyecto 😄
