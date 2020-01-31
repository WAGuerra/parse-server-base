import path from "path";

export const databaseUri = '' + process.env.DATABASE_URI + process.env.DATABASE_NAME;
export const appId = process.env.APP_ID;
export const masterKey = process.env.MASTER_KEY;
export const cloudCodeMain = path.join(__dirname,'cloud.js');
export const serverUrl = `${process.env.SERVER_DOMAIN}${process.env.PARSE_MOUNT}`;
export const parseDashboardRootPass = process.env.PARSE_DASHBOARD_ROOT_USER_PASSWORD;
