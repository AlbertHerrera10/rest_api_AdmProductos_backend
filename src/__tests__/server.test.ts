import { connectDB } from '../server';
import db from "../config/db";



jest.mock('../config/db.ts')

describe('connectDB',()=>{
    it('should handle databare connection error', async () =>{
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error en la db'))

        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error en la db')
        )
    })
})

