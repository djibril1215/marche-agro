"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CartDrawer from "../components/CartDrawer";
import { products } from "../lib/products";

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("agriharvest-cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (error) {
        console.error("Erreur lecture panier", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("agriharvest-cart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const buildWhatsAppMessage = () => {
    const cleanPhone = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "221770000000").replace(/\D/g, "");
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const lines = cart.map(
      (item) => `- ${item.name} x${item.quantity} : ${(item.price * item.quantity / 100).toFixed(2)} €`
    );

    const message = encodeURIComponent(
      `Bonjour, je souhaite commander :\n${lines.join("\n")}\n\nTotal : ${(total / 100).toFixed(2)} €`
    );

    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur paiement");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création de la session de paiement.");
    }
  };

  return (
    <>
      <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Direct du producteur</span>
              <h1>Des produits agricoles sains, savoureux et bien choisis.</h1>
              <p>
                Des fruits, légumes, céréales et denrées locales sélectionnés avec soin pour vous apporter
                fraîcheur, qualité et confiance à chaque commande.
              </p>

              <div className="cta-row">
                <a href="#catalogue" className="btn btn-primary">
                  Découvrir les produits
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Nous contacter
                </a>
              </div>

              <ul className="hero-stats">
                <li>
                  <strong>1200+</strong>
                  <span>clients satisfaits</span>
                </li>
                <li>
                  <strong>48h</strong>
                  <span>livraison rapide</span>
                </li>
                <li>
                  <strong>100%</strong>
                  <span>local</span>
                </li>
              </ul>
            </div>

            <div className="hero-visual">
              <div className="floating-card card-one">
                <span>Tomates bio</span>
                <strong>2,5 €/kg</strong>
              </div>
              <div className="floating-card card-two">
                <span>Miel artisanal</span>
                <strong>6,9 €</strong>
              </div>
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa52ac9d5d0c?auto=format&fit=crop&w=1200&q=80"
                alt="Produit agricole"
              />
            </div>
          </div>
        </section>

        <section id="catalogue" className="catalog container">
          <div className="section-head">
            <span className="eyebrow">Notre catalogue</span>
            <h2>Produits du terroir</h2>
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>

        <section id="avantages" className="advantages">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow">Pourquoi nous choisir</span>
              <h2>Une qualité premium, à chaque étape</h2>
            </div>

            <div className="advantages-grid">
              <article className="advantage-card">
                <div className="icon">🌿</div>
                <h3>Produits locaux</h3>
                <p>
                  Nous sélectionnons des productions proches de nos fermes pour garantir fraîcheur et authenticité.
                </p>
              </article>

              <article className="advantage-card">
                <div className="icon">🚚</div>
                <h3>Livraison rapide</h3>
                <p>
                  Commandes préparées et expédiées en moins de 48h pour une meilleure qualité à réception.
                </p>
              </article>

              <article className="advantage-card">
                <div className="icon">✅</div>
                <h3>Contrôle qualité</h3>
                <p>
                  Chaque produit est vérifié avant expédition pour répondre à nos standards stricts.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="temoignages" className="testimonials container">
          <div className="section-head center">
            <span className="eyebrow">Témoignages</span>
            <h2>Ce que nos clients disent</h2>
          </div>

          <div className="testimonial-grid">
            <blockquote>
              “Très bons produits, bien emballés et surtout très frais. J’ai commandé pour toute la famille et on a adoré.”
              <footer>— Aline D.</footer>
            </blockquote>
            <blockquote>
              “Le service est fiable et le rapport qualité/prix excellent. Je recommande sans hésiter.”
              <footer>— Michel K.</footer>
            </blockquote>
            <blockquote>
              “Des légumes et fruits vraiment savoureux, comme du frais direct de la ferme.”
              <footer>— Sandra T.</footer>
            </blockquote>
          </div>
        </section>
      </main>

      <footer id="contact" className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark">A</span>
              <div>
                <strong>AgriHarvest</strong>
                <small>Frais & local</small>
              </div>
            </div>
            <p>Des produits agricoles de qualité, directement depuis nos fermes.</p>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:contact@agriharvest.com">contact@agriharvest.com</a></li>
              <li><a href="tel:+221770000000">+221 77 000 00 00</a></li>
              <li>Dakar, Sénégal</li>
            </ul>
          </div>

          <div>
            <h4>Heures d’ouverture</h4>
            <ul>
              <li>Lun – Sam : 8h – 18h</li>
              <li>Dimanche : Fermé</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">© {new Date().getFullYear()} AgriHarvest. Tous droits réservés.</div>
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onCheckout={handleCheckout}
        onWhatsApp={() => buildWhatsAppMessage()}
      />
    </>
  );
}
