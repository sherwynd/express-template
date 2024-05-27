const Address = require("../../models/AddressModel");
const addressService = require("../../services/addressService");

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
