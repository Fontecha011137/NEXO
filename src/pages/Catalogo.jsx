import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  ShoppingCart,
  Package,
  ChevronRight,
  X,
  House,
} from "lucide-react";

import "../styles/catalogo.css";

function Catalogo() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const busquedaInicial = searchParams.get("buscar") || "";
  const categoriaInicial =
    searchParams.get("categoria") || "todas";

  const [busqueda, setBusqueda] =
    useState(busquedaInicial);

  const [
    categoriaSeleccionada,
    setCategoriaSeleccionada,
  ] = useState(categoriaInicial);

  const categorias = [
    {
      id: "todas",
      nombre: "Todas",
    },
    {
      id: "herramientas",
      nombre: "Herramientas",
    },
    {
      id: "electricidad",
      nombre: "Electricidad",
    },
    {
      id: "fijaciones",
      nombre: "Fijaciones",
    },
    {
      id: "plomeria",
      nombre: "Plomería",
    },
    {
      id: "pinturas",
      nombre: "Pinturas",
    },
    {
      id: "seguridad",
      nombre: "Seguridad",
    },
  ];

  /*
    Productos temporales.
    Más adelante estos productos
    vendrán directamente desde Firebase.
  */

  const productos = [
    {
      id: "taladro-inalambrico",
      nombre: "Taladro inalámbrico 20V",
      categoria: "herramientas",
      marca: "FerreMax",
      referencia: "FM-T20",
      presentacion: "Unidad",
      descripcion:
        "Taladro inalámbrico compacto para trabajos de perforación y atornillado.",
      disponible: true,
      imagen:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "juego-llaves",
      nombre: "Juego de llaves combinadas",
      categoria: "herramientas",
      marca: "ProTools",
      referencia: "PT-12L",
      presentacion: "Juego x 12 unidades",
      descripcion:
        "Juego de llaves combinadas para trabajos mecánicos y mantenimiento.",
      disponible: true,
      imagen:
        "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "bombillo-led",
      nombre: "Bombillo LED 12W",
      categoria: "electricidad",
      marca: "LumiPro",
      referencia: "LP-12W",
      presentacion: "Caja x 12 unidades",
      descripcion:
        "Bombillo LED de bajo consumo para iluminación residencial y comercial.",
      disponible: true,
      imagen:
        "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "tornillos-drywall",
      nombre: "Tornillo drywall 1 pulgada",
      categoria: "fijaciones",
      marca: "FixPro",
      referencia: "FP-DW1",
      presentacion: "Caja x 100 unidades",
      descripcion:
        "Tornillo negro para instalación de drywall y sistemas livianos.",
      disponible: true,
      imagen:
        "https://images.unsplash.com/photo-1598514982901-ae62764ae75e?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "cinta-teflon",
      nombre: "Cinta teflón profesional",
      categoria: "plomeria",
      marca: "AquaFix",
      referencia: "AF-TEF",
      presentacion: "Paquete x 10 unidades",
      descripcion:
        "Cinta de sellado para conexiones roscadas en instalaciones hidráulicas.",
      disponible: true,
      imagen:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "rodillo-pintura",
      nombre: "Rodillo profesional 9 pulgadas",
      categoria: "pinturas",
      marca: "ColorMax",
      referencia: "CM-R9",
      presentacion: "Unidad",
      descripcion:
        "Rodillo para aplicación uniforme de pintura en superficies interiores.",
      disponible: false,
      imagen:
        "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=800&q=80",
    },

    {
      id: "guantes-proteccion",
      nombre: "Guantes de protección",
      categoria: "seguridad",
      marca: "SafeWork",
      referencia: "SW-G01",
      presentacion: "Par",
      descripcion:
        "Guantes de protección para trabajos generales de construcción y ferretería.",
      disponible: true,
      imagen:
        "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80",
    },
  ];

  /*
    FILTRAR PRODUCTOS
  */

  const productosFiltrados = useMemo(() => {
    const texto = busqueda
      .trim()
      .toLowerCase();

    return productos.filter((producto) => {
      const coincideCategoria =
        categoriaSeleccionada === "todas" ||
        producto.categoria ===
          categoriaSeleccionada;

      const coincideBusqueda =
        !texto ||
        producto.nombre
          .toLowerCase()
          .includes(texto) ||
        producto.marca
          .toLowerCase()
          .includes(texto) ||
        producto.referencia
          .toLowerCase()
          .includes(texto) ||
        producto.descripcion
          .toLowerCase()
          .includes(texto);

      return (
        coincideCategoria &&
        coincideBusqueda
      );
    });
  }, [
    busqueda,
    categoriaSeleccionada,
  ]);

  /*
    BUSCAR
  */

  const buscarProducto = (e) => {
    e.preventDefault();

    const nuevosParametros = {};

    if (busqueda.trim()) {
      nuevosParametros.buscar =
        busqueda.trim();
    }

    if (
      categoriaSeleccionada !== "todas"
    ) {
      nuevosParametros.categoria =
        categoriaSeleccionada;
    }

    setSearchParams(
      nuevosParametros
    );
  };

  /*
    CAMBIAR CATEGORÍA
  */

  const cambiarCategoria = (
    categoria
  ) => {
    setCategoriaSeleccionada(
      categoria
    );

    const nuevosParametros = {};

    if (busqueda.trim()) {
      nuevosParametros.buscar =
        busqueda.trim();
    }

    if (categoria !== "todas") {
      nuevosParametros.categoria =
        categoria;
    }

    setSearchParams(
      nuevosParametros
    );
  };

  /*
    LIMPIAR FILTROS
  */

  const limpiarFiltros = () => {
    setBusqueda("");
    setCategoriaSeleccionada(
      "todas"
    );
    setSearchParams({});
  };

  return (
    <div className="catalogo-page">

      {/* =========================
          HEADER
      ========================== */}

     <header className="catalogo-header">
  <div className="catalogo-header-content">

    <div className="catalogo-header-info">
      <span className="catalogo-label">
        FERRENEXO
      </span>

      <h1>
        Catálogo de productos
      </h1>

      <p>
        Encuentra los productos que necesitas
        para abastecer tu ferretería.
      </p>
    </div>

   <div className="catalogo-header-actions">

  <button
    className="catalogo-home-button"
    onClick={() => navigate("/")}
  >
    <House size={19} />
    Inicio
  </button>

  <button
    className="catalogo-pedido-button"
    onClick={() => {
      console.log("Mi pedido se creará en el siguiente paso");
    }}
  >
    <ShoppingCart size={22} />
    <span>Mi pedido</span>
    <strong>0</strong>
  </button>

</div>

  </div>
</header>
      {/* =========================
          CONTENIDO
      ========================== */}

      <main className="catalogo-main">

        {/* BUSCADOR */}

        <section className="catalogo-search-section">

          <form
            className="catalogo-search"
            onSubmit={buscarProducto}
          >

            <Search size={23} />

            <input
              type="text"
              placeholder="Buscar por nombre, marca o referencia..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(
                  e.target.value
                )
              }
            />

            {busqueda && (
              <button
                type="button"
                className="catalogo-clear-search"
                onClick={() =>
                  setBusqueda("")
                }
                aria-label="Limpiar búsqueda"
              >
                <X size={19} />
              </button>
            )}

            <button
              type="submit"
              className="catalogo-search-button"
            >
              Buscar
            </button>

          </form>

        </section>

        {/* CATEGORÍAS */}

        <section className="catalogo-filters">

          <div className="catalogo-filter-title">

            <SlidersHorizontal
              size={20}
            />

            <span>
              Categorías
            </span>

          </div>

          <div className="catalogo-category-list">

            {categorias.map(
              (categoria) => (
                <button
                  key={categoria.id}
                  className={
                    categoriaSeleccionada ===
                    categoria.id
                      ? "catalogo-category active"
                      : "catalogo-category"
                  }
                  onClick={() =>
                    cambiarCategoria(
                      categoria.id
                    )
                  }
                >
                  {categoria.nombre}
                </button>
              )
            )}

          </div>

        </section>

        {/* RESULTADOS */}

        <section className="catalogo-results-header">

          <div>

            <span className="catalogo-results-label">
              PRODUCTOS
            </span>

            <h2>
              {categoriaSeleccionada ===
              "todas"
                ? "Todos los productos"
                : categorias.find(
                    (categoria) =>
                      categoria.id ===
                      categoriaSeleccionada
                  )?.nombre}
            </h2>

            <p>
              {
                productosFiltrados.length
              }{" "}
              {productosFiltrados.length ===
              1
                ? "producto encontrado"
                : "productos encontrados"}
            </p>

          </div>

          {(busqueda ||
            categoriaSeleccionada !==
              "todas") && (
            <button
              className="catalogo-reset-button"
              onClick={limpiarFiltros}
            >
              Limpiar filtros
            </button>
          )}

        </section>

        {/* PRODUCTOS */}

        {productosFiltrados.length >
        0 ? (
          <section className="catalogo-grid">

            {productosFiltrados.map(
              (producto) => (
                <article
                  className="producto-card"
                  key={producto.id}
                >

                  <button
                    className="producto-image-container"
                    onClick={() =>
                      navigate(
                        `/producto/${producto.id}`
                      )
                    }
                  >

                    <img
                      src={
                        producto.imagen
                      }
                      alt={
                        producto.nombre
                      }
                      className="producto-image"
                    />

                    <span
                      className={
                        producto.disponible
                          ? "producto-status disponible"
                          : "producto-status agotado"
                      }
                    >
                      {producto.disponible
                        ? "Disponible"
                        : "No disponible"}
                    </span>

                  </button>

                  <div className="producto-card-content">

                    <div className="producto-meta">

                      <span>
                        {producto.marca}
                      </span>

                      <span>
                        {
                          producto.referencia
                        }
                      </span>

                    </div>

                    <h3>
                      {producto.nombre}
                    </h3>

                    <p>
                      {
                        producto.descripcion
                      }
                    </p>

                    <div className="producto-presentation">

                      <Package
                        size={17}
                      />

                      <span>
                        {
                          producto.presentacion
                        }
                      </span>

                    </div>

                    <div className="producto-card-actions">

                      <button
                        className="producto-detail-button"
                        onClick={() =>
                          navigate(
                            `/producto/${producto.id}`
                          )
                        }
                      >
                        Ver producto
                        <ChevronRight
                          size={19}
                        />
                      </button>

                      <button
                        className="producto-add-button"
                        disabled={
                          !producto.disponible
                        }
                        onClick={() => {
                          console.log(
                            "Agregar producto:",
                            producto.nombre
                          );
                        }}
                      >

                        <ShoppingCart
                          size={19}
                        />

                        {producto.disponible
                          ? "Agregar"
                          : "Agotado"}

                      </button>

                    </div>

                  </div>

                </article>
              )
            )}

          </section>
        ) : (
          <section className="catalogo-empty">

            <Package size={52} />

            <h3>
              No encontramos productos
            </h3>

            <p>
              Prueba con otra búsqueda o
              selecciona una categoría
              diferente.
            </p>

            <button
              onClick={limpiarFiltros}
            >
              Ver todos los productos
            </button>

          </section>
        )}

      </main>

    </div>
  );
}

export default Catalogo;