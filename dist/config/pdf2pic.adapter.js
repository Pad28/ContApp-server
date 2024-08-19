"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdf2pic = void 0;
const pdf2pic_1 = require("pdf2pic");
const uuid_adapater_1 = require("./uuid.adapater");
exports.pdf2pic = {
    convert: (file, page, savePath) => __awaiter(void 0, void 0, void 0, function* () {
        const convert = (0, pdf2pic_1.fromPath)(file, {
            density: 100,
            saveFilename: uuid_adapater_1.uuid.v4(),
            format: "png",
            width: 600,
            height: 900,
            quality: 100,
            savePath,
        });
        try {
            return yield convert(page, { responseType: "image" });
        }
        catch (error) {
            console.log(error);
        }
    })
};
