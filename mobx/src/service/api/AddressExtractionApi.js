import { get , post } from "@/service/xhr/fetch";


export const GETLIST = ( data ) => {
    return get(GET_LIST_URL,data);
}
