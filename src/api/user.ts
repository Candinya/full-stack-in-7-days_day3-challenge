import type { LoginFormInput } from "@/types/loginFormInput.ts";
import { LocalStorageKeyAPIKey } from "@/constants/localStorageKeys.ts";
import type { UserState } from "@/types/userState.ts";

const checkLoginState = async (): Promise<UserState> => {
  // 检查是否有保存上一次会话 key
  const apiKey = localStorage.getItem(LocalStorageKeyAPIKey);
  if (!apiKey) {
    // 没有 key
    return {
      isLoggedIn: false,
    };
  }
  // 使用 key 请求用户状态
  // 因为没有后端，所以暂时先认为是正确的
  return {
    isLoggedIn: true,
    username: "Candinya",
    apiKey,
  };
};

const userLogin = async (props: LoginFormInput): Promise<UserState> => {
  // 暂时没有后端，所以只能先本地处理
  if (props.username === "Candinya" && props.password === "Dem0P@55") {
    // 保存会话 key
    const apiKey = "api-key"; // 因为没有后端，所以先暂时返回这样
    localStorage.setItem(LocalStorageKeyAPIKey, apiKey);
    return {
      isLoggedIn: true,
      username: "Candinya",
      apiKey,
    };
  } else {
    throw new Error("账户名或密码错误");
  }
};

const userLogout = async () => {
  // 清理会话
  localStorage.removeItem(LocalStorageKeyAPIKey);
};

export default {
  checkLoginState,
  userLogin,
  userLogout,
};
