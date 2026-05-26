import { lazy, type ComponentType } from "react";

// React.lazy uses ComponentType<any> as its generic constraint, so we mirror it
// here to accept any component regardless of its props shape.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = ComponentType<any>;

export const lazyNamed = <
  TName extends string,
  TComponent extends AnyComponent,
>(
  loader: () => Promise<Record<TName, TComponent>>,
  name: TName,
) => lazy(() => loader().then((module) => ({ default: module[name] })));
