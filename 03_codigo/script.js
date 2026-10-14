
const zona = document.getElementById("zona-animita");
const interior = zona.querySelector(".interior-ritual");
const bandeja = document.getElementById("bandeja-ofrendas");
const listaEpicrisis = document.getElementById("lista-ofrendas");
const espacioMemoria = document.querySelector(".espacio-memoria");

// CATÁLOGO DE OFRENDAS
const ofrendas = [
    { nombre: "Vela", archivo: "vela.png", tipo: "vela", ancho: 60, pregunta: "¿Quién persiste en tu memoria?" },
    { nombre: "Pikachu", archivo: "pikachu.png", tipo: "objeto", ancho: 70, pregunta: "¿La ternura encontró espacio en tu infancia?" },
    { nombre: "Bob", archivo: "bob.png", tipo: "objeto", ancho: 60, pregunta: "¿Alguna vez caminaste sin rumbo fijo?" },
    { nombre: "HK", archivo: "hk.png", tipo: "objeto", ancho: 60, pregunta: "Ese niñx que sigues siendo ¿es feliz?" },
    { nombre: "Minion", archivo: "minion.png", tipo: "objeto", ancho: 70, pregunta: "¿Cuándo fue la última vez que jugaste hasta dormirte?" },
    { nombre: "Monikaki", archivo: "monikaki.png", tipo: "objeto", ancho: 60, pregunta: "¿Cuál de todas tus versiones sigue viviendo en ti?" },
    { nombre: "Mono", archivo: "mono.png", tipo: "objeto", ancho: 70, pregunta: "¿Volviste a tu origen?" },
    { nombre: "Mota", archivo: "mota.png", tipo: "objeto", ancho: 70, pregunta: "¿Hasta dónde te lleva tu mente?" },
    { nombre: "Perro", archivo: "perro.png", tipo: "objeto", ancho: 60, pregunta: "¿Dónde está tu hogar?" },
    { nombre: "Tuntun", archivo: "tuntun.png", tipo: "objeto", ancho: 60, pregunta: "¿Cuál fue el último juego que perdiste?" },

    { nombre: "Neko", archivo: "neko.png", tipo: "objeto", ancho: 70, pregunta: "¿Quién te protege en un mundo hostil?" },
    { nombre: "Kewpie", archivo: "kewpie.png", tipo: "objeto", ancho: 70, pregunta: "En tu fragilidad ¿con quién te permites ser vulnerable?" },
    { nombre: "Dinosaurio", archivo: "dinosaurio.png", tipo: "objeto", ancho: 60, pregunta: "¿Qué objeto conserva una versión anterior de ti?" },
    { nombre: "Virgen", archivo: "virgen.png", tipo: "objeto", ancho: 60, pregunta: "¿Cuáles fueron las creencias que heredaste?" },
    { nombre: "Ángel y yeso", archivo: "angelyeso.png", tipo: "objeto", ancho: 70, pregunta: "¿En quién depositas tu fe cuando nadie responde?" },
    { nombre: "Zapatilla", archivo: "zapatilla.png", tipo: "objeto", ancho: 60, pregunta: "¿Te arrepientes del camino que tomaste?" },
    { nombre: "Cartera", archivo: "carteralv.png", tipo: "objeto", ancho: 60, pregunta: "¿Qué llevas contigo para sentirte a salvo?" },
    { nombre: "Pantera", archivo: "pantera.png", tipo: "objeto", ancho: 90, pregunta: "¿Quién vela tus sueños?" },
    { nombre: "Auto peluche", archivo: "autopeluche.png", tipo: "objeto", ancho: 70, pregunta: "¿Hacia dónde vas?" },
    { nombre: "Pomaire", archivo: "pomaire.png", tipo: "objeto", ancho: 60, pregunta: "¿Qué recuerdo atesoras?" },

    { nombre: "Goku", archivo: "goku.png", tipo: "objeto", ancho: 60, pregunta: "¿Qué fuerza invisible te sostuvo cuando pensabas rendirte?" },
    { nombre: "Chayanne", archivo: "chayanne.png", tipo: "objeto", ancho: 70, pregunta: "¿Cuál es el sonido que te hace sentir bien?" },
    { nombre: "Felipito", archivo: "felipito.png", tipo: "objeto", ancho: 70, pregunta: "¿Qué presencia te acompaña siempre?" },
    { nombre: "Bulla 96", archivo: "bulla96.png", tipo: "objeto", ancho: 90, pregunta: "¿Cuál es tu pasión?" },
    { nombre: "Bulla 89", archivo: "bulla89.png", tipo: "objeto", ancho: 90, pregunta: "¿Con qué sigues soñando?" },

    { nombre: "Flor canasto", archivo: "florcanasto.png", tipo: "objeto", ancho: 70, pregunta: "¿A quién deseas seguir recordando?" },
    { nombre: "Lotus", archivo: "lotus.png", tipo: "objeto", ancho: 60, pregunta: "¿A quién todavía sigues despidiendo?" },
    { nombre: "Flores", archivo: "flores.png", tipo: "objeto", ancho: 60, pregunta: "¿Cuándo fue la última vez que te celebraste?" },
    { nombre: "Rosas", archivo: "rosas.png", tipo: "objeto", ancho: 60, pregunta: "¿Cómo se sintió el primer amor?" }
];

let objetoActual = null;
let memoriaAnimita = [];

let identidadAnimita = {

    nombre: "",

    modo: ""

};

let desplazamientoX = 0;
let desplazamientoY = 0;
let contador = 10000;
let siguienteId = 0;

function crearOfrenda(ofrenda) {
    const objeto = document.createElement("img");
    objeto.style.animationDuration =
    `${4 + Math.random() * 3}s`;

    objeto.src = `02_imagenes/${ofrenda.archivo}`;
    objeto.alt = ofrenda.nombre;
    objeto.title = ofrenda.nombre;
    objeto.classList.add("objeto");
    objeto.classList.add("flota");

    objeto.dataset.nombre = ofrenda.nombre;
    objeto.dataset.pregunta = ofrenda.pregunta;
    objeto.dataset.tipo = ofrenda.tipo;
    objeto.dataset.incorporado = "false";
    objeto.dataset.registrado = "false";
    objeto.dataset.id = String(++siguienteId);

    objeto.style.width = `${ofrenda.ancho || 80}px`;
    objeto.draggable = false;

    objeto.addEventListener("error", () => {
        console.error(
            `No se pudo cargar la imagen: ${ofrenda.archivo}`
        );
    });

    // Aparecen flotando alrededor de la animita

espacioMemoria.appendChild(objeto);

objeto.style.position = "absolute";

const posiciones = [

    // lado izquierdo exterior
    {x: 5, y: 18},
    {x: 10, y: 45},
    {x: 8, y: 72},

    // zona superior alrededor
    {x: 28, y: 10},
    {x: 55, y: 8},

    // lado derecho antes de epicrisis
    {x: 75, y: 18},
    {x: 82, y: 45},
    {x: 75, y: 72},

    // algunos más alejados
    {x: 20, y: 80},
    {x: 60, y: 82}

];

const posicion = posiciones[
    Math.floor(Math.random() * posiciones.length)
];

objeto.style.left = posicion.x + "%";
objeto.style.top = posicion.y + "%";

    objeto.addEventListener("pointerdown", iniciarArrastre);
}

function iniciarArrastre(e) {
    if (objetoActual) return;

    e.preventDefault();

    const objeto = e.currentTarget;
    const rect = objeto.getBoundingClientRect();

    // Guardar el punto exacto donde tomamos la imagen.
    desplazamientoX = e.clientX - rect.left;
    desplazamientoY = e.clientY - rect.top;

    // Conservar la posición visual al cambiar de contenedor.
    objeto.style.position = "fixed";
    objeto.style.left = `${rect.left}px`;
    objeto.style.top = `${rect.top}px`;
    objeto.style.width = `${rect.width}px`;

    // Mientras se arrastra, el objeto queda directamente en el documento.
    document.body.appendChild(objeto);

    objeto.classList.add("arrastrando");
    objeto.style.zIndex = ++contador;

    objetoActual = objeto;
}

document.addEventListener("pointermove", (e) => {
    if (!objetoActual) return;

    objetoActual.style.left =
        `${e.clientX - desplazamientoX}px`;

    objetoActual.style.top =
        `${e.clientY - desplazamientoY}px`;
});

document.addEventListener("pointerup", terminarArrastre);
document.addEventListener("pointercancel", terminarArrastre);

function terminarArrastre() {
    if (!objetoActual) return;

    const objeto = objetoActual;
    objetoActual = null;

    objeto.classList.remove("arrastrando");
    objeto.style.cursor = "grab";

    comprobarOfrenda(objeto);
}

function comprobarOfrenda(objeto) {
    const objetoRect = objeto.getBoundingClientRect();
    const zonaRect = zona.getBoundingClientRect();

    const tocaAnimita =
        objetoRect.left < zonaRect.right &&
        objetoRect.right > zonaRect.left &&
        objetoRect.top < zonaRect.bottom &&
        objetoRect.bottom > zonaRect.top;

    if (tocaAnimita) {
        incorporarOfrenda(objeto);
    } else if (objeto.dataset.incorporado === "true") {
        retirarOfrenda(objeto);
    }

    actualizarLuz();
}

function mostrarSacralizacion() {

    const mensaje = document.getElementById("mensaje-sacralizado");

    mensaje.classList.add("aparece");

    setTimeout(() => {
        mensaje.classList.remove("aparece");
    }, 2000);

}

function incorporarOfrenda(objeto) {
    const objetoRect = objeto.getBoundingClientRect();
    const interiorRect = interior.getBoundingClientRect();

    // Calcular la posición visual relativa al espacio ritual.
    const x = objetoRect.left - interiorRect.left;
    const y = objetoRect.top - interiorRect.top;

    interior.appendChild(objeto);

    objeto.classList.remove("flota");
    objeto.classList.add("sacralizado");

    setTimeout(() => {
    objeto.classList.remove("sacralizado");
    }, 2000);

    mostrarSacralizacion();

    objeto.dataset.incorporado = "true";
    objeto.style.position = "absolute";
    objeto.style.left = `${x}px`;
    objeto.style.top = `${y}px`;
    objeto.style.width = `${objetoRect.width}px`;
    objeto.style.zIndex = ++contador;
    objeto.style.transform = "none";

    mostrarPregunta(objeto);
    actualizarLuz();
    
}

function retirarOfrenda(objeto) {
    objeto.dataset.incorporado = "false";

    objeto.classList.add("flota");

    const id = objeto.dataset.id;
    const item = listaEpicrisis.querySelector(
        `li[data-id="${id}"]`
    );

    if (item) item.remove();

    objeto.dataset.registrado = "false";


    if (!listaEpicrisis.querySelector("li")) {
        const mensaje = document.createElement("li");
        mensaje.className = "mensaje-vacio";
        mensaje.textContent = "Aún no hay objetos";
        listaEpicrisis.appendChild(mensaje);
    }

    actualizarLuz();
}

let objetoConversacion = null;


function mostrarPregunta(objeto){

    objetoConversacion = objeto;

    const dialogo = document.getElementById("dialogo-animita");
    const pregunta = document.getElementById("pregunta-dialogo");

    pregunta.textContent = objeto.dataset.pregunta;

    dialogo.classList.add("visible");

}

function registrarEpicrisis(objeto) {

    if (objeto.dataset.registrado === "true") return;

    const mensaje = listaEpicrisis.querySelector(".mensaje-vacio");
    if (mensaje) mensaje.remove();

    const item = document.createElement("li");
    item.dataset.id = objeto.dataset.id;

    item.innerHTML = `
        <strong>${objeto.dataset.nombre}</strong><br><br>

        <div class="pregunta-animita">
            ${objeto.dataset.pregunta}
        </div>

        <textarea
            class="respuesta-animita"
            placeholder="Escribe aquí..."
        ></textarea>
    `;

    listaEpicrisis.appendChild(item);

    objeto.dataset.registrado = "true";

}

function actualizarLuz() {
    const velaDentro = interior.querySelector(
        '.objeto[data-tipo="vela"]'
    );

    zona.classList.toggle("encendida", Boolean(velaDentro));
}

// Comprobar que el catálogo existe antes de cargar las imágenes.
if (bandeja) {
    ofrendas.forEach(crearOfrenda);
} else {
    console.error(
        'No se encontró la bandeja "bandeja-ofrendas" en index.html.'
    );
}

fetch("02_imagenes/pensamiento.txt")
    .then(respuesta => respuesta.text())
    .then(texto => {

        document.getElementById("texto-pensamiento").innerHTML =
            texto.replace(/\n/g, " ");

    });

    document
.getElementById("guardar-respuesta")
.addEventListener("click", () => {

const respuesta =
    document.getElementById("respuesta-usuario").value;


if (!objetoConversacion) return;


objetoConversacion.dataset.respuesta = respuesta;


memoriaAnimita.push({

    objeto: objetoConversacion.dataset.nombre,

    pregunta: objetoConversacion.dataset.pregunta,

    respuesta: respuesta

});


// limpia la respuesta después de guardarla

document.getElementById("respuesta-usuario").value = "";


    document.getElementById("dialogo-animita")
    .classList.remove("visible");

});

function iniciarCierreAnimita(){

    const transicion = document.getElementById("transicion-final");

    transicion.classList.add("activa");


    setTimeout(() => {

        const firma = document.getElementById("firma-memoria");

        firma.style.display = "flex";

    }, 5000);

}


document
.getElementById("concluir-animita")
.addEventListener("click", () => {

    iniciarCierreAnimita();

});

document
.getElementById("guardar-identidad")
.addEventListener("click", () => {


    const nombre =
    document.getElementById("nombre-usuario").value;


    const modo =
    document.querySelector(
        'input[name="identidad"]:checked'
    ).value;


    identidadAnimita.nombre = nombre;

    identidadAnimita.modo = modo;


    capturarAnimita()
.then(() => {

    console.log("Memoria antes de construir:", memoriaAnimita);

    construirEpicrisis();

});

});
function capturarAnimita(){

    const zona = document.getElementById("zona-animita");

    return html2canvas(zona, {

        scale: 2,

        backgroundColor: null,

        width: zona.offsetWidth + 300,

        height: zona.offsetHeight + 200,

        x: -150,

        y: -100

    })
    .then(canvas => {

        const imagen =
        document.getElementById("imagen-animita-final");

        imagen.src =
        canvas.toDataURL("image/png");

    });

}

function construirEpicrisis(){


    const titulo =
    document.getElementById("nombre-epicrisis");


    const creador =
    document.getElementById("creador-epicrisis");


    const registro =
    document.getElementById("registro-epicrisis");
    const fecha =
document.getElementById("fecha-creacion");


const hoy = new Date();


const fechaTexto =
hoy.toLocaleDateString("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric"
});


fecha.textContent =
"Fecha de creación: " + fechaTexto;



    titulo.innerHTML =
    "Sin nombre";


    if(
        identidadAnimita.modo === "anonimo"
    ){

        creador.innerHTML =
        "Creada por: Anónimo";

    } else {


        creador.innerHTML =
        "Creada por: "
        + identidadAnimita.nombre;

    }



   registro.innerHTML = "";

 console.log("Memoria al construir epicrisis:", memoriaAnimita);

 memoriaAnimita.forEach((item, indice)=>{


    const bloque =
    document.createElement("div");


    bloque.classList.add("vestigio-biografico");


    bloque.innerHTML = `


        <h2>
            Vestigio biográfico ${(indice + 1)
            .toString()
            .padStart(3,"0")}
        </h2>


        <p>
            <strong>Objeto sacralizado</strong>
        </p>

        <p>
            ${item.objeto}
        </p>


        <p>
            <strong>
            Pregunta que convocó la memoria
            </strong>
        </p>


        <p>
            ${item.pregunta}
        </p>


        <p>
            <strong>
            Vestigio biográfico
            </strong>
        </p>


        <p>
            ${item.respuesta}
        </p>


        <hr>


    `;


    registro.appendChild(bloque);


});



    document
    .getElementById("firma-memoria")
    .style.display = "none";


    document
    .getElementById("epicrisis-final")
    .style.display = "block";


}
document
.getElementById("descargar-pdf")
.addEventListener("click", generarPDF);



function generarPDF(){


    const documento = document.querySelector(".documento-epicrisis");


    const boton = document.querySelector(".no-imprimir");


    if (boton) {
        boton.style.display = "none";
    }


    html2canvas(documento, {

        scale: 2,

        backgroundColor: "#ffffff",

        width: documento.scrollWidth,

        height: documento.scrollHeight,

        windowWidth: documento.scrollWidth,

        windowHeight: documento.scrollHeight

    })
    .then(canvas => {


        if (boton) {
            boton.style.display = "block";
        }


        const imagen = canvas.toDataURL("image/png");


        const { jsPDF } = window.jspdf;


        const pdf = new jsPDF({

            orientation: "portrait",

            unit: "mm",

            format: "a4"

        });


        const anchoPDF = 210;

        const altoPagina = 297;


        const altoImagen =
        canvas.height * anchoPDF / canvas.width;


        let alturaRestante = altoImagen;

        let posicionY = 0;


        pdf.addImage(

            imagen,

            "PNG",

            0,

            posicionY,

            anchoPDF,

            altoImagen

        );


        alturaRestante -= altoPagina;


        while (alturaRestante > 0) {


            pdf.addPage();


            posicionY =
            -(altoImagen - alturaRestante);


            pdf.addImage(

                imagen,

                "PNG",

                0,

                posicionY,

                anchoPDF,

                altoImagen

            );


            alturaRestante -= altoPagina;

        }


        pdf.save("Epicrisis_de_una_animita.pdf");


    });

}
