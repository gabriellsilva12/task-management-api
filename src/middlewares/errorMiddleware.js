const errorMiddleware = (err, req, res, next ) => {

    console.log({
        warn: {
            error: err.message,
            method: req.method,
            url: req.originalUrl,
            ip: req.ip
        }
    })

    if(err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            error: "Invalid Json"
        })
    }

    res.status(500).json({ error: "Internal server error" })
}

export default errorMiddleware