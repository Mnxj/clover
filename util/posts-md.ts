import {promises as fsp} from "fs";
import path from "path";
import fm from "front-matter";
import * as dateformat from "./dateformat";
import {Attributes} from "../type/attributes";

const fileExt = "md";
const postsDir = "articles";

// 获取文件夹相对路径
const absPath = (dir: string) => {
    return path.isAbsolute(dir) ? dir : path.resolve(process.cwd(), dir);
}

/**
 * 获取文件夹中 MarkDown 文件名列表，以数组形式返回
 * @returns
 */
export const getFileIds = async () => {
    const loc = absPath(postsDir);
    const files = await fsp.readdir(loc);
    return files
        .filter((fn) => path.extname(fn) === `.${fileExt}`)
        .map((fn) => path.basename(fn, path.extname(fn)));
}

/**
 * 获取单个 MarkDown 文件的内容
 * @param {*} id
 * @returns
 */
export const getFileData = async ( id: string) => {
    const file = path.join(absPath(postsDir), `${id}.${fileExt}`),
        stat = await fsp.stat(file);

    const data = await fsp.readFile(file, "utf8");
    const matter = fm(data);
    const html = matter.body;
    const attributes = matter.attributes as Attributes;
    // 日期格式化
    const date = attributes.date || stat.ctime;
    const update = attributes.updated || stat.mtime;
    attributes.createDate = dateformat.ymd(date);
    attributes.updateDate = dateformat.ymd(update);
    // 计数
    const roundTo = 10,
        readPerMin = 200,
        numFormat = new Intl.NumberFormat("en"),
        count = matter.body
            .replace(/\W/g, " ")
            .replace(/\s+/g, " ")
            .split(" ").length,
        words = Math.ceil(count / roundTo) * roundTo,
        mins = Math.ceil(count / readPerMin);

    attributes.wordCount = `本文字数：${numFormat.format(
        words
    )} 字    阅读完需：约 ${numFormat.format(mins)} 分钟`;
    return {
        id,
        html,
        ...attributes,
    };
}

export const getAllFiles = async () => {
    const files = await getFileIds();

    const results = await Promise.allSettled(
        files.map((id) => getFileData(id))
    )
    return results
        .filter(result => result.status === 'fulfilled' && result.value)
        .map((result) => (result as PromiseFulfilledResult<any>).value)
        .sort((a, b) => (a.updateDate < b.updateDate ? 1 : -1));
}
