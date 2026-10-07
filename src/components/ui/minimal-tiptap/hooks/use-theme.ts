import * as React from "react"

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  )

  React.useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e: MediaQueryListEvent) => {
      const newDarkMode = e.matches
      setIsDarkMode(newDarkMode)
    }

    darkModeMediaQuery.addEventListener("change", handleChange)

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return isDarkMode
}

export default useTheme
