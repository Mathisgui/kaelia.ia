# Backlog éditorial du blog Kael'IA

Ce fichier alimente la routine hebdomadaire de publication d'articles. Chaque semaine,
la routine prend le **premier sujet non coché** du tableau ci-dessous, rédige la paire
FR + EN, coche la ligne avec la date de publication, puis commit et push sur `master`.

## Règles de rédaction (à respecter pour chaque article)

- **Cible** : dirigeants de PME/TPE non techniques. On parle résultat et bénéfice, pas technologie.
- **Format** : MDX, un fichier FR dans `src/content/blog/fr/<fr-slug>.mdx`, un fichier EN dans
  `src/content/blog/en/<en-slug>.mdx`. Prendre modèle sur les 2 articles les plus récents.
- **Frontmatter** : exactement ces 5 champs, rien d'autre :
  `title`, `date` (format `YYYY-MM-DD`, = jour de publication), `excerpt` (140-170 caractères),
  `keywords` (4-6 expressions courtes), `translationKey` (identique entre le FR et l'EN).
- **Longueur** : 800 à 1100 mots par langue. L'EN est l'adaptation fidèle du FR.
- **Structure** : intro directe sans titre H1, 5 à 7 sections `##`, un H2 final « Ce qu'il faut
  retenir » (EN : « The takeaway ») qui mentionne le diagnostic gratuit de 30 minutes.
- **Ton** : concret, honnête, chiffré. Toujours une décote de prudence sur les gains annoncés.
- **Cohérence chiffres** : projets au forfait à partir de 1 500 €, coût horaire chargé 25-40 €/h en
  PME, quelques dizaines d'euros d'API par mois, maintenance 100-200 €/mois ou reprise en interne.
- **Interdits** : aucun tiret cadratin ni demi-cadratin ; apostrophes droites uniquement ;
  aucun client nommé inventé ; le mot par défaut est « automatisation », pas « workflow ».
- **Liens internes** (2-4 par article, naturels), chemins locale-corrects :
  FR `/automatisations` `/agents-ia` `/methode` `/cas-clients` `/agent-ia-documentaire`
  `/agent-ia-commercial` `/agent-ia-reporting` `/agent-ia-connaissance` `/blog/<fr-slug>`
  EN `/en/automations` `/en/ai-agents` `/en/method` `/en/case-studies` `/en/ai-document-agent`
  `/en/ai-sales-agent` `/en/ai-reporting-agent` `/en/ai-knowledge-agent` `/en/blog/<en-slug>`
- **Avant de commit** : vérifier que le slug n'existe pas déjà dans le dossier ; lancer `npm run build`
  pour confirmer que le MDX parse.

## Sujets à traiter (ordre = priorité)

| Fait | translationKey | fr-slug | en-slug | Titre de travail | Angle | Mots-clés cibles |
|------|----------------|---------|---------|------------------|-------|------------------|
| [x] | onboarding-automation | automatiser-onboarding-client | automate-client-onboarding | Automatiser l'onboarding client | Du contrat signé au client opérationnel, sans étape oubliée | onboarding client, automatisation onboarding, parcours client | 2026-07-21 |
| [x] | reporting-automation | reporting-automatique-pme | automated-reporting-smb | Le reporting automatique en PME | Fini les fins de mois à compiler des chiffres | reporting automatique, tableau de bord PME, rapport automatique | 2026-07-28 |
| [x] | rgpd-ai-agents | rgpd-agents-ia-entreprise | gdpr-ai-agents-business | RGPD et agents IA : ce qu'il faut savoir | Où vont vos données, quelles garanties exiger | RGPD IA, données agent IA, confidentialité IA entreprise | 2026-08-04
| [ ] | automation-mistakes | erreurs-automatisation-pme | automation-mistakes-smb | Les 5 erreurs classiques d'un premier projet d'automatisation | Ce qui fait rater un projet et comment l'éviter | erreur automatisation, echec automatisation, projet automatisation |
| [ ] | customer-service-automation | automatiser-service-client-pme | automate-customer-service-smb | Automatiser le service client sans déshumaniser | L'IA prépare, l'humain valide | service client IA, automatisation support, réponse client automatique |
| [ ] | project-duration | duree-projet-automatisation | automation-project-timeline | Combien de temps pour automatiser un processus ? | Du diagnostic au pilote en 2 à 4 semaines | délai automatisation, durée projet IA, mise en place automatisation |
| [ ] | accounting-firm-automation | automatisation-cabinet-comptable | accounting-firm-automation | Automatisation pour cabinets comptables | Saisie, relances, liasses : le répétitif à forte valeur | automatisation cabinet comptable, expert-comptable IA, saisie comptable |
| [ ] | training-provider-tools | automatisation-organisme-formation-outils | training-provider-automation-tools | Automatiser un organisme de formation avec vos outils actuels | Digiforma, tableurs, emails : brancher l'existant | automatisation OF, Digiforma automatisation, Qualiopi automatisation |
| [ ] | ai-agent-security | securiser-agent-ia-entreprise | securing-ai-agents-business | Comment garder le contrôle d'un agent IA | Périmètre, validation humaine, traçabilité | sécurité agent IA, contrôle IA, validation humaine IA |
| [ ] | quote-automation | automatiser-creation-devis | automate-quote-creation | Automatiser la création de vos devis | Du besoin client au devis prêt à envoyer | automatisation devis, génération devis, devis automatique |
