const _pipe = (a, b) => arg => b(a(arg));

export const pipe = (...ops) => ops.reduce(_pipe);
