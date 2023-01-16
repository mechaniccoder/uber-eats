export default function SignInPage() {
  return (
    <div className="justify-cent items-center bg-gray-800">
      <div className="mx-auto flex max-w-[360px] flex-col gap-3 rounded-lg bg-white p-6">
        <h1>전화번호나 이메일이 어떻게 되시나요?</h1>
        {/* sign in form */}
        <form className="flex flex-col gap-3">
          <input
            className="min-h-[3rem] rounded-lg bg-gray-200 px-3 py-[0.625rem] focus:outline-none focus:ring-2"
            type="text"
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            autoFocus
            placeholder="Enter your email"
            aria-label="Enter your email"
          />

          <input
            className="min-h-[3rem] rounded-lg bg-gray-200 px-3 py-[0.625rem] focus:outline-none focus:ring-2"
            type="text"
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            autoFocus
            placeholder="Enter your password"
            aria-label="Enter your password"
          />
          <button
            type="submit"
            className="btn-primary bg-black text-white ring-sky-400 focus:outline-none focus:ring-2"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
