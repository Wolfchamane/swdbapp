# Star Wars ® Database Application

> A web application (portfolio) showcase demo inspired by https://swapi.dev

Website:
https://amartinez.dev/software/swdbapp

## LICENSE

```
Star Wars DB Application (swdbapp) © 2025 by Arturo Martínez Díaz is licensed under
Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-nd/4.0/

Star Wars ® is a registered commercial trade-mark which ownership belongs to Lucasfilm Ltd.,
a wholly-owned subsidiary of The Walt Disney Company. All information, but not limited to,
with the films, characters, species, vehicles, starships and planets relate to the Star Wars ®
fictional universe belongs exclusively to LucasFilm Ltd. and The Walt Disney Company.

swapi.dev project legal information can be visited here https://swapi.dev/about.

Pictures have been obtained from https://pixabay.com/.

Application icons have been obtaining using FontAwesome resources.
More information can be obtained here https://fontawesome.com/license.
```

## Background

_Searching for new job positions I have faced a sad reality:
after almost **15** years working as Software Engineer specialized in
Frontend Development, many companies & recruiters drops your candidatures
because "you don't master X library"_.

_So I have decided to create this web application as kind of "portfolio" showcase_.

## Objective

I will try to create the same web application using different Frontend technologies, to know:

- [ ] [VueJS]()
- [ ] _W.I.P._: ReactJS
- [ ] _W.I.P._: Web Components
- [ ] ??

The application will be a consultative web application of the project https://swapi.dev,
a public backend API based on Star Wars ® fictional universe.

## Technologies

This project has been developed using the following technologies:

- [Typescript](https://www.typescriptlang.org/) for developing each ES6+ code.
- [SaSS](https://sass-lang.com/) for developing the CSS styles.
- [ViteJS](https://vite.dev/) as bundler utility.
- [Vitest](https://vitest.dev/) for unitary testing.
- [eslintJs](https://eslint.org/) to lint source code.
- [prettier](https://prettier.io/) to format code.
- ?? for e2e testing.

For the specific VueJS application solution:

- [VueJS](https://vuejs.org/)
- [vue-router](https://router.vuejs.org/)

## Architecture

Description of main folders:

```bash
.
├── .github             # contains CI/CD resources
├── assets              # contains static resources
└── src
    ├── apps            # contains each application solution for each library
    ├── components      # contains specific cross components for each library
    ├── features        # contains solutions for each application feature
    ├── infra           # contains specific infra solution for API
    ├── styles          # contains all application styles
    └── types           # contains cross types
```

The main architecture follows [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
and [Atomic Design](https://atomicdesign.bradfrost.com/).
