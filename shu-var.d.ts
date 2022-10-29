declare module 'shu-var';
declare class Prediction {
	constructor(time8: string, original: any, mask:any ,...memo:string[]);
	getInfo();
	print(...args:any);
};
