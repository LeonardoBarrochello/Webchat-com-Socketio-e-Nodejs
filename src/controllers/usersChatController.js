const database = require("../db/config")

module.exports = {

    async newUser(usuario){
            const db =  await database();
            const checkUserExists = await db.get(`SELECT * FROM users WHERE name == "${usuario}" `);
            console.log(checkUserExists)
            if(checkUserExists == undefined){
                await db.run(`   
                    INSERT INTO users(name,online) VALUES("${usuario}",1)
                `)
                 await db.close()
                 return checkUserExists;
            }else{
                await db.close()
                return checkUserExists;
            }
            
    }



}