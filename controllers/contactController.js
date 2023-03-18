const asyncHandler = require("express-async-handler");
//MODELS
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req,res) => {
    //MODELS
    const contacts = await Contact.find({user_id: req.user.id});;
    res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async(req,res) => {
    console.log("The request body is:", req.body);
    const{name,email,phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    //MODELS - kontakt koji stvaram iz posta
    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc Get induvidual contact/:id
//@route GET /api/contacts
//@access private

const getInduvidualContact = asyncHandler(async(req,res) => {

    //MODELS
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("Contact not found");

    }
    res.status(200).json(contact)
});

//@desc Delete  contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("Contact not found");

    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("Wrong user no permission");
    } 
    const removedContact = await Contact.findByIdAndRemove(
        req.params.id
    )
    res.status(200).json(contact)
});

//@desc Update  contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("Contact not found");

    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("Wrong user no permission");
    }    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new:true}
    )
    res.status(200).json(contact)
});





module.exports = {getContacts, createContact, deleteContact, updateContact, getInduvidualContact};