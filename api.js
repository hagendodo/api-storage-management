import { db, ItemSchema } from "./db.js";

const checkItemDb = () => {
  if (!db.models["Item"]) {
    db.model("Item", ItemSchema);
  }
};

export const getItem = async (req, res) => {
  try {
    checkItemDb();

    const itemList = await db.model("Item").find();

    res.status(200).json({
      message: "success",
      data: itemList,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

export const getItemById = async (req, res) => {
  try {
    checkItemDb();

    const { id } = req.params;

    const item = await db.model("Item").findById(id);

    if (!item) {
      return res.status(404).json({
        message: "error",
        error: "Student not found",
      });
    }

    res.status(200).json({
      message: "success",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

export const createItem = async (req, res) => {
  try {
    checkItemDb();
    // Create a new Contact document using the form data
    const newItem = await db.model("Item").create(req.body);

    res.status(201).json({
      message: "success",
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;

  try {
    checkItemDb();

    const updatedItem = await db.model("Item").updateOne(
      {
        _id: id,
      },
      req.body
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "error",
        error: "Item not found",
      });
    }

    res.status(200).json({
      message: "success",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    checkItemDb();

    const deletedItem = await db.model("Item").findOne({ _id: id });

    if (!deletedItem) {
      return res.status(404).json({
        message: "error",
        error: "Item not found",
      });
    }

    await db.model("Item").deleteOne({ _id: id });

    res.status(200).json({
      message: "success",
      data: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};
