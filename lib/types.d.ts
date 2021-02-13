export type Component<Props> = (props: Props) => HTMLElement;

export interface StatefulProps<A> {
  useState: (init: A) => [A, Function];
}

export type StatefulComponent<A> = Component<StatefulProps<A>>;

export interface RouteProps<A> {}

export type RouteComponent<A> = Component<RouteProps<A>>;
