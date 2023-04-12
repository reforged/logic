# Reforged - Logic

<h3 align="center">Le moyen le plus simple pour filtrer vos données</h3>
<p align="center">Filtre tes données par rapport à ses attributs de manière simple et rapide ⚡</p>

<p align="center">
<img src="https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg?style=flat-square" alt="work in progress badge">
</p>


**Reforged Logic** est une bibliothèque de couche d'abstraction open-source qui facilite
le traitement de données, permettant de filtrer un jeu de données en utilisant des principes de logiques.
**Reforged Logic** est écrit en Typescript.

- Website: https://reforged.fr
- Community: [Join us](https://discord.gg/ZAGPhS6BKZ) on Discord

Remarque : nous prenons très au sérieux la fiabilité de Logic et la confiance de nos utilisateurs. Si vous pensez avoir découvert un problème de sécurité dans le package `Logic`, veuillez nous le signaler dans la partie issues du repository.

## ✨ Features

- **Data structure:** Creation of a binary tree for the distribution of conditions to facilitate processing.
- **Filtering a dataset:** Initialise the class, reference your conditions and data array and enjoy.
- **Take advantage of the tools provided:** A logical display of your conditions, a free parser!


## Getting Started
### Installation
```bash
npm install @reforged/logic
```

### Usage

#### Typescript lib
```ts
import { Logic } from '@reforged/logic'

export interface IUser {
  firstname: string
  lastname: string
  email: string
  numero: string
  roles: string[]
  permissions: string[]
}

const userData: IUser[] = [
  { firstname: 'Nathael', lastname: 'Bonnal', email: 'nathael@gmail.com', numero: "123456789", permissions: [], roles: ["test"]},
  { firstname: 'Lorem', lastname: 'Ipsum', email: 'lorem@gmail.com', numero: "987654321", permissions: [], roles: []}
]

const data = {
  uid: '1',
  kind: 'and',
  nodes: [
    {
      uid: '2',
      field: 'lastname',
      operator: 'contains',
      value: 'bonnal',
      type: 'input',
    },

    {
      uid: '3',
      kind: 'or',
      nodes: [
        {
          uid: '2231',
          field: 'firstname',
          operator: 'contains',
          value: 'thibault',
          type: 'input',
        },
        {
          uid: '4',
          field: 'roles',
          operator: 'not contains',
          value: 'admin',
          type: 'select',
        },
      ],
    },
  ],
}

const logic = new Logic<IUser>(data, userData)
console.log(logic.getFormule().affiche())
// bonnal ∧ (thibault ∨ admin)
const filteredData = logic.filter()
```

## License

See the [LICENSE](./LICENSE) file for licensing information.