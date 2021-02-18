const errHandlers = (err, req, res, next) => {
    if(err) {
        switch (err) {
             case "resourceNotFound":
                 return res.status(404).json({
                     message: "Data Not Found"
                 });
             default:
                 return res.status(500).json({message: 'Your Internal Server Is not Connect / Error'})
        }
    }
}

module.exports = errHandlers