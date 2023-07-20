import {
  own_domain,
  reg_domain,
  reg_gb2312_en,
  reg_mail,
  reg_phone,
  reg_pwd,
  reg_wechat,
  reg_gb2312_than2,
  regCompnayName,
  reg_wechat2,
  ChineseEnglishNumbers,
  ChineseEnglish,
  integerdecimalsTwo,
  integer,
} from './regs';

/**
 * 判断手机号是否合格
 * @param str 手机号或者其他字符串
 * @returns {Boolean} 返回是否是合格手机号
 */
export const isValidPhone = (str: string | number): boolean =>
  reg_phone.test(str as unknown as string);

/**
 * 判断是不是合适密码，密码至少需要一个数字和一个字母，可以有特殊字符，最少6位
 * @param str 输入字符串
 * @returns {Boolean}
 */
export const isValidPwd = (str: string): boolean => reg_pwd.test(str);

/**
 * 判断是否是合法邮箱
 * @param str
 * @returns {Boolean}
 */
export const isValidMail = (str: string): boolean => reg_mail.test(str);

/**
 * 判断域名是否合法
 * @param str
 * @returns {Boolean}
 */
export const isValidDomain = (str: string): boolean => reg_domain.test(str);
export const isValidUrl = (str: string): boolean => own_domain.test(str);

/**
 * 判断是不是合法真实姓名
 * @param str
 * @returns
 */
export const isValidName = (str: string): boolean =>
  reg_gb2312_en(10).test(str);

// 合法企业名，中英文小于50字
export const isValildCompanyName = (str: string): boolean =>
  regCompnayName.test(str);

// 合法职位名，中英文小于4个字
export const isValidPositionName = (str: string): boolean =>
  reg_gb2312_en(4).test(str);

// 合法汇报对象名，中英文小于4个字
export const isReportTargetName = (str: string): boolean =>
  reg_gb2312_en(6).test(str);

// 合法职位名2，中文大于2小于20个字
export const isValidPositionName2 = (str: string): boolean =>
  reg_gb2312_than2().test(str);

export const isWechat = (str: string): boolean => reg_wechat2.test(str);

//中文英文数字
export const ChineseEnglishNumber = (str: string): boolean =>
  ChineseEnglishNumbers.test(str);

//中文英文
export const ChineseEnglishs = (str: string): boolean =>
  ChineseEnglish.test(str);

//整数 支持小数2位
export const integerdecimalsTwos = (str: string): boolean =>
  integerdecimalsTwo.test(str);

//整数
export const integers = (str: string): boolean => integer.test(str);

// 校验职位面试时间
export const validateInterviewTime = (_rule: any, value: any[]) => {
  const _value = value.filter(t => {
    if (Array.isArray(t)) {
      if (t.length) {
        return t;
      }
    } else {
      return t;
    }
  });
  if (!value.length || _value.length < 3) {
    return Promise.reject('请选择面试时间');
  }

  const flag = _value.every((t: any) => t);
  if (flag) {
    const middle = parseInt(_value[1]);
    const after = parseInt(_value[2]);
    if (middle > after) {
      return Promise.reject('开始时间不能大于结束时间');
    }
    return Promise.resolve();
  } else {
    return Promise.resolve();
  }
};

// 校验和求职者的面试时间
export const validateInterviewTimeOfYuYue = (_rule: any, value: any[]) => {
  if (!value.length) {
    return Promise.reject('请选择面试时间');
  }

  const flag = value.every((t: any) => t);

  if (flag) {
    return Promise.resolve();
  } else {
    return Promise.reject('请选择面试时间');
  }
};

export const isEmtpyRichText = (_rule: any, value: any) => {
  const getText = (str: string) => {
    return str.replace(/<[^<>]+>/g, '').replace(/&nbsp;/gi, '');
  };
  const isNull = (str: string) => {
    if (str == '') return true;
    const regu = '^[ ]+$';
    const re = new RegExp(regu);
    return re.test(str);
  };

  if (isNull(getText(value))) {
    return Promise.reject(`请输入商品详情`);
  }
  return Promise.resolve();
};
