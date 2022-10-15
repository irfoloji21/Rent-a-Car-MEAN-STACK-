const express = require("express");
const router = express.Router();
const multer = require("multer");
const Car = require("./models/car");
const User = require("./models/user");
const Reservation = require("./models/reservation");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assets/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


router.post("/save-image", upload.array('file'), (req, res, next) => {
    console.log(req.files);
    res.status(200).json({
        message: "Image uploaded!",
    });
});

router.post("/create-car", (req, res, next) => {
    const car = new Car({
        brand: req.body.brand,
        model: req.body.model,
        power: req.body.power,
        seats: req.body.seats,
        imgUrl: req.body.imgUrl
    });
    car.save().then(response => {
        res.status(201).json({ message: "Car added successfully"});
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: "Car not added!"});
    });
});

router.get('/users',(req,res,next)=>{
    User.find({}, 'email isAdmin').then(user=>{
        if(!user){
            return res.status(401).json({message: "No users found" });
        }
        res.status(200).json(user);
    }).catch(error=>{
        console.log(error);
        res.status(500).json({message: "No users found" });
    });
});

router.post('/delete-user',(req,res,next)=>{
    User.deleteOne({email: req.body.email}).then(res1 =>{
        User.find().then(users=>{
            res.status(201).json(users);
        }).catch(error=>{ console.log(error)});
    }).catch(error=>{console.log(error)});
});

router.post('/admin-user',(req,res,next)=>{
    User.updateOne({email: req.body.email}, {$set: {isAdmin: 1}}, {new: true}).then(user =>{
        User.find().then(users=>{
            res.status(200).json(users);
        }).catch(error=>{ console.log(error)});
    }).catch(error=>{console.log(error)});
});

router.post('/cars', (req, res) => {
    Reservation.find().or([ {$and: [{from: {$lte: req.body.from}}, {until: {$gte: req.body.from}}]},
    {$and: [ {from: {$lte: req.body.until}}, {until: {$gte: req.body.until}}]},
    {$and: [ {from: {$gt: req.body.from}}, {until: {$lt: req.body.until}}]}
]).then(cars => {
    if(cars[0] === undefined) {
        Car.find().then(car => {
            res.status(200).json(car);
        }).catch(error => console.log(error));
    } else {
        Car.find({_id: {$ne: cars[0].car_id}}).then(car3 => {
            res.status(200).json(car3);
        }).catch(error => {console.log(error)});
    }
})
});

router.post('/rent', (req, res) => {
    const reserve = new Reservation({
        car_id: req.body.id,
        from: req.body.from,
        until: req.body.until,
        fromDate: req.body.fromDate,
        untilDate: req.body.untilDate
    });
    reserve.save().then(response => {
        res.status(200).json({message: "Car reserved!"});
    }).catch(error => {
        console.log(error);
    })
})

router.get('/rented-cars', (req, res) => {
    Reservation.find().then(cars => {
        res.status(200).json(cars);
    }).catch(error => {
        console.log(error);
    })
})

router.post('/cancel-rent', (req, res) => {
    Reservation.deleteOne({car_id: req.body.id, fromDate: req.body.from, untilDate: req.body.until}).then(response => {
        res.status(200).json({message: "Car deleted!"});
    }).catch(error => {
        console.log(error);
    })
})

module.exports = router;