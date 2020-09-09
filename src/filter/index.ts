import dayjs from "dayjs";

const changeDay = (val: number, gs: string = "YYYY-MM-DD HH:mm:ss") => {
    return dayjs(val * 1000).format(gs);
};

export default { changeDay };
