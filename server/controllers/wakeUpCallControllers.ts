import { Request, Response } from 'express'

export const wake_up_call = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({msg: "API is available" })

    } catch (error: any) {
        return res.status(500).json({ msg: error.message })
    }
}