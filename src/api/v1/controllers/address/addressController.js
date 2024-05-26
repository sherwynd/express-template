const Address = require("../../models/AddressModel");
const addressService = require("../../services/addressService");

// // Create a new address
// exports.createAddress = async (req, res) => {
//   try {
//     const address = new Address(req.body);
//     await address.save();
//     res.status(201).send(address);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// // Get all addresses
// exports.getAddresses = async (req, res) => {
//   try {
//     const addresses = await Address.find({});
//     res.status(200).send(addresses);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Get address by ID
// exports.getAddressById = async (req, res) => {
//   try {
//     const address = await Address.findById(req.params.id);
//     if (!address) {
//       return res.status(404).send();
//     }
//     res.status(200).send(address);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Update address by ID
// exports.updateAddress = async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = [
//     "address_ref",
//     "user_ref",
//     "address_name",
//     "address_phone",
//     "address_line1",
//     "address_line2",
//     "address_city",
//     "address_zip",
//   ];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" });
//   }

//   try {
//     const address = await Address.findById(req.params.id);
//     if (!address) {
//       return res.status(404).send();
//     }

//     updates.forEach((update) => (address[update] = req.body[update]));
//     await address.save();

//     res.status(200).send(address);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// // Delete address by ID
// exports.deleteAddress = async (req, res) => {
//   try {
//     const address = await Address.findByIdAndDelete(req.params.id);
//     if (!address) {
//       return res.status(404).send();
//     }
//     res.status(200).send(address);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// linked with addressService
const addAddress = async (require, res) => {
  try {
    const { refId } = require.params;
    const address = require.body;
    const result = await addressService.addAddress(refId, address);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAddressByUser = async (require, res) => {
  try {
    const { refId } = require.params;
    const addresses = await addressService.getAddressByUser(refId);
    res.status(201).send(addresses);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAddress = async (require, res) => {
  try {
    const { refId, address_id } = require.params;
    const result = await addressService.deleteAddress(refId, address_id);
    if (!result) {
      return res.status(400).send("Item not found");
    }
    return res
      .status(200)
      .send("Id " + require.params.id + " has been deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addAddress,
  getAddressByUser,
  deleteAddress,
};
