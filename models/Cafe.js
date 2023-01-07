import mongoose from 'mongoose'

const CafeSchema = new mongoose.Schema(
    {
        code: { type: String, required: true , unique: true},
        fullName: { type: String, required: true },
        years: { type: Number, required: true },
        specialization: []
    }, 
    { timestamps: true }
)

const Cafe = mongoose.model('Cafe', CafeSchema)
export default Cafe