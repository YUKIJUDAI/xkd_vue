export interface UserInfo {
    token: string; // token
    user_code: string; // 邀请码
    user_id: number | ""; // 用户ID
    user_level: string; // 用户等级
    user_phone: string; // 用户手机
    user_referrer_id: string; // 用户上级ID
    over_time: number; // 超时时间
    nickname: string; // 微信名称
    headimgurl: string; // 微信头像
}

export const SET_USER_INFO = "SET_USER_INFO";
