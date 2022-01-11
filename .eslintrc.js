module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2022,
        sourceType: "module",
        tsconfigRootDir: __dirname,
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:vue/vue3-recommended",
        //"plugin:vue/recommended",
    ],
    plugins: ["prettier", "@typescript-eslint"],
    rules: {
        "no-unused-vars": "off",
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
