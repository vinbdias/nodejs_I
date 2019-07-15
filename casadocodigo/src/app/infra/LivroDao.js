class LivroDao {

    constructor(db) {

        this._db = db;
    }    

    lista() {

        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (error, result) => {

                    if(error)
                        return reject('Não foi possível listar os livros');
                    
                    return resolve(result);
                }
            );            
        });
    }

    adiciona(livro) {

        return new Promise((resolve, reject) => {

            this._db.run(`
                INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) values(?,?,?)
            `, 
            [
                livro.titulo,
                livro.preco,
                livro.descricao
            ],
            (error) => {

                if(error) return reject('Não foi possível adicionar o livro.');

                return resolve();
            });
        });
    }
}

module.exports = LivroDao;