import createHttpError from 'http-errors';
import { getAllContacts, getContactById, addContact, updateContact, deleteContactById } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
  } = req.query;

    const result = await getAllContacts({
      userId: req.user._id,
      page: Number(page),
      perPage: Number(perPage),
      sortBy,
      sortOrder,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: result,
    });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const data = await getContactById(id, userId);

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id=${id}`,
    data,
  });
};


export const addContactController = async (req, res) => {
  const contactData = {
    ...req.body,
    userId: req.user._id,
  };

  const newContact = await addContact(contactData, req.user._id);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: newContact,
  });
};



export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const result = await updateContact(id, req.body, userId);

  if (!result) {
    throw createHttpError(404, "Contact not found");
  }

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result,
  });
};


export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const data = await deleteContactById(id, userId);

  if (!data) {
    throw createHttpError(404, "Contact not found");
  }

  res.status(204).send();
};

