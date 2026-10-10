# AgriHarvest (Next.js)

Site de vente de produits agricoles avec Next.js, Stripe et WhatsApp.

## Installation

```bash
cd agriharvest-next
npm install
```

Créer un fichier `.env.local` à partir de `.env.example` :

```bash
cp .env.example .env.local
```

Remplir les variables :

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=221770000000
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## Lancer le projet

```bash
npm run dev
```

Ouvrir :

```bash
http://localhost:3000
```

## Déploiement Vercel

1. Push le projet sur GitHub
2. Importer le repo dans Vercel
3. Ajouter les variables d’environnement
4. Déployer

## Notes

- Le webhook Stripe doit être configuré avec l’URL fournie par Vercel après déploiement.
- Le bouton WhatsApp utilise `https://wa.me/` pour ouvrir une conversation avec le numéro défini.
