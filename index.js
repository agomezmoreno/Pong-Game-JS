window.onload = () => {
    let svg = document.getElementById("contenedor");
    let marcador = document.getElementById("marcador");
    let puntosJugador = 0;
    let puntosIA = 0;

    // Crear pelota y barras
    let pelota = crearPelota(svg, 250, 150, 10);
    let barraJugador = crearBarra(svg, 10, 120, 10, 60);
    let barraIA = crearBarra(svg, 480, 120, 10, 60);

    let velocidadX = 2; // Velocidad horizontal inicial de la pelota
    let velocidadY = 2; // Velocidad vertical inicial de la pelota

    // Mover barra del jugador con el ratón
    svg.addEventListener("mousemove", (e) => {
        let rect = svg.getBoundingClientRect(); // Obtener las coordenadas del contenedor SVG en relación con la ventana
        let mouseY = e.clientY - rect.top; // Calcular la posición vertical del ratón dentro del SVG
        barraJugador.setAttribute("y", Math.max(0, Math.min(240, mouseY - 30))); // Ajustar la posición de la barra del jugador, limitando su movimiento entre 0 y 240
    });

    // Bucle del juego
    setInterval(() => {
        let x = parseFloat(pelota.getAttribute("cx")); // Posición X de la pelota
        let y = parseFloat(pelota.getAttribute("cy")); // Posición Y de la pelota

        // Mover la pelota
        x += velocidadX;
        y += velocidadY;
        pelota.setAttribute("cx", x); // Actualizar la posición X
        pelota.setAttribute("cy", y); // Actualizar la posición Y

        // Colisiones con las paredes superior e inferior
        if (y <= 10 || y >= 290) { // Si la pelota toca el borde superior o inferior
            velocidadY *= -1; // Cambiar la dirección vertical
        }

        // Colisión con la barra del jugador
        if (
            x <= 20 && // La pelota está cerca de la barra del jugador (X)
            y >= parseFloat(barraJugador.getAttribute("y")) && // La pelota está en la parte superior de la barra
            y <= parseFloat(barraJugador.getAttribute("y")) + 60 // La pelota está en la parte inferior de la barra
        ) {
            velocidadX *= -1; // Cambiar la dirección horizontal
        }

        // Colisión con la barra de la IA
        if (
            x >= 470 && // La pelota está cerca de la barra de la IA (X)
            y >= parseFloat(barraIA.getAttribute("y")) && // La pelota está en la parte superior de la barra
            y <= parseFloat(barraIA.getAttribute("y")) + 60 // La pelota está en la parte inferior de la barra
        ) {
            velocidadX *= -1; // Cambiar la dirección horizontal
        }

        // Movimiento de la barra de la IA
        let posicionIA = parseFloat(barraIA.getAttribute("y")); // Obtener la posición de la barra de la IA
        if (posicionIA + 30 < y) { // Si el centro de la barra está por encima de la pelota
            barraIA.setAttribute("y", Math.min(240, posicionIA + 1)); // Mover la barra hacia abajo
        } else if (posicionIA + 30 > y) { // Si el centro de la barra está por debajo de la pelota
            barraIA.setAttribute("y", Math.max(0, posicionIA - 1)); // Mover la barra hacia arriba
        }

        // Puntos y reinicio si la pelota sale por los bordes laterales
        if (x <= 0) { // Si la pelota se va fuera del lado izquierdo
            puntosIA++; // Aumentar los puntos de la IA
            reiniciarPelota(pelota); // Reiniciar la pelota al centro
        }
        if (x >= 500) { // Si la pelota se va fuera del lado derecho
            puntosJugador++; // Aumentar los puntos del jugador
            reiniciarPelota(pelota); // Reiniciar la pelota al centro
        }

        // Actualizar el marcador con los puntos
        marcador.textContent = `Jugador: ${puntosJugador} | IA: ${puntosIA}`;
        
    }, 15); // Repetir cada 15 ms
};

// Crear la pelota
function crearPelota(svg, x, y, radio) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x); // Posición inicial en X
    circle.setAttribute("cy", y); // Posición inicial en Y
    circle.setAttribute("r", radio); // Radio de la pelota
    circle.setAttribute("fill", "white"); // Color de la pelota
    svg.appendChild(circle); // Agregar al contenedor SVG
    return circle;
}

// Crear una barra
function crearBarra(svg, x, y, ancho, alto) {
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x); // Posición inicial en X
    rect.setAttribute("y", y); // Posición inicial en Y
    rect.setAttribute("width", ancho); // Ancho de la barra
    rect.setAttribute("height", alto); // Altura de la barra
    rect.setAttribute("fill", "white"); // Color de la barra
    svg.appendChild(rect); // Agregar al contenedor SVG
    return rect;
}

// Reiniciar la pelota
function reiniciarPelota(pelota) {
    pelota.setAttribute("cx", 250); // Volver al centro X
    pelota.setAttribute("cy", 150); // Volver al centro Y
}


