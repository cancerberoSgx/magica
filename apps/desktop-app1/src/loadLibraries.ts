import { magickLoaded } from 'magica'

export async function loadLibraries() {
  try {
    await magickLoaded
    // console.log(await run({script: 'identify rose:'}), 'se');
    // const Magica = {
    //   fromArrayBuffer: MagicaFile.fromArrayBuffer,
    //   fromRGBAImageData: async (data: ImageData) => MagicaFile.fromRGBAImageData(data as any),
    //   run
    // }
    // await loadOpencv({ formatProxies: [() => new MagicaCodec(Magica)] })
  } catch (error) {
    console.error(error)

  }
}
