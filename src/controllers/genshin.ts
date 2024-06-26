import { Elysia, NotFoundError, t } from 'elysia';
import { helmet } from 'elysia-helmet';
import {
    getAvailableEntities,
    getAvailableImages,
    getEntity,
    getImage,
    getTypes,
} from '../modules/filesystem';

export const genshin = new Elysia({ prefix: '/genshin' })
    .use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: [
                        "'self'",
                        "'unsafe-inline'",
                        'cdn.jsdelivr.net',
                    ],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    imgSrc: ["'self'", 'cdn.jsdelivr.net'],
                },
            },
        })
    )
    .get('/', () => {
        const types = getTypes();
        return types;
    })
    .get(
        '/:type',
        async ({ params: { type }, query }) => {
            try {
                const entities = await getAvailableEntities(type);
                const lang = query['lang'];

                if (!entities) return;

                const entityObjects = await Promise.all(
                    entities.map(async (id) => {
                        try {
                            return await getEntity(type, id, lang as string);
                        } catch (e) {
                            return null;
                        }
                    })
                );

                //Si query n'est pas un objet vide, on filtre les entités
                if (Object.keys(query).length > 0) {
                    const test: any[] = entityObjects.filter((entity) => {
                        if (!entity) return false;

                        for (const key of Object.keys(query)) {
                            const value = entity[key];

                            if (typeof value === 'string') {
                                if (value.includes(query[key] as string))
                                    return true;
                            } else {
                                if (value == query[key]) return true;
                            }
                        }

                        return false;
                    });

                    return test;
                }

                return entityObjects;
            } catch (e) {
                throw new NotFoundError();
            }
        },
        {
            params: t.Object({
                type: t.String(),
            }),
        }
    )
    .get(
        '/:type/:id',
        ({ params: { type, id }, query }) => {
            const lang = query['lang'];

            return getEntity(type, id, lang as string);
        },
        {
            params: t.Object({
                type: t.String(),
                id: t.String(),
            }),
        }
    )
    .get(
        '/:type/:id/list',
        ({ params: { type, id } }) => {
            try {
                return getAvailableImages(type, id);
            } catch (e) {
                throw new NotFoundError();
            }
        },
        {
            params: t.Object({
                type: t.String(),
                id: t.String(),
            }),
        }
    )
    .get(
        '/:type/:id/:imageType',
        async ({ params: { type, id, imageType }, set }) => {
            try {
                const image = await getImage(type, id, imageType);

                set.headers = {
                    'Content-Type': image.type as string,
                };

                return image.image;
            } catch (e) {
                try {
                    const av = getAvailableImages(type, id);
                    return av;
                } catch (e) {
                    throw new NotFoundError();
                }
            }
        },
        {
            params: t.Object({
                type: t.String(),
                id: t.String(),
                imageType: t.String(),
            }),
        }
    );
