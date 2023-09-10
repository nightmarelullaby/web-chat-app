export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)

        return next()
    } catch (error) {
        console.log("error1111",error)
        return res.status(400).json({ message: error.errors.map((error)=> error.message) })
    }
}