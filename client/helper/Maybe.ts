export type Maybe<A> = Just<A> | Nothing;

export interface Just<A> {
  type: 'Just';
  value: A;
};

export interface Nothing {
  type: 'Nothing'
};

type CaseOfMatcher<A, B> = {
  just: (a: A) => B,
  nothing: () => B
}

export const Maybe = {
  of<A>(a: A): Maybe<A> {
    switch(a) {
      case null:
      case undefined:
        return Nothing();
      default:
        return Just(a);
    }
  },
  caseOf<A, B>(m: Maybe<A>): (c: CaseOfMatcher<A, B>) => B {
    switch(m.type){
      case 'Just':
        return c => c.just(m.value)
      case 'Nothing':
        return c => c.nothing()
    }
  },
  fold<A, B>(m: Maybe<A>): (z: () => B) => (f: (a: A) => B) => B {
    return Maybe.caseOf<A, (z: () => B) => (f: (a: A) => B) => B>(m)({
      just:     a => z => f => f(a),
      nothing: () => z => f => z()
    });
  },
  map<A, B>(m: Maybe<A>): (f: (a: A) => B) => Maybe<B>{
    switch(m.type){
      case 'Just':
        return f => Just<B>(f(m.value))
      case 'Nothing':
        return f => Nothing()
    }
  },
  getOrElse<A>(m: Maybe<A>): (f: () => A) => A {
    switch(m.type){
      case 'Just':
        return f => m.value
      case 'Nothing':
        return f => f()
    }
  },
  orElse<A>(m: Maybe<A>): (a: A) => A {
    switch(m.type){
      case 'Just':
        return a => m.value
      case 'Nothing':
        return a => a
    }
  },
  flatMap<A, B>(m: Maybe<A>): (f: (a: A) => Maybe<B>) => Maybe<B> {
    switch(m.type){
      case 'Just':
        return f => f(m.value);
      case 'Nothing':
        return f => Nothing();
    }
  },
  isJust<A>(a: Maybe<A>): Boolean {
    return Maybe.caseOf<A, Boolean>(a)({
      just: a => true,
      nothing: () => false
    });
  }
}

export function Just<A>(value: A): Just<A> {
  return {
    type: 'Just',
    value
  }
};

export function Nothing(): Nothing {
  return {
    type: 'Nothing'
  }
};
