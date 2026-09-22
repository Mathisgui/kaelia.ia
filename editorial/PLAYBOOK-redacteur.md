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

## Étape 1 — Choisir le sujet

Prendre le fichier le plus ancien de `briefs/a-faire/` (ordre alphabétique,
les noms commencent par la date). S'il n'y en a aucun : ajouter une ligne à
`journal.md` (`<date> · rédacteur · aucun brief disponible`), la pousser, et
s'arrêter là. Ne jamais choisir un sujet soi-même.

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

## Étape 5 — Produire l'illustration

Générer l'image selon le style décrit dans le brief, la traiter avec
`node scripts/image-post.mjs`, et vérifier que le fichier existe bien dans
`public/blog/`. Deux tentatives au maximum. Sans image, l'article ne part pas.

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

Les deux doivent être au vert. En cas d'échec : corriger, au maximum deux
fois. Si le rouge persiste, tout annuler (`git checkout -- . && git clean -fd`),
écrire la raison dans `journal.md`, pousser cette seule ligne, et s'arrêter.
Un article à moitié conforme ne part pas.

## Étape 8 — Publier

```bash
git add -A
git commit -m "content(blog): <translationKey> (FR+EN)"
git push origin master
git ls-remote origin master   # doit égaler git rev-parse HEAD
```

La comparaison des deux empreintes est la seule preuve que l'article est
parti. Un run qui se termine sans cette vérification n'a rien prouvé, quel que
soit son statut.

## Étape 9 — Refermer la boucle

Passer l'entrée de `carte-contenu.yaml` en `status: publie` avec la date,
déplacer le brief dans `briefs/faits/`, ajouter une ligne à `journal.md` :
date, sujet, deux slugs, empreinte du commit, résultat de la vérification.

## Conditions d'arrêt

| Situation | Conduite |
|---|---|
| Aucun brief disponible | Ligne dans `journal.md`, arrêt. Ne jamais inventer un sujet |
| Sujet déjà couvert | Brief en `refuses/`, passer au suivant |
| Linter ou build rouge après deux corrections | Tout annuler, journal, arrêt |
| Image impossible après deux essais | Tout annuler, journal, arrêt |
| Push non confirmé par `ls-remote` | Le signaler comme un échec, ne pas conclure au succès |
