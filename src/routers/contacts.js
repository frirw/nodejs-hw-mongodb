import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getContactsController,
  getContactByIdController,
  addContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

import { validateBody } from '../utils/validateBody.js';

import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  upload.single('photo'),

  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactController),
);
contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
