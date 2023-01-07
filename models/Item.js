import mongoose from 'mongoose'

export const ItemSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        cost: { type: Number, required: true },
        expiration: { type: Number, required: true },
        specialization: String,
        prepareTime: { type: Number, required: true },
        serveTime: { type: Number, required: true }
    }, 
    { timestamps: true }
)

const Item = mongoose.model('Item', ItemSchema)
export default Item