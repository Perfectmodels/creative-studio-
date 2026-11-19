# ReelPilot Studio — MVP v0.1

Studio de création de Reels développé en **Next.js 16**, **Remotion** et **HyperFrames**.

## Fonctionnalités réelles de cette version

- Tableau de bord et bibliothèque de créations.
- Création de Reels depuis un texte (segmentation locale du storyboard par défaut).
- Génération par IA via `OPENAI_API_KEY` facultative (API OpenAI côté serveur).
- Trois modèles : Fashion Editorial, Flash Actualité, Storytelling.
- Édition des scènes : titre, texte principal, narration, durée, couleur et identité de marque.
- Prévisualisation réelle Remotion avec `@remotion/player`.
- Sauvegarde automatique des projets dans le navigateur et export JSON.
- Capture vidéo de démonstration en **WebM** via MediaRecorder (sans piste audio).
- Composition **HyperFrames** valide dans `hyperframes/index.html`.

## Dépendances installables

- `remotion`, `@remotion/cli`, `@remotion/player`, `@remotion/renderer` en versions alignées.
- `hyperframes`, `@hyperframes/core` pour le moteur HTML/CSS.

> Node.js **22+** et FFmpeg sont requis pour les rendus locaux. Exécuter `npm install` dans un environnement disposant de l'accès au registre npm. L'environnement de préparation ne permettait pas d'exécuter l'installation depuis le registre.

```bash
npm install
npm run dev
```

Ouvrir `http://localhost:3000`.

## Rendu MP4 local

### Remotion

```bash
mkdir -p output
npm run render:remotion
```

Pour rendre un projet exporté depuis l'interface, passez la propriété `project` via l'option Remotion CLI `--props` après avoir extrait le champ correspondant du JSON téléchargé.

### HyperFrames

```bash
mkdir -p output
npx hyperframes render hyperframes --output output/hyperframes.mp4
```

Ce rendu utilise la composition HTML de démonstration. Les deux moteurs ne rendent pas automatiquement une même timeline : les exports mixtes exigent un moteur d'assemblage et un worker à développer.

## Activer la génération IA

Créer `.env.local` (à ne pas publier) :

```ini
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4o-mini
```

L'application ne fournit **pas** d'IA réelle tant que cette clé n'est pas renseignée. En absence de clé, le storyboard est découpé à partir du texte d'origine ; aucune source factuelle n'est inventée.

## Restrictions MVP et prochaine étape

- **Stockage :** localStorage. Pas encore de comptes utilisateurs, de Postgres, de synchronisation entre appareils ou de stockage vidéo cloud.
- **Export :** WebM local sans son. MP4 via les scripts CLI. Pas de rendu MP4 depuis la plateforme Vercel tant qu'un worker vidéo dédié n'est pas configuré.
- **Voix off, médias IA, sous-titres synchronisés, RSS, publication OAuth :** prévus, non implémentés à cette étape.
- **Production :** vérifier les droits sur les médias, les conditions de licence Remotion et les permissions des API sociales avant commercialisation.

## Architecture cible

```text
Next.js / Remotion Player
        | API Next.js (scripts / projets)
        | PostgreSQL + stockage objet (à connecter)
        | BullMQ/Redis (à connecter)
        +--> Worker Remotion / FFmpeg
        +--> Worker HyperFrames / FFmpeg
```

Aucune fausse publication et aucune génération cloud n'est revendiquée dans cette version.
