import { Session } from "../../schema";
import SessionDAO from "../DAO/sessionDAO";
import { Connection } from "mysql2";


export default class SessionStore/*  implements SessionDAO  */{
    private db2 : Connection;
    constructor(db: Connection) {
        this.db2 = db;
    }
    
}