import * as mkdirp from 'mkdirp';
import * as path from 'path';
import { denodeify } from 'q';
import * as fs from 'fs';


const mkdir = denodeify(mkdirp);

function fileExists(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        fs.exists(path, exists => {
            resolve(exists);
        });
    });
}

export default class File {
    private rootPath: string | undefined;

    constructor(rootPath: string | undefined) {
        this.rootPath = rootPath;
    }


    async create(filePath: string) {

        if (process.platform === 'win32') {
            filePath = this.rootPath + '\\resources\\views\\' + filePath;
        } else {
            filePath = this.rootPath + '/resources/views/' + filePath;
        }
        const doesFileExist: boolean = await fileExists(filePath);
        const dirname: string = path.dirname(filePath);

        if (!doesFileExist) {
            await mkdir(dirname);
            await fs.writeFileSync(filePath, '@extends(\'layouts.\') \n\n\n@section(\'content\')\n\n\n\n\n\n\n\n@endsection');

            return filePath;
        }

        return filePath;
    }
}