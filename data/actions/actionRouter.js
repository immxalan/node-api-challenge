const express = require("express");
const action = require("../helpers/actionModel");

const router = express.Router();
const cors = require("cors");

router.get("/", (req, res) => {
    action
    .get(req.id)
    .then ( e => {
        res.status(200).json(e)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "Error retrieving actions"})
    })
})
router.put("/:id", (req, res) => {
    const showInfo = req.body;
    const {id} = req.params
    action
        .update(id, showInfo)
        .then(e => {
            if (e) {
                res.status(200).json({ message: "The action has been updated"})
            }   else {
                res.status(404).json({ message: "The action could not be updated"})
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "There was an error updating the action"})
        })

})
router.post("/", (req, res)=>{
    const actionInfo = req.body
    action
        .insert(actionInfo)
        .then(() => {
            res.status(201).json({message: "action was created"})
        })
        .catch(error => {
            res.status(500).json({ error, error: "There was an error creating a new action"})
        })
})

router.delete("/:id", (req, res) => {
    //can shorten req.params.id by just using {id} = req.params.id
    action
        .remove(req.params.id)
        .then(e => {
            if (e > 0){
                res.status(200).json({ message: "The action has been deleted"})
            } else {
                res.status(404).json({ message: "The action could not be found"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error deleting the action"})
        })
})
module.exports = router;