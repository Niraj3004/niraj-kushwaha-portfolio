import { Request, Response, NextFunction } from 'express';
export declare const asyncErrorHandler: (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=asyncErrorHandler.d.ts.map