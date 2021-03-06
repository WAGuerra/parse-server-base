module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    setupFiles:[
        'dotenv/config'
    ],
    // Setup Enzyme
    "snapshotSerializers": ["enzyme-to-json/serializer"],
    "setupFilesAfterEnv": [
        "<rootDir>/test/setupEnzyme.ts", //FIXME incluir estes arquivos
        "<rootDir>/test/initializeParse.ts",
        "<rootDir>/test/initializeLibraries.ts",
    ],
}
