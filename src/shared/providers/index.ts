import { container } from 'tsyringe';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';
// import IEmailProvider from './MailProvider/models/IMailProvider';
// import EmailProvider from '../providers/MailProvider/implementations'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
