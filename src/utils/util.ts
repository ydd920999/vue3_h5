import { UPLOADER_IAMGE_LETTER_THAN } from '@/constants';
import dayjs, { Dayjs } from 'dayjs';
import { multiply, bignumber, floor, divide } from 'mathjs';

// 格式化行业响应值
export function formatTreeData2(data: any) {
  function format(arr: any) {
    return arr.map((t: any) => ({
      ...t,
      isLeaf: Number(t.storey) === 4 || t.childes.length <= 0 ? true : false,
      children: format(t.childes),
      key: t.code,
      title: t.name,
      childes: null,
      value: t.code,
    }));
  }
  return format(data);
}

export function treeFindPath(tree: any[], func: any, path: any = []): any {
  if (!tree) return [];
  for (const data of tree) {
    path.push(data.code);
    if (func(data)) return path;
    if (data.children) {
      const findChildren = treeFindPath(data.children, func, path);
      if (findChildren.length) return findChildren;
    }
    path.pop();
  }
  return [];
}

// 数组转树
export const array2Tree = (
  list: any,
  parentId: any,
  key = 'id',
  parentIdKey = 'parentId',
) => {
  function loop(parId: any) {
    return list.reduce((acc: any, cur: any) => {
      delete cur.isLeaf;
      if (cur[parentIdKey] == parId) {
        const children = loop(cur[key]);
        cur.children = children.length ? children : null;
        acc.push(cur);
      }
      return acc;
    }, []);
  }
  return loop(parentId);
};

// 计算行业薪资
export function makeUnitStr(item: any) {
  return `${
    item?.salaryMin
      ? item.salaryMin >= 10
        ? item.salaryMin / 10 + '万'
        : item.salaryMin + '千'
      : '-'
  }-${
    item?.salaryMax
      ? item.salaryMax >= 10
        ? item.salaryMax / 10 + '万'
        : item.salaryMax + '千'
      : '-'
  }`;
}

// 计算百分比，保留两位小数
export function makePercent(b: any) {
  return b ? (b * 100).toFixed(2) : '';
}
// 计算百分比，不保留小数
export function makePercentZero(b: any) {
  return b ? (b * 100).toFixed(0) : '';
}
export function NottoFixed(b: any) {
  return b ? (b * 10).toFixed(0) : '';
}

// 重写部分树结构 disabled 字段
export function disabledTreeData(tree: any) {
  function loop(_d: any) {
    _d.forEach((t: any) => {
      if (t.children && t.children?.length) {
        t.disabled = true;
        loop(t.children);
      }
    });
  }
  loop(tree);
}

export function fileLt5M(file: any) {
  return file.size / 1024 / 1024 < UPLOADER_IAMGE_LETTER_THAN;
}

export function fileLt20M(file: any) {
  return file.size / 1024 / 1024 < 20;
}

export function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

// export function fileLt10M(file: any) {
//   return file.size / 1024 / 1024 < UPLOADER_RESUME_LETTER_THAN;
// }

export function convertRes2Blob(response: any, _filename?: string | null) {
  if (!response?.data?.size) return;
  // 提取文件名
  const filename =
    _filename ||
    response.headers['content-disposition']?.match(/filename=(.*)/)[1];
  // 将二进制流转为blob
  const blob = new Blob([response.data], { type: 'application/octet-stream' });
  // 创建新的URL并指向File对象或者Blob对象的地址
  const blobURL = window.URL.createObjectURL(blob);
  // 创建a标签，用于跳转至下载链接
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', decodeURI(filename));
  // 兼容：某些浏览器不支持HTML5的download属性
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  // 挂载a标签
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  // 释放blob URL地址
  window.URL.revokeObjectURL(blobURL);
}

// 用户出生年月限制
export function disabledUserAgeDate(current: Dayjs) {
  return (
    current &&
    (current > dayjs(1293811199000) || current < dayjs(-315648000000))
  );
}

// 用户参加工作日期限制
export function disabledDateWorkStartYear(current: Dayjs) {
  return current && (current > dayjs() || current < dayjs(-315648000000));
}

export const aImageFallback = `data:image/png;base64,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`;

export function getWsProtocol() {
  const proto = window.location.protocol;
  if (proto.indexOf('https') > -1) return `wss://`;
  return `wss://`;
}

export function sleep(s: number) {
  return new Promise(resolve => {
    setTimeout(() => resolve(void 0), s);
  });
}

// 富文本反转义html (从接口取值后调用方法转为 Html)，v-html="escape2Html(text)"
export const escape2Html = (str: string) => {
  const arrEntities: any = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
  return str?.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (_all, t) {
    return arrEntities[t];
  });
};

export function _setInterval(fn: () => void, millisec: number, count?: number) {
  let timer: NodeJS.Timeout;
  function interval() {
    if (typeof count === 'undefined' || count-- > 0) {
      timer = setTimeout(interval, millisec);
      try {
        fn();
      } catch (e: any) {
        count = 0;
        throw e.toString();
      }
    }
  }
  timer = setTimeout(interval, millisec);
  return {
    callback: () => clearTimeout(timer),
  };
}

export function makePercents(s: any) {
  let price: any = s * 100;
  price = multiply(bignumber(Number(price)), 100);
  price = floor(Number(price));
  price = divide(bignumber(Number(price)), 100);
  return price;
}
