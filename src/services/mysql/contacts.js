const mySqlServer = require('mysql')


const contacts = deps => { 
    
    return {
        all:() => {return new Promise((resolve, reject) =>{

                    const {cn, errorHandler} = deps
                    cn.query('SELECT * FROM tb_contatos', (error, results)=>{
                
                        if(error){
                            errorHandler(error, 'Falha ao listar os contatos', reject)
                            return false
                        }
                    
                        resolve({
                            contacts: results
                        })
                    
                    })
                })},
        save:(name, tel1, tel2, email, note) => {return new Promise((resolve, reject) =>{

            const {cn, errorHandler} = deps
            cn.query('INSERT INTO tb_contatos(nmContato, nr_telPrinc, nr_telSec, email, notes) VALUES (?, ?, ?, ?, ?)', [name, tel1, tel2, email, note], (error, results)=>{
        
                if(error){
                    errorHandler(error, `Falha ao salvar o contato ${name}`, reject)
                    return false
                }
            
                resolve({
                    contacts: {name, id:results.insertId}
                })
            
            })
        })},
        update:(name, tel1, tel2, email, note, id) => {return new Promise((resolve, reject) =>{

            const {cn, errorHandler} = deps
            cn.query('UPDATE tb_contatos SET nmContato = ?, nr_telPrinc = ?, nr_telSec = ?, email =?, notes =? WHERE id=?', [name, tel1, tel2, email, note, id], (error, results)=>{
        
                if(error){
                    errorHandler(error, `Falha ao atualizar o contato ${name}`, reject)
                    return false
                }
            
                resolve({
                    contacts: {name, id:results.insertId}
                })
            
            })
        })},
        del:(id) => {return new Promise((resolve, reject) =>{

            const {cn, errorHandler} = deps
            cn.query('DELETE FROM tb_contatos WHERE id=?', [id],   (error, results)=>{
        
                if(error){
                    errorHandler(error, `Falha ao remover o contato de id ${id}`, reject)
                    return false
                }
                
                console.log(results)
                resolve({
                    message: 'Contato removido com sucesso'
                })
            
            })
        })},



    }


}

module.exports = contacts