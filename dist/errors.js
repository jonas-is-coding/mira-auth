"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingEnvVariableError = exports.MiraAuthError = void 0;
class MiraAuthError extends Error {
    constructor(message) {
        super(message);
        this.name = "MiraAuthError";
    }
}
exports.MiraAuthError = MiraAuthError;
class MissingEnvVariableError extends MiraAuthError {
    constructor(variable) {
        super(`Umgebungsvariable ${variable} fehlt. Bitte stelle sicher, dass ${variable} in deiner .env-Datei gesetzt ist.`);
        this.name = "MissingEnvVariableError";
    }
}
exports.MissingEnvVariableError = MissingEnvVariableError;
