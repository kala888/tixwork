import _ from 'lodash';

//密码等级枚举
export type PasswordLevel = 'EASY' | 'MIDIUM' | 'STRONG' | 'VERY_STRONG' | 'EXTREMELY_STRONG';
//字符类型枚举
type CHAR_TYPE = 'NUM' | 'SMALL_LETTER' | 'CAPITAL_LETTER' | 'OTHER_CHAR';

//简单密码字典
const DICTIONARY = [
  'password',
  'abc123',
  'iloveyou',
  'adobe123',
  '123123',
  'sunshine',
  '1314520',
  'a1b2c3',
  '123qwe',
  'aaa111',
  'qweasd',
  'admin',
  'password',
  'admin123',
  'welcome',
];
//数字长度
const SIZE_TABLE = [9, 99, 999, 9999, 99999, 999999, 9999999, 99999999, 999999999, 9007199254740991];

/**
 * Check character's type, includes num, capital letter, small letter and other character.
 * 检查字符类型
 */
const checkCharacterType = (c): CHAR_TYPE => {
  const lower = /^[a-z]+$/;
  const upper = /^[A-Z]+$/;
  const num = /^[0-9]+$/;
  if (num.test(c)) {
    return 'NUM';
  }
  if (upper.test(c)) {
    return 'CAPITAL_LETTER';
  }
  if (lower.test(c)) {
    return 'SMALL_LETTER';
  }
  return 'OTHER_CHAR';
};

/**
 * 计算密码中指定字符类型的数量
 */
const countLetter = (password: string, type: CHAR_TYPE): number => {
  let count = 0;
  if (null !== password) {
    const length = password.length;
    if (length > 0) {
      for (let i = 0; i < length; i++) {
        if (checkCharacterType(password.charAt(i)) === type) {
          count++;
        }
      }
    }
  }
  return count;
};

/**
 * 检查给定字符串的所有字符是否都一样
 */
const isCharEquals = (str: string): boolean => {
  if (null !== str) {
    const length = str.length;
    if (length > 0) {
      const first = str.charAt(0);
      for (let i = 1; i < length; i++) {
        if (first !== str.charAt(i)) {
          return false;
        }
      }
    }
  }
  return true;
};
const isNumeric = (str: string): boolean => {
  return !_.isNaN(_.toNumber(str));
};

/**
 * calculate the size of an integer number
 */
const sizeOfInt = (x) => {
  for (let i = 0; ; i++)
    if (x <= SIZE_TABLE[i]) {
      return i + 1;
    }
};

/**
 * 检查密码的健壮性
 */
const check = (password: string): number => {
  let level = 0;
  if (null === password) {
    return level;
  }
  const len = password.length;

  const numberLength = countLetter(password, 'NUM');
  const smallLetterLength = countLetter(password, 'SMALL_LETTER');
  const capitalLetterLength = countLetter(password, 'CAPITAL_LETTER');
  const otherCharLength = countLetter(password, 'OTHER_CHAR');

  // increase points
  if (numberLength > 0) {
    level++;
  }
  if (smallLetterLength > 0) {
    level++;
  }
  if (len > 4 && capitalLetterLength > 0) {
    level++;
  }
  if (len > 6 && otherCharLength > 0) {
    level++;
  }

  if (
    (len > 4 && numberLength > 0 && smallLetterLength > 0) ||
    (numberLength > 0 && capitalLetterLength > 0) ||
    (numberLength > 0 && otherCharLength > 0) ||
    (smallLetterLength > 0 && capitalLetterLength > 0) ||
    (smallLetterLength > 0 && otherCharLength > 0) ||
    (capitalLetterLength > 0 && otherCharLength > 0)
  ) {
    level++;
  }

  if (
    (len > 6 && numberLength > 0 && smallLetterLength > 0 && capitalLetterLength > 0) ||
    (numberLength > 0 && smallLetterLength > 0 && otherCharLength > 0) ||
    (numberLength > 0 && capitalLetterLength > 0 && otherCharLength > 0) ||
    (smallLetterLength > 0 && capitalLetterLength > 0 && otherCharLength > 0)
  ) {
    level++;
  }

  if (len > 8 && numberLength > 0 && smallLetterLength > 0 && capitalLetterLength > 0 && otherCharLength > 0) {
    level++;
  }

  if (
    (len > 6 && numberLength >= 3 && smallLetterLength >= 3) ||
    (numberLength >= 3 && capitalLetterLength >= 3) ||
    (numberLength >= 3 && otherCharLength >= 2) ||
    (smallLetterLength >= 3 && capitalLetterLength >= 3) ||
    (smallLetterLength >= 3 && otherCharLength >= 2) ||
    (capitalLetterLength >= 3 && otherCharLength >= 2)
  ) {
    level++;
  }

  if (
    (len > 8 && numberLength >= 2 && smallLetterLength >= 2 && capitalLetterLength >= 2) ||
    (numberLength >= 2 && smallLetterLength >= 2 && otherCharLength >= 2) ||
    (numberLength >= 2 && capitalLetterLength >= 2 && otherCharLength >= 2) ||
    (smallLetterLength >= 2 && capitalLetterLength >= 2 && otherCharLength >= 2)
  ) {
    level++;
  }

  if (len > 10 && numberLength >= 2 && smallLetterLength >= 2 && capitalLetterLength >= 2 && otherCharLength >= 2) {
    level++;
  }

  if (otherCharLength >= 3) {
    level++;
  }
  if (otherCharLength >= 6) {
    level++;
  }

  if (len > 12) {
    level++;
    if (len >= 16) {
      level++;
    }
  }
  // decrease points
  if ('abcdefghijklmnopqrstuvwxyz'.indexOf(password) > 0 || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(password) > 0) {
    level--;
  }
  if ('qwertyuiop'.indexOf(password) > 0 || 'asdfghjkl'.indexOf(password) > 0 || 'zxcvbnm'.indexOf(password) > 0) {
    level--;
  }
  if (isNumeric(password) && ('01234567890'.indexOf(password) > 0 || '09876543210'.indexOf(password) > 0)) {
    level--;
  }

  if (numberLength === len || smallLetterLength === len || capitalLetterLength === len) {
    level--;
  }

  if (len % 2 === 0) {
    // aaabbb
    let part1 = password.substring(0, len / 2);
    let part2 = password.substring(len / 2);
    if (part1 === part2) {
      level--;
    }
    if (isCharEquals(part1) && isCharEquals(part2)) {
      level--;
    }
  }
  if (len % 3 === 0) {
    // ababab
    let part1 = password.substring(0, len / 3);
    let part2 = password.substring(len / 3, (len / 3) * 2);
    let part3 = password.substring((len / 3) * 2);
    if (part1 === part2 && part2 === part3) {
      level--;
    }
  }

  if (isNumeric(password) && len >= 6 && len <= 8) {
    // 19881010 or 881010
    let year = 0;
    if (len === 8 || len === 6) {
      year = _.toInteger(password.substring(0, len - 4));
    }
    let size = sizeOfInt(year);
    let month = _.toInteger(password.substring(size, size + 2));
    let day = _.toInteger(password.substring(size + 2, len));
    if (year >= 1950 && year < 2050 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      level--;
    }
  }
  DICTIONARY.forEach((weak) => {
    if (password === weak || weak.indexOf(password) > 0) {
      level = 0;
    }
  });

  if (len <= 6) {
    level--;
    if (len <= 4) {
      level--;
      if (len <= 3) {
        level = 0;
      }
    }
  }

  if (isCharEquals(password)) {
    level = 0;
  }

  if (level < 0) {
    level = 0;
  }
  return level > 0 ? level : 0;
};

/**
 * Get password strength level, includes easy, midium, strong, very strong, extremely strong
 */
const getLevel = (password: string): PasswordLevel => {
  const level = check(password);
  console.log('password:', password, 'level:', level);
  switch (level) {
    case 0:
    case 1:
    case 2:
    case 3:
      return 'EASY';
    case 4:
    case 5:
    case 6:
      return 'MIDIUM';
    case 7:
    case 8:
    case 9:
      return 'STRONG';
    case 10:
    case 11:
    case 12:
      return 'VERY_STRONG';
    default:
      return 'EXTREMELY_STRONG';
  }
};

const PasswordUtils = {
  check,
  getLevel,
  isEasyPassword: (password: string): boolean => 'EASY' === getLevel(password),
};
export default PasswordUtils;
