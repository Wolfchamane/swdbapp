# Star Wars ® Explorer

> A web application (portfolio) showcase demo inspired on Star Wars ® fictional universe.

Website:
https://amartinez.dev/software/swdbapp

## LICENSE

```
Star Wars Explorer (swdbapp) © 2025 by Arturo Martínez Díaz is licensed under
Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-nd/4.0/

Star Wars Explorer is in no way affiliated with or endorsed by Lucasfilm Ltd. or any of its subsidiaries, employees,
or associates. Star Wars Explorer offers no suggestion that the work presented on this web page is "official" or
produced or sanctioned by the owner or any licensees of the aforementioned trademarks. Star Wars Explorer will
take all steps necessary to ensure that any usage of trademarked items in no way confuses the audience of this site as
to its origin. Star Wars Explorer makes no claim to own Star Wars or any of the copyrights or trademarks related to it.
Images that are displayed on this site are copyrighted to Lucasfilm Ltd. or another partner of Lucasfilm Ltd., or
to the creator of the image. Visitors may download any pictures displayed on this site for personal use, as long as
they are not used for profit, and proper credit is given.

Lucasfilm Ltd. is a wholly-owned subsidiary of The Walt Disney Company.

The data and images are used without claim of ownership and belong to their respective owners.

The data and images has been obtained primary from https://starwars-databank.vercel.app/ and
completed with info obtained at https://www.starwars.com/.
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

## Database API

I am going to use data and information obtained from https://swapi.dev.

> [!NOTE]
>
> **2025-03-20**
>
> API above is quite outdated and as long as my main focus is to create a portfolio showcase for frontend
> knowledge and technologies, therefore, though I would really like to participate into update DB information,
> I am going to move onto the following API:
>
> https://starwars-databank.vercel.app/

