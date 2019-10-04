const { array } = require('misc-utils-of-mine-generic')
const nodegtk = require('node-gtk');
nodegtk.startLoop();

// const infos = []

const GI = nodegtk._GIRepository;

function def(obj, name, data) {
  // obj[name] = data
  Object.defineProperty(obj, name, {
      enumerable: false,
      configurable: true,
      value: data
  });
}

const name = (info) => GI.BaseInfo_get_name.call(info);
const namespace = (info) => GI.BaseInfo_get_namespace.call(info);
const getInfoType = (info) => GI.BaseInfo_get_type.call(info);
const type_string = (infotype) => GI.info_type_to_string(infotype);
const tag = (type_info) => GI.type_info_get_tag(type_info);
const tag_string = (type_tag) => GI.type_tag_to_string(type_tag);
const isDeprecated = (info) => GI.BaseInfo_is_deprecated.call(info)

function gtype(info) {
  const type_name = GI.registered_type_info_get_type_name(info);
  if (!type_name)
    return null;
  return GI.registered_type_info_get_g_type(info);
}

function isNoArgsConstructor(info) {
  const flags = GI.function_info_get_flags(info)
  return ((flags & GI.FunctionInfoFlags.IS_CONSTRUCTOR) != 0
    && GI.callable_info_get_n_args(info) == 0)
}

function isConstructor(info) {
  const flags = GI.function_info_get_flags(info)
  return (flags & GI.FunctionInfoFlags.IS_CONSTRUCTOR) != 0
}

function findBoxedConstructor(info) {
  //TODO: multiple constructor signatures!
  const type = getInfoType(info)
  let result = null
  if (type === GI.InfoType.UNION) {
    const n_methods = GI.union_info_get_n_methods(info);
    for (let i = 0;i < n_methods;i++) {
      const fn_info = GI.union_info_get_method(info, i);
      if (isNoArgsConstructor(fn_info)) {
        result = fn_info;
        break;
      }
    }
    if (!result) {
      for (let i = 0;i < n_methods;i++) {
        const fn_info = GI.union_info_get_method(info, i);
        if (name(fn_info) === 'new') {
          result = fn_info;
          break;
        }
      }
    }
    if (!result) {
      for (let i = 0;i < n_methods;i++) {
        const fn_info = GI.union_info_get_method(info, i);
        if (isConstructor(fn_info)) {
          result = fn_info;
          break;
        }
      }
    }
  }
  else {
    const n_methods = GI.struct_info_get_n_methods(info);
    for (let i = 0;i < n_methods;i++) {
      const fn_info = GI.struct_info_get_method(info, i);
      if (isNoArgsConstructor(fn_info)) {
        result = fn_info;
        break;
      }
    }
    if (!result) {
      for (let i = 0;i < n_methods;i++) {
        const fn_info = GI.struct_info_get_method(info, i);
        if (name(fn_info) === 'new') {
          result = fn_info;
          break;
        }
      }
    }
    if (!result) {
      for (let i = 0;i < n_methods;i++) {
        const fn_info = GI.struct_info_get_method(info, i);
        if (isConstructor(fn_info)) {
          result = fn_info;
          break;
        }
      }
    }
  }
  if (result)
    return new FunctionInfo(result)
  return null
}

function BaseInfo(info) {
  def(this, '_info', info);
  def(this, '_type', getInfoType(info)); 
  def(this, '_ns', namespace(info));
  this.infoType = GI.info_type_to_string(this._type);
  if (this._type != GI.InfoType.TYPE)
    this.name = name(info);
  if (isDeprecated(info))
    this.isDeprecated = true
  // infos.push(this)
}

function TypeInfo(info) {
  BaseInfo.call(this, info)
  def(this, '_tag', tag(info));
  // this.typeName = nodegtk._c.GetTypeName(info);
  if (this._tag == GI.TypeTag.ARRAY) {
    this.type = tag_string(this._tag);
    this.array_type = GI.ArrayType[GI.type_info_get_array_type(info)];
    this.zero_terminated = GI.type_info_is_zero_terminated(info);
    this.fixed_size = GI.type_info_get_array_fixed_size(info);
    this.size = nodegtk._c.GetTypeSize(info);
    const isPointer = GI.type_info_is_pointer(info)
    if (isPointer)
      this.isPointer = isPointer
    this.elementType = new TypeInfo(GI.type_info_get_param_type(info, 0));
  }
  else if (this._tag == GI.TypeTag.GLIST || this._tag == GI.TypeTag.GSLIST) {
    this.type = tag_string(this._tag);
    const isPointer = GI.type_info_is_pointer(info)
    if (isPointer)
      this.isPointer = isPointer
    this.elementType = new TypeInfo(GI.type_info_get_param_type(info, 0));
  }
  else if (this._tag == GI.TypeTag.GHASH) {
    this.type = tag_string(this._tag);
    const isPointer = GI.type_info_is_pointer(info)
    if (isPointer)
      this.isPointer = isPointer
    this.elementType = new TypeInfo(GI.type_info_get_param_type(info, 0));
  }
  else if (this._tag == GI.TypeTag.INTERFACE) {
    const interf = GI.type_info_get_interface(info)
    const infoType = GI.BaseInfo_get_type.call(interf)
    this.type = type_string(infoType) + '.' + name(interf)
    const isPointer = GI.type_info_is_pointer(info)
    if (isPointer)
      this.isPointer = isPointer
    if (infoType === GI.InfoType.CALLBACK) {
      this.callback = new FunctionInfo(interf, this)
    }
  }
  else {
    this.type = tag_string(this._tag);
    this.size = nodegtk._c.GetTypeSize(info);
    const isPointer = GI.type_info_is_pointer(info)
    if (isPointer)
      this.isPointer = isPointer
  }
}

function ConstantInfo(info) {
  BaseInfo.call(this, info)
  this.value = nodegtk._c.GetConstantValue(info);
}

function ValueInfo(info) {
  BaseInfo.call(this, info)
  this.value = GI.value_info_get_value(info)
}

function PropInfo(info) {
  BaseInfo.call(this, info)
  def(this, '_flags', GI.property_info_get_flags(info));
  def(this, '_typeInfo', GI.property_info_get_type(info));
  def(this, '_tag', tag(this._typeInfo));
  // if (this._tag == GI.InfoType.INTERFACE) {
  this.type = new TypeInfo(this._typeInfo);
  // } else {
  // this.type = tag_string(this._tag);
  // }
  const transfer = GI.property_info_get_ownership_transfer(info);
  this.transfer = GI.Transfer[transfer];
}

function FieldInfo(info) {
  BaseInfo.call(this, info)
  def(this, '_flags', GI.field_info_get_flags(info));
  def(this, '_offset', GI.field_info_get_offset(info));
  def(this, '_size', GI.field_info_get_size(info));
  def(this, '_typeInfo', GI.field_info_get_type(info));
  def(this, '_tag', tag(this._typeInfo));
  // if (this._tag == GI.TypeTag.INTERFACE) {
  // const gtype = GI.registered_type_info_get_g_type(this._type);
  this.type = new TypeInfo(this._typeInfo);
  // } else {
  // this.type = tag_string(this._tag);
  // }
  const readable = this._flags & GI.FieldInfoFlags.READABLE;
  if (readable == 0)
    this.readable = false;
  const writable = this._flags & GI.FieldInfoFlags.WRITABLE;
  if (writable == 0)
    this.writable = false;
}

function StructInfo(info) {
  BaseInfo.call(this, info)
  this.gtype = gtype(info);
  this.size = GI.struct_info_get_size(info);
  this.alignment = GI.struct_info_get_alignment(info);
  this.is_gtype_struct = GI.struct_info_is_gtype_struct(this._info)
  this.is_foreign = GI.struct_info_is_foreign(this._info)
  this.constructor = findBoxedConstructor(info, this)
  this.methods = array(GI.struct_info_get_n_methods(info))
    .map(i => GI.struct_info_get_method(info, i))
    .map(m => new FunctionInfo(m, this))
  this.fields = array(GI.struct_info_get_n_fields(info))
    .map(i => GI.struct_info_get_field(info, i))
    .map(field => new FieldInfo(field, this))
}

function UnionInfo(info) {
  BaseInfo.call(this, info)
  this.gtype = gtype(info);
  this.size = GI.union_info_get_size(info);
  this.alignment = GI.union_info_get_alignment(info);
  let is_discriminated = GI.union_info_is_discriminated(info);
  if (is_discriminated) {
    this.discriminator_type = new TypeInfo(GI.union_info_get_discriminator_type(info));
    this.discriminator_offset = GI.union_info_get_discriminator_offset(info);
  }
  this.constructor = findBoxedConstructor(info, this)
  this.methods = array(GI.union_info_get_n_methods(info))
    .map(i => GI.union_info_get_method(info, i))
    .map(m => new FunctionInfo(m, this))
  this.fields = array(GI.union_info_get_n_fields(info))
    .map(i => GI.union_info_get_field(info, i))
    .map(field => ({
      ...new FieldInfo(field, this),
      discriminator: nodegtk._c.GetConstantValue(GI.union_info_get_discriminator(info, i))
    }))
}

function EnumInfo(info) {
  BaseInfo.call(this, info)
  this.gtype = gtype(info);
  this.values = array(GI.enum_info_get_n_values(info))
    .map(i => GI.enum_info_get_value(info, i))
    .map(n => ({ name: name(n), ...new ValueInfo(n, this) }))
  this.methods = array(GI.enum_info_get_n_methods(info))
    .map(i => GI.enum_info_get_method(info, i))
    .map(n => ({ name: name(n), ...new FunctionInfo(n, this) }))
}

function InterfaceInfo(info) {
  // console.log('INNNNTT', info);
  
  BaseInfo.call(this, info)
  this.gtype = gtype(info);
  const structInfo = GI.interface_info_get_iface_struct(info)
  if (structInfo !== null)
    this.iface_struct = new StructInfo(structInfo);
  this.prerequisites = array(GI.interface_info_get_n_prerequisites(info))
    .map(i => GI.interface_info_get_prerequisite(info, i))
    .map(n => getInfo(n))
  this.properties = array(GI.interface_info_get_n_properties(info))
    .map(i => GI.interface_info_get_property(info, i))
    .map(n => getInfo(n))
  this.methods = array(GI.interface_info_get_n_methods(info))
    .map(i => GI.interface_info_get_method(info, i))
    .map(n => getInfo(n))
  this.signals = array(GI.interface_info_get_n_signals(info))
    .map(i => GI.interface_info_get_signal(info, i))
    // .map(n => ({
    //   ...n,
    // }))
  this.vfuncs = array(GI.interface_info_get_n_vfuncs(info))
    .map(i => GI.interface_info_get_vfunc(info, i))
    .map(n => ({ ...n }))
  this.constants = array(GI.interface_info_get_n_constants(info))
    .map(i => GI.interface_info_get_constant(info, i))
    // .map(i => ({ ...n, name: name(i) }))
  // buildParentInfo(this, info);
}

function ObjectInfo(info) {
  BaseInfo.call(this, info)
  this.gtype = gtype(info);
  buildParentInfo(this, info);
  // console.log(GI.object_info_get_n_interfaces(info), array(GI.object_info_get_n_interfaces(info))
    // .map(i => GI.object_info_get_interface(info, i)).map(i=>namespace(i)));
  // 
  this.properties = array(GI.object_info_get_n_properties(info))
    .map(i => GI.object_info_get_property(info, i))
    .map(n => getInfo(n, this))
  this.constants = array(GI.object_info_get_n_constants(info))
    .map(i => GI.object_info_get_constant(info, i))
    .map(n => getInfo(n, this))
  this.interfaces = array(GI.object_info_get_n_interfaces(info))
    .map(i => GI.object_info_get_interface(info, i))
    .map(n => new InterfaceInfo(n) )
  this.methods = array(GI.object_info_get_n_methods(info))
    .map(i => GI.object_info_get_method(info, i))
    // .map(n=>new FunctionInfo(n, this))
    .map(n => ({ name: name(n), ...new FunctionInfo(n) }))
  this.signals = array(GI.object_info_get_n_signals(info))
    .map(i => GI.object_info_get_signal(info, i))
    .map(n => ({ name: name(n), ...getInfo(n, this) }))
  this.vfuncs = array(GI.object_info_get_n_vfuncs(info))
    .map(i => GI.object_info_get_vfunc(info, i))
    .map(n => ({ name: name(n), ...n }))
}

function buildParentInfo(self, info) {
  if(!info){
    def(self, '_parent', {})
    return 
  }
  // console.log(JSON.stringify(info));
  
  const parentInfo = GI.object_info_get_parent(info);
  if (parentInfo) {
    def(self, '_parent', {
      name: name(parentInfo),
      gtype: gtype(parentInfo),
      _ns: namespace(parentInfo)
    });
  }
}

function ArgInfo(info) {
  BaseInfo.call(this, info)
  def(this, '_typeInfo', GI.arg_info_get_type(info));
  def(this, '_tag', tag(this._typeInfo));
  this.tag = tag_string(this._tag);
  this.type = new TypeInfo(this._typeInfo);
  this.name = name(info);
  this.direction = GI.Direction[GI.arg_info_get_direction(info)];
  this.transfer = GI.Transfer[GI.arg_info_get_ownership_transfer(info)];
  const may_be_null = GI.arg_info_may_be_null(info);
  if (may_be_null)
    this.nullable = may_be_null;
  const is_caller_allocates = GI.arg_info_is_caller_allocates(info);
  if (is_caller_allocates)
    this.caller_allocates = true;
  const is_return_value = GI.arg_info_is_return_value(info);
  if (is_return_value)
    this.return_value = true;
  const is_skip = GI.arg_info_is_skip(info);
  if (is_skip)
    this.skip = true;
  const length_pos = GI.type_info_get_array_length(this._typeInfo)
  if (length_pos >= 0)
    this.lengthPos = length_pos
}

function CallableInfo(info) {
  BaseInfo.call(this, info)
  this.args = array(GI.callable_info_get_n_args(info))
    .map(i => new ArgInfo(GI.callable_info_get_arg(info, i), this))
  // .map(n => ({ name: name(n), ...getInfo(n, this) , 
  // ...getInfo(n, this).lengthPos !== undefined ? { isArrayLength: true } : {}
  // )
  // )
  // this.n_args = GI.callable_info_get_n_args(info);
  // this.args = [];
  // for (let i = 0; i < this.n_args; i++) {
  //     this.args[i] = new ArgInfo(GI.callable_info_get_arg(info, i), this);
  // }
  // for (let i = 0; i < this.n_args; i++) {
  //     if (this.args[i].lengthPos !== undefined)
  //         this.args[this.args[i].lengthPos].isArrayLength = true
  // }
  const transfer = GI.callable_info_get_caller_owns(info);
  this.transfer = GI.Transfer[transfer];
  const return_type = GI.callable_info_get_return_type(info);
  this.return_type = new TypeInfo(return_type);
  this.return_tag = tag_string(tag(return_type));
  const mayReturnNull = GI.callable_info_may_return_null(info);
  if (mayReturnNull) this.mayReturnNull = true;
  const skipReturn = GI.callable_info_skip_return(info)
  if (skipReturn) this.skipReturn = true;
  const canThrow = GI.callable_info_can_throw_gerror(info)
  if (canThrow) this.canThrow = true
}

function SignalInfo(info) {
  BaseInfo.call(this, info)
  CallableInfo.call(this, info);
  def(this, '_flags', GI.signal_info_get_flags(info));
}

function VFuncInfo(info) {
  BaseInfo.call(this, info)
  CallableInfo.call(this, info);
  const invoker = GI.vfunc_info_get_invoker(info);
  if (invoker)
    this.invoker = new FunctionInfo(invoker, this);
  const signal = GI.vfunc_info_get_invoker(info);
  if (signal)
    this.signal = new SignalInfo(signal, this);
}

function FunctionInfo(info) {
  BaseInfo.call(this, info)
  CallableInfo.call(this, info);
  if (this.infoType === 'callback')
    return
  this.symbol = GI.function_info_get_symbol(info)
  def(this, '_flags', GI.function_info_get_flags(info));
  this.isMethod = this._flags & GI.FunctionInfoFlags.IS_METHOD !== 0
  this.isConstructor = this._flags & GI.FunctionInfoFlags.IS_CONSTRUCTOR !== 0
  this.isGetter = this._flags & GI.FunctionInfoFlags.IS_GETTER !== 0
  this.isSetter = this._flags & GI.FunctionInfoFlags.IS_SETTER !== 0
}

function parseNamespace(ns, ver) {
  const m = Object.create(null);
  const repo = GI.Repository_get_default();
  if (!nodegtk._isLoaded(ns, ver))
    GI.Repository_require.call(repo, ns, ver, 0);
  const nInfos = GI.Repository_get_n_infos.call(repo, ns);
  for (let i = 0;i < nInfos;i++) {
    const info = GI.Repository_get_info.call(repo, ns, i);
    const baseinfo = getInfo(info, ns);
    const basename = name(info);
    m[basename] = baseinfo;
  }
  return m
  // return Object.values(m).map(format);
}

function getInfo(info) {
  switch (getInfoType(info)) {
    case GI.InfoType.INVALID:
      return null;
    case GI.InfoType.CALLBACK:
    case GI.InfoType.FUNCTION:
      return new FunctionInfo(info)
    case GI.InfoType.OBJECT:
      return new ObjectInfo(info)
    case GI.InfoType.ENUM:
    case GI.InfoType.FLAGS:
      return new EnumInfo(info)
    case GI.InfoType.BOXED:
    case GI.InfoType.STRUCT:
      return new StructInfo(info)
    case GI.InfoType.UNION:
      return new UnionInfo(info)
    case GI.InfoType.INTERFACE:
      return new InterfaceInfo(info)
    case GI.InfoType.CONSTANT:
      return new ConstantInfo(info)
    case GI.InfoType.FIELD:
      return new FieldInfo(info)
    case GI.InfoType.PROPERTY:
      return new PropInfo(info)
    case GI.InfoType.ARG:
      return new ArgInfo(info)
    case GI.InfoType.TYPE:
      return new TypeInfo(info)
    case GI.InfoType.VALUE:
      return new ValueInfo(info)
    case GI.InfoType.SIGNAL:
      return new SignalInfo(info)
    case GI.InfoType.VFUNC:
      return new VFuncInfo(info)
    case GI.InfoType.UNRESOLVED:
      return undefined;
  }
  return new BaseInfo(info)
}

function getLibs() {
  let paths =
    GI.Repository_get_search_path()
      .map(p => require('fs').readdirSync(p));
  let files = [].concat(...paths)
    .filter(f => f.endsWith('.typelib'))
    .map(f => f.replace(/\.typelib/, ''))
    .map(f => [f].concat(f.split('-')));
  return files;
}

function formatName(info) {
  let name = ''
  let current = info
  while (current) {
    name = (current.name || current) + (name ? '.' + name : '')
    current = current.parent
  }
  return name
}

function formatFunction(fn) {
  return {
    args: (fn.args || []).map(a => ({ name: a.name, type: formatType(a.type), direction: a.direction })),
    returnType: formatType(fn.return_type)
  }
}

function formatType(type) {
  if (type.type === 'array')
    return formatType(type.elementType) + '[]'
  if (type.type === 'glist' || type.type === 'gslist')
    return formatType(type.elementType) + '[]'
  return type.type
}

function format(i) {
  try {
    const b = {
      type: getInfoType(i.infoType),
      typeString: type_string(i.infoType),
      name: formatName(i.name || 'NULL'),
      parent: formatName(i.parent || 'NULL'),
      ns: namespace(i),
    }
    // return formatName(i.name || 'NULL')
    if (i.infoType === 'function') {
      return {
        ...b,
        ...formatFunction(i)
      }
    }
    if (i.infoType === 'interface') {
      return {
        ...b,
        methods: Object.values(i.methods || {}).map(formatFunction),
      }
    }
    if (i.infoType === 'object') {
      return {
        ...b,
        ...new InterfaceInfo(i),
        methods: Object.values(i.methods || {}).map(formatFunction)
      }
    }
    else {
      console.warn('Not impl', i.infoType);

      // const parent = formatName(i.parent||'NULL')
      return {
        ...b
      }
      // type arg callback
      // console.log(i.infoType)
      // return {}    
    }
  } catch (error) {
    console.error('Err', error);
    return {
      name: 'error'
    }
  }
}

module.exports = {
  parseNamespace,
  getLibs,
  // infos,
  formatName,
  formatFunction,
  formatType,
  format
};
