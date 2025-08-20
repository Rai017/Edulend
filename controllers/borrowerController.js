const Borrower = require('../models/Borrower');

async function applyLoan(req,res){
  try{
    const {loanAmount,tenure,purpose} = req.body;
    const documents = (req.files || []).map(file => file.path);

    const borrower = await Borrower.create({
      user:req.user._id,
      loanAmount,
      tenure,
      purpose,
      documents
    });
    res.json({message:'Loan application submitted',borrower});
  }catch(err){
    res.status(500).json({error:err.message});
  }
}

module.exports = { applyLoan };
