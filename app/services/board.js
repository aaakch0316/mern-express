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
        delBoards(req, res){
            console.log(req.body.boardid)
            Board.deleteOne({ _id: req.body.boardid }, function (err) {
                if (err) return handleError(err);
              });
        },
        updateBoards(req, res){
            console.log(req.body)
            Board.updateOne({ _id: req.body.id }, req.body, function (err) {
                if(err){
                    res.status(500).json({message:err})
                    return;
                } else {
                    res.status(200).json({ok:'ok'})
                }
            });
        }
    }
}