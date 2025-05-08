import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async ({
  userId,
  page,
  perPage,
  sortBy,
  sortOrder,
}) => {
  const skip = (page - 1) * perPage;
  const sortDirection = sortOrder === 'desc' ? -1 : 1;

const totalItems = await ContactsCollection.countDocuments({ userId });
const totalPages = Math.ceil(totalItems / perPage);

const contacts = await ContactsCollection.find({ userId })
  .sort({ [sortBy]: sortDirection })
  .skip(skip)
  .limit(perPage);


  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const getContactById = async (id) => {
  const contact = await ContactsCollection.findById(id);
  return contact;
};

export const addContact = async (contactData, userId) => {
  const newContact = await ContactsCollection.create({ ...contactData, userId });
  return {
    id: newContact._id,
    name: newContact.name,
    email: newContact.email,
    phone: newContact.phone,
    userId: newContact.userId,
  };
};


export const updateContact = async (_id, payload) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    _id,
    payload,
    { new: true },
  );
  return updatedContact;
};

export const deleteContactById = async (id) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: id,
  });

  return contact;
};
