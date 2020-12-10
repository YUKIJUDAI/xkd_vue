import { qnUrl } from "@/config/index";
var QRCode = require("qrcode");

export const trim = (str: string) => {
    str = str + "";
    return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, "");
};
// 验证手机号
export const phoneVerification = (phone: string) => {
    const reg = /^1[3-9]{1}[0-9]{9}$/i;
    return reg.test(trim(phone));
};

// blob转base64
export const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (e: any) => {
            resolve(e.target.result);
        };
        fileReader.readAsDataURL(blob);
        fileReader.onerror = () => {
            reject(new Error("blobToBase64 error"));
        };
    });
};

// 是否有带http
const qnImg = (val: string): string => {
    return val.includes("http") ? val : qnUrl + val;
};

// 下载图片
export const downloadImg = (url: string, title = "下载") => {
    var a = document.createElement("a");
    var event = new MouseEvent("click");
    a.download = title;
    a.href = url;
    a.dispatchEvent(event);
};

// 生成二维码
export const createQRCode = (url: string | number) => {
    if (typeof url === "string") return QRCode.toDataURL(qnImg(url));
    if (typeof url === "number")
        return new Promise((res, rej) => {
            res(qnImg(url + ""));
        });
};

// 判断微信浏览器
export const isWeixin = () => {
    var ua: any = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
};

// 判断环境
export const isMobile = (): boolean => {
    var device = navigator.userAgent;
    var isAndroid = device.indexOf("Android") > -1 || device.indexOf("Adr") > -1; 
    var isiOS = !!device.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    return isAndroid || isiOS;
};
