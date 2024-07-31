/**
 * Represents a classic "if" condition.
 */
export type If<Cond extends boolean, True, False> = Cond extends true ? True : False;

/**
 * Represents a classic "not" logical operation.
 */
export type Not<Cond extends boolean> = If<Cond, false, true>;

/**
 * Represents classic "or" logical operation.
 */
export type Or<A extends boolean, B extends boolean> = A extends true
  ? true
  : (B extends true ? true : false);
