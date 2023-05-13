const express = require('express');
const router = express.Router()
const {getGoals, setGoal,
       updateGoal, deleteGoal} = require('../controllers/goalController.js')

// router.route('/').get(getGoals).post(setGoal)
// router.route('/:id').put(updateGoals).delete(deleteGoal)

const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getGoals)

router.post('/', protect, setGoal)

router.put('/:id', protect, updateGoal)

router.delete('/:id',protect, deleteGoal)



module.exports = router

































// //get all members
// router.get('/', (req, res) => res.json(members));

// //get single member
// router.get('/:id',(req, res) => {
//     let exists = members.some(member => member.id === parseInt(req.params.id));

//     if(exists){
//         res.json(members.filter(member => member.id === parseInt(req.params.id))); 
//     }else{
//         res.status(400).send(`No member with the id ${req.params.id}`)
//     }
// });

// //create member
// router.post('/', (req, res) => {
//     const newMember = {
//         name: req.body.name,
//         id: Math.floor(Math.random() * 10000),
//         city: req.body.city,
//         status: 'active'
//     }

//     if(newMember.name && newMember.city){
//         members.push(newMember);
//     }else{
//         res.status(404).json({error: 'Please include a name and email'})
//     }
// });

// //update member
// router.put('/:id',(req, res) => {
//     let exists = members.some(member => member.id === parseInt(req.params.id));

//     if(exists){
//         members.forEach(member => {
//             if(member.id === parseInt(req.params.id)){
//                 member.name = req.body.name ? req.body.name : member.name;
//                 member.city = req.body.city ? req.body.city : member.city;

//                 res.json({msg: 'Member Updated', member})
//             }
//         })
//     }else{
//         res.status(400).send(`No member with the id ${req.params.id}`)
//     }
// });

// //delete member
// router.delete('/:id',(req, res) => {
//     let exists = members.some(member => member.id === parseInt(req.params.id));

//     if(exists){
//         members = members.filter(member => member.id !== parseInt(req.params.id));

//         res.json({msg: 'Member Deleted', members}) 
//     }
//     else{
//         res.status(400).send(`No member with the id ${req.params.id}`)
//     }
// });
