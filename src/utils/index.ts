import { getDomain } from "tldts";

export type Platform = {
    code: "dy" | "xhs" | "ks";
    url: string;
}

export function getPlatform(urlStr: string): Platform | undefined {
    const domain = getDomain(urlStr);
    switch (domain) {
        case "xiaohongshu.com":
            return {
                code: "xhs",
                url: "https://www.xiaohongshu.com",
            };
        case "douyin.com":
            return {
                code: "dy",
                url: "https://www.douyin.com",
            };
        case "kuaishou.com":
            return {
                code: "ks",
                url: "https://www.kuaishou.com",
            };
    }
}