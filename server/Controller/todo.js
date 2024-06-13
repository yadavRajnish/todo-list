import todoModel from '../Model/model.js';

export const getToDoList = async (req, res) => {
    try {
        const todoData = await todoModel.find({});
        res.status(200).json({
            data: todoData,
            message: "Successfully fetched data!",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const addToDoList = async (req, res) => {
    try {
        const { title, description } = req.body;
        const todolistData = new todoModel({
            title,
            description,
        });
        await todolistData.save();
        res.status(201).json({
            success: true,
            todolistData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export const todoupdate = async (req, res) => {
    try {
        const todoID = req.params.id;
        const { title, description,completed } = req.body;
        const todoData = await todoModel.findOne({ _id: todoID });
        const todotdata = await todoModel.updateOne(
            { _id: todoID },
            {
                $set: {
                    title,
                    description,
                    completed,
                },
            }
        );
        res.status(200).json({
            success: true,
            message: "updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const tododelete = async (req, res) => {
    try {
        const todoID = req.params.id;
        const todoData = await todoModel.deleteOne({ _id: todoID });
        if (todoData.acknowledged) {
            res.status(200).json({
                success: true,
                message: "deleted successfully",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
