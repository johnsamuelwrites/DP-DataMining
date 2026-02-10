# Projet : Analyse des propriétés de composés chimiques

## Objectifs
- Collecter, analyser et visualiser des données de composés chimiques provenant de sources multiples
- Appliquer l'ensemble des compétences acquises lors des trois séances de travaux pratiques
- Rédaction du rapport de projet

## Description

Ce projet porte sur l'analyse des propriétés physico-chimiques de composés chimiques en combinant trois sources de données complémentaires : **PubChem** (API REST), **Wikidata** (SPARQL) et la **Banque mondiale** (API REST). L'objectif est de constituer un jeu de données riche, de l'analyser et de le visualiser afin de répondre à des questions pertinentes pour la chimie et le génie des procédés.

## Sources de données

### 1. PubChem (source principale)
[PubChem](https://pubchem.ncbi.nlm.nih.gov/) est une base de données de référence en chimie. L'API REST ([PUG-REST](https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest)) permet d'obtenir directement des données au format CSV, sans authentification.

Avant l'exemple ci-dessous, notez que l'URL PUG-REST se construit ainsi :
- `compound/name/` indique que vous interrogez par nom.
- `property/` liste les propriétés à retourner, séparées par des virgules.
- `CSV/JSON` fixe le format de sortie.

Important : pour plusieurs composés, PubChem gère mieux une liste de CIDs qu'une liste de noms. Vous pouvez d'abord obtenir chaque CID via `compound/name/<nom>/cids/CSV`, puis faire une requête groupée par CIDs.

**Exemple d'URL (un seul composé par nom)** (JSON) :
<https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/acetone/property/MolecularFormula,MolecularWeight,XLogP,HBondDonorCount,HBondAcceptorCount,TPSA/JSON>
```
https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/acetone/property/MolecularFormula,MolecularWeight,XLogP,HBondDonorCount,HBondAcceptorCount,TPSA/JSON
```

**Exemple d'URL (plusieurs composés via CIDs)** (CSV):
<https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/2244,1983,3672,156391/property/MolecularWeight,HBondDonorCount,HBondAcceptorCount,HeavyAtomCount,XLogP,TPSA/CSV>
```
https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/2244,1983,3672,156391/property/MolecularWeight,HBondDonorCount,HBondAcceptorCount,HeavyAtomCount,XLogP,TPSA/CSV
```

Propriétés disponibles : formule moléculaire, masse moléculaire, XLogP3 (hydrophobicité), nombre de donneurs/accepteurs de liaisons hydrogène, surface polaire topologique (TPSA), etc.

### 2. Wikidata (enrichissement et validation croisée)
[Wikidata](https://query.wikidata.org/) permet de récupérer via SPARQL des propriétés complémentaires : points d'ébullition, points de fusion, numéros CAS, classes chimiques, images de structures, etc.

### 3. Banque mondiale (contexte industriel)
[L'API de la Banque mondiale](https://data.worldbank.org/) fournit des indicateurs industriels et énergétiques par pays (valeur ajoutée manufacturière, consommation d'énergie, émissions de CO₂), téléchargeables au format CSV sans authentification.

Avant l'exemple ci-dessous, notez que l'URL de la Banque mondiale se construit ainsi :
- `/country/all/` récupère tous les pays (remplacez par un code pays si besoin).
- `/indicator/NV.IND.MANF.CD` pointe vers un indicateur précis.
- `downloadformat=csv` force le téléchargement au format CSV. Le lien déclenche le téléchargement d'une archive ZIP contenant les fichiers CSV (et leur documentation).

**Exemple** :
<https://api.worldbank.org/v2/country/all/indicator/NV.IND.MANF.CD?downloadformat=csv>
`https://api.worldbank.org/v2/country/all/indicator/NV.IND.MANF.CD?downloadformat=csv`

## Tâches à réaliser

### Partie 1 : Collecte et structuration des données (TP1 + TP2)

1. **Constituer une liste de 50 composés chimiques** pertinents pour le génie des procédés (solvants, réactifs, produits pétrochimiques, polymères courants, etc.). Stocker cette liste dans un fichier (CSV, JSON ou Python).

2. **Récupérer les propriétés depuis PubChem** en utilisant l'API REST PUG-REST. Charger les résultats CSV dans un DataFrame Pandas. Vérifier les types de données, identifier et traiter les valeurs manquantes.

3. **Enrichir les données via Wikidata** en écrivant une requête SPARQL pour obtenir des propriétés complémentaires (point d'ébullition, point de fusion, classe chimique, image). Fusionner les données PubChem et Wikidata dans un DataFrame unique.

4. **Récupérer les données industrielles** depuis la Banque mondiale pour au moins 3 indicateurs et 10 pays. Charger les CSV, nettoyer et structurer les données.

5. **Sauvegarder** les données nettoyées dans des fichiers CSV et JSON.

### Partie 2 : Analyse des données (TP1 + TP2 + TP3)

6. **Statistiques descriptives** : pour chaque propriété numérique (masse moléculaire, XLogP3, point d'ébullition, TPSA, etc.), calculer et afficher les statistiques (count, mean, std, min, max, quartiles) en utilisant `describe()`, `groupby()`, `agg()`.

7. **Analyses par classe chimique** : regrouper les composés par classe (alcool, alcane, acide, ester, etc.) et comparer les propriétés moyennes entre classes. Identifier la classe avec le point d'ébullition moyen le plus élevé et le plus bas.

8. **Corrélations** : analyser les relations entre les différentes propriétés (par exemple : masse moléculaire vs. point d'ébullition, XLogP3 vs. TPSA). Calculer les coefficients de corrélation.

9. **Analyse des données industrielles** : comparer les indicateurs de la Banque mondiale entre pays et identifier des tendances temporelles.

### Partie 3 : Visualisation (TP3)

10. **Graphiques de base** : tracer l'évolution des propriétés (au moins 3 types de graphiques différents : ligne, barres, nuage de points). Ajouter des titres, étiquettes et légendes.

11. **Sous-graphiques** : créer des sous-graphiques pour comparer les propriétés par classe chimique (un sous-graphique par classe).

12. **Clustering (KMeans)** : appliquer l'algorithme KMeans sur les propriétés numériques des composés (par exemple : masse moléculaire, XLogP3, TPSA) pour identifier des groupes de composés similaires. Visualiser les clusters avec des nuages de points en 2D et/ou 3D. Comparer KMeans et MiniBatchKMeans.

13. **Interprétation** : expliquer les clusters obtenus dans le contexte chimique. Les groupes identifiés correspondent-ils aux classes chimiques connues ?

### Partie 4 (bonus) : Analyse d'images

14. Télécharger les images de structures moléculaires depuis Wikidata. Analyser les histogrammes de couleurs des images. Appliquer le clustering KMeans sur les pixels pour identifier les couleurs dominantes.

## Évaluation

Les critères d'évaluation des projets sont indiqués ci-dessous :

1. **Collecte de données** (4 points)
   1. Utilisation correcte de l'API PubChem
   2. Requêtes SPARQL pour Wikidata
   3. Récupération des données de la Banque mondiale
   4. Qualité du nettoyage et de la fusion des données

2. **Analyses de données** (6 points)
   1. Types d'analyses utilisées (statistiques descriptives, groupby, corrélations)
   2. Utilisation de Pandas (DataFrame, describe, groupby, agg, merge, sort_values)
   3. Utilisation d'algorithmes de clustering (KMeans, MiniBatchKMeans)
   4. Pertinence des analyses pour le domaine chimique

3. **Visualisation des données** (5 points)
   1. Variété des techniques de visualisation (ligne, barres, nuage de points, sous-graphiques, 3D)
   2. Utilisation de matplotlib
   3. Qualité et lisibilité des graphiques (titres, légendes, étiquettes)

4. **Rapport** (5 points, 3 pages, Arial 11pt)
   1. Clarté de la présentation
   2. Présence d'une introduction et d'une conclusion claires
   3. Architecture des diagrammes, résumé des différentes tâches réalisées et des limites
   4. Bibliographie
