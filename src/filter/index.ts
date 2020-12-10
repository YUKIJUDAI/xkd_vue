import dayjs from "dayjs";
import { qnUrl } from "@/config/index";

const changeDay = (val: number, gs: string = "YYYY-MM-DD HH:mm:ss") => {
    return dayjs(val * 1000).format(gs);
};

const qnImg = (val: string): string => {
    if (typeof val !== "string") {
        return "";
    }
    return val.includes("http") ? val : qnUrl + val;
};

const addMosaic = (val: string): string => {
    if (typeof val !== "string" || val.length !== 11) {
        return "";
    }
    return val.substr(0, 3) + " **** " + val.substr(7);
};

export default { changeDay, qnImg, addMosaic };
