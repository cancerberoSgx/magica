> **[magica](../README.md)**

[Globals](../README.md) / ["file/emscriptenFs"](../modules/_file_emscriptenfs_.md) / [FS](_file_emscriptenfs_.fs.md) /

# Interface: FS

## Hierarchy

* **FS**

## Index

### Methods

* [allocate](_file_emscriptenfs_.fs.md#allocate)
* [analyzePath](_file_emscriptenfs_.fs.md#analyzepath)
* [chdir](_file_emscriptenfs_.fs.md#chdir)
* [chmod](_file_emscriptenfs_.fs.md#chmod)
* [chown](_file_emscriptenfs_.fs.md#chown)
* [close](_file_emscriptenfs_.fs.md#close)
* [createLazyFile](_file_emscriptenfs_.fs.md#createlazyfile)
* [createPreloadedFile](_file_emscriptenfs_.fs.md#createpreloadedfile)
* [cwd](_file_emscriptenfs_.fs.md#cwd)
* [fchmod](_file_emscriptenfs_.fs.md#fchmod)
* [fchown](_file_emscriptenfs_.fs.md#fchown)
* [ftruncate](_file_emscriptenfs_.fs.md#ftruncate)
* [getPath](_file_emscriptenfs_.fs.md#getpath)
* [init](_file_emscriptenfs_.fs.md#init)
* [ioctl](_file_emscriptenfs_.fs.md#ioctl)
* [isBlkdev](_file_emscriptenfs_.fs.md#isblkdev)
* [isChrdev](_file_emscriptenfs_.fs.md#ischrdev)
* [isDir](_file_emscriptenfs_.fs.md#isdir)
* [isFIFO](_file_emscriptenfs_.fs.md#isfifo)
* [isFile](_file_emscriptenfs_.fs.md#isfile)
* [isLink](_file_emscriptenfs_.fs.md#islink)
* [isSocket](_file_emscriptenfs_.fs.md#issocket)
* [lchmod](_file_emscriptenfs_.fs.md#lchmod)
* [lchown](_file_emscriptenfs_.fs.md#lchown)
* [llseek](_file_emscriptenfs_.fs.md#llseek)
* [lookupPath](_file_emscriptenfs_.fs.md#lookuppath)
* [lstat](_file_emscriptenfs_.fs.md#lstat)
* [major](_file_emscriptenfs_.fs.md#major)
* [makedev](_file_emscriptenfs_.fs.md#makedev)
* [minor](_file_emscriptenfs_.fs.md#minor)
* [mkdev](_file_emscriptenfs_.fs.md#mkdev)
* [mkdir](_file_emscriptenfs_.fs.md#mkdir)
* [mmap](_file_emscriptenfs_.fs.md#mmap)
* [mount](_file_emscriptenfs_.fs.md#mount)
* [open](_file_emscriptenfs_.fs.md#open)
* [read](_file_emscriptenfs_.fs.md#read)
* [readFile](_file_emscriptenfs_.fs.md#readfile)
* [readdir](_file_emscriptenfs_.fs.md#readdir)
* [readlink](_file_emscriptenfs_.fs.md#readlink)
* [registerDevice](_file_emscriptenfs_.fs.md#registerdevice)
* [rename](_file_emscriptenfs_.fs.md#rename)
* [rmdir](_file_emscriptenfs_.fs.md#rmdir)
* [stat](_file_emscriptenfs_.fs.md#stat)
* [symlink](_file_emscriptenfs_.fs.md#symlink)
* [syncfs](_file_emscriptenfs_.fs.md#syncfs)
* [truncate](_file_emscriptenfs_.fs.md#truncate)
* [unlink](_file_emscriptenfs_.fs.md#unlink)
* [unmount](_file_emscriptenfs_.fs.md#unmount)
* [utime](_file_emscriptenfs_.fs.md#utime)
* [write](_file_emscriptenfs_.fs.md#write)
* [writeFile](_file_emscriptenfs_.fs.md#writefile)

## Methods

###  allocate

▸ **allocate**(`stream`: `FSStream`, `offset`: number, `length`: number): *void*

*Defined in [file/emscriptenFs.ts:55](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | `FSStream` |
`offset` | number |
`length` | number |

**Returns:** *void*

___

###  analyzePath

▸ **analyzePath**(`p`: string): *any*

*Defined in [file/emscriptenFs.ts:61](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`p` | string |

**Returns:** *any*

___

###  chdir

▸ **chdir**(`path`: string): *void*

*Defined in [file/emscriptenFs.ts:63](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *void*

___

###  chmod

▸ **chmod**(`path`: string, `mode`: number, `dontFollow?`: undefined | false | true): *void*

*Defined in [file/emscriptenFs.ts:41](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`mode` | number |
`dontFollow?` | undefined \| false \| true |

**Returns:** *void*

___

###  chown

▸ **chown**(`path`: string, `uid`: number, `gid`: number, `dontFollow?`: undefined | false | true): *void*

*Defined in [file/emscriptenFs.ts:44](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`uid` | number |
`gid` | number |
`dontFollow?` | undefined \| false \| true |

**Returns:** *void*

___

###  close

▸ **close**(`stream`: `FSStream`): *void*

*Defined in [file/emscriptenFs.ts:51](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | `FSStream` |

**Returns:** *void*

___

###  createLazyFile

▸ **createLazyFile**(`parent`: string, `name`: string, `url`: string, `canRead`: boolean, `canWrite`: boolean): *`FSNode`*

*Defined in [file/emscriptenFs.ts:66](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`parent` | string |
`name` | string |
`url` | string |
`canRead` | boolean |
`canWrite` | boolean |

**Returns:** *`FSNode`*

▸ **createLazyFile**(`parent`: `FSNode`, `name`: string, `url`: string, `canRead`: boolean, `canWrite`: boolean): *`FSNode`*

*Defined in [file/emscriptenFs.ts:67](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`parent` | `FSNode` |
`name` | string |
`url` | string |
`canRead` | boolean |
`canWrite` | boolean |

**Returns:** *`FSNode`*

___

###  createPreloadedFile

▸ **createPreloadedFile**(`parent`: string, `name`: string, `url`: string, `canRead`: boolean, `canWrite`: boolean, `onload?`: undefined | function, `onerror?`: undefined | function, `dontCreateFile?`: undefined | false | true, `canOwn?`: undefined | false | true): *void*

*Defined in [file/emscriptenFs.ts:69](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`parent` | string |
`name` | string |
`url` | string |
`canRead` | boolean |
`canWrite` | boolean |
`onload?` | undefined \| function |
`onerror?` | undefined \| function |
`dontCreateFile?` | undefined \| false \| true |
`canOwn?` | undefined \| false \| true |

**Returns:** *void*

▸ **createPreloadedFile**(`parent`: `FSNode`, `name`: string, `url`: string, `canRead`: boolean, `canWrite`: boolean, `onload?`: undefined | function, `onerror?`: undefined | function, `dontCreateFile?`: undefined | false | true, `canOwn?`: undefined | false | true): *void*

*Defined in [file/emscriptenFs.ts:70](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`parent` | `FSNode` |
`name` | string |
`url` | string |
`canRead` | boolean |
`canWrite` | boolean |
`onload?` | undefined \| function |
`onerror?` | undefined \| function |
`dontCreateFile?` | undefined \| false \| true |
`canOwn?` | undefined \| false \| true |

**Returns:** *void*

___

###  cwd

▸ **cwd**(): *string*

*Defined in [file/emscriptenFs.ts:62](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L62)*

**Returns:** *string*

___

###  fchmod

▸ **fchmod**(`fd`: number, `mode`: number): *void*

*Defined in [file/emscriptenFs.ts:43](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`fd` | number |
`mode` | number |

**Returns:** *void*

___

###  fchown

▸ **fchown**(`fd`: number, `uid`: number, `gid`: number): *void*

*Defined in [file/emscriptenFs.ts:46](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`fd` | number |
`uid` | number |
`gid` | number |

**Returns:** *void*

___

###  ftruncate

▸ **ftruncate**(`fd`: number, `len`: number): *void*

*Defined in [file/emscriptenFs.ts:48](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`fd` | number |
`len` | number |

**Returns:** *void*

___

###  getPath

▸ **getPath**(`node`: `FSNode`): *string*

*Defined in [file/emscriptenFs.ts:11](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | `FSNode` |

**Returns:** *string*

___

###  init

▸ **init**(`input`: function, `output`: function, `error`: function): *void*

*Defined in [file/emscriptenFs.ts:64](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L64)*

**Parameters:**

▪ **input**: *function*

▸ (): *number*

▪ **output**: *function*

▸ (`c`: number): *any*

**Parameters:**

Name | Type |
------ | ------ |
`c` | number |

▪ **error**: *function*

▸ (`c`: number): *any*

**Parameters:**

Name | Type |
------ | ------ |
`c` | number |

**Returns:** *void*

___

###  ioctl

▸ **ioctl**(`stream`: `FSStream`, `cmd`: any, `arg`: any): *any*

*Defined in [file/emscriptenFs.ts:57](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | `FSStream` |
`cmd` | any |
`arg` | any |

**Returns:** *any*

___

###  isBlkdev

▸ **isBlkdev**(`mode`: number): *boolean*

*Defined in [file/emscriptenFs.ts:17](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  isChrdev

▸ **isChrdev**(`mode`: number): *boolean*

*Defined in [file/emscriptenFs.ts:16](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  isDir

▸ **isDir**(`mode`: number): *boolean*

*Defined in [file/emscriptenFs.ts:14](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  isFIFO

▸ **isFIFO**(`mode`: number): *boolean*

*Defined in [file/emscriptenFs.ts:18](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  isFile

▸ **isFile**(`mode`: number): *boolean*

*Defined in [file/emscriptenFs.ts:13](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  isLink

▸ **isLink**(`mode`: number): *boolean*

*Defined in [file/emscriptenFs.ts:15](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  isSocket

▸ **isSocket**(`mode`: number): *boolean*

*Defined in [file/emscriptenFs.ts:19](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`mode` | number |

**Returns:** *boolean*

___

###  lchmod

▸ **lchmod**(`path`: string, `mode`: number): *void*

*Defined in [file/emscriptenFs.ts:42](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`mode` | number |

**Returns:** *void*

___

###  lchown

▸ **lchown**(`path`: string, `uid`: number, `gid`: number): *void*

*Defined in [file/emscriptenFs.ts:45](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`uid` | number |
`gid` | number |

**Returns:** *void*

___

###  llseek

▸ **llseek**(`stream`: `FSStream`, `offset`: number, `whence`: number): *any*

*Defined in [file/emscriptenFs.ts:52](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | `FSStream` |
`offset` | number |
`whence` | number |

**Returns:** *any*

___

###  lookupPath

▸ **lookupPath**(`path`: string, `opts`: any): *`Lookup`*

*Defined in [file/emscriptenFs.ts:10](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`opts` | any |

**Returns:** *`Lookup`*

___

###  lstat

▸ **lstat**(`path`: string): *any*

*Defined in [file/emscriptenFs.ts:40](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *any*

___

###  major

▸ **major**(`dev`: number): *number*

*Defined in [file/emscriptenFs.ts:21](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`dev` | number |

**Returns:** *number*

___

###  makedev

▸ **makedev**(`ma`: number, `mi`: number): *number*

*Defined in [file/emscriptenFs.ts:23](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`ma` | number |
`mi` | number |

**Returns:** *number*

___

###  minor

▸ **minor**(`dev`: number): *number*

*Defined in [file/emscriptenFs.ts:22](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`dev` | number |

**Returns:** *number*

___

###  mkdev

▸ **mkdev**(`path`: string, `mode?`: undefined | number, `dev?`: undefined | number): *any*

*Defined in [file/emscriptenFs.ts:32](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`mode?` | undefined \| number |
`dev?` | undefined \| number |

**Returns:** *any*

___

###  mkdir

▸ **mkdir**(`path`: string, `mode?`: undefined | number): *any*

*Defined in [file/emscriptenFs.ts:31](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`mode?` | undefined \| number |

**Returns:** *any*

___

###  mmap

▸ **mmap**(`stream`: `FSStream`, `buffer`: `ArrayBufferView`, `offset`: number, `length`: number, `position`: number, `prot`: number, `flags`: number): *any*

*Defined in [file/emscriptenFs.ts:56](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | `FSStream` |
`buffer` | `ArrayBufferView` |
`offset` | number |
`length` | number |
`position` | number |
`prot` | number |
`flags` | number |

**Returns:** *any*

___

###  mount

▸ **mount**(`type`: any, `opts`: any, `mountpoint`: string): *any*

*Defined in [file/emscriptenFs.ts:28](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | any |
`opts` | any |
`mountpoint` | string |

**Returns:** *any*

___

###  open

▸ **open**(`path`: string, `flags`: string, `mode?`: undefined | number, `fd_start?`: undefined | number, `fd_end?`: undefined | number): *`FSStream`*

*Defined in [file/emscriptenFs.ts:50](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L50)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`flags` | string |
`mode?` | undefined \| number |
`fd_start?` | undefined \| number |
`fd_end?` | undefined \| number |

**Returns:** *`FSStream`*

___

###  read

▸ **read**(`stream`: `FSStream`, `buffer`: `ArrayBufferView`, `offset`: number, `length`: number, `position?`: undefined | number): *number*

*Defined in [file/emscriptenFs.ts:53](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | `FSStream` |
`buffer` | `ArrayBufferView` |
`offset` | number |
`length` | number |
`position?` | undefined \| number |

**Returns:** *number*

___

###  readFile

▸ **readFile**(`path`: string, `opts?`: undefined | object): *any*

*Defined in [file/emscriptenFs.ts:58](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`opts?` | undefined \| object |

**Returns:** *any*

___

###  readdir

▸ **readdir**(`path`: string): *any*

*Defined in [file/emscriptenFs.ts:36](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *any*

___

###  readlink

▸ **readlink**(`path`: string): *string*

*Defined in [file/emscriptenFs.ts:38](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *string*

___

###  registerDevice

▸ **registerDevice**(`dev`: number, `ops`: any): *void*

*Defined in [file/emscriptenFs.ts:24](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`dev` | number |
`ops` | any |

**Returns:** *void*

___

###  rename

▸ **rename**(`old_path`: string, `new_path`: string): *void*

*Defined in [file/emscriptenFs.ts:34](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`old_path` | string |
`new_path` | string |

**Returns:** *void*

___

###  rmdir

▸ **rmdir**(`path`: string): *void*

*Defined in [file/emscriptenFs.ts:35](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *void*

___

###  stat

▸ **stat**(`path`: string, `dontFollow?`: undefined | false | true): *any*

*Defined in [file/emscriptenFs.ts:39](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`dontFollow?` | undefined \| false \| true |

**Returns:** *any*

___

###  symlink

▸ **symlink**(`oldpath`: string, `newpath`: string): *any*

*Defined in [file/emscriptenFs.ts:33](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`oldpath` | string |
`newpath` | string |

**Returns:** *any*

___

###  syncfs

▸ **syncfs**(`populate`: boolean, `callback`: function): *void*

*Defined in [file/emscriptenFs.ts:26](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L26)*

**Parameters:**

▪ **populate**: *boolean*

▪ **callback**: *function*

▸ (`e`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`e` | any |

**Returns:** *void*

▸ **syncfs**(`callback`: function, `populate?`: undefined | false | true): *void*

*Defined in [file/emscriptenFs.ts:27](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L27)*

**Parameters:**

▪ **callback**: *function*

▸ (`e`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`e` | any |

▪`Optional`  **populate**: *undefined | false | true*

**Returns:** *void*

___

###  truncate

▸ **truncate**(`path`: string, `len`: number): *void*

*Defined in [file/emscriptenFs.ts:47](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`len` | number |

**Returns:** *void*

___

###  unlink

▸ **unlink**(`path`: string): *void*

*Defined in [file/emscriptenFs.ts:37](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *void*

___

###  unmount

▸ **unmount**(`mountpoint`: string): *void*

*Defined in [file/emscriptenFs.ts:29](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`mountpoint` | string |

**Returns:** *void*

___

###  utime

▸ **utime**(`path`: string, `atime`: number, `mtime`: number): *void*

*Defined in [file/emscriptenFs.ts:49](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`atime` | number |
`mtime` | number |

**Returns:** *void*

___

###  write

▸ **write**(`stream`: `FSStream`, `buffer`: `ArrayBufferView`, `offset`: number, `length`: number, `position?`: undefined | number, `canOwn?`: undefined | false | true): *number*

*Defined in [file/emscriptenFs.ts:54](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`stream` | `FSStream` |
`buffer` | `ArrayBufferView` |
`offset` | number |
`length` | number |
`position?` | undefined \| number |
`canOwn?` | undefined \| false \| true |

**Returns:** *number*

___

###  writeFile

▸ **writeFile**(`path`: string, `data`: `ArrayBufferView`, `opts?`: undefined | object): *void*

*Defined in [file/emscriptenFs.ts:59](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`data` | `ArrayBufferView` |
`opts?` | undefined \| object |

**Returns:** *void*

▸ **writeFile**(`path`: string, `data`: string, `opts?`: undefined | object): *void*

*Defined in [file/emscriptenFs.ts:60](https://github.com/cancerberoSgx/magica/blob/b406772/src/file/emscriptenFs.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |
`data` | string |
`opts?` | undefined \| object |

**Returns:** *void*