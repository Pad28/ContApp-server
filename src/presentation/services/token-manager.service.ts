import fs from "fs";
import path from "path";

export class TokenManager {
    
    private data: Map<string, string>;
    private repositoryPath: string;

    constructor() {
        this.data = new Map<string, string>();
        this.repositoryPath = path.resolve(__dirname + "../../../data/local_storage");
    }

    public get getData() {
        return this.data;
    }

    private saveFile() {
        const data: {[key: string]: string} = {};
        this.data.forEach(e => data[e] = e);
        fs.writeFileSync(this.repositoryPath + "/data.json", JSON.stringify(data));
    }

    public saveToken(token:  string) {
        if(!fs.existsSync(this.repositoryPath)) fs.mkdirSync(this.repositoryPath);
        this.data.set(token, token);

        this.saveFile();
        setTimeout(() => {
            this.data.delete(token);
            this.saveFile();
        }, (3600 * 1000));
    }

}