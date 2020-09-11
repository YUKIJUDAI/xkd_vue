import dayjs from "dayjs";
import { qnUrl } from "@/config/index";

const changeDay = (val: number, gs: string = "YYYY-MM-DD HH:mm:ss") => {
    return dayjs(val * 1000).format(gs);
};

const qnImg = (val: string): string => {
    return val.includes("http") ? val : qnUrl + val;
};

export default { changeDay, qnImg };
