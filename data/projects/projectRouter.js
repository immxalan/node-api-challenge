const express = require("express");
const project = require("../helpers/projectModel");

const router = express.Router();
const cors = require("cors");

router.get("/", (req, res) => {
    project
    .get(req.id)
    .then ( e => {
        res.status(200).json(e)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "Error retrieving project"})
    })
})
router.get("/:id/actions", (req, res) => {
    project
    .getProjectActions(req.params.id)
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
    project
        .update(id, showInfo)
        .then(e => {
            if (e) {
                res.status(200).json({ message: "The project has been updated"})
            }   else {
                res.status(404).json({ message: "The project could not be updated"})
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "There was an error updating the project"})
        })

})
router.post("/", (req, res)=>{
    const showInfo = req.body
    project
        .insert(showInfo)
        .then(() => {
            res.status(201).json({message: "Project was created"})
        })
        .catch(error => {
            res.status(500).json({ error, error: "There was an error creating a new Project"})
        })
})

router.delete("/:id", (req, res) => {
    //can shorten req.params.id by just using {id} = req.params.id
    project
        .remove(req.params.id)
        .then(e => {
            if (e > 0){
                res.status(200).json({ message: "The Project has been deleted"})
            } else {
                res.status(404).json({ message: "The Project could not be found"})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error deleting the Project"})
        })
})
module.exports = router;