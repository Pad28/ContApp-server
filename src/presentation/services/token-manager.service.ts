import fs from "fs";
import path from "path";

export class TokenManager {

    private data: Map<string, string>;
    private repositoryPath: string;
    private fileName: string;

    constructor() {

        this.data = new Map<string, string>();
        this.fileName = "tokens.json";
        this.repositoryPath = path.resolve(__dirname + "../../../../data");
        this.loadData();
    }

    public get getData() {
        return this.data;
    }

    private loadData() {
        const result = fs.readFileSync(this.repositoryPath + `/${this.fileName}`, { encoding: "utf-8" });
        Object.keys(JSON.parse(result)).forEach(k => this.data.set(k, k));
    }

    private saveFile() {
        const data: { [key: string]: string } = {};
        this.data.forEach(e => data[e] = e);
        fs.writeFileSync(this.repositoryPath + `/${this.fileName}`, JSON.stringify(data));
    }

    public saveToken(token: string) {
        if (!fs.existsSync(this.repositoryPath)) fs.mkdirSync(this.repositoryPath);
        this.data.set(token, token);

        this.saveFile();
        setTimeout(() => {
            this.data.delete(token);
            this.saveFile();
        }, (3600 * 1000 * 4));
    }

}