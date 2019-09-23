[video-capture](../README.md) › ["capture"](../modules/_capture_.md) › [VideoCapture](_capture_.videocapture.md)

# Class: VideoCapture

## Hierarchy

* **VideoCapture**

## Index

### Constructors

* [constructor](_capture_.videocapture.md#constructor)

### Properties

* [browser](_capture_.videocapture.md#protected-optional-browser)
* [capturing](_capture_.videocapture.md#protected-capturing)
* [initialized](_capture_.videocapture.md#protected-initialized)
* [lastFrame](_capture_.videocapture.md#protected-optional-lastframe)
* [listeners](_capture_.videocapture.md#protected-listeners)
* [o](_capture_.videocapture.md#protected-o)
* [page](_capture_.videocapture.md#protected-optional-page)
* [server](_capture_.videocapture.md#protected-optional-server)

### Methods

* [_postFrame](_capture_.videocapture.md#protected-_postframe)
* [addFrameListener](_capture_.videocapture.md#addframelistener)
* [captureFrame](_capture_.videocapture.md#protected-captureframe)
* [captureLoop](_capture_.videocapture.md#protected-captureloop)
* [initialize](_capture_.videocapture.md#initialize)
* [initializeMedia](_capture_.videocapture.md#protected-initializemedia)
* [launch](_capture_.videocapture.md#protected-launch)
* [notifyListeners](_capture_.videocapture.md#protected-notifylisteners)
* [pause](_capture_.videocapture.md#pause)
* [readFrame](_capture_.videocapture.md#readframe)
* [resume](_capture_.videocapture.md#resume)
* [start](_capture_.videocapture.md#start)
* [stop](_capture_.videocapture.md#stop)

## Constructors

###  constructor

\+ **new VideoCapture**(`o`: [CaptureOptions](../interfaces/_capture_.captureoptions.md)): *[VideoCapture](_capture_.videocapture.md)*

*Defined in [capture.ts:33](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L33)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`o` | [CaptureOptions](../interfaces/_capture_.captureoptions.md) |  {} |

**Returns:** *[VideoCapture](_capture_.videocapture.md)*

## Properties

### `Protected` `Optional` browser

• **browser**? : *puppeteer.Browser*

*Defined in [capture.ts:30](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L30)*

___

### `Protected` capturing

• **capturing**: *boolean* = false

*Defined in [capture.ts:32](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L32)*

___

### `Protected` initialized

• **initialized**: *boolean* = false

*Defined in [capture.ts:33](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L33)*

___

### `Protected` `Optional` lastFrame

• **lastFrame**? : *ImageData*

*Defined in [capture.ts:56](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L56)*

___

### `Protected` listeners

• **listeners**: *Listener[]* =  []

*Defined in [capture.ts:40](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L40)*

___

### `Protected` o

• **o**: *[CaptureOptions](../interfaces/_capture_.captureoptions.md)*

*Defined in [capture.ts:35](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L35)*

___

### `Protected` `Optional` page

• **page**? : *puppeteer.Page*

*Defined in [capture.ts:31](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L31)*

___

### `Protected` `Optional` server

• **server**? : *Server*

*Defined in [capture.ts:29](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L29)*

## Methods

### `Protected` _postFrame

▸ **_postFrame**(`width`: number, `height`: number, `data`: number[]): *Promise‹void›*

*Defined in [capture.ts:46](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`width` | number |
`height` | number |
`data` | number[] |

**Returns:** *Promise‹void›*

___

###  addFrameListener

▸ **addFrameListener**(`listener`: Listener): *void*

*Defined in [capture.ts:42](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`listener` | Listener |

**Returns:** *void*

___

### `Protected` captureFrame

▸ **captureFrame**(): *Promise‹void›*

*Defined in [capture.ts:135](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L135)*

**Returns:** *Promise‹void›*

___

### `Protected` captureLoop

▸ **captureLoop**(): *Promise‹void›*

*Defined in [capture.ts:153](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L153)*

**Returns:** *Promise‹void›*

___

###  initialize

▸ **initialize**(): *Promise‹void›*

*Defined in [capture.ts:97](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L97)*

starts servers, browser and media streams / canvas / video in the DOM.

It's not neccesary to call this method - it will be called automatically. Separated on purpose so capturing can be measured independently of initialization.

**Returns:** *Promise‹void›*

___

### `Protected` initializeMedia

▸ **initializeMedia**(): *Promise‹void›*

*Defined in [capture.ts:164](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L164)*

**Returns:** *Promise‹void›*

___

### `Protected` launch

▸ **launch**(): *Promise‹void›*

*Defined in [capture.ts:107](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L107)*

**Returns:** *Promise‹void›*

___

### `Protected` notifyListeners

▸ **notifyListeners**(`d`: ImageData): *void*

*Defined in [capture.ts:76](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`d` | ImageData |

**Returns:** *void*

___

###  pause

▸ **pause**(): *Promise‹void›*

*Defined in [capture.ts:68](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L68)*

**Returns:** *Promise‹void›*

___

###  readFrame

▸ **readFrame**(): *Promise‹ImageData›*

*Defined in [capture.ts:145](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L145)*

**Returns:** *Promise‹ImageData›*

___

###  resume

▸ **resume**(): *Promise‹void›*

*Defined in [capture.ts:72](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L72)*

**Returns:** *Promise‹void›*

___

###  start

▸ **start**(): *Promise‹void›*

*Defined in [capture.ts:83](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L83)*

Starts capture. It resolved when the camera starts capturing or rejects if any error.

**Returns:** *Promise‹void›*

___

###  stop

▸ **stop**(): *Promise‹void›*

*Defined in [capture.ts:61](https://github.com/cancerberoSgx/magica/blob/df88de8/video-capture/src/capture.ts#L61)*

Given callback can be called to stop video capture (turns camera off)

**Returns:** *Promise‹void›*
