# Star Wars ® Explorer

> A web application (portfolio) showcase demo inspired on Star Wars ® fictional universe.

Website:
https://amartinez.dev/software/swdbapp

## LICENSE

```text
Star Wars Explorer (swdbapp) © 2025 by Arturo Martínez Díaz is licensed under
Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.
To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-nd/4.0/

Star Wars ® is a trademark property of Lucasfilm Ltd.
Lucasfilm Ltd. is a wholly-owned subsidiary of The Walt Disney Company.

Star Wars Explorer is in no way affiliated with or endorsed by Lucasfilm Ltd. or any of
its subsidiaries, employees, or associates. Star Wars Explorer offers no suggestion that
the work presented on this web page is "official" or produced or sanctioned by the owner
or any licensees of the aforementioned trademarks. Star Wars Explorer will take all steps
necessary to ensure that any usage of trademarked items in no way confuses the audience
of this site as to its origin. Star Wars Explorer makes no claim to own Star Wars or any
of the copyrights or trademarks related to it. Images that are displayed on this site
are copyrighted to Lucasfilm Ltd. or another partner of Lucasfilm Ltd., or to the creator
of the image. Visitors may download any pictures displayed on this site for personal use,
as long as they are not used for profit, and proper credit is given.

The data and images are used without claim of ownership and belong to their respective
owners.

Sources of information:
- https://swapi.dev
- https://starwars-databank.vercel.app/
- https://starwars.com
```

## Background

_Searching for new job positions I have faced a sad reality:
after almost **15** years working as Software Engineer specialized in
Frontend Development, many companies & recruiters drops your candidatures
because "you don't master X library"_.

_So I have decided to create this web application as kind of "portfolio" showcase_.

## Objective

I will try to create the same web application using different Frontend technologies, to know:

|                        FE Solution                        |   Status    | E.T.A.  |
| :-------------------------------------------------------: | :---------: |:-------:|
| [VueJS](https://amartinez.dev/software/swdbapp/vue-js/#/) | In Progress | 2025 Q4 |
|                          ReactJS                          |    ToDo     | Unknown |
|                WebComponents (lit-element)                |    ToDo     | Unknown |
|                           Other                           |     ---     |   ---   |

The application will be a consultative web application of a **private** backend API based on Star Wars ® fictional universe.

> [!IMPORTANT]
> **I don't have any purpose on making the API public**.
>
> Please, don't ask for API keys or similar.

## Technologies

This project has been developed using the following technologies:

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) as primary syntax.
- [Typescript](https://www.typescriptlang.org/) for developing each enriched Javascript code.
- [Pug/Jade](https://pugjs.org/) for developing HTML templates.
- [SaSS](https://sass-lang.com/) for developing the CSS styles.
- [ViteJS](https://vite.dev/) as bundler utility.
- [Vitest](https://vitest.dev/) for unitary testing.
- [eslintJs](https://eslint.org/) to lint source code.
- [prettier](https://prettier.io/) to format code.
- ?? for e2e testing.

For the specific **VueJS** application solution:

- [VueJS](https://vuejs.org/)
- [vue-router](https://router.vuejs.org/)

## Architecture

The main architecture follows a "_custom_" variation of [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and the principles/patterns of
- [Atomic Design](https://atomicdesign.bradfrost.com/).
- [KiSS](https://en.wikipedia.org/wiki/KISS_principle)
- [SOLID](https://en.wikipedia.org/wiki/SOLID)

## Database

I am going to use data and information obtained from https://swapi.dev.

> [!NOTE]
>
> **2025-03-21**
>
> After a long research through the Internet, seems that the source of information above is a
> deprecated project no longer maintained by their authors. Therefore, I have decided that I am going to use
> additional sources of information, to know:
>
> - https://starwars-databank.vercel.app/

> [!NOTE]
>
> **2025-03-31**
>
> Is **impossible** to obtain fine information merging two (2) different APIs:
> - https://swapi.dev is deprecated and the data is quite outdated.
> - https://starwars-databank.vercel.app/ contains an updated version of data, but is missing
> some very basics for any operational API (full pagination control, searches, etc.).
>
> Therefore, it seems that I will need to create a DB of my own.
> Is quite frustrating that LucasFilms Ltd. or Disney haven't published an API for this content.
> My big concern so far is how to obtain reliable information and keep it updated "_easily_".
