var mascota = {};
var estadosDeAnimo = {
    feliz: '<i class="fas fa-smile"></i>',
    triste: '<i class="fas fa-frown"></i>',
    enfermo: '<i class="fas fa-dizzy"></i>',
    cansado: '<i class="fas fa-tired"></i>',
    muerto: '<i class="fas fa-skull-crossbones"></i>'
};

// Función que crea la mascota
function crearMascota() {
    let nombre = prompt("Ingresa el nombre de tu mascota");
    if (!nombre || typeof nombre !== 'string') {
        mostrarMensaje("Debe ingresar un nombre válido.", estadosDeAnimo.triste);
        return;
    }

    const tipos = ['Fantasma', 'Espectro', 'Wraith'];
    const profesiones = ['Guerrero', 'Mago', 'Curador'];
    const tipoSeleccionado = tipos[Math.floor(Math.random() * tipos.length)];
    const profesionSeleccionada = profesiones[Math.floor(Math.random() * profesiones.length)];

    mascota.tipo = tipoSeleccionado;
    mascota.profesion = profesionSeleccionada;
    mascota.nombre = nombre;
    mascota.edad = 0;
    mascota.salud = 100;
    mascota.peso = 2;
    mascota.estatura = 3;
    mascota.hambre = 100;
    mascota.educacion = 0;
    mascota.diversion = 100;
    mascota.vejigas = 0;
    mascota.nivel = 1;
    mascota.experiencia = 0;
    mascota.inventario = [];

    $('#btn-crear').hide();
    mostrarMensaje(`Has creado un ${mascota.tipo} ${mascota.profesion} llamado ${mascota.nombre}`, estadosDeAnimo.feliz);
    actualizarImagen();
    mostrarEstadisticas();
    mostrarInventario();
}

// Función que muestra las estadísticas de la mascota
function mostrarEstadisticas() {
    $('#estadisticas').html(`
        <p>Tipo: ${mascota.tipo}</p>
        <p>Profesión: ${mascota.profesion}</p>
        <p>Nombre: ${mascota.nombre}</p>
        <p>Edad: ${mascota.edad} años</p>
        <div>Salud: <div class="barra-progreso"><div class="progreso" style="width:${mascota.salud}%">${mascota.salud}</div></div></div>
        <div>Hambre: <div class="barra-progreso"><div class="progreso" style="width:${mascota.hambre}%">${mascota.hambre}</div></div></div>
        <div>Diversión: <div class="barra-progreso"><div class="progreso" style="width:${mascota.diversion}%">${mascota.diversion}</div></div></div>
        <div>Educación: <div class="barra-progreso"><div class="progreso" style="width:${mascota.educacion}%">${mascota.educacion}</div></div></div>
        <div>Baño: <div class="barra-progreso"><div class="progreso" style="width:${mascota.vejigas}%">${mascota.vejigas}</div></div></div>
        <div>Nivel: ${mascota.nivel}</div>
        <div>Experiencia: <div class="barra-progreso"><div class="progreso" style="width:${mascota.experiencia}%">${mascota.experiencia}</div></div></div>
        <p>Peso: ${mascota.peso} kg</p>
        <p>Estatura: ${mascota.estatura} m</p>
    `);
}

// Función que alterna la visualización de las estadísticas
function toggleEstadisticas() {
    $('#acciones').toggleClass('oculto');
    $('#estadisticas').toggleClass('oculto');
    $('#resumen-estadisticas').toggleClass('oculto');
    $('#btn-mostrar-menu').toggleClass('oculto');

    if ($('#estadisticas').hasClass('oculto')) {
        $('#resumen-estadisticas').html(`
            <p>Salud: ${mascota.salud}% <i class="fas fa-heartbeat"></i></p>
            <p>Hambre: ${mascota.hambre}% <i class="fas fa-utensils"></i></p>
            <p>Diversión: ${mascota.diversion}% <i class="fas fa-gamepad"></i></p>
        `);
    } else {
        $('#resumen-estadisticas').empty();
    }
}

// Función que muestra mensajes en el juego
function mostrarMensaje(mensaje, estado) {
    $('#mensajes').html(`<p>${estado} ${mensaje}</p>`).show();
}

// Función que alterna la visualización del inventario
function toggleInventario() {
    $('#acciones').toggleClass('oculto');
    $('#inventario').toggleClass('oculto');
    $('#btn-mostrar-menu').toggleClass('oculto');
    mostrarInventario();
}

// Función que muestra el inventario de la mascota
function mostrarInventario() {
    const $inventarioUl = $('#lista-inventario');
    $inventarioUl.empty();
    mascota.inventario.forEach((item, index) => {
        const $li = $(`<li class="list-group-item d-flex justify-content-between align-items-center">${item}</li>`);
        const $usarBtn = $('<button class="btn btn-success btn-sm"><i class="fas fa-play"></i> Usar</button>').click(() => usarItemInventario(index));
        const $desecharBtn = $('<button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> Desechar</button>').click(() => desecharItemInventario(index));
        $li.append($usarBtn, $desecharBtn);
        $inventarioUl.append($li);
    });
}

// Función para usar un ítem del inventario
function usarItemInventario(index) {
    const item = mascota.inventario[index];
    switch (item) {
        case 'Juguete':
            mascota.diversion += 20;
            mostrarMensaje("Has usado un juguete. Diversión +20", estadosDeAnimo.feliz);
            break;
        case 'Comida':
            mascota.hambre -= 20;
            mostrarMensaje("Has usado comida. Hambre -20", estadosDeAnimo.feliz);
            break;
        case 'Medicina':
            mascota.salud += 20;
            mostrarMensaje("Has usado medicina. Salud +20", estadosDeAnimo.feliz);
            break;
    }
    mascota.inventario.splice(index, 1);
    mostrarInventario();
    mostrarEstadisticas();
}

// Función para desechar un ítem del inventario
function desecharItemInventario(index) {
    mascota.inventario.splice(index, 1);
    mostrarMensaje("Has desechado un ítem del inventario.", estadosDeAnimo.triste);
    mostrarInventario();
}

// Función que muestra las opciones de alimentación
function mostrarAlimentar() {
    $('#acciones').toggleClass('oculto');
    $('#alimentar').toggleClass('oculto');
    $('#btn-mostrar-menu').toggleClass('oculto');
}

// Función para alimentar a la mascota
function alimentar(comida) {
    $('#alimentar').addClass('oculto');
    $('#acciones').removeClass('oculto');
    $('#btn-mostrar-menu').addClass('oculto');
    switch (comida) {
        case 'Pasta':
            mascota.peso += 1;
            mascota.hambre -= 10;
            break;
        case 'Sushi':
            mascota.peso += 0.5;
            mascota.hambre -= 8;
            break;
        case 'Hamburguesa':
            mascota.peso += 1;
            mascota.hambre -= 12;
            break;
        case 'Manzana':
            mascota.peso += 0.5;
            mascota.hambre -= 5;
            break;
    }
    mostrarMensaje("La mascota está comiendo " + comida, estadosDeAnimo.feliz);
    ganarExperiencia(5);
    actualizarEstadisticas();
    mostrarEstadisticas();
}

// Función para jugar con la mascota
function jugar() {
    mascota.diversion += 20;
    mascota.salud += 5;
    mascota.hambre -= 10;
    mostrarMensaje("Has jugado con tu mascota", estadosDeAnimo.feliz);
    ganarExperiencia(10);
    actualizarEstadisticas();
    mostrarEstadisticas();
}

// Función para estudiar con la mascota
function estudiar() {
    mascota.educacion += 20;
    mascota.diversion -= 10;
    mascota.hambre -= 5;
    mostrarMensaje("Tu mascota ha estudiado", estadosDeAnimo.feliz);
    ganarExperiencia(15);
    actualizarEstadisticas();
    mostrarEstadisticas();
}

// Función para bañar a la mascota
function banio() {
    mascota.vejigas = 0;
    mascota.salud += 5;
    mostrarMensaje("Has bañado a tu mascota", estadosDeAnimo.feliz);
    ganarExperiencia(5);
    actualizarEstadisticas();
    mostrarEstadisticas();
}

// Función para curar a la mascota
function curar() {
    mascota.salud += 20;
    if (mascota.salud > 100) mascota.salud = 100;
    mostrarMensaje("Has curado a tu mascota", estadosDeAnimo.feliz);
    ganarExperiencia(5);
    actualizarEstadisticas();
    mostrarEstadisticas();
}

// Función para pasear con la mascota
function pasear() {
    $('#acciones').toggleClass('oculto');
    $('#pasear').toggleClass('oculto');
    $('#btn-mostrar-menu').toggleClass('oculto');
}

// Función para realizar una cita con la mascota
function mostrarCita() {
    $('#acciones').toggleClass('oculto');
    $('#citas').toggleClass('oculto');
    $('#btn-mostrar-menu').toggleClass('oculto');
}

function cita(tipo) {
    mostrarMensaje("Has ido a una " + tipo, estadosDeAnimo.feliz);
    volver();
}

// Función para elegir carrera
function elegirCarrera() {
    $('#acciones').toggleClass('oculto');
    $('#carrera').toggleClass('oculto');
    $('#btn-mostrar-menu').toggleClass('oculto');
}

function elegir(carrera) {
    mostrarMensaje("Has elegido la carrera de " + carrera, estadosDeAnimo.feliz);
    volver();
}

// Función para ganar experiencia
function ganarExperiencia(cantidad) {
    mascota.experiencia += cantidad;
    if (mascota.experiencia >= 100) {
        mascota.experiencia -= 100;
        mascota.nivel += 1;
        mostrarMensaje("¡Tu mascota ha subido de nivel! Ahora es nivel " + mascota.nivel, estadosDeAnimo.feliz);
        recompensasPorNivel();
        actualizarImagen();
    }
}

// Función para otorgar recompensas por nivel
function recompensasPorNivel() {
    switch (mascota.nivel) {
        case 2:
            mascota.salud += 10;
            mostrarMensaje("¡Recompensa de Nivel 2! +10 de salud", estadosDeAnimo.feliz);
            break;
        case 3:
            mascota.diversion += 10;
            mostrarMensaje("¡Recompensa de Nivel 3! +10 de diversión", estadosDeAnimo.feliz);
            break;
    }
    actualizarEstadisticas();
    mostrarEstadisticas();
}

// Función para actualizar las estadísticas de la mascota con el tiempo
function actualizarEstadisticas() {
    mascota.hambre += 5;
    mascota.diversion -= 5;
    mascota.salud -= 2;
    mascota.vejigas += 5;
    
    if (mascota.hambre > 100) mascota.hambre = 100;
    if (mascota.hambre < 0) mascota.hambre = 0;
    
    if (mascota.diversion > 100) mascota.diversion = 100;
    if (mascota.diversion < 0) mascota.diversion = 0;
    
    if (mascota.salud > 100) mascota.salud = 100;
    if (mascota.salud < 0) {
        mascota.salud = 0;
        mostrarMensaje("Tu mascota ha muerto.", estadosDeAnimo.muerto);
        $('#btn-crear').show();
        clearInterval(cicloActualizacion); // Detener el ciclo de actualización
    }
    
    if (mascota.vejigas > 100) mascota.vejigas = 100;
    if (mascota.vejigas < 0) mascota.vejigas = 0;
}

// Función para iniciar el ciclo de actualización periódica
let cicloActualizacion;
function iniciarCiclo() {
    cicloActualizacion = setInterval(function() {
        if (mascota.salud > 0) {
            actualizarEstadisticas();
            mostrarEstadisticas();
            eventosAleatorios();
        }
    }, 5000);
}

// Función para eventos aleatorios
function eventosAleatorios() {
    const evento = Math.random();
    
    if (evento < 0.1) {
        mostrarMensaje("¡Tu mascota ha encontrado un juguete!", estadosDeAnimo.feliz);
        mascota.diversion += 10;
        agregarItemInventario("Juguete");
    } else if (evento < 0.2) {
        mostrarMensaje("¡Tu mascota se ha enfermado!", estadosDeAnimo.enfermo);
        mascota.salud -= 10;
    } else if (evento < 0.3) {
        mostrarMensaje("¡Tu mascota encontró comida!", estadosDeAnimo.feliz);
        mascota.hambre -= 10;
        agregarItemInventario("Comida");
    } else if (evento < 0.4) {
        mostrarMensaje("¡Tu mascota encontró una medicina!", estadosDeAnimo.feliz);
        agregarItemInventario("Medicina");
    }
    
    if (mascota.diversion > 100) mascota.diversion = 100;
    if (mascota.diversion < 0) mascota.diversion = 0;
    if (mascota.salud > 100) mascota.salud = 100;
    if (mascota.salud < 0) mascota.salud = 0;
    if (mascota.hambre > 100) mascota.hambre = 100;
    if (mascota.hambre < 0) mascota.hambre = 0;
}

// Función para agregar un ítem al inventario
function agregarItemInventario(item) {
    mascota.inventario.push(item);
    mostrarInventario();
}

// Función para actualizar la imagen de la mascota según el tipo y nivel
function actualizarImagen() {
    const imagenes = {
        Fantasma: ['img/fantasmini.webp', 'img/fantasmi.webp', 'img/fantasmax.webp'],
        Espectro: ['img/espectrini.webp', 'img/espectroni.webp', 'img/espectromax.webp'],
        Wraith: ['img/wraithini.webp', 'img/wraithin.webp', 'img/wraithmax.webp']
    };
    const nivel = mascota.nivel - 1;
    $('#mascota-imagen').attr('src', imagenes[mascota.tipo][nivel]);
}

// Función para cerrar el menú principal
function cerrarMenu() {
    $('#acciones').addClass('oculto');
    $('#btn-cerrar-menu').removeClass('oculto');
}

// Función para volver al menú principal
function volver() {
    $('#acciones').removeClass('oculto');
    $('#alimentar').addClass('oculto');
    $('#inventario').addClass('oculto');
    $('#citas').addClass('oculto');
    $('#pasear').addClass('oculto');
    $('#carrera').addClass('oculto');
    $('#btn-mostrar-menu').addClass('oculto');
}

// Función para mostrar el menú principal
function mostrarMenu() {
    $('#acciones').removeClass('oculto');
    $('#btn-mostrar-menu').addClass('oculto');
}

// Función para que la mascota cumpla años
function cumplirAnios() {
    mascota.edad += 1;
    if (mascota.edad >= 20) { // Edad máxima de vida de la mascota
        mostrarMensaje("Tu mascota ha muerto de vejez.", estadosDeAnimo.muerto);
        mascota.salud = 0;
        $('#btn-crear').show();
        clearInterval(cicloActualizacion);
    }
    mostrarEstadisticas();
}

// Iniciar el ciclo de actualización al cargar la página
$(document).ready(function() {
    iniciarCiclo();
    setInterval(cumplirAnios, 60000); // La mascota cumple años cada minuto
});
