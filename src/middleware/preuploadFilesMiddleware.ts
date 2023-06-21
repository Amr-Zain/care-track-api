import { randomUUID } from "crypto";
import path from 'path';
import fs from 'fs'

export default function preuploadFilesMiddleware (req, res, next) {
    req.folder = randomUUID();
    const articleDir = path.resolve(__dirname,'../../public/article/' + req.folder + '/');
    fs.mkdirSync(articleDir);
    req.articaleDir = articleDir;
    next();
}