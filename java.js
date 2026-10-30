// 1. Los datos (pueden ser los que tú quieras)
const bancoDePreguntas = [
    {
        id: 1,
        pregunta: "¿Cuál es la diferencia entre var, let y const?",
        respuesta: "En JavaScript, var tiene alcance de función y se puede volver a declarar; let y const tienen alcance de bloque, y let permite la reasignación y const la impide. Sin embargo, los contenidos de los objetos const pueden modificarse."
    },
    {
        id: 2,
        pregunta: "¿Qué es el Virtual DOM en React?",
        respuesta: "Es una representación en memoria del DOM real. React lo usa para calcular la forma más eficiente de actualizar la pantalla."
    },
    {
        id: 3,
        pregunta: "¿Qué es un Hook en React?",
        respuesta: "Son funciones que te permiten 'enganchar' el estado y el ciclo de vida de React desde componentes funcionales. Ej: useState."
    },
    {
        id: 4,
        pregunta: "¿Qué hace map() en JavaScript?",
        respuesta: "Crea un nuevo array con los resultados de aplicar una función a cada elemento del array original."
    },
    {
        id: 5,
        pregunta: "¿Qué es JSX?",
        respuesta: "Es una extensión de sintaxis de JavaScript que permite escribir código similar a HTML dentro de un archivo JS."
    }
];

// 2. Componente de la Tarjeta
function Tarjeta({ preguntaActual, mostrarRespuesta, alVoltear, alSiguiente, alAnterior, esPrimera, esUltima }) {
    return (
        <div className="tarjeta">
            <div className="contenido-tarjeta">
                <h2>{mostrarRespuesta ? "Respuesta" : "Pregunta"}</h2>
                <p>{mostrarRespuesta ? preguntaActual.respuesta : preguntaActual.pregunta}</p>
            </div>

            <div className="controles">
                <button onClick={alAnterior} disabled={esPrimera}>
                    &lt; Previous
                </button>

                <button onClick={alVoltear} className="btn-voltear">
                    {mostrarRespuesta ? "Hide Answer" : "Show Answer"}
                </button>

                <button onClick={alSiguiente} disabled={esUltima}>
                    Next &gt;
                </button>
            </div>
        </div>
    );
}

// 3. Componente Principal
function App() {
    // ESTADO: índice actual y si mostramos respuesta
    const [indiceActual, setIndiceActual] = React.useState(0);
    const [mostrarRespuesta, setMostrarRespuesta] = React.useState(false);

    // Lógica de los botones
    const siguiente = () => {
        if (indiceActual < bancoDePreguntas.length - 1) {
            setIndiceActual(indiceActual + 1);
            setMostrarRespuesta(false); // Ocultar respuesta al cambiar
        }
    };

    const anterior = () => {
        if (indiceActual > 0) {
            setIndiceActual(indiceActual - 1);
            setMostrarRespuesta(false);
        }
    };

    const voltear = () => {
        setMostrarRespuesta(!mostrarRespuesta);
    };

    // Cálculo de la barra de progreso
    const porcentaje = ((indiceActual + 1) / bancoDePreguntas.length) * 100;
    const esPrimera = indiceActual === 0;
    const esUltima = indiceActual === bancoDePreguntas.length - 1;

    return (
        <div className="app-contenedor">
            <h1>Flash Cards</h1>

            <div className="barra-fondo">
                <div className="barra-progreso" style={{ width: `${porcentaje}%` }}></div>
                <span className="texto-progreso">
                    {indiceActual + 1} of {bancoDePreguntas.length}
                </span>
            </div>

            <Tarjeta
                preguntaActual={bancoDePreguntas[indiceActual]}
                mostrarRespuesta={mostrarRespuesta}
                alVoltear={voltear}
                alSiguiente={siguiente}
                alAnterior={anterior}
                esPrimera={esPrimera}
                esUltima={esUltima}
            />
        </div>
    );
}

// 4. Renderizar en el HTML
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);