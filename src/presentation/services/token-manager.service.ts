import fs from "fs";
import path from "path";

// Este servicio guarda de manera local los tokens generados 
export class TokenManager {

    private data: string[];
    private repositoryPath: string;

    constructor(
        private fileName: string,
    ) {
        this.data = new Array<string>();
        this.repositoryPath = path.resolve(__dirname + "../../../../data");
        this.loadData();
    }

    public get getData() {
        return this.data;
    }

    private loadData() {
        const result = fs.readFileSync(this.repositoryPath + `/${this.fileName}`, { encoding: "utf-8" });
        this.data = (JSON.parse(result) as string[]).map(str => str);
    }

    private saveFile() {
        fs.writeFileSync(this.repositoryPath + `/${this.fileName}`, JSON.stringify(this.data));
    }

    public saveToken(token: string) {
        this.data.push(token);
        this.saveFile();

        setTimeout(() => {
            this.data = this.data.filter(str => str != token);
            this.saveFile();
        }, (3600 * 1000 * 4));
    }

}