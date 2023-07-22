var express = require('express');
const { ContactModel } = require('../models/dataSchema');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Add new contact
router.post('/add', async(req, res, next) => {
  try {
      const existingContact = await ContactModel.findOne({ address: req.body.address });
      
      if( !existingContact ) {
          let data = new ContactModel( req.body );
          await data.save();        
          res.status(200).json({ message: "Contact added Success" });
      } else {
          console.log(error)
          res.status(401).json({ message: "Contact already existed" });
      }
  } catch ( error) {
      res.status(500).send({ message: "Internal Server Error", error });  
  }
})

// Get contacts
router.get('/list', async(req, res, next) => {
  try {
      let data = await ContactModel.find({}).sort({ fullName: 1 });
      res.status(200).json({ contacts: data, count: data.length });        
  } catch (error) {
      console.log(error);
      res.status(500).json({ message:"Internal Server Error", error });  
  }
});

// Edit contacts
router.put('/edit/:id', async(req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "Bad Request or no Data had passed" });
    }

    let contact = await ContactModel.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

        contact.fullName = updatedData.fullName || contact.fullName;
        contact.companyName = updatedData.companyName || contact.companyName;
        contact.email = updatedData.email || contact.email;
        contact.mobile = updatedData.mobile || contact.mobile;
        contact.address = updatedData.address || contact.address;
        contact.city = updatedData.city || contact.city;
        contact.state = updatedData.state || contact.state;
        contact.country = updatedData.country || contact.country;
        contact.pincode = updatedData.pincode || contact.pincode;
        contact.map = updatedData.map || contact.map;
        
        await contact.save();

        res.status(200).json({message:"Contact updated Success"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message:"Internal Server Error", error });
  }
})

// Delete contact
router.delete('/delete/:id', async(req, res)=> {
  try {
      const { id } = req.params;
      const data = await ContactModel.deleteOne({ _id: id });
      res.status(201).json({ message: "Contact deleted successfully" });
  } catch (error) {
      console.log(error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
})

module.exports = router;
