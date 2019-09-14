import SQLite from "react-native-sqlite-storage";

class DatabaseManager{
    constructor(db_name){
        this.search_in_progress = false;
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
        console.log(db_name);
        SQLite.openDatabase({
            name: db_name,
            location: "default"
        }).then((db) => {
            //this.initialiseDB(db);
            this.db = db;
        }).catch((error) => {
            console.log("An error occured when initialising DB!")
            console.log(error)
        });
    }

    initialiseDB = (db) => {
        db.transaction(function(txn){
            txn.executeSql('CREATE TABLE IF NOT EXISTS commands(cmd_id INTEGER PRIMARY KEY AUTOINCREMENT, cmd VARCHAR(255), num_calls INTEGER, cmd_type INTEGER)',
            [], function(tx, res){})
        });
    }

    update = (cmd, cmd_type) => {
        try{
            this.db.transaction(function(txn){
                txn.executeSql('SELECT cmd_id, num_calls FROM commands WHERE cmd=?', [cmd],
                function(tx, res){
                    if (res.length === 0){
                        this.insertNewCommand(cmd, cmd_type);
                    }
                    else{
                        this.incrementCount(res[0][0], res[0][1]);
                    }
                })
            });
        }
        catch(error){
            console.log(error);
        }
        
    }

    insertNewCommand = (cmd) => {
        try{
            this.db.transaction(function(txn){
                txn.executeSql('INSERT INTO commands (cmd, num_calls, type) VALUES (?, 1, ?)',
                [cmd, cmd_type],
                function(tx, res){})
            });
        }
        catch (error){
            console.log(error);
        }
        
    }

    incrementCount = (cmd_id, current_count) => {
        try{
            this.db.transaction(function(txn){
                txn.executeSql('UPDATE commands SET num_calls=? WHERE cmd_id=?',
                [current_count+1, cmd_id],
                function(tx, res){}
                )
            });
        }
        catch(error){
            console.log(error);
        }
        
    }

    mostPopular = (cmd, type, res_handler) => {
        if (this.search_in_progress){
            return;
        }

        try{
            this.search_in_progress = true;
            this.db.transaction(function(txn){
                txn.executeSql("SELECT cmd FROM commands WHERE type=? AND cmd LIKE '?%' ORDER BY num_calls LIMIT 5",
                [type, cmd],
                function(tx, res){
                    res_handler(res);
                    this.search_in_progress = false;
                }
                )
            })
        }
        catch(error){
            this.search_in_progress = false;
            console.log(error);
        }
        
    }

    close = () => {
        try{
            this.db.close();
        }
        catch(error){
            console.log(error);
        }
        
    }
}

export default DatabaseManager;