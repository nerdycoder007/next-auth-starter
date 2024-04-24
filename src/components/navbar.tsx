import { auth, signOut } from "@/lib/auth"

import { LoginButton } from "./auth/login-button"
import { Icons } from "./icons"
import { Button } from "./ui/button"

export const Navbar = async () => {
  const session = await auth()
  return (
    <>
      <div className="sticky bg-background/90 z-10 backdrop-filter backdrop-blur-[6px] top-0 px-8 h-24 flex items-center justify-center w-full">
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Icons.logo className="h-5 w-5" />
            <h1 className="text-xl font-semibold drop-shadow-lg bg-gradient-to-r from-white to-blue-400 text-transparent bg-clip-text">
              The NextBase
            </h1>
          </div>
          {session?.user ? (
            /**
             * We cannot directly do `<button onClick={signOut()}>`, since signOut() function modifies cookies
             *
             * Cookies can only be modified in a Server Action or Route Handler
             */
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <Button type="submit">Logout</Button>
            </form>
          ) : (
            <LoginButton>
              <Button>Sign in</Button>
            </LoginButton>
          )}
        </div>
      </div>
      <div className="h-24"></div>
    </>
  )
}
