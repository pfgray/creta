export type Either<L, R> = Left<L, R> | Right<L, R>;

export interface Left<L, R> {
  type: 'Left',
  flatMap<RR>(f: (r: R) => Either<L, RR>): Either<L, RR>
}

export function Left<L, R>(l: L): Left<L, R> {
  return {
    type: 'Left',
    flatMap<RR>(f: (r: R) => Either<L, RR>){
      return Left(l);
    }
  }
}

export interface Right<L, R> {
  type: 'Right',
  flatMap<RR>(f: (r: R) => Either<L, RR>): Either<L, RR>
}

export function Right<L, R>(r: R): Right<L, R> {
  return {
    type: 'Right',
    flatMap<RR>(f: (r: R) => Either<L, RR>){
      return f(r);
    }
  }
}

function lol(): Either<string, number> {
  //return Left<string, number>(123);
  return Left<number, string>(123);
}

var myEither = lol();
