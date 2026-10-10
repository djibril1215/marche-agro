# AgriHarvest

Site vitrine et catalogue de vente de produits agricoles, conçu pour être hébergé facilement sur Vercel.

## Aperçu

- Page d'accueil moderne et premium
- Catalogue de produits avec panier localStorage
- Sections : hero, avantages, témoignages, contact
- Design responsive pour mobile, tablette et desktop
- Prêt à être déployé sans build

## Structure du projet

```bash
.
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Déploiement sur Vercel

### Option 1 : GitHub + Vercel
1. Enregistrer ce dossier dans un dépôt GitHub.
2. Aller sur https://vercel.com
3. Cliquer sur "New Project"
4. Importer le dépôt GitHub
5. Déployer le projet

### Option 2 : via CLI
```bash
npm i -g vercel
vercel
```

Ensuite, suivre les instructions de Vercel pour finaliser le déploiement.

## Tester localement

Ouvrir `index.html` directement dans le navigateur ou utiliser un serveur statique :

```bash
python -m http.server 8000
```

Puis ouvrir :

```text
http://localhost:8000
```

## Personnalisation rapide

- Modifier les produits dans `script.js`
- Changer les textes et le nom de la boutique dans `index.html`
- Adapter les couleurs dans `styles.css`
- Changer l'email de commande dans le code JavaScript

## Contact

Pour toute modification ou demande de design premium, il suffit de mettre à jour les données dans les fichiers HTML/CSS/JS.
