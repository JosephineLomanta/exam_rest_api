import Menu from '../models/Menu.js'

export const getMenus = async (req, res) => {
    try {
        const menus = await Menu
            .find({ cafeId: req.params.cafeId })
            .populate('cafeId')
            .select('version year cafeId')
        if (menus.length !== 0)
            res.status(200).json(menus)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getMenu = async (req, res) => {
    try {
        const { id } = req.params
        const menu = await Menu.findById(id)
            .populate('cafeId')
            .select('version year cafeId')
        if (menu)
            res.status(200).json(menu)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addMenu = async (req, res) => {
    try {
        const { version, categories } = req.body
        const cafeId = req.params.cafeId
        const newMenu = await Menu.create({
            version,
            year,
            cafeId
        })
        const savedMenu = await newMenu.save()
        res.status(201).json({ id: savedMenu._id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteMenu = async (req, res) => {
    try {
        await Menu.deleteOne({ 
            cafeId: req.params.cafeId, 
            _id: req.params.id 
        })
        res.status(204).send()
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const updateMenu = async (req, res) => {
    try {
        const filter = { 
            cafeId: req.params.cafeId, 
            _id: req.params.id 
        }
        const { version, categories } = req.body
        const update = { 
            version: version, 
            categories: categories
        }

        await Menu.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}