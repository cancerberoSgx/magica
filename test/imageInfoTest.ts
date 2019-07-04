import test from 'ava'
import { setObjectProperty } from 'misc-utils-of-mine-generic'
import { File } from '../src'
import { imageInfo } from '../src/image/imageInfo'

test('should extract image info', async t => {
  function process(o: any) {
    setObjectProperty(o, '0.image.properties.date:create', null)
    setObjectProperty(o, '0.image.properties.date:modify', null)
    return o
  }
  const i = await imageInfo(await File.fromFile('test/assets/n.png'))
  t.deepEqual(process(i), process(o))
})

const o = [
  {
    "image": {
      "name": "imgInfo.json",
      "baseName": "n.png",
      "format": "PNG",
      "formatDescription": "PNG",
      "mimeType": "image/png",
      "class": "DirectClass",
      "geometry": {
        "width": 109,
        "height": 145,
        "x": 0,
        "y": 0
      },
      "resolution": {
        "x": 72,
        "y": 72
      },
      "printSize": {
        "x": 1.51389,
        "y": 2.01389
      },
      "units": "PixelsPerInch",
      "type": "TrueColor",
      "baseType": "Undefined",
      "endianess": "Undefined",
      "colorspace": "sRGB",
      "depth": 8,
      "baseDepth": 8,
      "channelDepth": {
        "red": 8,
        "green": 8,
        "blue": 1
      },
      "pixels": 47415,
      "imageStatistics": {
        "Overall": {
          "min": 0,
          "max": 242,
          "mean": 129.917,
          "standardDeviation": 14841.5,
          "kurtosis": -0.836822,
          "skewness": -0.813355,
          "entropy": 0.91464
        }
      },
      "channelStatistics": {
        "Red": {
          "min": 0,
          "max": 237,
          "mean": 129.561,
          "standardDeviation": 13774.6,
          "kurtosis": -0.827727,
          "skewness": -0.795068,
          "entropy": 0.913758
        },
        "Green": {
          "min": 0,
          "max": 242,
          "mean": 130.987,
          "standardDeviation": 15334.2,
          "kurtosis": -0.876458,
          "skewness": -0.811336,
          "entropy": 0.91603
        },
        "Blue": {
          "min": 0,
          "max": 235,
          "mean": 129.201,
          "standardDeviation": 15415.6,
          "kurtosis": -0.856609,
          "skewness": -0.823606,
          "entropy": 0.914133
        }
      },
      "renderingIntent": "Perceptual",
      "gamma": 0.454545,
      "chromaticity": {
        "redPrimary": {
          "x": 0.64,
          "y": 0.33
        },
        "greenPrimary": {
          "x": 0.3,
          "y": 0.6
        },
        "bluePrimary": {
          "x": 0.15,
          "y": 0.06
        },
        "whitePrimary": {
          "x": 0.3127,
          "y": 0.329
        }
      },
      "matteColor": "#BDBDBD",
      "backgroundColor": "#FFFFFF",
      "borderColor": "#DFDFDF",
      "transparentColor": "#00000000",
      "interlace": "None",
      "intensity": "Undefined",
      "compose": "Over",
      "pageGeometry": {
        "width": 109,
        "height": 145,
        "x": 0,
        "y": 0
      },
      "dispose": "Undefined",
      "iterations": 0,
      "compression": "Zip",
      "orientation": "Undefined",
      "properties": {
        "Comment": "File source: http://commons.wikimedia.org/wiki/File:Friedrich_Nietzsche_drawn_by_Hans_Olde.jpg",
        "date:create": "2019-07-03T19:35:48-03:00",
        "date:modify": "2019-07-03T19:35:48-03:00",
        "exif:BitsPerSample": "8, 8, 8",
        "exif:DateTime": "2018:09:20 11:45:56",
        "exif:ExifOffset": "284",
        "exif:ImageDescription": "File source: http://commons.wikimedia.org/wiki/File:Friedrich_Nietzsche_drawn_by_Hans_Olde.jpg",
        "exif:ImageLength": "145",
        "exif:ImageWidth": "109",
        "exif:ResolutionUnit": "2",
        "exif:Software": "GIMP 2.10.6",
        "exif:thumbnail:BitsPerSample": "8, 8, 8",
        "exif:thumbnail:Compression": "6",
        "exif:thumbnail:ImageLength": "256",
        "exif:thumbnail:ImageWidth": "192",
        "exif:thumbnail:JPEGInterchangeFormat": "512",
        "exif:thumbnail:JPEGInterchangeFormatLength": "8968",
        "exif:thumbnail:PhotometricInterpretation": "6",
        "exif:thumbnail:SamplesPerPixel": "3",
        "exif:UserComment": "0, 0, 0, 0, 0, 0, 0, 0, 70, 105, 108, 101, 32, 115, 111, 117, 114, 99, 101, 58, 32, 104, 116, 116, 112, 58, 47, 47, 99, 111, 109, 109, 111, 110, 115, 46, 119, 105, 107, 105, 109, 101, 100, 105, 97, 46, 111, 114, 103, 47, 119, 105, 107, 105, 47, 70, 105, 108, 101, 58, 70, 114, 105, 101, 100, 114, 105, 99, 104, 95, 78, 105, 101, 116, 122, 115, 99, 104, 101, 95, 100, 114, 97, 119, 110, 95, 98, 121, 95, 72, 97, 110, 115, 95, 79, 108, 100, 101, 46, 106, 112, 103",
        "exif:XResolution": "72/1",
        "exif:YResolution": "72/1",
        "png:IHDR.bit-depth-orig": "8",
        "png:IHDR.bit_depth": "8",
        "png:IHDR.color-type-orig": "2",
        "png:IHDR.color_type": "2 (Truecolor)",
        "png:IHDR.interlace_method": "0 (Not interlaced)",
        "png:IHDR.width,height": "109, 145",
        "png:pHYs": "x_res=2835, y_res=2835, units=1",
        "png:sRGB": "intent=0 (Perceptual Intent)",
        "png:text": "2 tEXt/zTXt/iTXt chunks were found",
        "png:text-encoded profiles": "1 were found",
        "png:tIME": "2018-09-20T14:46:01Z",
        "signature": "c33f8650bf12d694c72eda550edb5ebf1ab57e5082c21106015fd3f6b77a8776"
      },
      "profiles": {
        "exif": {
          "length": 9486
        }
      },
      "tainted": false,
      "filesize": "4152B",
      "numberPixels": "15805",
      "pixelsPerSecond": "15805000000000000B",
      "userTime": "0.000u",
      "elapsedTime": "0:01.000",
      "version": "file:////share/doc/ImageMagick-7/index.html"
    }
  }
]
