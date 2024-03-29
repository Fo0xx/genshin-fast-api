# Genshin Fast API

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Fo0xx/genshin-fast-api?style=for-the-badge)

This is an unofficial remake of the [Genshin.dev Impact API](https://github.com/genshindev/api).

This is an API that serves data for the game Genshin Impact by miHoYo.
(All rights to the game and its assets belong to miHoYo.)

**Sooner, it will be hosted on a server and will be available for public use.**

## Usage

This API offers various endpoints for retrieving data on in game objects.
Please note that this API does **NOT** interact with your game!.
This API only provides static data about the game.

### Endpoints Overview

> **:information_source: Notice:** Please replace `<baseUrl>` with the endpoint you are trying to access.

| Endpoint                        | Description                                                      | Example Usage (bash)                  |
| ------------------------------- | ---------------------------------------------------------------- | ------------------------------------- |
| `/genshin`                      | Returns a list of available entity types.                        | `curl <baseUrl>/genshin`              |
| `/genshin/:type`                | Returns a list of available entities of a type.                  | `curl <baseUrl>/genshin/characters`   |
| `/genshin/:type/:id`            | Returns the data of a specific entity.                           | `curl <baseUrl>/genshin/characters/1` |
| `/genshin/:type/:id/list`       | Returns a list of available image types for a specific entity.   | `curl <baseUrl>/characters/1/list`    |
| `/genshin/:type/:id/:imageType` | Returns the image of a specific entity.                          | `curl <baseUrl>/characters/1/card`    |

> **:information_source: Notice:** You can provide an optional `lang` query parameter to localize the responses.
> Not all data might be included in all languages!

## Planned Features

- Entity relationships (e.g. characters linking to the best weapon for them)
- Web UI to make adding data even more simple

## Prerequisites

- Node.js (v18 or higher)
- Bun (npm install -g bun)

## Installation

Install packages with bun:

```bash 
bun install
```

### Production

Build the project using the following command:

```
bun build
```

Then start the server with this command:

```
bun start
```

### Development

Start the dev server with this command:

```
bun dev
```

## Contributing

Contributing is pretty simple if you want to just add new characters, nations, new entity types, translations etc, which will be explained in the following sections. \
Then simply [create a new Pull Request](https://github.com/Fo0xx/genshin-fast-api/pulls) with your changes and we will have a look at it as soon as we have time!

### Adding a new entity to an existing type

For adding a new entity to an already existing entity type, simply add a new folder in the `public/data/{entityType}/{entityName}` folder with `{entityType}` being replaced with the name of the entity you want to add in all-lowercase and each white-space replaced with a `-` and `{entityName}` being replaced with the name of the entity you want to add in all-lowercase and each white-space replaced with a `-`, e.g. `Diluc` becomes `diluc`. \
Then create a `en.json` file which contains all the basic data of the entity you're adding, preferably with the same field names that other entities with the same entity type have.

### Adding a new entity type

Adding a new entity type is very, very simple. All you need to do is create a new folder in the `public/data` directory, e.g. `nations`. The name of the folder should be in all-lowercase and have each white-space replaced with a `-`, e.g. `Cooking Ingredients` becomes `cooking-ingredients`. \
Then simply add new entities to your new entity type as described in [Adding a new entity to an existing type](#Adding-a-new-entity-to-an-existing-type).

### Adding entity translations

Adding translations to an already existing entity is as trivial as adding a new file with the name `{countryCode}.json` with `{countryCode}` being replaced with the country code of the language you want to add, e.g. if you wanted to add French it would be `fr`. \
Then simply add overrides for the data that's present on the `en.json` with the translated content. \
**Note that it is preferred if you use official translations over your own translations where possible.**

### Adding images to an entity

For entities like characters, images are being served from `public/images/{entityType}/{entityId}`. These images can be in any image format (`heic, heif, jpeg, jpg, png, raw, tiff, webp, gif`), but have their extension stripped, e.g. `icon.webp` becomes `icon`. \
Then simply add the file to the `assets/images/{entityType}/{entityId}` folder or create it if it doesn't already exist.

### License

Licensed under Open Software License v3.0
