const UserModel = require("../Models/user");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password ");
  res.status(200).json(users);
};

module.exports.getOneUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu :" + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID inconnu :" + err);
  }).select("-password ");
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu :" + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          picture: req.body.picture,
          secteur: req.body.secteur,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err) => {
        if (!err)
          return res.status(201).json({ message: "modification effectuée" });
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu :" + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
