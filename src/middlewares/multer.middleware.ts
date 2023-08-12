import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';

const fileDir = path.resolve(__dirname, '..', 'tmp', 'uploads');

export const upload = multer({
    dest: fileDir,
    limits: { fileSize: 1024 * 1024 * 2 },
    storage: multer.diskStorage({
        destination(req, file, callBack) {
            callBack(null, fileDir);
        },
        filename(req, file, callBack) {
            const fileName = `${crypto.randomBytes(20).toString('hex')}-${file.originalname}`;
            callBack(null, fileName);
        }
    })
})

