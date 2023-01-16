export default function SignInPage() {
  return (
    <div className="justify-cent items-center">
      <div className="mx-auto flex max-w-[360px] flex-col ">
        <h1>전화번호나 이메일이 어떻게 되시나요?</h1>
        {/* sign in form */}
        <form className="flex flex-col gap-3">
          <input
            className="min-h-[3rem] rounded-lg bg-gray-200 px-3 py-[0.625rem]"
            type="text"
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            autoFocus
            placeholder="Enter your email or phone number"
            aria-label="Enter your email or phone number"
          />
          <button className="btn-primary bg-black text-white">Continue</button>
        </form>

        {/* divider */}
        <div className="flex items-center before:h-px before:flex-1 before:bg-gray-400 after:h-px after:flex-1 after:bg-gray-400">
          <p className="mx-2">or</p>
        </div>

        {/* social login */}
        <div className="flex flex-col gap-2">
          <button className="btn-primary bg-gray-200 text-white">Continue with Google</button>
          <button className="btn-primary bg-gray-200 text-white">Continue with Facebook</button>
          <button className="btn-primary bg-gray-200 text-white">Continue with Apple</button>
        </div>
      </div>
    </div>
  )
}
