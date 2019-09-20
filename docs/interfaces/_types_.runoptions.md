[magica](../README.md) › ["types"](../modules/_types_.md) › [RunOptions](_types_.runoptions.md)

# Interface: RunOptions

## Hierarchy

* object

  ↳ **RunOptions**

## Index

### Properties

* [script](_types_.runoptions.md#optional-script)

## Properties

### `Optional` script

• **script**? : *string | string[]*

*Defined in [types.ts:165](https://github.com/cancerberoSgx/magica/blob/8fb28f9/src/types.ts#L165)*

If an array of string is given each item will be executed just like main's [Options.command](_types_.options.md#command).

If a string is provided, then it will be parsed and executed as shell script.

IMPORTANT: If you need to escape arguments like file names or expressions containing white spaces, use single quotes `'`. Double quotes currently won't work.

Examples:

```js
const result = await run({script: `

# lines starting with # like this one are omitted (comments)
convert rose: -sharpen 0x1 reconstruct.jpg

# The next command reads input file reconstruct.jpg which was previous' command output file:
compare rose: reconstruct.jpg difference.png

# Like shell scripts the same command can be divided in multiple lines by using `\` like in:
convert -size 250x100 xc: +noise Random -channel R -threshold .4% \\
  -negate -channel RG -separate +channel \\
  ( +clone ) -compose multiply -flatten \\
  -virtual-pixel Tile -background Black \\
  -blur 0x.6 -motion-blur 0x15-90 -normalize \\
  +distort Polar 0 +repage 'star inward.gif'
`})
```
