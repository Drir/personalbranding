# remibuczek.com

Site personnel statique de Rémi Buczek, publié par GitHub Pages depuis `main` (racine), domaine défini dans `CNAME`.

## Parcours

- `index.html` : promesse centrée sur les experts, références défilantes, quatre métiers et secteurs, présentation réunifiée avec la pratique Head of Product hands-on, méthode en quatre étapes, contact unique.
- `offre.html` : landing d’acquisition autonome, hors navigation de la home.
- `ressources.html` : accès historique aux cas et à la méthode personnelle ; pas d’extraits affichés. Les ancres historiques sont conservées.
- `assets/site.css` : styles partagés, contrastes renforcés, petits écrans et réduction des animations.
- `assets/site.js` : dialogues accessibles et pause du carrousel, sans suivi d’audience ni stockage local.

Sept références nominales établies : Givaudan, Galileo, InVivo / Soufflet, EPEX SPOT, Pierre & Vacances Center Parcs, ManoMano et La Fourche. Six logos réels, ManoMano en texte. Aucune entreprise inventée pour compléter la quinzaine déclarée dans le parcours. Logo La Fourche : [source officielle](https://lafourche.fr/icons/brand_logos/fr.svg), SVG sans script ni ressource externe.

Les pictogrammes métier sont des repères graphiques génériques, sans prétention à représenter un outil client. Les anciens aperçus restent accessibles à leurs URL historiques, mais ne sont plus présentés dans les pages. Aucun PDF complet ni document client brut dans ce dépôt. Les quatre futurs visuels photographiques ont des prompts séparés dans le dossier de travail privé ; ils ne sont pas encore générés.

Le chiffre +50 à +100 % exprime une estimation de potentiel sur les tâches ciblées, à préciser et mesurer. Les graduations des cas sont des repères de maturité produit déclarés par Rémi, pas des nombres d’utilisateurs ni des taux de croissance audités.

## Formulaires et raccordement à venir

Rémi a confirmé qu’aucun outil de collecte/CRM n’est encore choisi. Actuellement, le formulaire valide l’email et le consentement puis prépare un `mailto` dans la messagerie du visiteur. Le visiteur doit l’envoyer lui-même. Aucun lead n’est enregistré automatiquement, aucune newsletter n’est ajoutée, aucun succès d’envoi n’est simulé.

Pour raccorder un service choisi par Rémi :

1. Obtenir son URL publique de formulaire HTTPS acceptant POST multipart et CORS. Ne jamais exposer une clé serveur dans ces fichiers.
2. Ajouter `data-endpoint="URL_DU_FORMULAIRE"` au formulaire `#lead-form` des trois pages (ou au générateur local utilisé). Un éventuel `data-delivery` personnalise le texte de confirmation après une réponse HTTP réussie.
3. Champs transmis : `email`, `message` facultatif, `resource`, `consent` et `_gotcha` (piège antispam). Le service doit router les demandes à Rémi, distinguer les études et la méthode, et rester limité à cette demande.
4. Mettre à jour l’information sur les données pour refléter le prestataire et le traitement réellement configurés ; tester réception et erreurs avec une adresse autorisée avant mise en service.

États gérés : validation, envoi en cours, confirmation après HTTP réussi, erreur conservant la saisie. Une demande d’étude ouvre le dialogue correspondant ; Échap ferme et restaure le focus sur le déclencheur.

Sources, preuves, prompts d’illustration et historique éditorial conservés dans le dépôt privé de Rémi.
