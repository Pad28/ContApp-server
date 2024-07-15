import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export const bcryptjsAdapter = {
    hash: (password: string) => {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    },
    compare: (password: string, hashed: string) => {
        return compareSync(password, hashed);
    },
}

