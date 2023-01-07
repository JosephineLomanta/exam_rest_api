import mongoose from 'mongoose'
import { ItemSchema } from './Item.js'

const MenuSchema = new mongoose.Schema(
    {
        version: { type: String, required: true, unique: true },
        categories: { type: String, required: true },
        cafeId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Cafe', 
            required: true 
        },
        items: [ItemSchema]
    }, 
    { timestamps: true }
)

const Menu = mongoose.model('Menu', MenuSchema)
export default Menu