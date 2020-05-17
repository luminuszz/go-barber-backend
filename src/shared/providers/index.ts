import { container } from 'tsyringe';

// Storaged
import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';

// Email
import IEmailProvider from './MailProvider/models/IMailProvider';
import EtherealMaierProvider from './MailProvider/implementations/EtherealMailProvider';

// Email Template
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import MailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailProviders';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  MailTemplateProvider,
);
container.registerInstance<IEmailProvider>(
  'EmailProvider',
  container.resolve(EtherealMaierProvider),
);
