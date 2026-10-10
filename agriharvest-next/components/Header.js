"use client";

export default function Header({ cartCount, onOpenCart }) {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <div className="brand">
          <span className="brand-mark">A</span>
          <div>
            <strong>AgriHarvest</strong>
            <small>Frais & local</small>
          </div>
        </div>

        <nav className="main-nav" aria-label="Navigation principale">
          <a href="#catalogue">Catalogue</a>
          <a href="#avantages">Pourquoi nous</a>
          <a href="#temoignages">Avis</a>
          <a href="#contact">Contact</a>
        </nav>

        <button type="button" className="cart-button" onClick={onOpenCart}>
          Panier <span>{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
