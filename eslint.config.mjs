import globals from 'globals';
export default [{files:['back/bomb/**/*.js','front/src/BombArena.jsx','tests/bomb*.js','tests/bomb*.mjs'],languageOptions:{ecmaVersion:'latest',sourceType:'module',parserOptions:{ecmaFeatures:{jsx:true}},globals:{...globals.browser,...globals.node}},rules:{'no-undef':'error','no-unreachable':'error','no-constant-condition':['error',{checkLoops:false}]}}];
