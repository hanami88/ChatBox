function RegisterPage() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-[1.6rem]">
      <div className="w-[36rem] flex justify-center items-center flex-col">
        <img
          src="logo.png"
          alt=""
          className="w-[16rem] h-[16rem] mb-[4.5rem]"
        />
        <div className="text-[3.2rem] font-[500] mb-[0.8rem]">友コネクト</div>
        <div className="text-[1.6rem] text-[#707579] mb-[4.5rem]">
          ユーザー名とパスワードを入力してください。
        </div>
        <form className="flex w-full flex-col">
          <input
            type="text"
            placeholder="ユーザー名"
            className="outline-[#71d446] hover:border-[#71d446] text-black border-[0.1rem] border-[rgb(218,220,224)] rounded-[1.2rem] h-[4.8rem] px-[1.8rem] py-[1.1rem] placeholder:text-black mb-[2rem] placeholder:text-[rgb(169,169,169)]"
          />
          <input
            type="password"
            placeholder="パスワード"
            className="outline-[#71d446] hover:border-[#71d446] text-black border-[0.1rem] border-[rgb(218,220,224)] rounded-[1.2rem] h-[4.8rem] px-[1.8rem] py-[1.1rem] placeholder:text-black mb-[2rem] placeholder:text-[rgb(169,169,169)]"
          />
          <input
            type="password"
            placeholder="パスワード（確認"
            className="outline-[#71d446] hover:border-[#71d446] text-black border-[0.1rem] border-[rgb(218,220,224)] rounded-[1.2rem] h-[4.8rem] px-[1.8rem] py-[1.1rem] placeholder:text-black mb-[2rem] placeholder:text-[rgb(169,169,169)]"
          />
          <button className="h-[4.8rem] text-[1.65rem] font-[500] text-white bg-[#71d446] rounded-[1.2rem] mb-[2rem]">
            登録
          </button>
        </form>
        <a href="login-page" className="text-[#71d446] font-[600]">
          ログイン
        </a>
      </div>
    </div>
  );
}

export default RegisterPage;
