export class MiraAuthError extends Error {
    constructor(message) {
        super(message);
        this.name = "MiraAuthError";
    }
}
export class MissingEnvVariableError extends MiraAuthError {
    constructor(variable) {
        super(`Umgebungsvariable ${variable} fehlt. Bitte stelle sicher, dass ${variable} in deiner .env-Datei gesetzt ist.`);
        this.name = "MissingEnvVariableError";
    }
}
