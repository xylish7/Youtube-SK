interface RegExpression {
  URL: RegExp;
}

interface GlobalConst {
  MESSAGE_DURATION: number;
}

export const regExpressions: RegExpression = {
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g
};

export const globalConst: GlobalConst = {
  MESSAGE_DURATION: 3
};
