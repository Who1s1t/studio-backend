import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
// Разрешить только изображения
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(
            new HttpException(
                'Only image files are allowed!',
                HttpStatus.BAD_REQUEST,
            ),
            false,
        );
    }
    // if (req[Symbol('kHeaders')]['content-length'] > 15000000) {
    //     return callback(
    //         new HttpException(
    //             'Validation failed (expected size is less than 15000000)',
    //             HttpStatus.BAD_REQUEST,
    //         ),
    //         false,
    //     );
    // }
    callback(null, true);
};
export const editFileName = (req, file, callback) => {
    const fileExtName = extname(file.originalname);
    const randomName = Array(10)
        .fill(null)
        .map(() => Math.round(Math.random() * 10).toString(10))
        .join('');
    callback(null, `${randomName}${fileExtName}`);
};