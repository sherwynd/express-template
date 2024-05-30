const Address = require("../models/AddressModel");

const addAddress = async (refId, address) => {
  address.refId = refId;
  const newAddress = new Address(address);
  return await newAddress.save();
};

const getAddressByUser = async (refId) => {
  return await Address.find({ refId });
};

const deleteAddress = async (refId, address_id) => {
  return await Address.findOneAndDelete({ refId, _id: address_id });
};

module.exports = {
  addAddress,
  getAddressByUser,
  deleteAddress,
};
