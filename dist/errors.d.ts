export declare class MiraAuthError extends Error {
    constructor(message: string);
}
export declare class MissingEnvVariableError extends MiraAuthError {
    constructor(variable: string);
}
