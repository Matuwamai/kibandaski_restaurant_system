import { BASE_URL } from "../../url";
import axios from "axios";
import {
  createTableStart,
  createTableSuccess,
  createTableFail,
  listTablesFail,
  listTablesStart,
  listTablesSuccess,
  deleteTableFail,
  deleteTableStart,
  deleteTableSuccess,
} from "../slices/tableSlices";

//  CREATE TABLES
export const createTable = (tables) => async (dispatch) => {
  try {
    dispatch(createTableStart());

    const { data } = await axios.post(`${BASE_URL}/tables/create`, tables);
    console.log(data);

    dispatch(createTableSuccess());
  } catch (err) {
    console.log(err);
    dispatch(createTableFail(err.message));
  }
};

//  LIST ALL TABLES

export const listTables = () => async (dispatch) => {
  try {
    dispatch(listTablesStart());

    const { data } = await axios.get(`${BASE_URL}/tables/list`);
    dispatch(listTablesSuccess(data));
  } catch (err) {
    dispatch(listTablesFail("Error listing tables!"));
  }
};

// DELETE TABLE

export const deleteTable = (table_no) => async (dispatch) => {
  try {
    dispatch(deleteTableStart());

    await axios.delete(`${BASE_URL}/tables/delete/${table_no}`);
    dispatch(deleteTableSuccess());
  } catch (err) {
    dispatch(deleteTableFail(`Error deleting TABLE#${table_no}`));
  }
};

// DELETE ALL TABLES
export const deleteAllTable = () => async (dispatch) => {
  try {
    dispatch(deleteTableStart());

    await axios.delete(`${BASE_URL}/tables/delete/all`);
    dispatch(deleteTableSuccess());
  } catch (err) {
    dispatch(deleteTableFail(`Error deleting  tables`));
  }
};
