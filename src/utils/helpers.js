import { auth } from "@config/firebase";
import nookies from "nookies";

export const getUserFromCookies = async (context) => {
  const cookies = nookies.get(context);
  const token = await auth.verifyIdToken(cookies.token);
  return token;
};

export const cleanObject = (data) => {
  if (typeof data !== "object") {
    return data;
  }

  return Object.keys(data).reduce(function (accumulator, key) {
    const _val = data[key];

    const isObject =
      _val !== null &&
      !(
        typeof window !== "undefined" &&
        (_val instanceof File || _val instanceof Blob)
      ) &&
      typeof _val === "object";

    let value = isObject ? cleanObject(_val) : _val;
    const isEmptyObject = isObject && !Object.keys(value).length;

    if (value === undefined) {
      // || isEmptyObject
      return accumulator;
    }

    if (Array.isArray(_val)) {
      value = Object.values(value);
    }

    return Object.assign(accumulator, { [key]: value });
  }, {});
};
