import i18n from "../LangConfig";

export const GoogleLogin= () =>{
    const handleLogin = () => {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const googleLoginUrl = import.meta.env.VITE_GOOGLE_LOGIN_APP_API_URL;
      const loginUrl = `${baseUrl}${googleLoginUrl}`;
      window.location.href = loginUrl;
    };
  
    return (
      <div className="border flex items-center justify-center py-2 hover:bg-secondary/5">
        <button onClick={handleLogin} className="flex items-center gap-3 font-semibold text-slate-600">
          <img src="/icons/google-Icon.svg" alt="google logo" className="h-8 w-8" /> {i18n.t("loginPage.googleLogin")}
        </button>
      </div>
    );
  }