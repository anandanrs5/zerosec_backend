const express = require('express');
const router = express.Router();
const WorkStatusRecords = require('../models/records');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

router.post('/start', async (req, res) => {
    try {
        const { user_id } = req.body;
        if (user_id) {
            const newRecord = new WorkStatusRecords(req.body);
            const saveRecord = await newRecord.save();
            return res.status(200).json("New Work Status Created!");
        }
        else {
            return res.status(400).json("id not found!");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post('/stop', async (req, res) => {
    try {
        const { stopped_at } = req.body;
        const existingRecords = await WorkStatusRecords.findOne({ stopped_at: null });
        if (existingRecords) {
            console.log(existingRecords)
            existingRecords.stopped_at = stopped_at;
            const updatedRecord = await existingRecords.save();
            return res.status(200).json("New Work Status Completed!");
        }
        else {
            return res.status(400).json("record not found!");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


router.get('/total-work-status', async (req, res) => {
    try {
        const { stopped_at } = req.body;
        const existingRecords = await WorkStatusRecords.find({ stopped_at: { $ne: null } });
        console.log(existingRecords);
        if (existingRecords.length > 0) {
            return res.json(existingRecords);
        } else {
            return res.status(400).json("No records found where stopped_at is not null.");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


module.exports = router;