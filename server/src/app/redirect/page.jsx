"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const searchParam = useSearchParams();

  const code = searchParam.get("code")

  useEffect(function () {
    window.location.href = `xhttpclient://authorize?code=${code}`
  }, [])

  return <button
    onClick={() => window.location.href = `xhttpclient://authorize?code=${code}`}
    className="text-white bg-red-800 px-10 py-2 block mt-10 mx-auto cursor-pointer"
  >
    redirect
  </button>
}