import axios from "axios";
import { IFilters } from "./interfaces/IFilters";
import { IAddPost } from "./interfaces/posts/IAddPost";
import { IUpdatePost } from "./interfaces/posts/IUpdatePost";
import { IAddUser } from "./interfaces/users/IAddUser";
import { IUpdateUser } from "./interfaces/users/IUpdateUser";

const SERVER_URL: string = "http://localhost:5000/api";

export const getUsersWithoutFilters = () => {
  return axios.get(SERVER_URL + "/users");
};
export const getUsersWithFilters = (filters: IFilters) => {
  return axios.get(SERVER_URL + "/usersFilters", { params: filters });
};
export const addUser = (userToAdd: IAddUser) => {
  return axios.post(SERVER_URL + "/users", userToAdd);
};
export const deleteUser = (id: string) => {
  return axios.delete(SERVER_URL + `/users/${id}`);
};
export const updateUser = (userToUpdate: IUpdateUser) => {
  return axios.put(SERVER_URL + "/users", userToUpdate);
};
export const getPostsWithFilters = (filters: IFilters) => {
  return axios.get(SERVER_URL + "/postsFilters", { params: filters });
};
export const addPost = (postToAdd: IAddPost) => {
  return axios.post(SERVER_URL + "/posts", postToAdd);
};
export const deletePost = (id: string) => {
  return axios.delete(SERVER_URL + `/posts/${id}`);
};
export const updatePost = (postToUpdate: IUpdatePost) => {
  return axios.put(SERVER_URL + "/posts", postToUpdate);
};
