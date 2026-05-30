import { ao as defineMiddleware, bd as sequence } from './chunks/params-and-props_BxzUSTsX.mjs';
import 'piccolore';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
