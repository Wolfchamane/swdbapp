# Diary

Here I'm writing a diary of all the technical achievements I'm facing ...

> [!NOTE]
>
> Star Wars ® will be noted as "_SW_" in this document.

## 2025-01-08

I've been fired from my job, after four \(4\) long years. Time to update
the CV and start searching for a new experience. In a week I'm going to
travel for long expected holidays, so I know I won't get a "_real_" offer
in this week ahead ...

## 2025-02-05

Back from my holidays, as expected no offer yet, but many interviews.

## 2025-02-20

Got an offer for a Senior Frontend Developer position, nothing fancy but
the salary will allow me to still pay the rent for a while without spending
all savings.

## 2025-03-10

I am being declined from many job applies because in their words, after fifteen \(15\) years
of career experience I am not "_experienced_" enough to face a development with \< insert here whatever library \>.

I am going to create a "_portfolio_" showcase application to demo all those \< insert here bad word of your choice \>
what I am able to do!

## 2025-03-11

I know from a very good stable API based on SW fictional universe: https://swapi.dev.
I think I could use it for the portfolio application.

I would build the application with three \(3\) different frontend libraries, to know: VueJS, ReactJS & lit-element.
I hope this serves as enough knowledge for those \< insert here bad word of your choice \> recruiters!

## 2025-03-17

I am starting my new job position as Senior Frontend Developer, so I will have to
work on this portfolio application through the weekends and nights.

## 2025-03-21

https://swapi.dev is a deprecated and non-longer maintained project. Its information is
obsolete but full of rich details up to the point in SW history it is set.

I will need another source of information.

## 2025-03-23

After a long search through the Internet I've found this other API: https://starwars-databank.vercel.app/. It contains a lot of fresh and updated information, even it has image links!

For my desperation and frustration, there is no official public API developed or designed
by either LucasFilms Ltd. or Disney. But they do have an API for both Disney's characters and
MARVEL content.

## 2025-03-25

Ok. https://starwars-databank.vercel.app/ is a project maintained by a student, and he
has not much time to dedicate into his own project. I have been talking
with him through email about some technical requirements and issues.

I think I am going to mix up both sources:

-   https://starwars-databank.vercel.app/
-   https://swapi.dev

## 2025-03-31

Is almost **impossible** to obtain reliable information merging the two \(2\) different APIs.

Therefore, it seems that I will need to create a DB of my own.
Is quite frustrating that LucasFilms Ltd. or Disney haven't published an API for this content.
My big concern so far is how to obtain reliable information and keep it updated "_easily_".

## 2025-04-01

I have decided that for the aim of obtaining reliable information I am going to scratch
the **official** website: https://starwars.com.

But building a solution of my own to scratch the information seems to me quite complex, so
I have decided to use an exiting tool I have found through the Internet.

The main problem after testing the tool is that the official website is really, really complex. So
the tool works, but I am afraid I will still need to fix or full-fil the scratched data manually.

## 2025-04-03

I have to remodel everything from the ground, from zero, from scratch.

## 2025-04-06

Ok. Got a basic draft solution with the following items

-   [x] Functional SQL database solution for PostgresSQL.
-   [x] Functional API backend with NodeJS, expressJS and node-postgres.
-   [x] Complete refactor of frontend VueJS solution
-   [x] Got eras list and details!

## 2025-04-07

Ok, I got a serious problem with images.

Image URLs obtained through the scratching process contains a temporal suffix generated when
a user visits the SW website, those images can not be access later. Additionally, my hosting solution
won't allow me to hold the whole bank of images, and as long I don't want to hold
data not of my own in this project \(repository\) I have decided to move all the images
to another solution, as I did with the database data.

For the future, after developing the eras feature, building a new whole feature, i.e. "_characters_" or "_vehicles_",
will be a really large impossible epic for just solo it. I think the best approach
is to first build a solution of ones, to know: one title, one character, one vehicle, etc.
Build the relationships among all the entities with the frontend navigation and solution,
and later on just fill the database with remaining information.

The next target is to deploy different Docker containers to a hosting solution, if possible, _free_.
So far I've tested [Heroku](https://www.heroku.com/), but it doesn't provide a solution to deploy
using [docker-compose](https://docs.docker.com/compose/). Also, I have tested [Render](https://render.com), and it
was working smoothly ... until the moment I've tried to deploy the PostgresSQL database container.

On the other hand, hosting Docker images for free can be done using either
[GitHub](https://docs.github.com/en/actions/use-cases-and-examples/publishing-packages/publishing-docker-images)
or [DockerHub](https://hub.docker.com/), so no problem with that.

Meanwhile, I've reverted the solution to a mono-repo solution and have limited the dependencies,
specially `devDependencies`. I have also fixed multiple issues with the `/scripts/*.sh` files.

Eventually I have found that GitHub can't fetch submodules if they are private repositories, well, it works
for companies solutions. But for personal solutions you are force to create a PTA and properly configure the GHA job.

I will continue on exploring the Internet in the search for a free Docker container hosting ...

## 2025-04-08

What a pity, Pug/Jade + Eslint + Typescript is a bad combination.
I must rework all `lang="pug"` templates into plain HTML.

About the Docker issue thing I've thinking to follow this "_architecture_":

1. Deploy images to Docker Hub.
2. Run assets & backend containers at Render.
3. Run database container at Heroku.
4. Deploy static website content into my host provider.

I know is not the best architecture ever, and maybe it will imply some handicaps. But I'll try it out
at least once in order to explore if it's possible.

## 2025-04-23

I have been reading a lot about where to deploy the Docker containers. My original plan to use Render & Heroku is not
going to be a long term solution, due to the limits that Render applies to the free plan. Therefore, I think I will go
with all at Heroku.

Meanwhile, I have been improving a bit the code of some specific views & contents.

I have also though on creating a kind of admin site in order to help to CRUD the database ...

## 2025-04-25

So I have decided that the former repository folders structure was a bit of ... invalid architecture.
Taking that in mind, I have reorder all the solution in order to have a better tree folder structure.

Starting today, each `feature` will contain the following sub-folders:

- `backend`: with all the resources related with backend for that specific feature
- `frontend`: with all the resources related with frontend for that specific feature
- `infra-http`: a unique infra HTTP sources for both feature's `backend` and `frontend`

Also, I have moved all applications, to know `backend`, `database` and `frontend/vue-js` to `/apps` folder.
And I have been "_forced_" to create a `/libs` folder in order to contain library content, such as components.

As result of all this changes, I have been having troubles with all the local _dockerization_ stage, the most
problematic was the NodeJS `ERR_UNSUPPORTED_DIR_IMPORT` error when trying to import CommonJS resources as ESM,
happily I have found a solution (in StackOverflow of course) here:

- https://stackoverflow.com/questions/64449464/error-err-unsupported-dir-import-directory-import-when-attempting-to-start-no

Anyway, I still have problems with the Docker solution for the FrontEnd app, ;-(
