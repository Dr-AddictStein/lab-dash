// controllers/steps.js
import { dynamoDB } from "../server.js";

const tableName = "stepCollection";

export const getSteps = (req, res) => {
  const params = {
    TableName: tableName,
  };

  dynamoDB.scan(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(data.Items);
    }
  });
};

export const getStep = (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: tableName,
    Key: {
      id,
    },
  };

  dynamoDB.get(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(data.Item);
    }
  });
};

export const addStep = (req, res) => {
  const { name, desc } = req.body;
  console.log("XXXX",req.body)
  const params = {
    TableName: tableName,
    Item: {
      id: Date.now().toString(),
      name,
      desc,
    },
  };

  dynamoDB.put(params, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ message: "Step added successfully" });
    }
  });
};

export const updateStep = (req, res) => {
  const { id } = req.params;
  const { name, desc } = req.body;
  const params = {
    TableName: tableName,
    Key: {
      id,
    },
    UpdateExpression: "set #n = :n, #d = :d",
    ExpressionAttributeNames: {
      "#n": "name",
      "#d": "desc",
    },
    ExpressionAttributeValues: {
      ":n": name,
      ":d": desc,
    },
    ReturnValues: "UPDATED_NEW",
  };

  dynamoDB.update(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(data.Attributes);
    }
  });
};

export const deleteStep = (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: tableName,
    Key: {
      id,
    },
  };

  dynamoDB.delete(params, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ message: "Step deleted successfully" });
    }
  });
};
