# Reforged - Logic

<h3 align="center">The easiest way to filter your data</h3>
<p align="center">Filter your data according to its attributes in a quick and easy way ⚡</p>

<p align="center">
<img src="https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg?style=flat-square" alt="work in progress badge">
</p>


**Reforged Logic** is an open-source abstraction layer library that facilitates
processing, allowing you to filter a dataset using logic principles.
**Reforged Logic** is written in Typescript.

- Website: https://reforged.fr
- Community: [Join us](https://discord.gg/ZAGPhS6BKZ) on Discord

Note: we take the reliability of Logic and the trust of our users very seriously. If you think you have discovered a security problem in the `Logic` package, please report it to us in the issues section of the repository.

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
