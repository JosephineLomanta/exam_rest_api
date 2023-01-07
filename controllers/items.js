import Menu from "../models/Menu.js"

export const getItems = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId)
        const { expiration, cost } = req.query

        if (expiration) {
            menu.items = menu.items.filter((item) => item.expiration == expiration)
        }
        if (cost) {
            menu.items = menu.items.filter((item) => item.cost == cost)
        }

        if (menu.items.length !== 0)
            res.status(200).json(menu.items)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getItem = async (req, res) => {
    try {
        const {menuId, id } = req.params
        const menu = await Menu.findById(menuId)
        const item = menu.items.id(id)
        if (item)
            res.status(200).json(item)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addItem = async (req, res) => {
    try {
        const newItem = req.body
        const menu = await Menu.findById(req.params.menuId)
        menu.items.push(newItem)
        await menu.save()
        const idNewItem = menu.items[menu.items.length-1]._id
        res.status(201).json({ id: idNewItem })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteItem = async (req, res) => {
    try {
        const {menuId, id } = req.params
        const menu = await Menu.findById(menuId)
        menu.items.id(id).remove();
        await menu.save()
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateItem = async (req, res) => {
    try {
        const {menuId, id } = req.params
        const menu = await Menu.findById(menuId)

        const {code, description, cost, expiration, prepareTime, serveTime } = req.body
        menu.items.id(id).code = code
        menu.items.id(id).description = description
        menu.items.id(id).cost = cost
        menu.items.id(id).expiration = expiration
        menu.items.id(id).prepareTime = prepareTime
        menu.items.id(id).serveTime = serveTime

        await menu.save()
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}