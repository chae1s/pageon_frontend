import dayjs from "dayjs";

export function formatDate(dateTimeString: string) : string {
    if (!dateTimeString) {
        return '';
    }

    return dayjs(dateTimeString).format('YYYY.MM.DD');

}

export function formatDateAndTime(dateTimeString: string) : string {
    if (!dateTimeString) {
        return '';
    }

    return dayjs(dateTimeString).format('YYYY.MM.DD HH:mm:ss');
}

export function formatNumber(num: number | string | undefined | null) : string {
    if (num === null || num === undefined || num === '') {
        return '0';
    }

    return Number(num).toLocaleString();
}

export function formatCompactNumber(num: number | undefined | null): string {
    if (num === null || num === undefined) return "0";
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2).replace(/\.00$/, "").replace(/(\.[1-9])0$/, "$1") + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
}