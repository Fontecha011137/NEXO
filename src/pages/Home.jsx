import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Wrench,
  Lightbulb,
  Hammer,
  Droplets,
  Paintbrush,
  ShieldCheck,
  Package,
  Headphones,
  ShoppingCart,
  House,
  Grid2X2,
  UserRound,
  Search,
  ChevronRight,
} from "lucide-react";

import "../styles/home.css";

function Home() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  const categorias = [
    {
      id: "herramientas",
      nombre: "Herramientas",
      icono: Wrench,
    },
    {
      id: "electricidad",
      nombre: "Electricidad",
      icono: Lightbulb,
    },
    {
      id: "fijaciones",
      nombre: "Fijaciones",
      icono: Hammer,
    },
    {
      id: "plomeria",
      nombre: "Plomería",
      icono: Droplets,
    },
    {
      id: "pinturas",
      nombre: "Pinturas",
      icono: Paintbrush,
    },
    {
      id: "seguridad",
      nombre: "Seguridad",
      icono: ShieldCheck,
    },
  ];

  const buscarProducto = (e) => {
    e.preventDefault();

    const texto = busqueda.trim();

    if (!texto) {
      navigate("/catalogo");
      return;
    }

    navigate(`/catalogo?buscar=${encodeURIComponent(texto)}`);
  };

  return (
    <div className="home-page">

      {/* HEADER */}
      <header className="home-header">

        <div
          className="home-logo"
          onClick={() => navigate("/")}
        >
          <div className="home-logo-icon">
            <ShoppingCart size={38} strokeWidth={2.3} />
          </div>

          <div className="home-logo-text">
            <h1>
              FERRE<span>NEXO</span>
            </h1>

            <p>
              Tu aliado en abastecimiento ferretero
            </p>

            <small>
              Bogotá • Sabana
            </small>
          </div>
        </div>

        {/* BUSCADOR */}
        <form
          className="header-search"
          onSubmit={buscarProducto}
        >
          <Search
            className="search-icon"
            size={27}
          />

          <input
            type="text"
            placeholder="¿Qué producto buscas?"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </form>

        {/* MI PEDIDO */}
        <button
          className="header-order"
          onClick={() => navigate("/mi-pedido")}
        >
          <div className="header-order-icon">
            <ShoppingCart size={30} />

            <span className="order-counter">
              0
            </span>
          </div>

          <span className="order-text">
            Mi pedido
          </span>
        </button>

      </header>

      {/* CONTENIDO */}
      <main className="home-main">

        {/* HERO */}
        <section className="home-hero">

          {/* TEXTO */}
          <div className="hero-content">

            <span className="hero-brand">
              FERRENEXO
            </span>

            <h2>
              Todo lo que tu ferretería
              necesita, en un solo lugar
            </h2>

            <p>
              Consulta nuestro catálogo,
              encuentra tus productos y arma
              tu pedido desde el celular.
            </p>

            <button
              className="hero-button"
              onClick={() => navigate("/catalogo")}
            >
              Ver catálogo
              <ChevronRight size={22} />
            </button>

          </div>

          {/* GRÁFICO ORIGINAL */}
          <div className="hero-image-area">

            <div className="hero-glow"></div>

            <div className="hero-tools-group">

              {/* HERRAMIENTAS */}
              <div className="hero-tool hero-drill-icon">
                <Hammer
                  size={92}
                  strokeWidth={1.8}
                />
              </div>

              <div className="hero-tool hero-wrench-icon">
                <Wrench
                  size={105}
                  strokeWidth={1.8}
                />
              </div>

              <div className="hero-tool hero-hammer-icon">
                <Hammer
                  size={95}
                  strokeWidth={1.8}
                />
              </div>

              {/* CARRITO */}
              <div className="hero-cart-graphic">

                <div className="hero-cart-body">

                  <div className="hero-cart-lines"></div>

                  <div className="hero-cart-badge">
                    <Wrench size={34} />
                  </div>

                </div>

                <div className="hero-cart-bottom"></div>

                <div className="hero-cart-wheel wheel-one"></div>

                <div className="hero-cart-wheel wheel-two"></div>

              </div>

            </div>

          </div>

        </section>

        {/* CATEGORÍAS */}
        <section className="home-categories">

          <div className="section-title-row">

            <div>
              <span className="section-label">
                EXPLORA
              </span>

              <h2>
                Categorías
              </h2>
            </div>

            <button
              className="view-all-button"
              onClick={() => navigate("/catalogo")}
            >
              Ver todas
              <ChevronRight size={24} />
            </button>

          </div>

          <div className="categories-grid">

            {categorias.map((categoria) => {
              const Icono = categoria.icono;

              return (
                <button
                  className="category-card"
                  key={categoria.id}
                  onClick={() =>
                    navigate(
                      `/catalogo?categoria=${categoria.id}`
                    )
                  }
                >
                  <div className="category-icon">
                    <Icono
                      size={58}
                      strokeWidth={1.9}
                    />
                  </div>

                  <span>
                    {categoria.nombre}
                  </span>
                </button>
              );
            })}

          </div>

        </section>

        {/* BENEFICIOS */}
        <section className="home-benefits">

          <div className="benefit-item">

            <div className="benefit-icon">
              <Package size={30} strokeWidth={2} />
            </div>

            <div>
              <h3>
                Arma tu pedido fácilmente
              </h3>

              <p>
                Selecciona los productos que necesitas
                y genera tu pedido en minutos.
              </p>
            </div>

          </div>

          <div className="benefit-divider"></div>

          <div className="benefit-item">

            <div className="benefit-icon">
              <ShieldCheck size={31} strokeWidth={2} />
            </div>

            <div>
              <h3>
                Compra segura
              </h3>

              <p>
                Tus datos y pedidos están siempre
                protegidos con nosotros.
              </p>
            </div>

          </div>

          <div className="benefit-divider"></div>

          <div className="benefit-item">

            <div className="benefit-icon">
              <Headphones size={31} strokeWidth={2} />
            </div>

            <div>
              <h3>
                Soporte al cliente
              </h3>

              <p>
                Estamos listos para ayudarte
                en lo que necesites.
              </p>
            </div>

          </div>

        </section>

      </main>

      {/* NAVEGACIÓN INFERIOR */}
      <nav className="bottom-navigation">

        <button
          className="active"
          onClick={() => navigate("/")}
        >
          <House size={26} />
          Inicio
        </button>

        <button
          onClick={() => navigate("/catalogo")}
        >
          <Grid2X2 size={25} />
          Catálogo
        </button>

        <button
          onClick={() => navigate("/mi-pedido")}
        >
          <ShoppingCart size={26} />
          Mi pedido
        </button>

        <button
          onClick={() => navigate("/mis-pedidos")}
        >
          <Package size={25} />
          Pedidos
        </button>

        <button
          onClick={() => navigate("/perfil")}
        >
          <UserRound size={25} />
          Cuenta
        </button>

      </nav>

    </div>
  );
}

export default Home;