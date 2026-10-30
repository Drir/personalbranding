# remibuczek.com

Site personnel statique de Rémi Buczek, publié par GitHub Pages depuis `main` (racine), domaine défini dans `CNAME`.

## Parcours

- `index.html` (30/10/2026, version 5) : « Head of Product IA. Hands-on. » (l’anglais garde « When the product stalls, I find a way forward. »), photo naturelle en noir et blanc fondue dans la zone ocre, références défilantes, quatre missions (douleur, preuve, « Voir l’étude de cas ») avec une légende du contexte produit (le stade du produit à l’arrivée de Rémi), autres expériences et formation en cartes (« Avant 2020 » dépliable), « Head of Product + écosystème d’agents IA » avec une frise amont / pendant / aval utilisable sans JavaScript, bandeau de la méthode, contact. Environ 360 mots visibles. L’offre d’agents pour les experts a quitté le site.
- `en/index.html` : version anglaise de l’accueil (Head of Product AI), sélecteur FR | EN dans l’en-tête, `hreflang` réciproques. `assets/site.js` choisit ses textes selon la langue de la page.
- `offre.html` : redirection vers l’accueil ; l’ancienne landing de l’offre d’agents reste dans l’historique git.
- `ressources.html` : accès historique aux quatre missions et à la méthode personnelle, aligné sur l’accueil ; pas d’extraits affichés. Les ancres historiques sont conservées.
- `assets/site.css` : styles partagés, contrastes renforcés, petits écrans et réduction des animations ; styles de l’accueil sous la classe `profile-page`.
- `assets/site.js` : dialogues accessibles et pause du carrousel, sans suivi d’audience ni stockage local.

Sept références nominales établies : Givaudan, Galileo, InVivo / Soufflet, EPEX SPOT, Pierre & Vacances Center Parcs, ManoMano et La Fourche. Six logos réels, ManoMano en texte. Aucune entreprise inventée pour compléter la quinzaine déclarée dans le parcours. Logo La Fourche : [source officielle](https://lafourche.fr/icons/brand_logos/fr.svg), SVG sans script ni ressource externe.

Les quatre scènes métier dans `assets/experts/` sont des illustrations fictives créées avec l’outil intégré GPT Image, indiquées comme telles près des cartes. Elles ne représentent pas des locaux, logiciels ou interfaces clients. WebP 1536 × 1024, environ 533 Ko au total. Prompts exacts et originaux conservés dans le dossier privé. Le portrait de Rémi est une photo réelle fournie, uniquement redimensionnée et compressée. Logos HEC et GEM dans la biographie ; aucune certification Produit non vérifiée ajoutée.

La couverture du guide Hands-on figure dans le sous-bloc de méthode personnelle, avec un schéma HTML/CSS « Organisation classique → Ma pratique augmentée ». Ce schéma présente le fonctionnement revendiqué par Rémi, pas un organigramme client ni une suppression de postes constatée. Les autres aperçus restent accessibles à leurs URL historiques. Aucun PDF complet ni document client brut dans ce dépôt.

« Contexte produit » est un raccourci de praticiens, pas une norme ni des nombres d’utilisateurs : Malteur 0→1, Parfumeur 1→10, Pédagogue 10→100, Trader 100→1 000, selon la dernière répartition demandée par Rémi.

Quatre familles d’actions : rendez-vous sur `https://calendly.com/remibuczek/call`, quatre demandes d’étude de cas, une demande de méthode, un message par le formulaire (`contact`). Les images de partage sont `assets/og-profil.jpg` et `assets/og-profil-en.jpg` ; `assets/og-accueil.jpg`, celle de l’ancienne offre, n’est plus utilisée. Le carrousel dispose d’une commande par icône et libellé accessible, d’une pause au survol/focus et d’un respect de la réduction des animations.

## Formulaires et raccordement à venir

Depuis le 30/10/2026, le formulaire `#lead-form` des trois pages (accueil français, accueil anglais, ressources) envoie les demandes à Formspree, formulaire « remibuczek.com » du compte de Rémi : `data-endpoint="https://formspree.io/f/meaalzez"`. Formspree les transmet à remibuczek@gmail.com et les garde 30 jours dans son archive (offre gratuite, 50 demandes par mois). Le script envoie `email`, `message`, `resource`, `consent`, le piège `_gotcha` et un `_subject` préfixé par `[remibuczek.com]`. Sans `data-endpoint`, le script repasse en mode `mailto`. Aucune newsletter n’est ajoutée, aucun succès d’envoi n’est simulé.

Pour raccorder un service choisi par Rémi :

1. Obtenir son URL publique de formulaire HTTPS acceptant POST multipart et CORS. Ne jamais exposer une clé serveur dans ces fichiers.
2. Ajouter `data-endpoint="URL_DU_FORMULAIRE"` au formulaire `#lead-form` des trois pages (ou au générateur local utilisé). Un éventuel `data-delivery` personnalise le texte de confirmation après une réponse HTTP réussie.
3. Champs transmis : `email`, `message` facultatif, `resource`, `consent` et `_gotcha` (piège antispam). Le service doit router les demandes à Rémi, distinguer les études et la méthode, et rester limité à cette demande.
4. Mettre à jour l’information sur les données pour refléter le prestataire et le traitement réellement configurés ; tester réception et erreurs avec une adresse autorisée avant mise en service.

États gérés : validation, envoi en cours, confirmation après HTTP réussi, erreur conservant la saisie. Une demande d’étude ouvre le dialogue correspondant ; Échap ferme et restaure le focus sur le déclencheur.

Sources, preuves, prompts d’illustration et historique éditorial conservés dans le dépôt privé de Rémi.
