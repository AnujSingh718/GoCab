const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create geolocation schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
})


// create driver Schema & model
const DriverSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rating: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    // add in geo location
    "geometry":GeoSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;