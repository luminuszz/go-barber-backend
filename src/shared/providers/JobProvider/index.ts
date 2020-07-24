import { container } from 'tsyringe';

import IJobProvider from './models/IJobProvider';

import BullJobProvider from './implementations/BullJobProvider';

const providers = {
  bull: BullJobProvider,
};

container.registerSingleton<IJobProvider>('JobProvider', providers.bull);
