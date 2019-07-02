interface Lookup {
  path: string;
  node: FSNode;
}
interface FSStream { }
interface FSNode { }

export interface FS {

  lookupPath(path: string, opts: any): Lookup;
  getPath(node: FSNode): string;

  isFile(mode: number): boolean;
  isDir(mode: number): boolean;
  isLink(mode: number): boolean;
  isChrdev(mode: number): boolean;
  isBlkdev(mode: number): boolean;
  isFIFO(mode: number): boolean;
  isSocket(mode: number): boolean;

  major(dev: number): number;
  minor(dev: number): number;
  makedev(ma: number, mi: number): number;
  registerDevice(dev: number, ops: any): void;

  syncfs(populate: boolean, callback: (e: any) => any): void;
  syncfs(callback: (e: any) => any, populate?: boolean): void;
  mount(type: any, opts: any, mountpoint: string): any;
  unmount(mountpoint: string): void;

  mkdir(path: string, mode?: number): any;
  mkdev(path: string, mode?: number, dev?: number): any;
  symlink(oldpath: string, newpath: string): any;
  rename(old_path: string, new_path: string): void;
  rmdir(path: string): void;
  readdir(path: string): any;
  unlink(path: string): void;
  readlink(path: string): string;
  stat(path: string, dontFollow?: boolean): any;
  lstat(path: string): any;
  chmod(path: string, mode: number, dontFollow?: boolean): void;
  lchmod(path: string, mode: number): void;
  fchmod(fd: number, mode: number): void;
  chown(path: string, uid: number, gid: number, dontFollow?: boolean): void;
  lchown(path: string, uid: number, gid: number): void;
  fchown(fd: number, uid: number, gid: number): void;
  truncate(path: string, len: number): void;
  ftruncate(fd: number, len: number): void;
  utime(path: string, atime: number, mtime: number): void;
  open(path: string, flags: string, mode?: number, fd_start?: number, fd_end?: number): FSStream;
  close(stream: FSStream): void;
  llseek(stream: FSStream, offset: number, whence: number): any;
  read(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position?: number): number;
  write(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position?: number, canOwn?: boolean): number;
  allocate(stream: FSStream, offset: number, length: number): void;
  mmap(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position: number, prot: number, flags: number): any;
  ioctl(stream: FSStream, cmd: any, arg: any): any;
  readFile(path: string, opts?: { encoding: string; flags: string }): any;
  writeFile(path: string, data: ArrayBufferView, opts?: { encoding: string; flags: string }): void;
  writeFile(path: string, data: string, opts?: { encoding: string; flags: string }): void;
  analyzePath(p: string): any
  cwd(): string;
  chdir(path: string): void;
  init(input: () => number, output: (c: number) => any, error: (c: number) => any): void;

  createLazyFile(parent: string, name: string, url: string, canRead: boolean, canWrite: boolean): FSNode;
  createLazyFile(parent: FSNode, name: string, url: string, canRead: boolean, canWrite: boolean): FSNode;

  createPreloadedFile(parent: string, name: string, url: string, canRead: boolean, canWrite: boolean, onload?: () => void, onerror?: () => void, dontCreateFile?: boolean, canOwn?: boolean): void;
  createPreloadedFile(parent: FSNode, name: string, url: string, canRead: boolean, canWrite: boolean, onload?: () => void, onerror?: () => void, dontCreateFile?: boolean, canOwn?: boolean): void;
}
