export type Maybe<A> = Just<A> | Nothing<A>;

export function Maybe<A>(a?: A): Maybe<A> {
  if(a == null) {
    return Just(a);
  } else {
    return Nothing<A>();
  }
}

export interface Just<A> {
  type: 'Just';
  value: A;
  map<B>(f: (a: A) => B): Maybe<B>,
  getOrElse(f: () => A): A,
  fold<B>(z: () => B): (f: (a: A) => B) => B,
  flatMap<B>(f: (a: A) => Maybe<B>): Maybe<B>
};

export function Just<A>(value: A): Just<A>{
  return {
    type: 'Just',
    value,
    map: function<B>(f: (a: A) => B): Maybe<B>{
      return Just(f(value))
    },
    getOrElse(f: () => A): A {
      return value;
    },
    fold: function<B>(z: () => B): (f: (A) => B) => B {
      return (f: (A) => B) => f(value);
    },
    flatMap: function<B>(f: (a: A) => Maybe<B>): Maybe<B> {
      return f(value);
    }
  }
};

export interface Nothing<A> {
  type: 'Nothing'
  map<B>(f: (a: A) => B): Maybe<B>
  getOrElse(f: () => A): A,
  fold<B>(z: () => B): (f: (a: A) => B) => B,
  flatMap<B>(f: (a: A) => Maybe<B>): Maybe<B>
};

export function Nothing<A>(): Nothing<A> {
  return {
    type: 'Nothing',
    map: function <B>(f: (A)=>B): Maybe<B> {
      return Nothing<B>();
    },
    getOrElse: function (f: () => A): A {
      return f();
    },
    fold: function <B>(z: () => B): (f: (A) => B) => B {
      return (f: (A) => B) => z();
    },
    flatMap: function<B>(f: (a: A) => Maybe<B>): Maybe<B> {
      return Nothing<B>();
    }
  }
};
