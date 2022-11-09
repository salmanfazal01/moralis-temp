import axios from "axios";
import { flatten } from "lodash";
import setLanguage from "next-translate/setLanguage";
import React from "react";

//Change App Language
export const handleLanguageChange = async (lang, router, pathname) => {
  await setLanguage(lang);
  if (router && pathname) {
    await router.replace(pathname, pathname, { locale: lang });
  }

  return null;
};

export const flattenChildren = (text, child) => {
  // console.log(typeof child);

  // return child
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

export const validateEmail = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const isArrayEqual = (array1, array2) => {
  if (typeof array1 !== "object" || typeof array2 !== "object") return false;

  if (array1.length === array2.length) {
    return array1.every((element) => {
      if (array2.includes(element)) {
        return true;
      }
      return false;
    });
  }
  return false;
};

// buildGithubPdfLink("tpn", "pdfs", "master", "AMD - CPUID.pdf")
export const buildGithubPdfLink = (user, repo, branch, pathToFile) => {
  const _path = encodeURI(pathToFile);
  const baseGithubLink = `https://github.com/${user}/${repo}/raw/${branch}/${_path}`;
  const docsLink = `https://docs.google.com/viewer?url=${baseGithubLink}&embedded=true`;

  return docsLink;
};

// Cut string with ...
export const truncateString = (str, n) => {
  if (!str) return null;
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const translateText = async (text = "text", from = "en", to = "es") => {
  try {
    const response = await axios.post(
      "https://translation.googleapis.com/language/translate/v2",
      {},
      {
        params: {
          q: text,
          source: from,
          target: to,
          key: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API,
          format: "text",
        },
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (err) {
    console.log("rest api error", err);
  }
};

export const parseLineBreaks = (str = "") => {
  if (!str) return "";
  return str.replaceAll(" \\n ", "\n").replaceAll("\\n", "\n");
};

export const extractFileInObject = (obj) => {
  const _obj = {};
  for (const [_key, _value] of Object.entries(obj)) {
    // console.log(_key, _value);
    if (_value instanceof File) {
      obj[_key] = null;
      _obj[_key] = _value;
    }
  }

  return { files: _obj, obj };
};

export const validateFileType = (file, restrict = {}) => {
  if (!file) return false;

  const { type, maxSize } = restrict;

  const fileTypes = {
    images: ["image/png", "image/jpg", "image/jpeg"],
    pdf: ["application/pdf"],
  };

  if (type && !fileTypes[type]?.includes?.(file?.[0]?.type)) {
    console.log("Wrong File Type");
    return false;
  }

  if (maxSize && file?.[0]?.size > maxSize * 1e6) {
    console.log("File size too big");
    return false;
  }

  return true;
};
