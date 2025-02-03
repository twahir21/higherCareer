const Database = require("../config/databaseConfig");

const fetchData = async () => {
    const admin = await Database.query(`
            SELECT * FROM admin
        `)
    console.log(admin.rows);
    

    const teacher = await Database.query(`
        SELECT * FROM teacher
    `)
    console.log(teacher.rows);


    const parent = await Database.query(`
        SELECT * FROM parent
    `)
    console.log(parent.rows);
}

fetchData();




