import { Connection } from 'mysql2/promise';
import mysql from 'mysql2/promise';

export default async function connect(): Promise<Connection>{
    try{
        return await mysql.createConnection({
            host: process.env.HOST,
            user: 'amrzain',
            database: "care_track",
            password:'AmrZAin112211',
            port: parseInt(process.env.DB_PORT)
            
            });
    }catch(e){
        console.error('Failed to open database ', 'err:', e.message);
        process.exit(1);
    }
}
