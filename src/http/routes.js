const db = require('../services/mysql')

const routes = (server) => {
    


    server.get('/contato', async (req, res, next) => {
        try{
            res.send(await db.contacts().all())
            next()
        }
        catch(error){
            res.send(error)
            next()
        }

        // db.contacts().all().then(contacts => 
        //     {
        //         res.send(contacts)
        //         next()
        //     }
        //     ).catch(error => {
        //         res.send(error)
        //         next
        //     })
        

    })

    server.post('/contato', async (req, res, next) => {
        
        const { name, tel1, tel2, email, note } = req.params
        try{
            res.send(await db.contacts().save(name, tel1, tel2, email, note))
            next()
        }
        catch(error){
            res.send(error)
            next()
        }
    })

    server.put('/contato', async (req, res, next) => {
        
        const { name, tel1, tel2, email, note, id } = req.params
        try{
            res.send(await db.contacts().update(name, tel1, tel2, email, note, id))
            next()
        }
        catch(error){
            res.send(error)
            next()
        }

    })
    
    server.del('/contato', async(req, res, next) => {
        
        const { id } = req.params
        console.log(id)
        try{
            res.send(await db.contacts().del(id))
            next()
        }
        catch(error){
            res.send(error)
            next()
        }

    })



    server.get('/', (req, res, next) => {
        res.send('Enjoy the silence!!')
        next()
    })
}

module.exports = routes