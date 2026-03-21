export type Primitive = string | number | boolean | symbol | bigint | null | undefined;
export type RemappableValue = Primitive | RemappableObject | RemappableValue[];
export type RemappableObject = Record<string, RemappableValue>;
export type NestedPath = string | string[];
export type DeepRemapRule = [string, NestedPath];
export type RemapRule = string | DeepRemapRule;
export type RemapMapping<
  TObject extends RemappableObject,
  TResult extends RemappableObject = TObject
> = Record<string, RemapRule> & Partial<Record<keyof TObject, RemapRule>>;
export type CurriedRemapper<
  TInput extends RemappableObject,
  TOutput extends RemappableObject
> = (ogObj: TInput) => TOutput;

export function remapKeys<
  TObject extends RemappableObject,
  TResult extends RemappableObject = TObject
>(mapping: RemapMapping<TObject, TResult>): CurriedRemapper<TObject, TResult>;
export function remapKeys<
  TObject extends RemappableObject,
  TResult extends RemappableObject = TObject
>(mapping: RemapMapping<TObject, TResult>, ogObj: TObject): TResult;
