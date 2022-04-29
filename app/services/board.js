import db from '../models/index.js'

export default function BoardService(){
    const Board = db.Board;
    return {
        addBoard(req, res){
            console.log('service 들어옴')
            new Board(req.body).save(function(err){
                if(err){
                    res.status(500).json({message:err})
                    return;
                } else {
                    res.status(200).json({ok:'ok'})
                }
            })
        }
    }
}