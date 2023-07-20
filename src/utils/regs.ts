// 通用手机号正则
export const reg_phone =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

// 长度至少为6，至少包含数字跟字母，可以有特殊字符
export const reg_pwd = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/;

// 通用邮箱匹配
export const reg_mail =
  /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;

// 通用域名匹配
export const reg_domain =
  /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;

export const own_domain =
  /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/;

//身份证号码正则
export const card_domain =
  /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
/**
 * 验证中文
 * @param n 只能输入中文
 * @returns RegExp
 */
export const reg_gb2312 = (n = 20): RegExp => {
  return new RegExp(`^[u4e00-u9fa5]{1,${n}}$`);
};

/**
 * 验证中文和英文
 * @param n
 * @returns
 */
export const reg_gb2312_en = (n = 20, start = 1) => {
  return new RegExp(`^[\u4E00-\u9FA5A-Za-z]{${start},${n}}$`);
};

// 通用微信号匹配
export const reg_wechat = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
export const reg_wechat2 = /^([-_a-zA-Z0-9]{1,19})+$/;

// 大于2小于20的全中文
export const reg_gb2312_than2 = () => {
  return /^[\u4e00-\u9fa5]{2,20}$/;
};

export const regCompnayName = /^[A-Za-z-()（）.\u4e00-\u9fa5]{1,50}$/;
export const wechat_reg = /^[-_a-zA-Z0-9]{5,20}$/;
export const isNumberReg = /^[0-9]+.?[0-9]*$/;
export const ChineseEnglishNumbers = /^[A-z0-9\u4e00-\u9fa5]*$/; //中文英文数字
export const ChineseEnglish =
  /(^([a-zA-Z]+\s)*[a-zA-Z]+$)|(^[\u4e00-\u9fa5]+$)/; //中文或大小写英文

export const integerdecimalsTwo = /^\d+(\.\d{0,2})?$/; //整数 俩位小数

export const integer = /^[1-9]\d*$/; //整数

/* eslint-disable */
export const formatedTimeReg =
  /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/;
