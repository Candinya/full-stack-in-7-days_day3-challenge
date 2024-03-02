import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api";
import { setNotes } from "@/slices/notesSlice.ts";
import SingleNote from "@/components/SingleNote.tsx";
import { Flex, Skeleton } from "@mantine/core";
import NotesContainer from "@/components/NotesContainer.tsx";

const NotesLoadingPlaceholder = () => (
  // 骨架屏
  <Flex direction="column" gap="sm">
    {Array(3)
      .fill(null)
      .map((_, index) => (
        <Skeleton key={index}>
          {/*使用真实的 SingleNote 组件来避免宽度不一致的情况*/}
          {/*但其实可以优化，因为这样会增大渲染开销*/}
          <SingleNote content={"笔记正在加载中..."} />
        </Skeleton>
      ))}
  </Flex>
);

const HomePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState(true);

  const nav = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn || !user.apiKey) {
      // 重定向到登录
      nav("/login");
    } else {
      // 加载全部笔记
      API.notes.getNotes(user.apiKey).then((notes) => {
        dispatch(setNotes(notes));
        setIsLoading(false);
      });
    }
  }, [user.isLoggedIn]);

  return isLoading ? <NotesLoadingPlaceholder /> : <NotesContainer />;
};

export default HomePage;
