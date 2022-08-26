const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDb")

// returns current list of shopping cart items
router.get("/", function (req, res) {
    res.json({ items })
})

// posts new item
router.post("/", function (req, res, next){
    try {
        if (!req.body.name) throw new ExpressError("There is no item currently in the shopping cart", 400);
        const newItem = { name: req.body.name, price: req.body.price}
        items.push(newItem)
        return res.status(201).json({"added": newItem })
    } 
    catch (e) {
        return next(e)
    }
})

// gets the item by name
router.get("/:name", function (req, res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404)
    }
    return res.status(200).json(foundItem) 
  })

// finds the item with given name and then update its name
router.patch("/:name", function (req, res) {
const foundItem = items.find(item => item.name === req.params.name)
if (foundItem === undefined) {
    throw new ExpressError("item not found", 404)
}
else {
    foundItem.name = req.body.name
    return res.status(200).json({"updated": foundItem })
}
})

// delete the item with name from items array
router.delete("/:name", function (req, res) {
const foundItemIdx = items.findIndex(item => item.name === req.params.name)
if (foundItemIdx === -1) {
    throw new ExpressError("item not found", 404)
}
items.splice(foundItemIdx, 1)
return res.json({ message: "Deleted" })
})




module.exports = router;