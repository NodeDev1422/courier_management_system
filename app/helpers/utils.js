 function nullCheckError(inputs,res) {
  for (let input of inputs) {
    if (input === null || input === undefined || input === "") {
       res.status(422).send({ msg: "Invalid Input!"  });
       return res;
    }
  }

  return false;
}

function generateOTP()
{
  return Math.floor(Math.random()*899999+100000);
}

module.exports = {nullCheckError,generateOTP};