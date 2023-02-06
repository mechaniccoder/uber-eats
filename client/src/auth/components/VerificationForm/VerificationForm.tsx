import { VERIFY_CODE } from '@/auth/gql'
import { VerifyCodeMutation, VerifyCodeMutationVariables } from '@/gql/graphql'
import { useMutation } from '@apollo/client'
import { useState } from 'react'

const VERIFICATION_CODE_LENGTH = 6

type Props = {
  email: string
  onVerify: () => void
}
export const VerificationForm: React.FC<Props> = ({ email, onVerify }) => {
  const [verificationCode, setVerificationCode] = useState<string[]>([])

  const [verifyCode, { loading, error, data: verifyCodeData }] = useMutation<
    VerifyCodeMutation,
    VerifyCodeMutationVariables
  >(VERIFY_CODE, {
    onCompleted: ({ verifyCode }) => {
      const { ok, data } = verifyCode
      if (ok) {
        onVerify()
      }
    },
  })

  const handleComplete = (value: string) => {
    verifyCode({
      variables: {
        verifyCodeDto: {
          code: value,
          email,
        },
      },
    })
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target
    const { pinIndex } = event.target.dataset

    if (!pinIndex) return

    const pinIndexNumber = Number(pinIndex)

    if (pinIndexNumber < VERIFICATION_CODE_LENGTH && value) {
      focusNextPinInput(pinIndexNumber)
    }

    const nextValue = [...verificationCode]
    nextValue[pinIndexNumber] = value

    console.log(nextValue)
    if (nextValue.join('').length === VERIFICATION_CODE_LENGTH) {
      handleComplete(nextValue.join(''))
    }

    setVerificationCode(nextValue)
  }

  const focusNextPinInput = (index: number) => {
    /**
     * @todo Using ref callback for better interface
     */
    const nextPinInput = document.querySelector(
      `[data-pin-index="${index + 1}"]`,
    ) as HTMLInputElement

    if (nextPinInput) {
      requestAnimationFrame(() => {
        nextPinInput.focus()
      })
    }
  }

  const focusPrevPinInput = (index: number) => {
    if (index === 0) {
      return
    }

    /**
     * @todo Using ref callback for better interface
     */
    const prevPinInput = document.querySelector(
      `[data-pin-index="${index - 1}"]`,
    ) as HTMLInputElement

    console.log(prevPinInput)

    if (prevPinInput) {
      requestAnimationFrame(() => {
        prevPinInput.focus()
      })
    }
  }

  const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { key } = event
    const { pinIndex } = event.currentTarget.dataset
    const value = event.currentTarget.value

    if (!pinIndex) return

    const pinIndexNumber = Number(pinIndex)

    if (key === 'Backspace' && value === '') {
      focusPrevPinInput(pinIndexNumber)
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
  }

  return (
    <div className="">
      <h1 className="mb-3 text-2xl text-white">Enter a verification code</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div className="h-11 w-11 overflow-hidden rounded-lg">
            <input
              className="h-full w-full bg-gray-400 text-center text-xl"
              type="text"
              aria-label="Enter an OTP code"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              pattern="\d{1}"
              value={verificationCode[0]}
              onChange={handleChange}
              onKeyDown={handleKeydown}
              data-pin-index="0"
              maxLength={1}
            />
          </div>
          <div className="h-11 w-11 overflow-hidden rounded-lg">
            <input
              className="h-full w-full bg-gray-400 text-center text-xl"
              type="text"
              aria-label="Enter an OTP code"
              pattern="\d{1}"
              autoComplete="one-time-code"
              value={verificationCode[1]}
              onChange={handleChange}
              onKeyDown={handleKeydown}
              data-pin-index="1"
              maxLength={1}
            />
          </div>
          <div className="h-11 w-11 overflow-hidden rounded-lg">
            <input
              className="h-full w-full bg-gray-400 text-center text-xl"
              type="text"
              aria-label="Enter an OTP code"
              pattern="\d{1}"
              autoComplete="one-time-code"
              value={verificationCode[2]}
              onChange={handleChange}
              onKeyDown={handleKeydown}
              data-pin-index="2"
              maxLength={1}
            />
          </div>
          <div className="h-11 w-11 overflow-hidden rounded-lg">
            <input
              className="h-full w-full bg-gray-400 text-center text-xl"
              type="text"
              aria-label="Enter an OTP code"
              pattern="\d{1}"
              autoComplete="one-time-code"
              value={verificationCode[3]}
              onChange={handleChange}
              onKeyDown={handleKeydown}
              data-pin-index="3"
              maxLength={1}
            />
          </div>
          <div className="h-11 w-11 overflow-hidden rounded-lg">
            <input
              className="h-full w-full bg-gray-400 text-center text-xl"
              type="text"
              aria-label="Enter an OTP code"
              pattern="\d{1}"
              autoComplete="one-time-code"
              value={verificationCode[4]}
              onChange={handleChange}
              onKeyDown={handleKeydown}
              data-pin-index="4"
              maxLength={1}
            />
          </div>
          <div className="h-11 w-11 overflow-hidden rounded-lg">
            <input
              className="h-full w-full bg-gray-400 text-center text-xl"
              type="text"
              aria-label="Enter an OTP code"
              pattern="\d{1}"
              autoComplete="one-time-code"
              value={verificationCode[5]}
              onChange={handleChange}
              onKeyDown={handleKeydown}
              data-pin-index="5"
              maxLength={1}
            />
          </div>
        </div>

        <button
          className="mt-3  min-w-[56px] rounded-lg bg-black px-2 py-1 text-white"
          type="submit"
        >
          {loading ? 'Verifying...' : 'Next'}
        </button>
      </form>
    </div>
  )
}
