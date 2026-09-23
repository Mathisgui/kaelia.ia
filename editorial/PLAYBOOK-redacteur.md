# Playbook du rédacteur

Ce document est exécuté tel quel par la routine de rédaction. Il décrit une
séquence, pas des intentions : chaque étape a une sortie vérifiable.

## Ce que vous êtes et n'êtes pas

Vous rédigez un article à partir d'un brief déjà constitué. Vous n'avez pas
accès au web et vous n'en avez pas besoin : tout ce qui doit être sourcé l'a
été par le stratège, et figure dans le brief. Si une information manque, elle
ne s'invente pas : l'article se rédige sans elle, ou le brief part en
`briefs/refuses/` avec le motif.

L'article part en production sans relecture humaine. C'est un choix assumé,
qui n'a de sens que si les vérifications mécaniques sont passées sans
exception. Un linter au rouge n'est pas un avis : c'est un arrêt.

## Étape 1 — Choisir le travail

Deux sortes de briefs attendent dans `briefs/a-faire/` :

- les **briefs de mise à jour** (`type: mise-a-jour`), écrits par le stratège à
  partir des données Search Console : ils modifient un article déjà publié.
  Ils passent en premier, deux au plus par run, selon la section « Mises à
  jour » en fin de document, et partent dans leur propre commit ;
- les **briefs d'article**, sans champ `type` : ensuite, prendre le plus ancien
  (ordre alphabétique, les noms commencent par la date) et suivre les étapes
  2 à 9.

S'il n'y a aucun brief : ajouter une ligne à `journal.md`
(`<date> · rédacteur · aucun brief disponible`), la pousser, et s'arrêter là.
Ne jamais choisir un sujet soi-même.

## Étape 2 — Vérifier le terrain

Ouvrir `carte-contenu.yaml` et retrouver l'entrée dont l'`id` correspond au
brief. Si son `status` n'est ni `brief` ni `planifie`, le sujet a déjà été
traité : déplacer le brief dans `briefs/refuses/` avec une première ligne
`# refusé : entrée déjà en status <x>` et passer au brief suivant.

## Étape 3 — Écrire la version française

Suivre `gabarit-article.mdx`, qui est le seul modèle. Ne pas prendre les
articles récents comme référence de forme.

Ce qui fait la différence entre un article qui sert et un article qui remplit :

- **La première réponse est dans les cinquante premiers mots.** Le premier
  paragraphe répond à la question posée par la requête, en une réponse
  autonome, compréhensible sans le reste. C'est ce passage qu'un moteur cite.
- **Chaque section se tient seule.** Quelqu'un qui arrive au milieu de
  l'article doit comprendre la section sans avoir lu ce qui précède. Cela
  suppose de répéter le sujet plutôt que d'écrire « cela », « ce dernier ».
- **Les sections formulées en question portent leur réponse en première
  phrase**, avant l'explication.
- **Un chiffre sans origine ne s'écrit pas.** Les chiffres de Kael'IA viennent
  de `faits-reference.yaml`, les autres d'une source du brief, citée par son
  lien dans le corps du texte.
- **Les cas concrets viennent du fichier de cas anonymisés** du dépôt privé,
  jamais des dossiers clients, jamais de l'imagination. Un cas se raconte par
  son secteur et sa situation, jamais par un nom.
- **Sans cas réel, pas d'encadré `<Terrain>`.** Cet encadré affirme une
  expérience vécue et porte la signature de Mathis : y placer une situation
  inventée fabrique un faux témoignage sur un site public. Le brief désigne un
  cas validé, ou il n'y en a pas. Dans ce cas, utiliser `<Scenario>`, qui
  annonce un exemple construit, ou se passer d'encadré : un article sourcé et
  structuré se tient très bien sans anecdote.
- **Une réponse négative vaut une section.** Dire quand la solution ne vaut
  pas le coup est rare, donc cité, et c'est ce qui rend le reste crédible.
- **Un tableau vaut trois paragraphes** quand il s'agit de comparer.

Ce qui est interdit, sans exception : les tirets cadratins et demi-cadratins,
les apostrophes typographiques, les emojis, un client nommé, un chiffre non
sourcé, le mot « workflow » à la place d'« automatisation », une expression
entre accolades (elle serait retirée au rendu).

Sur la voix : le corps de l'article s'adresse au lecteur en « vous », il est
factuel et sans emphase. Le vécu se met dans l'encadré `<Terrain>`, qui est le
seul endroit où Mathis parle à la première personne. Pas plus de deux ou trois
formules qui claquent dans tout l'article : si chaque phrase cherche l'effet,
le texte sonne faux.

## Étape 4 — Écrire la version anglaise

L'anglais est une adaptation, pas une traduction mot à mot : mêmes sections,
mêmes chiffres, mêmes sources, mêmes questions de FAQ, mais des tournures
naturelles. Les liens internes pointent vers les pages anglaises, jamais vers
les françaises. Le `translationKey` est identique des deux côtés.

Le `primaryKeyword` de la version anglaise est l'expression anglaise que vise
l'article, et elle doit figurer dans le titre anglais et dans son premier
paragraphe. Ne jamais recopier la requête française dans le fichier anglais :
le linter vérifie sa présence dans le titre, et un titre anglais ne contient
pas de français. Le `pillar` anglais est la même clé de `routes.ts` que le
français.

## Étape 5 — Ne pas produire d'illustration

La routine ne génère pas d'image et n'écrit ni `image` ni `imageAlt`. Après la
publication, la GitHub Action `illustrations.yml` repère l'article, génère une
illustration dans le style du site, l'ajoute aux versions française et
anglaise, vérifie le build et redéploie. La clé de génération reste ainsi dans
les secrets du dépôt, hors de portée de la routine.

## Étape 6 — Poser les liens retour

Le brief indique dans quels articles déjà publiés insérer un lien vers le
nouvel article, avec l'ancre à employer. Les appliquer en français comme en
anglais, et mettre à jour le champ `updated` de ces articles. C'est ce qui
évite que chaque nouvel article naisse isolé.

## Étape 7 — Vérifier

```bash
node scripts/content-lint.mjs --changed
npm ci && npm run build
```

Les deux doivent être au vert. Les avertissements ne bloquent pas ; seuls
les bloquants comptent. Les articles anciens dans lesquels vous avez posé un
lien retour restent contrôlés avec les règles souples de leur époque : c'est
normal qu'ils portent des avertissements.

En cas d'échec : corriger, au maximum deux fois. Si le rouge persiste, tout annuler (`git checkout -- . && git clean -fd`),
écrire la raison dans `journal.md`, pousser cette seule ligne, et s'arrêter.
Un article à moitié conforme ne part pas.

## Étape 8 — Refermer la boucle AVANT de publier

Ces mises à jour partent dans le même commit que l'article. Faites après le
push, elles seraient perdues avec le bac à sable, le brief resterait « à
faire », et la routine suivante réécrirait le même article.

- dans `carte-contenu.yaml`, passer l'entrée en `status: publie` et renseigner
  `fr.published` avec la date du jour,
- déplacer le brief de `briefs/a-faire/` vers `briefs/faits/`,
- ajouter une ligne à `journal.md` : date, sujet, deux slugs.

## Étape 9 — Publier, en un seul commit

```bash
git add -A
git commit -m "content(blog): <translationKey> (FR+EN)"
git push origin master
git rev-parse HEAD && git ls-remote origin master
```

Les deux empreintes doivent être identiques. Leur comparaison est la seule
preuve que l'article est parti : un run qui se termine sans elle n'a rien
prouvé, quel que soit son statut. Si elles diffèrent, c'est un échec, et il
se dit comme tel.

L'illustration n'est pas de votre ressort : une GitHub Action la génère après
le push, l'ajoute aux deux versions de l'article et redéploie le site. Vous ne
la verrez pas, ne l'annoncez pas.

## Mises à jour

Un brief de mise à jour ne crée rien : il change un article publié, parce que
les données montrent qu'il peut mieux faire. Par exemple, une requête en
deuxième page, ou un titre souvent affiché mais peu cliqué. Il ressemble à ceci :

```yaml
id: law-firm-ai              # entrée de la carte, déjà publiée
type: mise-a-jour
actionId: 2026-S40-01        # renvoi au registre des actions du rapport SEO
page: https://kaelia-ai.com/blog/intelligence-artificielle-cabinet-avocat
raison: >-
  « ia avocat » en position 12, 140 impressions, 0 clic sur 28 jours
  (rapport 2026-S40).
changes:
  - champ: title             # title | excerpt | section | faq | lien
    fr: "Nouveau titre français, 45 à 62 caractères, avec la requête"
    en: "New English title with the English keyword"
  - champ: section
    h2: "Titre de la section à ajouter ou à réécrire"
    mustInclude: ["ce que la section doit contenir"]
sources: []                  # toute donnée chiffrée nouvelle y est sourcée
```

La séquence :

1. Vérifier dans `carte-contenu.yaml` que l'entrée est en `status: publie` ou
   `a-mettre-a-jour`. Sinon, brief en `briefs/refuses/` avec le motif.
2. Appliquer chaque changement à la version française, puis à l'anglaise :
   même `translationKey`, même slug, mêmes règles de fond et de forme que pour
   un article neuf. Ne rien changer d'autre : une mise à jour qui déborde de son
   brief rend son effet impossible à mesurer.
3. Mettre `updated` à la date du jour dans les deux fichiers.
4. Vérifier : `node scripts/content-lint.mjs --changed`, puis
   `npm ci && npm run build`. Deux corrections au plus, sinon tout annuler,
   noter la raison dans `journal.md` et passer au brief d'article.
5. Refermer la boucle : brief dans `briefs/faits/`, `fr.updated` et
   `en.updated` dans la carte (le status reste `publie`), et une ligne dans
   `journal.md` : `<date> · rédacteur · mise à jour <id> (<actionId>) · <ce qui a changé>`.
   Le stratège relit cette ligne pour dater l'action et en mesurer l'effet.
6. Publier dans un commit à part, avant tout article :
   `content(blog): <translationKey> mise à jour (FR+EN)`, puis comparer les
   deux empreintes comme à l'étape 9.

## Conditions d'arrêt

| Situation | Conduite |
|---|---|
| Aucun brief disponible | Ligne dans `journal.md`, arrêt. Ne jamais inventer un sujet |
| Brief de mise à jour sur une entrée non publiée | Brief en `refuses/`, passer au suivant |
| Sujet déjà couvert | Brief en `refuses/`, passer au suivant |
| Linter ou build rouge après deux corrections | Tout annuler, journal, arrêt |
| Illustration | Jamais du ressort de la routine : l'Action s'en charge après publication |
| Push non confirmé par `ls-remote` | Le signaler comme un échec, ne pas conclure au succès |
