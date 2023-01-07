import Cafe from "../models/Cafe.js"

export const getCafes = async (req, res) => {
    try {
        const cafes = await Cafe.find()
        if (cafes.length !== 0)
            res.status(200).json(cafes)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getCafe = async (req, res) => {
    try {
        const { id } = req.params
        const cafe = await Cafe.findById(id)
        if (cafe)
            res.status(200).json(cafe)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addCafe = async (req, res) => {
    try {
        const { code, fullName, years, specialization } = req.body
        const newCafe = await Cafe.create({
            code,
            fullName,
            years,
            specialization
        })
        const savedCafe = await newCafe.save()
        res.status(201).json({ id: savedCafe._id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteCafe = async (req, res) => {
    try {
        await Cafe.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateCafe = async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const { code, fullName, years } = req.body
        const update = { 
            code: code, 
            fullName: fullName, 
            years: years 
        }

        await Cafe.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}