module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 12,
        sourceType: "module",
        tsconfigRootDir: __dirname,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:vue/essential", "prettier"],

    plugins: ["prettier", "@typescript-eslint"],
    rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
    ignorePatterns: ["dist"],
    globals: {
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
    },
    overrides: [
        {
            files: ["*.md"],
            extends: ["prettier"],
        },
    ],
}
