import { magickLoaded } from 'magica'

export async function loadLibraries() {
  try {
    await magickLoaded
  } catch (error) {
    console.error(error)
  }
}
