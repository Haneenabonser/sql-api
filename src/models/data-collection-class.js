'use strict';
const pool = require('./pool');

class Interface {
    constructor(table) {
        this.table = table;
    }

    read(id) {
        if (id) {
            return pool.query('SELECT * FROM $1 WHERE id=$2;', [this.table, id]);
        }
        return pool.query('SELECT * FROM $1;', [this.table]);
    }

    create(obj) {
        const sql = 'INSERT INTO $1 (name,role) VALUES ($2,$3) RETURNING *;';
        const safeValues = [this.table, obj.name, obj.role];
        return pool.query(sql, safeValues);
    }

    update(id, obj) {
        const sql = 'UPDATE $1 SET name=$2,role=$3 WHERE id=$4 RETURNING *;';
        const safeValues = [this.table, obj.name, obj.role, id];
        return pool.query(sql, safeValues);
    }

    delete(id) {
        return pool.query('DELETE FROM $1 WHERE id=$2 RETURNING *;', [this.table, id]);
    }
}

module.exports = Interface;