/*
 * Copyright (c) 2020 genshin.dev
 * Licensed under the Open Software License version 3.0
 */

import path from 'path';

export const dataDirectory = (type: string) =>
    path.join(__dirname, '../public/data', type);
export const imagesDirectory = (type: string) =>
    path.join(__dirname, '../public/images', type);
