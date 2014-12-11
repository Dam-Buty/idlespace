The idle Shoot'em Up
====================

Side scroller classique, le joueur controle un vaisseau spatial et des vagues successives d'ennemis arrivent par la droite.

Le pilote peut récolter les débris des ennemis tués. Avec les débris il peut construire des systèmes ou upgrader ses systèmes existants.

Le joueur gagne une vie toutes les # minutes.

# Vagues d'ennemis

Chaque type d'ennemi a une population max **P**, un niveau minimum **n** et un niveau maximum **N**. Pour la vague **V**, et un type d'ennemi donné éligible, on va générer aléatoirement un score **S** entre 0 et 1.

````
Si n < V < N                     // Test d'éligibilité
    Si S < (V - n) / (N - n)
        Spawn !
````

Si on a un spawn de ce type d'ennemi, on calcule la population comme ça (distribution normale, arrondi vers le bas) :

````
               1       (-S² / 2)
  1 + ( P * ( ---  *  e          ) )
              √2π
````

Une fois qu'on connait la population à spawner pour tous les types d'ennemis éligibles, on met les méchants dans un tableau, on leur ajoute des delays aléatoires, on mélange le tout et BOUM!

Chaque ennemi a également des **HP** et va laisser entre **n** et **N** (distribution normale) débris.

# Systèmes

Le joueur commence avec seulement l'autorepair. Il doit se jeter dans les ennemis pour acheter le canon.

## Autorepair

Les upgrades de l'autorepair ne sont disponibles qu'à un certain niveau d'autopilot.
- Temps de repair
- Vies gagnées par repair

## Canon

Le canon commence à 4 dégats. Les upgrades :
- Vitesse de tir
- Dégats
- Nombre de tirs (jusqu'à 3 à la Probotector)
- Missiles additionnels

## Aimant

L'aimant sert à attirer les débris à soi. Les upgrades augmentent son rayon et son attraction.

## Autopilot

En autopilot, le vaisseau fait de son mieux pour tuer des méchants et récolter des débris, mais il ne va pas très vite. Il consomme les débris en possession du joueur, et quand il n'a plus de vies ou plus de débris il s'arrête. Il faut le redémarrer manuellement.

Upgrades :
- Vitesse de déplacement
- Consommation de débris
- Débloquer updates d'autorepair




