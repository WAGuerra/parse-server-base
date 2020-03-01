import Parse from "parse";

export const initializeApi = ()=>{
    //Register Classes Here

    Parse.initialize(process.env.REACT_APP_PARSE_APP_ID || "")

    Parse.serverURL = process.env.REACT_APP_PARSER_SERVER_URL || "";

}

