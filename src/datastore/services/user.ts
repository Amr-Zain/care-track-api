import UserDAO from "../DAO/userDAO";
import { Connection } from "mysql2/promise";
export default class UserStore   {
    private db1 : Connection;
    constructor(db: Connection) {
        this.db1 = db;
    }
    
}