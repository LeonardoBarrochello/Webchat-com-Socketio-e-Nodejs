const Database = require("./config")

const initDb = {
    async init(){
        const db = await Database()

        await db.exec(`CREATE TABLE historyChat (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            message TEXT
        )`);
        await db.close()
    }
}

initDb.init();
