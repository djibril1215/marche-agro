"use client";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-body">
        <div className="product-top">
          <h3>{product.name}</h3>
          <span className="badge">{product.badge}</span>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-meta">
          <div>
            <div className="product-price">{(product.price / 100).toFixed(2)} €</div>
            <div className="product-unit">/ {product.unit}</div>
          </div>
          <button className="add-btn" type="button" onClick={() => onAddToCart(product)}>
            Ajouter
          </button>
        </div>
      </div>
    </article>
  );
}
