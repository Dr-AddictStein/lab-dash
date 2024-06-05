// controllers/labCollections.js
import { dynamoDB } from '../server.js';

const tableName = 'LabCollection';

export const getLabCollections = (req, res) => {
  const params = {
    TableName: tableName
  };

  dynamoDB.scan(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(data.Items);
    }
  });
};

export const getLabCollection = (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: tableName,
    Key: {
      id
    }
  };

  dynamoDB.get(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(data.Item);
    }
  });
};

export const addLabCollection = (req, res) => {
  const { title, desc, objective, cloudprovider, type, difficulty, srccode, thumbnail, steps, isDeleted, isPublished } = req.body;
  const params = {
    TableName: tableName,
    Item: {
      id: Date.now().toString(),
      title,
      desc,
      objective,
      cloudprovider,
      type,
      difficulty,
      srccode,
      thumbnail,
      steps,
      isDeleted,
      isPublished
    }
  };

  dynamoDB.put(params, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(201).json({ message: 'LabCollection added successfully' });
    }
  });
};

export const updateLabCollection = (req, res) => {
  const { id } = req.params;
  const { title, desc, objective, cloudprovider, type, difficulty, srccode, thumbnail, steps } = req.body;
  const params = {
    TableName: tableName,
    Key: {
      id
    },
    UpdateExpression: 'set #t = :t, #d = :d, #o = :o, #cp = :cp, #tp = :tp, #df = :df, #sc = :sc, #tn = :tn, #st = :st',
    ExpressionAttributeNames: {
      '#t': 'title',
      '#d': 'desc',
      '#o': 'objective',
      '#cp': 'cloudprovider',
      '#tp': 'type',
      '#df': 'difficulty',
      '#sc': 'srccode',
      '#tn': 'thumbnail',
      '#st': 'steps'
    },
    ExpressionAttributeValues: {
      ':t': title,
      ':d': desc,
      ':o': objective,
      ':cp': cloudprovider,
      ':tp': type,
      ':df': difficulty,
      ':sc': srccode,
      ':tn': thumbnail,
      ':st': steps
    },
    ReturnValues: 'UPDATED_NEW'
  };

  dynamoDB.update(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(data.Attributes);
    }
  });
};

export const deleteLabCollection = (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: tableName,
    Key: {
      id
    }
  };

  dynamoDB.delete(params, (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ message: 'LabCollection deleted successfully' });
    }
  });
};
