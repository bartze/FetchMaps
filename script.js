const formatter = new Intl.NumberFormat("es-ES"); // API de JavaScript y que se está utilizando "es-ES" como parámetro para especificar el país (España en este caso), lo cual define el formato numérico usado.
const btnCargarAPI = document.querySelector("#cargarPaises");
const formulario = document.querySelector("form");
const tabla = document.querySelector("table");
const spinner = document.querySelector(".spinner-border");

const obtenerDatosAPI = async () => {
  tabla.hidden = true;
  spinner.hidden = false; // ruedita animada para que se mueva mientras carga datos.
  try {
    const respuesta = await fetch("https://restcountries.com/v3.1/all");
    const datos = await respuesta.json();
    console.log(datos);
    mostrarHTMLAPI(datos);
  } catch (error) {
    console.log(error);
  }
};

const obtenerDatosContinenteAPI = async (e) => {
  e.preventDefault(); // la presion sobre el boton dispara el evento submit del formulario, con esto lo quitamos.
  tabla.hidden = true;
  spinner.hidden = false;
  const continente = document.querySelector("#continente").value; //con los inputs no usamos textContent HAY que usar value
  try {
    const respuesta = await fetch(
      `https://restcountries.com/v3.1/region/${continente}`
    );
    const datos = await respuesta.json();
    console.log(datos);
    mostrarHTMLAPI(datos);
  } catch (error) {
    console.log(error);
  }
};

const mostrarHTMLAPI = (datos) => {
  const tBody = document.querySelector("tbody");
  tBody.innerHTML = ""; //esto vacioa el tBody, `para el caso que le demos a cargar dos veces-. de otra forma se añadirian a los insertados anteriormente los paises integrados en la tabla

  datos.forEach((x) => {
    const fila = document.createElement("tr");
    tBody.appendChild(fila);
    const celdaBandera = document.createElement("td");
    const bandera = document.createElement("img");
    bandera.src = x.flags.png;
    bandera.alt = `Bandera de ${x.name.common}`;
    bandera.classList.add("bandera");
    celdaBandera.appendChild(bandera);
    const celdaPais = document.createElement("td");
    celdaPais.textContent = x.name.common;
    const celdaContinente = document.createElement("td");
    celdaContinente.textContent = x.region;
    const celdaCapital = document.createElement("td");
    celdaCapital.textContent = (x.capital && x.capital[0]) || "-----------"; // expresiones de JS si hay dato en x.cpaital como es un && pasa al siguiente, entonces pasa a x.capital[0] si hay dato devolvera este, sino el primero
    const celdaHabitantes = document.createElement("td");
    celdaHabitantes.classList.add("text-end");
    celdaHabitantes.textContent = formatter.format(x.population); //hace legible una rista de numeros a formatter.format(numero_que_queramos_tratar)

    const celdaEnlaceGoogle = document.createElement("td");
    const aEnlaceGoogle = document.createElement("a");
    celdaEnlaceGoogle.appendChild(aEnlaceGoogle);

    aEnlaceGoogle.href = x.maps.googleMaps;
    aEnlaceGoogle.classList.add("btn", "btn-primary");
    aEnlaceGoogle.role = "button";
    aEnlaceGoogle.textContent = "mapa";
    aEnlaceGoogle.target = "blank";

    fila.appendChild(celdaBandera);
    fila.appendChild(celdaPais);
    fila.appendChild(celdaContinente);
    fila.appendChild(celdaCapital);
    fila.appendChild(celdaHabitantes);
    fila.appendChild(celdaEnlaceGoogle);
  });

  tabla.hidden = false; //mostramos la tabla con los datos
  spinner.hidden = true; //como ha terminado la carga, escondemos el spinner
};

btnCargarAPI.addEventListener("click", obtenerDatosAPI);
formulario.addEventListener("submit", obtenerDatosContinenteAPI);
