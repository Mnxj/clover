// date formatting functions
const toMonth = new Intl.DateTimeFormat("en", { month: "long" });
const padStart = (str:string) => str.toString().padStart(2, "0");
// format a date to YYYY-MM-DD
export const ymd = (date:any, formatStr = "YYYY-MM-DD") => {
    date = new Date(date);

    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return formatStr
        .replace(/\bYYYY\b/g, year)
        .replace(/\bYY\b/g, `${year}`.substring(2))
        .replace(/\bMM\b/g, padStart(month))
        .replace(/\bM\b/g, month)
        .replace(/\bDD\b/g, padStart(day))
        .replace(/\bD\b/g, day)
        .replace(/\bHH\b/g, padStart(hours))
        .replace(/\bhh\b/g, hours)
        .replace(/\bmm\b/g, padStart(minutes))
        .replace(/\bss\b/g, padStart(seconds));
}

// format a date to DD MMMM, YYYY
export const friendly = (date:Date) => {
    return date instanceof Date
        ? `${date.getUTCDate()} ${toMonth.format(
            date
        )}, ${date.getUTCFullYear()}`
        : "";
}
