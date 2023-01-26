import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getPostsWithFilters } from "../../Api";
import { IFilters } from "../../interfaces/IFilters";
import { IGetPost } from "../../interfaces/posts/IGetPost";
import Filters from "../common/Filters";
import Pagination from "../common/Pagination";
import AddPostModal from "./AddPostModal";
import PostsTable from "./PostsTable";

const DEFAULT_FILTERS: IFilters = {
  perPage: 10,
  page: 1,
  search: "",
  sortBy: "Title",
};
export default function PostsDashboard() {
  const [isOpenedAddPostModal, setIsOpenedAddPostModal] =
    useState<boolean>(false);
  const [posts, setPosts] = useState<IGetPost[]>([]);
  const [isAddedPost, setIsAddedPost] = useState<boolean>(false);
  const [isDeletedPost, setIsDeletedPost] = useState<boolean>(false);
  const [isUpdatedPost, setIsUpdatedPost] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters>(DEFAULT_FILTERS);
  const [pageCount, setPageCount] = useState<number>(1);
  useEffect(() => {
    setIsUpdatedPost(false);
    setIsDeletedPost(false);
    setIsAddedPost(false);
    getPostsWithFilters(filters)
      .then((response) => {
        setPosts(response.data.posts);
        setPageCount(response.data.filters.pageCount);
      })
      .catch((error) => console.log(error));
  }, [filters, isAddedPost, isDeletedPost, isUpdatedPost]);
  return (
    <div style={{ marginLeft: "1em" }}>
      <h2 style={{ textAlign: "center" }}>POSTS</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Button
          color="success"
          variant="contained"
          onClick={() => setIsOpenedAddPostModal(true)}
        >
          Add New Post
        </Button>
        {isOpenedAddPostModal && (
          <AddPostModal
            setIsOpenedAddPostModal={setIsOpenedAddPostModal}
            setIsAddedPost={setIsAddedPost}
          />
        )}
        <Filters filters={filters} dashboard="Posts" setFilters={setFilters} />
      </div>
      <PostsTable
        posts={posts}
        currentPage={filters.page}
        perPage={filters.perPage}
        setIsDeletedPost={setIsDeletedPost}
        setIsUpdatedPost={setIsUpdatedPost}
      />
      <Pagination
        filters={filters}
        setFilters={setFilters}
        pageCount={pageCount}
      />
    </div>
  );
}
