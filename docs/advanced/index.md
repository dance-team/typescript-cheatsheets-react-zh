---
id: intro
sidebar_label: 介绍
title: 高级速查表
---

**此高级速查表** 有助于展示和解释通用类型的高级用法，供编写可重用类型实用程序/函数/渲染道具/高阶组件​​和 TS+React **库** 的人使用。

- 它还为专业用户提供了各种提示和技巧。
- 为明确类型提供贡献的建议
- 目标是充分利用 TypeScript。

**创建 React + TypeScript 库**

现在创建 React + TS 库的最佳工具是 [`tsdx`](https://github.com/palmerhq/tsdx)。运行 `npx tsdx create` 并选择“react”选项。您可以查看 [React 用户指南](https://github.com/palmerhq/tsdx/issues/5)，了解有关 React+TS 库最佳实践和生产优化的一些提示。

另一种选择是 [Rollpkg](https://github.com/rafgraph/rollpkg)，它使用 Rollup 和 TypeScript 编译器（不是 Babel）来创建包。它包括 TypeScript、Prettier、ESLint 和 Jest（与 React 一起使用的设置）的默认配置，以及每个构建的 [Bundlephobia](https://bundlephobia.com/) 包统计信息。

- 请务必检查 [`basarat` 的指南](https://basarat.gitbooks.io/typescript/content/docs/quick/library.html) 以了解库 tsconfig 设置。
- Alec Larson：[TypeScript 库的最佳汇总配置](https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226)
- 快速创建和配置一个 Node.js 库：https://github.com/bitjson/typescript-starter