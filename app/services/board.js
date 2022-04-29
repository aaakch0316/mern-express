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
        },
        getBoards(_req, res){
            Board.find().exec(
                (err, boards) => {
                    res.status(200).json(boards)
                }
            )
        },
        delUsers(req, res){
            // console.log(req)
            console.log(req.body.boardid)
            Board.deleteOne({ _id: req.body.boardid }, function (err) {
                if (err) return handleError(err);
                // deleted at most one tank document
              });
        }
    }
}