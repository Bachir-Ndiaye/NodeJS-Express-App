const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../global/members');


// Get all members
router.get('/', (req, res) => {
    res.json(members);
});


// Get a single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else{
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        });
    }
    
});

//Create a member
router.post('/', (req, res) => {
    const newMember =  {
        id : uuid.v4(),
        cost : req.body.cost,
        name : req.body.name,
        height : req.body.height,
        weight : req.body.weight 
    };
    
    if(!newMember.cost || !newMember.name || !newMember.height || !newMember.weight){
        return res.status(400).json({
            msg : 'Please include correct types'
        });
    }

    members.push(newMember);
    res.json(members);
    //res.redirect('/');
});

//Update a member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        const updateMember = req.body;
        members.forEach(member =>{
            if(member.id === parseInt(req.params.id)){
                // We dont want to update every param, so we check which params was sent by the request
                // those not sent keep their default values
                member.cost = updateMember.name ? updateMember.name : member.name;
                member.name = updateMember.cost ? updateMember.cost : member.cost;
                member.height = updateMember.height ? updateMember.height : member.height;
                member.weight = updateMember.weight ? updateMember.weight : member.weight;

                res.json({
                    msg : 'Member updated', member
                });
            }
        });
    } else{
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        });
    }
    
});

//Delete a member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json({
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else{
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        });
    }
    
});

module.exports = router;