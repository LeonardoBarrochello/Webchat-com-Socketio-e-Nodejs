const Database = require("../db/config")


module.exports = {
        async history(name,message){
            const db = await Database();
            await db.run(`INSERT INTO historyChat(name,message) VALUES("${name}","${message}")`)
            await db.close()
        },
        async getHistory(req,res){
            const db = await Database();
            const messages =  await db.all("SELECT * FROM historyChat")
            res.json(messages)
        }

}