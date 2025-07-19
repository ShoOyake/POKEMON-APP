# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

----------初心者向けメモ-----------

1⃣スプレッド構文　...
以下、例
const player = { name: "勇者", hp: 50, mp: 30 };

このコード：
setPlayer({ ...player, hp: 20 });
は以下と同じ意味：
setPlayer({ name: "勇者", hp: 20, mp: 30 });
つまり、player の中身をコピーしつつ、hp だけを 20 にするイメージ。


2⃣ローカル実行
frontend :
npm run dev

backend :
 仮想環境の作成
 python -m venv 仮想環境名
 仮想環境の有効化
 Windows: 仮想環境名\Scripts\activate
 macOS/Linux: source 仮想環境名/bin/activate

 必要なパッケージのインストール
 fastapiフレームワークのインストール
 pip install fastapi
 ローカル実行用のuvicornサーバーのインストール
 pip install uvicorn

 サーバーの起動　main.pyのappインスタンス指定。デコレータで変更の度に自動更新
 uvicorn main:app --reload
