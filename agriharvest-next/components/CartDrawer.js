"use client";

export default function CartDrawer({
  isOpen,
  cart,
  onClose,
  onIncrease,
  onDecrease,
  onCheckout,
  onWhatsApp,
}) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`cart-modal ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
      <div className="cart-panel">
        <button className="close-cart" type="button" onClick={onClose}>
          ×
        </button>

        <h3>Votre panier</h3>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-state">Votre panier est vide.</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <span>{(item.price / 100).toFixed(2)} € / {item.unit}</span>
                </div>
                <div className="cart-controls">
                  <button className="qty-btn" type="button" onClick={() => onDecrease(item.id)}>
                    −
                  </button>
                  <strong>{item.quantity}</strong>
                  <button className="qty-btn" type="button" onClick={() => onIncrease(item.id)}>
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <p>
            Total : <strong>{(total / 100).toFixed(2)} €</strong>
          </p>

          <div className="summary-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Continuer
            </button>

            <button type="button" className="btn btn-primary" onClick={onCheckout}>
              Payer
            </button>

            <a
              href={onWhatsApp ? onWhatsApp() : "#"}
              className="btn btn-whatsapp"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
