"use client"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp"
import { useState } from "react"
import { Button } from "../../ui/button"
import { useGlobalContext } from "../../state/global/GlobalProvider"

export default function VerifyOTPScreen() {
  const {
    state: {
      user: { userId }
    },
    dispatch
  } = useGlobalContext()
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState()

  async function verifyOTP() {
    try {
      setLoading(true);
      const response = await api.createUserSession(otp);
      console.log(response)
      if (response.status_code !== 200) throw new Error(response.message);
      // toast.success(response.message);
    } catch (error) {
      console.error(error)
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return <div className="flex items-center justify-center h-screen">
    <div className="">
      <InputOTPPattern
        otp={otp}
        setOtp={setOtp}
      />
      <Button
        onClick={verifyOTP}
        className="mt-2"
      >
        Save
      </Button>
    </div>
  </div>
}

export function InputOTPPattern({
  otp,
  setOtp
}) {
  return (
    <InputOTP
      value={otp}
      onChange={setOtp}
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
