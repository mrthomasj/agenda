const msqlServer = require('mysql')

const cn = msqlServer.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'db_agenda'
    }
)

const errorHandler =  (error, msg, rejectFunction) => {
    console.error(error)
    rejectFunction({ error: msg})
}

const contactsModule =  require('./contacts.js')({ cn, errorHandler  })

module.exports = {
    contacts: () => contactsModule
}