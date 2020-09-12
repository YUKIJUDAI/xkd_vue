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
