/*
 * Copyright (c) 2020 by Wladimir Guerra. All rights reserved.
 */

/**
 * @typedef CreateCallback
 * @param Parse.Schema
 * A callback to create the class schema. It takes no argument.
 */
type CreateCallback = (schema: Parse.Schema) => void

/**
 * Create a schema if it doesn't exists.
 * @param className the new class name to be created with defined schema.
 * @param {CreateCallback} createCallback a callback function that add
 * the class's fields to the schema.
 */
const createSchemaIfDoesntExists = async (
    className :string,
    createCallback:CreateCallback,
) => {
  const schema = new Parse.Schema(className);

  return schema.get()
      .then(() => {
        //Ignore if found
      })
      .catch(() => {
        createCallback(schema);
        return schema.save();
      });
};

/**
 * @type {function()}
 * This function create the classes that doesn't already exists.
 *
 *
 * Existing classes will not be changed to prevent loss of data on server
 * startup.
 */
export const createSchemas = () => {
  (
      async () => {
        //TODO create schemas here
        //createSchemaIfDoesntExists()
      }
  )();

};

