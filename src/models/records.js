const mongoose = require('mongoose');
const userWorkStatusTrackingSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    start_at: { type: Date, required: true, },
    stopped_at: { type: Date, default: null, }
});
const WorkStatusRecords = mongoose.model('user_work_status', userWorkStatusTrackingSchema);
module.exports = WorkStatusRecords;