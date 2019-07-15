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
            error => {

                if(error) 
                    return reject('Não foi possível adicionar o livro.');

                return resolve();
            });
        });
    }

    atualiza(livro) {

        return new Promise((resolve, reject) => {

            this._db.run(`
            UPDATE livros
            SET titulo=?,
                preco=?,
                descricao=?
            WHERE id=?
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            error => {

                if(error) 
                    return reject('Não foi possível atualizar o livro.');

                return resolve();
            });
        });
    }

    remove(id) {

        return new Promise((resolve, reject) => {

            this._db.run(`DELETE FROM livros WHERE id=?`,
            [id],
            error => {

                if(error) 
                    return reject('Não foi possível remover o livro.');

                return resolve();
            });
        });
    }

    buscaPorId(id) {

        return new Promise((resolve, reject) => {

            this._db.get(`SELECT * FROM livros WHERE id=${id}`,
                (error, row) => {

                    if(error)
                        return reject('Não foi possível obter o livro.');
                    
                    return resolve(row);
                });
        });
    }
}

module.exports = LivroDao;