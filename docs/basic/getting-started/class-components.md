---
id: class_components
title: 类组件
---

在 TypeScript 中，`React.Component` 是一个泛型类型（写作 `React.Component<PropType, StateType>`），所以你可以为其可选的提供参数和 state 的类型参数：

```tsx
type MyProps = {
  // 用 `interface` 也可以
  message: string;
};
type MyState = {
  count: number; // 就像这样
};
class App extends React.Component<MyProps, MyState> {
  state: MyState = {
    // 为了更好地类型推断，提供第二个类型
    count: 0,
  };
  render() {
    return (
      <div>
        {this.props.message} {this.state.count}
      </div>
    );
  }
}
```

[在 TypeScript Playground 中查看](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgFlqAFHMAZzgF44BvCuHAD0QuAFd2wAHYBzOAANpMJFEzok8uME4oANuwhwIAawFwQSduxQykALjjsYUaTIDcFAL4fyNOo2oAZRgUZW4+MzQIMSkYBykxEAAjFTdhUV1gY3oYAAttLx80XRQrOABBMDA4JAAPZSkAE05kdBgAOgBhXEgpJFiAHiZWCA4AGgDg0KQAPgjyQSdphyYpsJ5+BcF0ozAYYAgpPUckKKa4FCkpCBD9w7hMaDgUmGUoOD96aUwVfrQkMyCKIxOJwAAMZm8ZiITRUAAoAJTzbZwIgwMRQKRwOGA7YDRrAABuM1xKN4eW07TAbHY7QsVhsSE8fAptKWynawNinlJcAGQgJxNxCJ8gh55E8QA)

别忘了你可以 export/import/extend 这些 type/interface 以供复用。

<details>
<summary><b>为什么声明了 <code>state</code> 的类型两次？</b></summary>

对 `state` 类属性声明类型并不是绝对必要的，但它可以在读取 `this.state` 和初始化状态时进行更好的类型推断。

这是因为它们以两种不同的方式工作，第二个泛型类型参数将允许 `this.setState()` 正常工作，因为该方法来自基类，但是在组件内部初始化 `state` 会覆盖基类中的实现，因此你必须确保你告诉编译器你实际上并没有做任何不同的事情。

[在此处查看 @ferdaber 的评论](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/57).

</details>

<details>
  <summary><b>没必要使用 <code>readonly</code></b></summary>

你经常看到使用 `readonly` 来标记 props 和 state 不可变的示例代码：

```tsx
type MyProps = {
  readonly message: string;
};
type MyState = {
  readonly count: number;
};
```

这不是必要的，因为 `React.Component<P,S>` 已经将它们标记为不可变的。 ([看一下 PR 和讨论！](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/26813))

</details>

**类方法**: 像平常一样做，但是要记住，你的函数中的任何参数也需要标注类型：

```tsx
class App extends React.Component<{ message: string }, { count: number }> {
  state = { count: 0 };
  render() {
    return (
      <div onClick={() => this.increment(1)}>
        {this.props.message} {this.state.count}
      </div>
    );
  }
  increment = (amt: number) => {
    // like this
    this.setState((state) => ({
      count: state.count + amt,
    }));
  };
}
```

[在 TypeScript Playground 中查看](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeAN5wQSBigDmSAFxw6MKMB5q4AXwA0cRWggBXHjG09rIAEZIoJgHwWKcHTBTccAC8FnBWtvZwAAwmANw+cET8bgAUAJTe5L6+RDDWUDxwKQnZcLJ8wABucBA8YtTAaADWQfLpwV4wABbAdCIGaETKdikAjGnGHiWlFt29ImA4YH3KqhrGsz19ugFIIuF2xtO+sgD0FZVTWdlp8ddH1wNDMsFFKCCRji5uGUFe8tNTqc4A0mkg4HM6NNISI6EgYABlfzcFI7QJ-IoA66lA6RNF7XFwADUcHeMGmxjStwSxjuxiAA)

**类属性**: 如果你需要声明类属性以供后边使用，只需像 `state` 一样声明它，但不需要赋值：

```tsx
class App extends React.Component<{
  message: string;
}> {
  pointer: number; // 就像这样
  componentDidMount() {
    this.pointer = 3;
  }
  render() {
    return (
      <div>
        {this.props.message} and {this.pointer}
      </div>
    );
  }
}
```

[在 TypeScript Playground 中查看]](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeAN4U4cEEgYoA5kgBccOjCjAeGgNwUAvgD44i8sshHuUXTwCuIAEZIoJuAHo-OGpgAGskOBgAC2A6JTg0SQhpHhgAEWA+AFkIVxSACgBKGzjlKJiRBxTvOABeOABmMzs4cziifm9C4ublIhhXKB44PJLlOFk+YAA3S1GxmzK6CpwwJdV1LXM4FH4F6KXKp1aesdk-SZnRgqblY-MgA)

[需要补充什么？提一个 issue 吧](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).

## Typing getDerivedStateFromProps

在开始使用 `getDerivedStateFromProps` 之前，请先阅读一下 [React 文档](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) 以及 [你大概不需要从 props 中获取 state](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)。派生状态可以使用 hooks 来实现，hooks 也可以用来设置 memo。

以下是为 `getDerivedStateFromProps` 声明类型的几种方式

1. 如果你已经明确输入的派生状态的类型并希望 `getDerivedStateFromProps` 的返回值符合它。

```tsx
class Comp extends React.Component<Props, State> {
  static getDerivedStateFromProps(
    props: Props,
    state: State
  ): Partial<State> | null {
    //
  }
}
```

2. 当你希望函数的返回值确定你 state 的类型时。

```tsx
class Comp extends React.Component<
  Props,
  ReturnType<typeof Comp["getDerivedStateFromProps"]>
> {
  static getDerivedStateFromProps(props: Props) {}
}
```

3. 当你希望派生状态和其它 state 以及 memoization 共用的时候。

```tsx
type CustomValue = any;
interface Props {
  propA: CustomValue;
}
interface DefinedState {
  otherStateField: string;
}
type State = DefinedState & ReturnType<typeof transformPropsToState>;
function transformPropsToState(props: Props) {
  return {
    savedPropA: props.propA, // save for memoization
    derivedState: props.propA,
  };
}
class Comp extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      otherStateField: "123",
      ...transformPropsToState(props),
    };
  }
  static getDerivedStateFromProps(props: Props, state: State) {
    if (isEqual(props.propA, state.savedPropA)) return null;
    return transformPropsToState(props);
  }
}
```

[在 TypeScript Playground 中查看](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoUSWOYAZwFEBHAVxQBs5tcD2IATFHQAWAOnpJWHMuQowAnmCRwAwizoxcANQ4tlAXjgoAdvIDcFYMZhIomdMoAKOMHTgBvCnDhgXAQQAuVXVNEB12PQtyAF9La1t7NGUAESRMKyR+AGUYFBsPLzgIGGFbHLykADFgJHZ+II0oKwBzKNjyBSU4cvzDVPTjTJ7lADJEJBgWKGMAFUUkAB5OpAhMOBgoEzpMaBBnCFcZiGGAPijMFmMMYAhjdc3jbd39w+PcmwAKXwO6IJe6ACUBXI3iIk2mwO83joKAAbpkXoEfC46KJvmA-AAaOAAehxcBh8K40DgICQIAgwAAXnkbsZCt5+LZgPDsu8kEF0aj0X5CtE2hQ0OwhG4VLgwHAkAAPGzGfhuZDoGCiRxTJBi8C3JDWBb-bGnSFwNC3RosDDQL4ov4ooGeEFQugsJRQS0-AFRKHrYT0UQaCpwQx2z3eYqlKDDaq1epwABEAEYAEwAZhjmIZUNEmY2Wx2UD2KKOw1drgB6f5fMKfpgwDQcGaE1STVZEZw+Z+xd+cD1BPZQWGtvTwDWH3ozDY7A7aP82KrSF9cIR-gBQLBUzuxhY7HYHqhq4h2ceubbryLXPdFZiQA)
